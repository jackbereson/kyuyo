using Kyuyo.BL;
using Kyuyo.BL.DTO;
using Kyuyo.BL.Resources;
using Kyuyo.BL.Resources.Employee;
using Kyuyo.BL.Utils;
using Kyuyo.Infrastructure.Core;
using Kyuyo.Infrastructure.Utils;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Kyuyo.Controllers.Api.Employee
{
    [RoutePrefix("api/Employee")]
    public class EmployeeController : ApiControllerBase
    {
        [HttpGet]
        public HttpResponseMessage Get(HttpRequestMessage request,[FromUri] SearchEmployeeRequest search)
        {
            return CreateHttpResponse(request, () =>
            {
                if (!ModelState.IsValid)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest,
                         ModelState.Keys.SelectMany(k => ModelState[k].Errors)
                            .Select(e => e.ErrorMessage).ToArray());
                }
                var employeeBL = new EmployeeBL();
                var commonBL = new CommonBL();
                var companyBL = new CompanyBL();
                var departmentBL = new DepartmentBL();
                var companyCd = companyBL.GetCompanyCd(search.CompanyId ?? 0);

                var response = new EmployeeResponse()
                {
                    ListEmployee = employeeBL.SearchEmployee(search.CompanyId ?? 0, search.DeptCd, search.EmployeeNo,
                                            search.EmployeeName, search.IncludeQuit, DateTimeFormat.ToDateTime(search.FromDt),
                                            DateTimeFormat.ToDateTime(search.FromDt)),
                    ListEmployeeType = commonBL.getMSystemList(Constant.EMPLOYEE_TYPE, companyCd),
                    ListWorkingPlace = commonBL.getMSystemList(Constant.WORKING_PLACE, companyCd),
                    ListLevel = commonBL.getMSystemList(Constant.LEVEL, companyCd),
                    ListLevelGroup = commonBL.getMSystemList(Constant.LEVEL_GROUP, companyCd),
                    ListContractType = commonBL.getMSystemList(Constant.CONTRACT_TYPE, companyCd),
                    ListTitle = commonBL.getMSystemList(Constant.TITLE, companyCd)
                };

                return request.CreateResponse(HttpStatusCode.OK, response);
            });
        }

        /// <summary>
        /// Gets list dept by employeeNo
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="employeeNo">The employee no.</param>
        /// <returns></returns>
        [HttpGet]
        [Route("dept/{employeeNo}")]
        public HttpResponseMessage Get(HttpRequestMessage request, string employeeNo)
        {
            return CreateHttpResponse(request, () =>
            {
                var employeeBL = new EmployeeBL();
                return request.CreateResponse(HttpStatusCode.OK, employeeBL.GetDeptByEmployeeNo(employeeNo));
            });
        }

        /// <summary>
        /// Puts the specified request.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="data">The data.</param>
        /// <returns></returns>
        [HttpPut]
        [Route("dept")]
        public HttpResponseMessage Put(HttpRequestMessage request, EmployeeDeptRequest data)
        {
            return CreateHttpResponse(request, () =>
            {
                if (!ModelState.IsValid)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest,
                         ModelState.Keys.SelectMany(k => ModelState[k].Errors)
                            .Select(e => e.ErrorMessage).ToArray());
                }

                var employeeBL = new EmployeeBL();
                var startDt = DateTimeFormat.ToDateTime(data.StartDt) ?? DateTime.MinValue;
                var inactiveDt = DateTimeFormat.ToDateTime(data.InactiveDt);

                if (data.MainFlag && employeeBL.CheckMainDept(null, data.EmployeeNo, startDt, inactiveDt))
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, MessagesM009.UniqueMainDept);
                }

                employeeBL.InsertEmpDept(data.CompanyCd, data.DeptCd, data.EmployeeNo, data.Title, startDt, inactiveDt, data.MainFlag, Helper.EmployeeNo());
                return request.CreateResponse(HttpStatusCode.OK, Messages.DataCreated);
            });
        }

        /// <summary>
        /// Update empDept
        /// </summary>
        /// <param name="request"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("dept")]
        public HttpResponseMessage Post(HttpRequestMessage request, EmployeeDeptRequest data)
        {
            return CreateHttpResponse(request, () =>
            {
                if (!ModelState.IsValid)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest,
                         ModelState.Keys.SelectMany(k => ModelState[k].Errors)
                            .Select(e => e.ErrorMessage).ToArray());
                }

                var employeeBL = new EmployeeBL();
                var startDt = DateTimeFormat.ToDateTime(data.StartDt) ?? DateTime.MinValue;
                var inactiveDt = DateTimeFormat.ToDateTime(data.InactiveDt);

                var dept = employeeBL.GetDeptByEmpDeptId(data.Id ?? 0);
                if(dept == null)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, Messages.ErrorDeleted);
                }

                if(data.UpdatedDt != dept.UpdatedDt)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, Messages.ErrorExclusive);
                }

                if (data.MainFlag && employeeBL.CheckMainDept(data.Id ?? 0, data.EmployeeNo, startDt, inactiveDt))
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, MessagesM009.UniqueMainDept);
                }

                employeeBL.UpdateEmpDept(data.Id ?? 0, startDt, inactiveDt, data.MainFlag, Helper.EmployeeNo());
                return request.CreateResponse(HttpStatusCode.OK, Messages.DataUpdated);
            });
        }

        [HttpDelete]
        [Route("dept/{Id}/{UpdatedDt}")]
        public HttpResponseMessage Delete(HttpRequestMessage request, int Id, string UpdatedDt)
        {
            return CreateHttpResponse(request, () =>
            {
                
                var employeeBL = new EmployeeBL();
                
                var dept = employeeBL.GetDeptByEmpDeptId(Id);
                if (dept == null)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, Messages.ErrorDeleted);
                }

                if (UpdatedDt != dept.UpdatedDt)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, Messages.ErrorExclusive);
                }

                employeeBL.DeleteEmpDept(Id, Helper.EmployeeNo());
                return request.CreateResponse(HttpStatusCode.OK, Messages.DataDeleted);
            });
        }

        /// <summary>
        /// Update prosess
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="data">The data.</param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage Post(HttpRequestMessage request,  EmployeeRequest data)
        {
            return CreateHttpResponse(request, () =>
            {
                if (!ModelState.IsValid)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest,
                         ModelState.Keys.SelectMany(k => ModelState[k].Errors)
                            .Select(e => e.ErrorMessage).ToArray());
                }
                var employeeBL = new EmployeeBL();
                var emp = employeeBL.GetById(data.Id ?? 0);

                // check data master
                if(emp == null)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, Messages.ErrorDeleted);
                }
                if(emp.UpdatedDt != data.UpdatedDt)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, Messages.ErrorExclusive);
                }

                return request.CreateResponse(HttpStatusCode.OK, Messages.DataUpdated);
            });
        }

        /// <summary>
        /// Insert data
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="data">The data.</param>
        /// <returns></returns>
        [HttpPut]
        public HttpResponseMessage Put(HttpRequestMessage request, EmployeeRequest data)
        {
            return CreateHttpResponse(request, () =>
            {
                if (!ModelState.IsValid)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest,
                         ModelState.Keys.SelectMany(k => ModelState[k].Errors)
                            .Select(e => e.ErrorMessage).ToArray());
                }
                var employeeBL = new EmployeeBL();
                if (employeeBL.GetByEmployeeNo(data.EmployeeNo) != null)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, MessagesM009.ErrorUniqueEmployeeNo);
                }
                if (employeeBL.GetByEmployeeName(data.EmployeeName) != null)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, MessagesM009.ErrorUniqueEmployeeName);
                }

                var dto = new KYEmployeeDto()
                {
                    CompanyId = data.CompanyId,
                    EmployeeNo = data.EmployeeNo,
                    EmployeeNoPE = data.EmployeeNoPE,
                    EmployeeName = data.EmployeeName,
                    EmployeeNameFull = data.EmployeeNameFull,
                    UserId = data.UserId,
                    Gender = data.Gender,
                    EmployeeType = data.EmployeeType,
                    BirthDt = data.BirthDt,
                    Email = data.Email,
                    Address = data.Address,
                    WorkPlace = data.WorkPlace,
                    Nationality = data.Nationality,
                    Continents = data.Continents,
                    IdentityPassport = data.IdentityPassport,
                    PersonalTaxCode = data.PersonalTaxCode,
                    University = data.University,
                    Qualification = data.Qualification,
                    Level = data.Level,
                    LevelGroup = data.LevelGroup,
                    EntryDt = data.EntryDt,
                    ProbationEndDt = data.ProbationEndDt,
                    LabourUnionDt = data.LabourUnionDt,
                    QuitDt = data.QuitDt,
                    ContractForm = data.ContractForm,
                    ContractType = data.ContractType,
                    PhoneNo = data.PhoneNo,
                    EmergencyPhoneNo = data.EmergencyPhoneNo,
                    StandardHours = data.StandardHours.Value,
                    CertificateList = data.CertificateList,
                    InsuranceUnionMonth = data.InsuranceUnionMonth,
                    InsuaranceCode = data.InsuaranceCode,
                    Hospital = data.Hospital,
                    Insurance = data.Insurance,
                    PIT = data.PIT,
                    AbsenceNotPayBf = data.AbsenceNotPayBf,
                    AbsenceNotPayAt = data.AbsenceNotPayAt,
                    EmpTypeEffectiveDt = data.EmpTypeEffectiveDt,
                    EmailEffectiveDt = data.EmailEffectiveDt,
                    AddressEffectiveDt = data.AddressEffectiveDt,
                    WorkPlaceEffectiveDt = data.WorkPlaceEffectiveDt,
                    LevelEffctiveDt = data.LevelEffctiveDt,
                    LevelGroupEffectiveDt = data.LevelGroupEffectiveDt,
                    ContractFormEffectiveDt = data.ContractFormEffectiveDt,
                    ContractTypeEffectiveDt = data.ContractTypeEffectiveDt,
                    StandardHoursEffeciveDt = data.StandardHoursEffeciveDt,
                    HospitalEffectiveDt = data.HospitalEffectiveDt,
                    InsuranceEffectiveDt = data.InsuranceEffectiveDt,
                    PITEffectiveDt = data.PITEffectiveDt,
                };

                employeeBL.Insert(dto, Helper.EmployeeNo());

                return request.CreateResponse(HttpStatusCode.OK, Messages.DataCreated);
            });
        }

        [HttpPost]
        [MimeMultipart]
        [Route("import")]
        public HttpResponseMessage Post(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                if (!ModelState.IsValid)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest,
                         ModelState.Keys.SelectMany(k => ModelState[k].Errors)
                            .Select(e => e.ErrorMessage).ToArray());
                }
                var employeeBL = new EmployeeBL();

                string root = HttpContext.Current.Server.MapPath("~/App_Data");
                var provider = new MultipartFormDataStreamProvider(root);

                try
                {
                    // Read the form data.
                    Request.Content.ReadAsMultipartAsync(provider);

                    string _localFileName = provider
                        .FileData.Select(multiPartData => multiPartData.LocalFileName).FirstOrDefault();

                    string FileName = Path.GetFileName(_localFileName);

                    long FileLength = new FileInfo(_localFileName).Length;

                    // This illustrates how to get the file names.
                    foreach (MultipartFileData file in provider.FileData)
                    {
                        
                    }
                    return Request.CreateResponse(HttpStatusCode.OK);
                }
                catch (System.Exception e)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
                }

                return request.CreateResponse(HttpStatusCode.OK);
            });
        }

    }
}
