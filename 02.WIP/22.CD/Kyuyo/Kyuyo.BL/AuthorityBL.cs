namespace Kyuyo.BL
{
    using System.Collections.Generic;
    using System.Linq;

    using AutoMapper;

    using Kyuyo.BL.Utils;
    using Kyuyo.DA;

    using log4net;
    using Core;
    using DTO;
    using System;
    using System.Data.Entity;/// <summary>
                             /// 
                             /// </summary>
    public class AuthorityBL
    {

        /// <summary>
        /// The logger
        /// </summary>
        private static readonly ILog logger = LogManager.GetLogger(typeof(AuthorityBL));

        /// <summary>
        /// Checks the authority.
        /// </summary>
        /// <param name="userCode">The user code.</param>
        /// <param name="password">The password.</param>
        /// <returns></returns>
        public UserInfo CheckAuthority(string userCode, string password)
        {
            using (var context = new KyuyoEntities())
            {
                UserInfo userInfo = null;

                // Hash MD5 password
                var hashPass = MD5Hash.Get(password);

                var result = (from e in context.KY_EMPLOYEE_MASTER
                              where e.USER_ID == userCode
                              && e.PASSWORD == hashPass
                              && e.DELETE_FLAG == Constant.FLAG_NO
                              select new
                              {
                                  e.EMPLOYEE_NAME,
                                  e.EMPLOYEE_NO,
                                  e.USER_ID,
                                  e.COMPANY_ID
                              }).FirstOrDefault();

                if (result != null)
                {
                    // Get Menu Authority
                    CompanyBL companyBL = new CompanyBL();
                    var companyCd = companyBL.GetCompanyCd(result.COMPANY_ID);

                    var menus = context.GetAuthorityMenu(result.EMPLOYEE_NO);
                    List<ScreenItem> master = new List<ScreenItem>();
                    List<ScreenItem> bus = new List<ScreenItem>();

                    foreach (var menu in menus)
                    {
                        ScreenItem item = new ScreenItem
                        {
                            ScreenId = menu.ScreenId,
                            ScreenName = menu.ScreenName,
                            Url = menu.Url,
                            ShowFlag = menu.ShowFlag.Equals(Constant.FLAG_YES),
                            AllowView = menu.AllowView >= 1,
                            AccessLevel = menu.AccessLevel.Split('|').FirstOrDefault(a => a.Contains(menu.ScreenId))
                        };

                        if (menu.Type == 0)
                        {
                            master.Add(item);
                        }
                        else if (menu.Type == 1)
                        {
                            bus.Add(item);
                        }
                    }

                    // check IsAdmin
                    var systemDto = (from s in context.TB_M_SYSTEM
                                     where s.CATEGORY == Constant.ADMIN_USER
                                        && s.CD == "001"
                                        && s.ACTIVE_FLAG == Constant.FLAG_YES
                                        && s.CHAR_VALUE_1 == result.USER_ID
                                     select s).FirstOrDefault();

                    userInfo = new UserInfo()
                    {
                        EmployeeName = result.EMPLOYEE_NAME,
                        EmployeeNo = result.EMPLOYEE_NO,
                        IsAuthenticate = true,
                        UserId = result.USER_ID,
                        CompanyId = result.COMPANY_ID,
                        CompanyCd = companyCd,
                        IsAdmin = systemDto != null,
                        ScreenBusiness = bus,
                        ScreenMaster = master
                    };
                }

                return userInfo;
            }
        }

        /// <summary>
        /// Gets the employee by employeeNo
        /// </summary>
        /// <param name="employeeNo">The employee no.</param>
        /// <returns>AuthorityDto</returns>
        public AuthorityDto GetEmployee(int? id, string employeeNo)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from a in context.KY_AUTHORITY
                              where a.EMPLOYEE_NO == employeeNo
                                 && (id == null || a.ID == id)
                              select a).FirstOrDefault();
                return Mapper.Map<AuthorityDto>(result);
            }
        }

        /// <summary>
        /// Inserts the or update.
        /// </summary>
        /// <param name="Id">The identifier.</param>
        /// <param name="employeeNo">The employee no.</param>
        /// <param name="screenAccess">The screen access.</param>
        /// <param name="userLogin">The user login.</param>
        public void InsertOrUpdate(int? Id, string employeeNo, string screenAccess, string userLogin)
        {
            using (var context = new KyuyoEntities())
            {
                KY_AUTHORITY entity = new KY_AUTHORITY()
                {
                    EMPLOYEE_NO = employeeNo,
                    SCREEN_ACCESSES = screenAccess,
                    UPDATED_BY = userLogin,
                    UPDATED_DT = DateTime.Now
                };

                if(Id == null)
                {
                    // Insert 
                    entity.CREATED_BY = entity.UPDATED_BY;
                    entity.CREATED_DT = entity.UPDATED_DT;
                    context.KY_AUTHORITY.Add(entity);
                    context.Entry(entity).State = EntityState.Added;
                }
                else
                {
                    // Update access role
                    entity.ID = Id ?? 0;
                    context.KY_AUTHORITY.Attach(entity);
                    context.Entry(entity).State = EntityState.Modified;
                }

                // commit
                context.SaveChanges();

            }
        }

        /// <summary>
        /// Deletes the specified employee no.
        /// </summary>
        /// <param name="employeeNo">The employee no.</param>
        public void Delete(string employeeNo)
        {
            using (var context = new KyuyoEntities())
            {
                context.KY_AUTHORITY.RemoveRange(context.KY_AUTHORITY.Where(a => a.EMPLOYEE_NO == employeeNo));
                context.SaveChanges();
            }
        }

        /// <summary>
        /// Gets all employee authority by companyId
        /// </summary>
        /// <param name="companyId">The company identifier.</param>
        /// <returns></returns>
        public List<AuthorityDto> GetAllEmployee(int companyId)
        {
            using(var context = new KyuyoEntities())
            {
                var result = context.GetEmployeeAuthority(companyId);
                return Mapper.Map<List<AuthorityDto>>(result);
            }
        }

        /// <summary>
        /// Ssoes the change password.
        /// </summary>
        /// <param name="userCode">The user code.</param>
        /// <param name="oldPasswd">The old passwd.</param>
        /// <param name="newPasswd">The new passwd.</param>
        /// <returns></returns>
        public bool SSOChangePassword(string userCode, string oldPasswd, string newPasswd)
        {
        //return true;
            using (var context = new KyuyoEntities())
            {

                var hashOldPass = MD5Hash.Get(oldPasswd);
                var hashNewPass = MD5Hash.Get(newPasswd);

                var result = (from d in context.KY_EMPLOYEE_MASTER
                              where d.USER_ID == userCode
                              && d.PASSWORD == hashOldPass
                              && d.DELETE_FLAG == Constant.FLAG_NO
                              select d).FirstOrDefault();
                if (result != null)
                {
                    result.PASSWORD = hashNewPass;
                    result.UPDATED_BY = result.EMPLOYEE_NO;
                    result.UPDATED_DT = DateTime.Now;
                    context.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }

            }
        }

        public void SSORegist(string aUserCode, string aPasswd, string tUserCode, string tPasswd)
        {
            //using (var context = new KyuyoEntities())
            //{
            //    var admin = (from d in context.Users
            //                 where d.UserCode == aUserCode
            //                 && d.Password == aPasswd
            //                 && d.DeleteFlag == Constant.FLAG_NO
            //                 select d).FirstOrDefault();
            //    if (admin != null)
            //    {

            //        // return true;
            //    }

            //    {
            //        throw new ExcuteBLException("Error ");
            //    }

            //}
        }
        
    }
}