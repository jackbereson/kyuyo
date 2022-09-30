using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Kyuyo.Infrastructure.Core
{
    public class RequestBase : IValidatableObject
    {
        protected FluentValidation.IValidator validator;

        #region Validator request
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var result = validator.Validate(this);
            return result.Errors.Select(item => new ValidationResult(item.ErrorMessage, new[] { item.PropertyName }));
        }
        #endregion
    }
}