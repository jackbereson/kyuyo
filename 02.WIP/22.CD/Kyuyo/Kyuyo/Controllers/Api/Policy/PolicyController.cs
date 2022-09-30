using Kyuyo.BL;
using Kyuyo.BL.Resources;
using Kyuyo.BL.Resources.Deparment;
using Kyuyo.BL.Utils;
using Kyuyo.Infrastructure.Core;
using Kyuyo.Infrastructure.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Kyuyo.Controllers.Api.Policy
{
    /// <summary>
    /// Class process API for Policy
    /// </summary>
    [RoutePrefix("api/Policy")]
    public class PolicyController : ApiControllerBase
    {
        // PolicyBL
        private PolicyBL policyBL = new PolicyBL();

        [HttpGet]
        [Authenticate(Constant.SCREEN_M005)]
        public HttpResponseMessage GetPolicy(HttpRequestMessage request, [FromUri] PolicySearchRequest search)
        {
            return CreateHttpResponse(request, () =>
            {
                if (!ModelState.IsValid)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest,
                         ModelState.Keys.SelectMany(k => ModelState[k].Errors)
                            .Select(e => e.ErrorMessage).ToArray());
                }
                var lstPolicies = policyBL.GetPolicy(search.PolicyName, DateTimeFormat.ToDateTime(search.EffectiveDtFrom), DateTimeFormat.ToDateTime(search.EffectiveDtTo));
                var messages = new List<string>();
                if (lstPolicies.Count == 0)
                {
                    messages.Add(Messages.DataNotFound);
                }
                var result = new
                {
                    ListPolicies = lstPolicies,
                    Messages = messages.ToArray(),
                    ShowMessage = messages.Count() > 0
                };

                return request.CreateResponse(HttpStatusCode.OK, result);
            });
        }
    }
}