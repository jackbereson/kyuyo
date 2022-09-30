using FluentValidation;
using FluentValidation.Internal;
using FluentValidation.Validators;
using Kyuyo.Infrastructure.Extensions;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Infrastructure.Utils
{
    public static class ValidatorService
    {
        /// <summary>
        /// Auto genarate validate rule using in client
        /// </summary>
        /// <param name="validator"></param>
        /// <returns></returns>
        public static Dictionary<object, object> GetValidator(IValidator validator)
        {
            Dictionary<object, object> vardr = new Dictionary<object, object>();
            Dictionary<string, Dictionary<string, object>> rules = new Dictionary<string, Dictionary<string, object>>();
            Dictionary<string, Dictionary<string, object>> messages = new Dictionary<string, Dictionary<string, object>>();

            foreach (IValidationRule rule in (validator as IEnumerable))
            {
                var propertyName = (rule as PropertyRule).PropertyName;
                var displayName = (rule as PropertyRule).GetDisplayName();

                Dictionary<string, object> elmRule = new Dictionary<string, object>();
                Dictionary<string, object> elmMessage = new Dictionary<string, object>();

                foreach (var rl in rule.Validators.AsEnumerable())
                {
                    if (rl is NotEmptyValidator)
                    {
                        var r = (NotEmptyValidator)rl;
                        var msg = r.ErrorMessageSource.GetString();
                        elmRule.Add("required", true);
                        elmMessage.Add("required", string.Format(msg, displayName));
                    }
                    else if (rl is MaxLengthValidator)
                    {
                        var r = (MaxLengthValidator)rl;
                        var msg = r.ErrorMessageSource.GetString();
                        if (r.Max != 0)
                        {
                            elmRule.Add("maxlength", r.Max);
                            elmMessage.Add("maxlength", string.Format(msg, displayName, r.Max));
                        }
                    }
                    else if (rl is MinLengthValidator)
                    {
                        var r = (MinLengthValidator)rl;
                        var msg = r.ErrorMessageSource.GetString();
                        if (r.Min != 0)
                        {
                            elmRule.Add("minlength", r.Min);
                            elmMessage.Add("minlength", string.Format(msg, displayName, r.Min));
                        }
                    }
                    else if (rl is LengthValidator)
                    {
                        var r = (LengthValidator)rl;
                        var msg = r.ErrorMessageSource.GetString();
                        elmRule.Add("rangelength", new int[] { r.Min, r.Max });
                        elmMessage.Add("rangelength", string.Format(msg, displayName, r.Min, r.Max));
                    }
                    else if(rl is InclusiveBetweenValidator)
                    {
                        var r = (InclusiveBetweenValidator)rl;
                        var msg = r.ErrorMessageSource.GetString();
                        elmRule.Add("range", new IComparable[] { r.From, r.To });

                        elmMessage.Add("range", string.Format(msg, displayName, r.From, r.To));
                        elmMessage.Add("number", string.Format(msg, displayName, r.From, r.To));
                        elmMessage.Add("min", string.Format(msg, displayName, r.From, r.To));
                        elmMessage.Add("max", string.Format(msg, displayName, r.From, r.To));
                    }
                    else if(rl is DateFormatValidator)
                    {
                        var r = (DateFormatValidator)rl;
                        var msg = r.ErrorMessageSource.GetString();
                        elmRule.Add("date", r.Format);
                        elmMessage.Add("date", string.Format(msg, displayName, r.Format));
                    }

                    else if(rl is IntergerValidator)
                    {
                        var r = (IntergerValidator)rl;
                        var msg = r.ErrorMessageSource.GetString();
                        elmRule.Add("integer", new object[] { r.Length, r.Negative });
                        elmMessage.Add("integer", string.Format(msg, displayName, r.Length));
                    }

                    else if (rl is DecimalValidator)
                    {
                        var r = (DecimalValidator)rl;
                        var msg = r.ErrorMessageSource.GetString();
                        elmRule.Add("pointlength", new int[] { r.Before, r.After });
                        elmMessage.Add("pointlength", string.Format(msg, displayName, r.Before, r.After));
                    }

                    else if(rl is PredicateValidator)
                    {
                        var r = (PredicateValidator)rl;
                        var errCode = r.ErrorCodeSource.GetString();
                        if (!string.IsNullOrEmpty(errCode))
                        {
                            var codes = errCode.Split(':');
                            if(codes.Length >= 2)
                            {
                                if (codes[0].Equals("future"))
                                {
                                    object format = null;
                                    elmRule.TryGetValue("date", out format);

                                    var allow = "true";
                                    if(codes.Length >= 3)
                                    {
                                        allow = codes[2];
                                    }
                                    elmRule.Add(codes[0], new string[] { codes[1], (string)format, allow });
                                }
                                else
                                {
                                    elmRule.Add(codes[0], codes[1]);
                                }
                            }
                            else
                            {
                                elmRule.Add(codes[0], true);
                            }
                            elmMessage.Add(codes[0], r.ErrorMessageSource.GetString());
                        }
                    }

                }

                rules.Add(propertyName, elmRule);
                messages.Add(propertyName, elmMessage);
            }

            vardr.Add("rules", rules);
            vardr.Add("messages", messages);

            return vardr;
        }
    }
}