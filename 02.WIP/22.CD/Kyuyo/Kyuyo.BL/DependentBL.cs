using AutoMapper;
using Kyuyo.BL.DTO;
using Kyuyo.BL.Mappings;
using Kyuyo.BL.Utils;
using Kyuyo.DA;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyuyo.BL
{
    public class DependentBL
    {
        /// <summary>
        /// Searches the dependent.
        /// </summary>
        /// <param name="companyCd">The company cd.</param>
        /// <param name="deptCd">The dept cd.</param>
        /// <param name="employeeNo">The employee no.</param>
        /// <param name="employeeName">Name of the employee.</param>
        /// <returns></returns>
        public List<DependentDto> SearchDependent(string companyCd, string deptCd, string employeeNo, string employeeName)
        {
            using (var context = new KyuyoEntities())
            {
                var result = context.SearchDependent(companyCd, deptCd, employeeNo, employeeName);
                return Mapper.Map<List<DependentDto>>(result);
            }
        }
        /// <summary>
        /// Checks the exist.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="dependentTaxCode">The dependent tax code.</param>
        /// <param name="idPassport">The identifier passport.</param>
        /// <param name="number">The number.</param>
        /// <param name="numberBook">The number book.</param>
        /// <param name="flag">if set to <c>true</c> [flag].</param>
        /// <returns></returns>
        public bool CheckExist(int? id, string dependentTaxCode, string idPassport, string number, string numberBook, bool flag)
        {
            using (var context = new KyuyoEntities())
            {

                if (flag)
                {
                    var result = (from d in context.KY_DEPENDENT
                                  where ((d.IDENTITY_PASSPORT == idPassport)
                                      || (d.DEPENDENT_TAX_CODE == dependentTaxCode && dependentTaxCode != null))
                                      && (d.ID != id || id == null)
                                      && d.DELETE_FLAG == Constant.FLAG_NO
                                  select d).FirstOrDefault();
                    return result != null;
                }
                else
                {
                    var result = (from d in context.KY_DEPENDENT
                                  where d.NUMBER == number
                                     && d.NUMBER_BOOK == numberBook
                                     && (d.ID != id || id == null)
                                     && d.DELETE_FLAG == Constant.FLAG_NO
                                  select d).FirstOrDefault();
                    return result != null;
                }


            }
        }

        /// <summary>
        /// Gets the by identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public DependentDto GetById(int id)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from d in context.KY_DEPENDENT
                              where d.ID == id
                                 && d.DELETE_FLAG == Constant.FLAG_NO
                              select d).FirstOrDefault();
                return Mapper.Map<DependentDto>(result);
            }

        }


        /// <summary>
        /// Gets Max HitoryNo
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public int? GetMaxHistoryNoById(int id)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from d in context.KY_DEPENDENT
                              where d.MAIN_ID == id
                              orderby d.HISTORY_NO descending
                              select d.HISTORY_NO).FirstOrDefault();
                if(result == null)
                {
                    result = 0;
                }
                return result;
            }

        }

        /// <summary>
        /// Inserts the specified employee no.
        /// </summary>
        /// <param name="employeeNo">The employee no.</param>
        /// <param name="dependent">The dependent.</param>
        /// <param name="birthDt">The birth dt.</param>
        /// <param name="dependentTaxCode">The dependent tax code.</param>
        /// <param name="idPassport">The identifier passport.</param>
        /// <param name="number">The number.</param>
        /// <param name="numberBook">The number book.</param>
        /// <param name="registerPlace">The register place.</param>
        /// <param name="relationship">The relationship.</param>
        /// <param name="nationality">The nationality.</param>
        /// <param name="fromDt">From dt.</param>
        /// <param name="toDt">To dt.</param>
        /// <param name="updatedBy">The updated by.</param>
        public void Insert(string employeeNo, string dependent, DateTime? birthDt, string dependentTaxCode,
                                    string idPassport, string number, string numberBook, string regCountry, string regCity, string regDistrict,
                                    string regWard, string relationship,
                                    string nationality, string fromDt, string toDt, string updatedBy)
        {

            using (var context = new KyuyoEntities())
            {
                var entity = new KY_DEPENDENT()
                {
                    EMPLOYEE_NO = employeeNo,
                    DEPENDENT = dependent,
                    BIRTH_DT = birthDt,
                    DEPENDENT_TAX_CODE = dependentTaxCode,
                    IDENTITY_PASSPORT = idPassport,
                    NUMBER = number,
                    NUMBER_BOOK = numberBook,
                    RELATIONSHIP = relationship,
                    NATIONALITY = nationality,
                    REG_COUNTRY = regCountry,
                    REG_CITY = regCity,
                    REG_DISTRICT = regDistrict,
                    REG_WARD = regWard,
                    FROM_MONTH = fromDt,
                    TO_MONTH = toDt,
                    DELETE_FLAG = Constant.FLAG_NO,
                    CREATED_DT = DateTime.Now,
                    CREATED_BY = updatedBy,
                    UPDATED_DT = DateTime.Now,
                    UPDATED_BY = updatedBy
                };

                context.KY_DEPENDENT.Add(entity);
                context.Entry(entity).State = EntityState.Added;
                context.SaveChanges();
            }

        }


        /// <summary>
        /// Inserts the specified employee no.
        /// </summary>
        /// <param name="dependentDtos"></param>
        public void Insert(List<DependentDto> dependentDtos)
        {
            using (var context = new KyuyoEntities())
            {
                List<KY_DEPENDENT> entity = Mapper.Map<List<KY_DEPENDENT>>(dependentDtos);

                context.KY_DEPENDENT.AddRange(entity);
                foreach (var item in entity)
                {
                    context.Entry(item).State = EntityState.Added;
                }
                context.SaveChanges();
            }

        }

        /// <summary>
        /// Inserts the specified employee no.
        /// </summary>
        /// <param name="dependentDtos"></param>
        public void Insert(DependentDto dependentDto)
        {
            using (var context = new KyuyoEntities())
            {
                KY_DEPENDENT entity = Mapper.Map<KY_DEPENDENT>(dependentDto);
                context.Entry(entity).State = EntityState.Added;
                context.SaveChanges();
            }

        }


        /// <summary>
        /// Updates the specified identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="employeeNo">The employee no.</param>
        /// <param name="dependent">The dependent.</param>
        /// <param name="birthDt">The birth dt.</param>
        /// <param name="dependentTaxCode">The dependent tax code.</param>
        /// <param name="idPassport">The identifier passport.</param>
        /// <param name="number">The number.</param>
        /// <param name="numberBook">The number book.</param>
        /// <param name="registerPlace">The register place.</param>
        /// <param name="relationship">The relationship.</param>
        /// <param name="nationality">The nationality.</param>
        /// <param name="fromDt">From dt.</param>
        /// <param name="toDt">To dt.</param>
        /// <param name="updatedBy">The updated by.</param>
        public void Update(int id, string employeeNo, string dependent, DateTime? birthDt, string dependentTaxCode,
                                    string idPassport, string number, string numberBook, string registerPlace, string relationship,
                                    string nationality, string fromDt, string toDt, string updatedBy)
        {

            using (var context = new KyuyoEntities())
            {
                var entity = new KY_DEPENDENT()
                {
                    ID = id,
                    EMPLOYEE_NO = employeeNo,
                    DEPENDENT = dependent,
                    BIRTH_DT = birthDt,
                    DEPENDENT_TAX_CODE = dependentTaxCode,
                    IDENTITY_PASSPORT = idPassport,
                    NUMBER = number,
                    NUMBER_BOOK = numberBook,
                    RELATIONSHIP = relationship,
                    NATIONALITY = nationality,
                    FROM_MONTH = fromDt,
                    TO_MONTH = toDt,
                    DELETE_FLAG = Constant.FLAG_NO,
                    UPDATED_DT = DateTime.Now,
                    UPDATED_BY = updatedBy
                };

                context.KY_DEPENDENT.Attach(entity);
                context.Entry(entity).State = EntityState.Modified;
                context.SaveChanges();
            }
        }

        /// <summary>
        /// Deletes the specified identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="updatedBy">The updated by.</param>
        public void Delete(int id, string updatedBy)
        {
            using (var context = new KyuyoEntities())
            {
                var entity = new KY_DEPENDENT()
                {
                    ID = id,
                    DELETE_FLAG = Constant.FLAG_YES,
                    UPDATED_DT = DateTime.Now,
                    UPDATED_BY = updatedBy
                };

                context.KY_DEPENDENT.Attach(entity);
                var entry = context.Entry(entity);

                entry.Property(e => e.DELETE_FLAG).IsModified = true;
                entry.Property(e => e.UPDATED_DT).IsModified = true;
                entry.Property(e => e.UPDATED_BY).IsModified = true;

                context.SaveChanges();
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dependentTaxCode"></param>
        /// <param name="idPassport"></param>
        /// <param name="number"></param>
        /// <param name="numberBook"></param>
        /// <returns></returns>
        public bool CheckExist(string dependentTaxCode, string idPassport, string number, string numberBook)
        {
            using (var context = new KyuyoEntities())
            {
                if (!string.IsNullOrEmpty(dependentTaxCode) || !string.IsNullOrEmpty(idPassport))
                {
                    var result = (from d in context.KY_DEPENDENT
                                  where ((d.IDENTITY_PASSPORT == idPassport)
                                      || (d.DEPENDENT_TAX_CODE == dependentTaxCode && dependentTaxCode != null))
                                      && d.DELETE_FLAG == Constant.FLAG_NO
                                      && d.MAIN_ID == null
                                  select d).FirstOrDefault();
                    return result != null;
                }
                else
                {
                    var result = (from d in context.KY_DEPENDENT
                                  where d.NUMBER == number
                                     && d.NUMBER_BOOK == numberBook
                                     && d.DELETE_FLAG == Constant.FLAG_NO
                                     && d.MAIN_ID == null
                                  select d).FirstOrDefault();
                    return result != null;
                }
            }
        }
    }


}
