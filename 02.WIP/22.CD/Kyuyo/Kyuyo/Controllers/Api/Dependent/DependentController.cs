using Kyuyo.BL;
using Kyuyo.BL.DTO;
using Kyuyo.BL.Resources;
using Kyuyo.BL.Resources.Dependent;
using Kyuyo.BL.Utils;
using Kyuyo.Infrastructure.Core;
using Kyuyo.Infrastructure.Utils;
using Kyuyo.Infrastructure.Utils.MapTemplate;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Kyuyo.Controllers.Api.Dependent
{
    [Authenticate(Constant.SCREEN_M011)]
    [RoutePrefix("api/Dependent")]
    public class DependentController : ApiControllerBase
    {
        [HttpGet]
        public HttpResponseMessage Get(HttpRequestMessage request, [FromUri] DependentSearchRequest search)
        {
            return CreateHttpResponse(request, () =>
            {
                if (!ModelState.IsValid)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest,
                         ModelState.Keys.SelectMany(k => ModelState[k].Errors)
                            .Select(e => e.ErrorMessage).ToArray());
                }

                var commonBL = new CommonBL();
                var dependentBL = new DependentBL();

                // Check payroll
                var payRollStatus = commonBL.CheckPayrollStatus(search.CompanyCd);
                var lstDependent = dependentBL.SearchDependent(search.CompanyCd, search.DeptCd, search.EmployeeNo, search.EmployeeName);

                if (payRollStatus)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, new { ListDependent = lstDependent, Messages = new string[] { Messages.Payroll } });
                }
                else
                {
                    return request.CreateResponse(HttpStatusCode.OK, lstDependent);
                }

            });
        }

        [HttpPost]
        public HttpResponseMessage Post(HttpRequestMessage request, DependentRequest data)
        {
            return CreateHttpResponse(request, () =>
            {
                if (!ModelState.IsValid)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest,
                         ModelState.Keys.SelectMany(k => ModelState[k].Errors)
                            .Select(e => e.ErrorMessage).ToArray());
                }

                var dependentBL = new DependentBL();

                // check exist
                if (dependentBL.CheckExist(data.Id, data.DependentTaxCode, data.IdPassport, data.Number, data.NumberBook, data.IdPassportFlag))
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, new string[] { MessagesM011.ErrorExist });
                }

                var dto = dependentBL.GetById(data.Id ?? 0);

                if (dto == null)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, new string[] { Messages.ErrorDeleted });
                }
                else if (dto.UpdatedDt != data.UpdatedDt)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, new string[] { Messages.ErrorExclusive });
                }

                dependentBL.Update(data.Id ?? 0, data.EmployeeNo, data.Dependent, DateTimeFormat.ToDateTime(data.BirthDt),
                                    data.DependentTaxCode, data.IdPassport, data.Number, data.NumberBook, "",
                                    data.Relationship, data.Nationality, data.FromMonth, data.ToMonth, Helper.EmployeeNo());

                return request.CreateResponse(HttpStatusCode.OK, new string[] { Messages.DataUpdated });

            });
        }


        [HttpPut]
        public HttpResponseMessage Put(HttpRequestMessage request, DependentRequest data)
        {
            return CreateHttpResponse(request, () =>
            {
                if (!ModelState.IsValid)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest,
                         ModelState.Keys.SelectMany(k => ModelState[k].Errors)
                            .Select(e => e.ErrorMessage).ToArray());
                }

                var dependentBL = new DependentBL();

                // check exist
                if (dependentBL.CheckExist(null, data.DependentTaxCode, data.IdPassport, data.Number, data.NumberBook, data.IdPassportFlag))
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, new string[] { MessagesM011.ErrorExist });
                }

                dependentBL.Insert(data.EmployeeNo, data.Dependent, DateTimeFormat.ToDateTime(data.BirthDt),
                                    data.DependentTaxCode, data.IdPassport, data.Number, data.NumberBook, data.regCountry,
                                    data.regCity,data.regDistrict,data.regWard,
                                    data.Relationship, data.Nationality, data.FromMonth, data.ToMonth, Helper.EmployeeNo());

                return request.CreateResponse(HttpStatusCode.OK, new string[] { Messages.DataCreated });

            });
        }

        [HttpDelete]
        public HttpResponseMessage Delete(HttpRequestMessage request, [FromUri] DependentRequest data, [FromUri] int? id, [FromUri] string updatedDt = null)
        {
            var dependentBL = new DependentBL();

            var dto = dependentBL.GetById(id.Value);

            if (dto == null)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new string[] { Messages.ErrorDeleted });
            }
            else if (dto.UpdatedDt != updatedDt)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new string[] { Messages.ErrorExclusive });
            }
           
            bool isRegHistory = false;
            if (new CommonBL().IsClosing(id.Value, DateTimeFormat.converVnDateToSysDate(dto.FromMonth)))
            {
                isRegHistory = true;
            } else if(new CommonBL().IsClosing(id.Value, DateTimeFormat.converVnDateToSysDate(dto.ToMonth)))
            {
                isRegHistory = true;
            }

            if(isRegHistory)
            {
                dto.updateBy = Helper.EmployeeNo();
                dto.MainId = dto.Id;
                dto.HisNo = new DependentBL().GetMaxHistoryNoById(dto.Id) + 1;
                new DependentBL().Insert(dto);
            }

            dependentBL.Delete(id.Value, Helper.EmployeeNo());

            return request.CreateResponse(HttpStatusCode.OK, new string[] { Messages.DataDeleted });
        }



        [Route("import/{CompanyCd}")]
        public async Task<HttpResponseMessage> Post([FromUri] DependentRequest data)
        {
            string root = InitCommon.GetRootPath();
            var provider = new FileUpload(root);
            await Request.Content.ReadAsMultipartAsync(provider);
            
            string strFile = provider.FileData[0].LocalFileName;
            string extension = Path.GetExtension(strFile);
            if(string.IsNullOrEmpty(extension) || (!".xls".Equals(extension) && !".xlsx".Equals(extension))) {
                 
                return Request.CreateResponse(HttpStatusCode.BadRequest, MessagesM011.ErrorFileFormatNotCorrect);
            }

            DataSet dataSet = InitCommon.ReadExcel(strFile);
            DataTable table = dataSet.Tables[0];
            // create LogFile
            var log = new Logger(Constant.SCREEN_M011);

            // Check col number
            if (!Constant.IMPORT_DEPENDENT_COL_NUM.Equals(table.Columns.Count))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, MessagesM011.ErrorColNumNotCorrect);
                
            }

            List<DependentDto> dependentDtos = new List<DependentDto>();
        
            for(int i = 8; i < table.Rows.Count; i ++)
            {
                DataRow row = table.Rows[i];
                DependentDto dto = new DependentDto();
                string id = row[DependentTemplate.NO_INDEX].ToString();
                
                if(!string.IsNullOrEmpty(id))
                {
                    // EMPLOYEENAME
                    dto.EmployeeName = row[DependentTemplate.EMPLOYEE_NAME_INDEX].ToString();
                    // PERSONAL_TAX_CODE
                    dto.PersonalTaxCode = row[DependentTemplate.PERSONAL_TAX_CODE_INDEX].ToString();
                    // DEPENDENT
                    dto.Dependent = row[DependentTemplate.DEPENDENT_INDEX].ToString();
                    // BIRTH_DT
                    dto.BirthDt = row[DependentTemplate.BIRTH_DT_INDEX].ToString();
                    // DEPENDENT_TAX_CODE
                    dto.DependentTaxCode = row[DependentTemplate.DEPENDENT_TAX_CODE_INDEX].ToString();
                    // NATIONALITY
                    dto.Nationality = row[DependentTemplate.NATIONALITY_INDEX].ToString();
                    // IDENTITY_PASSPORT
                    dto.IdPassport = row[DependentTemplate.IDENTITY_PASSPORT_INDEX].ToString();
                    // RELATIONSHIP
                    dto.Relationship = row[DependentTemplate.RELATIONSHIP_INDEX].ToString();
                    // NUMBER
                    dto.Number = row[DependentTemplate.NUMBER_INDEX].ToString();
                    // NUMBER_BOOK
                    dto.NumberBook = row[DependentTemplate.NUMBER_BOOK_INDEX].ToString();
                    // REG_COUNTRY
                    dto.regCountry = row[DependentTemplate.REG_COUNTRY_INDEX].ToString();
                    // REG_CITY
                    dto.regCity = row[DependentTemplate.REG_CITY_INDEX].ToString();
                    // REG_DISTRICT
                    dto.regDistrict = row[DependentTemplate.REG_DISTRICT_INDEX].ToString();
                    // REG_WARD
                    dto.regWard = row[DependentTemplate.REG_WARD_INDEX].ToString();
                    // FROM_MONTH
                    dto.FromMonth = row[DependentTemplate.FROM_MONTH_INDEX].ToString();
                    // TO_MONTH
                    dto.ToMonth = row[DependentTemplate.TO_MONTH_INDEX].ToString();
                    // UPDATE BY
                    dto.updateBy = Helper.EmployeeNo();

                    dto.CompanyCd = data.CompanyCd;

                    dependentDtos.Add(dto);
                }
               
            }

            // Check row number
            if (dependentDtos.Count == 0)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, MessagesM011.ErrorFileIsEmpty);
                
            }

            // Valid data
            
            int coutInsertedRow = 0;

            for (int i = 0; i < dependentDtos.Count; i++)
            {
                List<string> messages = new List<string>();
                DependentDto dto = dependentDtos[i];

                var check = new ImportDependentValidator(i).Validate(dto);

                foreach (var error in check.Errors)
                {
                    messages.Add(error.ErrorMessage);
                }

                // Check Exist Data On DB
                if (new DependentBL().CheckExist(dto.DependentTaxCode,dto.IdPassport,dto.Number,dto.NumberBook))
                {
                    messages.Add(string.Format(MessagesM011.ErrorDataExistOnDB, i));
                }

                log.Write(messages);

                if (messages.Count == 0)
                {
                    coutInsertedRow++;
                    new DependentBL().Insert(dto);
                }
            }
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                Message = string.Format(MessagesM011.ResultImport, coutInsertedRow, dependentDtos.Count),
                LogFile = log.Close()
            });

        }
    }


}
