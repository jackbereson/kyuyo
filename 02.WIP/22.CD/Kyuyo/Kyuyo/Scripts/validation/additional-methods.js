/*!
 * jQuery Validation Plugin v1.15.1
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2016 Jörn Zaefferer
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery", "./jquery.validate"], factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory(require("jquery"));
    } else {
        factory(jQuery);
    }
}(function ($) {

    // Accept a value from a file input based on a required mimetype
    $.validator.addMethod("accept", function (value, element, param) {

        // Split mime on commas in case we have multiple types we can accept
        var typeParam = typeof param === "string" ? param.replace(/\s/g, "") : "image/*",
            optionalValue = this.optional(element),
            i, file, regex;

        // Element is optional
        if (optionalValue) {
            return optionalValue;
        }

        if ($(element).attr("type") === "file") {

            // Escape string to be used in the regex
            // see: http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
            // Escape also "/*" as "/.*" as a wildcard
            typeParam = typeParam
                    .replace(/[\-\[\]\/\{\}\(\)\+\?\.\\\^\$\|]/g, "\\$&")
                    .replace(/,/g, "|")
                    .replace(/\/\*/g, "/.*");

            // Check if the element has a FileList before checking each file
            if (element.files && element.files.length) {
                regex = new RegExp(".?(" + typeParam + ")$", "i");
                for (i = 0; i < element.files.length; i++) {
                    file = element.files[i];

                    // Grab the mimetype from the loaded file, verify it matches
                    if (!file.type.match(regex)) {
                        return false;
                    }
                }
            }
        }

        // Either return true because we've validated each file, or because the
        // browser does not support element.files and the FileList feature
        return true;
    }, $.validator.format("Please enter a value with a valid mimetype."));

    $.validator.addMethod("alphanumeric", function (value, element) {
        return this.optional(element) || /^\w+$/i.test(value);
    }, "Letters, numbers, and underscores only please");

    $.validator.addMethod("date", function (value, element, param) {
        var dt = moment(value, param, true);
        return this.optional(element) || dt.isValid();
    }, $.validator.messages.date);

    $.validator.addMethod("dateFA", function (value, element) {
        return this.optional(element) || /^[1-4]\d{3}\/((0?[1-6]\/((3[0-1])|([1-2][0-9])|(0?[1-9])))|((1[0-2]|(0?[7-9]))\/(30|([1-2][0-9])|(0?[1-9]))))$/.test(value);
    }, $.validator.messages.date);

    /**
     * Return true, if the value is a valid date, also making this formal check dd/mm/yyyy.
     *
     * @example $.validator.methods.date("01/01/1900")
     * @result true
     *
     * @example $.validator.methods.date("01/13/1990")
     * @result false
     *
     * @example $.validator.methods.date("01.01.1900")
     * @result false
     *
     * @example <input name="pippo" class="{dateITA:true}" />
     * @desc Declares an optional input element whose value must be a valid date.
     *
     * @name $.validator.methods.dateITA
     * @type Boolean
     * @cat Plugins/Validate/Methods
     */
    //$.validator.addMethod("date", function (value, element) {
    //    console.log(value)
    //    var check = false,
    //        re = /^\d{1,2}\/\d{1,2}\/\d{4}$/,
    //        adata, gg, mm, aaaa, xdata;
    //    if (re.test(value)) {
    //        adata = value.split("/");
    //        gg = parseInt(adata[0], 10);
    //        mm = parseInt(adata[1], 10);
    //        aaaa = parseInt(adata[2], 10);
    //        xdata = new Date(Date.UTC(aaaa, mm - 1, gg, 12, 0, 0, 0));
    //        if ((xdata.getUTCFullYear() === aaaa) && (xdata.getUTCMonth() === mm - 1) && (xdata.getUTCDate() === gg)) {
    //            check = true;
    //        } else {
    //            check = false;
    //        }
    //    } else {
    //        check = false;
    //    }
    //    return this.optional(element) || check;
    //}, $.validator.messages.date);

    // Older "accept" file extension method. Old docs: http://docs.jquery.com/Plugins/Validation/Methods/accept
    $.validator.addMethod("extension", function (value, element, param) {
        param = typeof param === "string" ? param.replace(/,/g, "|") : "png|jpe?g|gif";
        return this.optional(element) || value.match(new RegExp("\\.(" + param + ")$", "i"));
    }, $.validator.format("Please enter a value with a valid extension."));

    $.validator.addMethod("integerRange", function (value, element, param) {
        return this.optional(element) || /^-?\d+$/.test(value) && parseInt(value) >= param[0] && parseInt(value) <= param[1];
    }, $.validator.format("Must be between {0} and {1}"));

    $.validator.addMethod("pointlength", function (value, element, param) {
        var point = value.indexOf("."),
                after, before;
        if (point >= 0) {
            after = value.substring((point + 1));
            before = value.substring(0, point);
        } else {
            before = value;
            after = "";
        }
        return this.optional(element) || $.isNumeric(value) && before.length <= param[0] && after.length <= param[1];
    }, "The number of characters is over.");

    $.validator.addMethod("integer", function (value, element, param) {
        var reg;
        if (param[1] === true) {
            reg = '^-?\d{1,';
        } else {
            reg = '^\\d{1,';
        }
        reg += param[0] + '}$';
        var regex = new RegExp(reg);

        return this.optional(element) || regex.test(value);
    }, "A positive or negative non-decimal number please");

    $.validator.addMethod("lettersonly", function (value, element) {
        return this.optional(element) || /^[a-z]+$/i.test(value);
    }, "Letters only please");

    $.validator.addMethod("letterswithbasicpunc", function (value, element) {
        return this.optional(element) || /^[a-z\-.,()'"\s]+$/i.test(value);
    }, "Letters or punctuation only please");

    $.validator.addMethod("notEqualTo", function (value, element, param) {
        return this.optional(element) || !$.validator.methods.equalTo.call(this, value, element, param);
    }, "Please enter a different value, values must not be the same.");

    $.validator.addMethod("nowhitespace", function (value, element) {
        return this.optional(element) || /^\S+$/i.test(value);
    }, "No white space please");

    /**
    * Return true if the field value matches the given format RegExp
    *
    * @example $.validator.methods.pattern("AR1004",element,/^AR\d{4}$/)
    * @result true
    *
    * @example $.validator.methods.pattern("BR1004",element,/^AR\d{4}$/)
    * @result false
    *
    * @name $.validator.methods.pattern
    * @type Boolean
    * @cat Plugins/Validate/Methods
    */
    $.validator.addMethod("pattern", function (value, element, param) {
        if (this.optional(element)) {
            return true;
        }
        if (typeof param === "string") {
            param = new RegExp("^(?:" + param + ")$");
        }
        return param.test(value);
    }, "Invalid format.");

    // TODO check if value starts with <, otherwise don't try stripping anything
    $.validator.addMethod("strippedminlength", function (value, element, param) {
        return $(value).text().length >= param;
    }, $.validator.format("Please enter at least {0} characters"));

    $.validator.addMethod("time", function (value, element) {
        return this.optional(element) || /^([01]\d|2[0-3]|[0-9])(:[0-5]\d){1,2}$/.test(value);
    }, "Please enter a valid time, between 00:00 and 23:59");

    $.validator.addMethod("time12h", function (value, element) {
        return this.optional(element) || /^((0?[1-9]|1[012])(:[0-5]\d){1,2}(\ ?[AP]M))$/i.test(value);
    }, "Please enter a valid time in 12-hour am/pm format");

    $.validator.addMethod("requiredTo", function (value, element, param) {
        var target = $(param);
        return (this.optional(target[0]) &&  this.optional(element)) || ((value.length == 0) == (target.val().length == 0))
    }, "Invalid input");

    $.validator.addMethod("future", function (value, element, param) {
        var target = $(param[0]);

        var from = moment(target.val(), param[1], true);
        var to = moment(value, param[1], true);

        if (from.isValid() && !to.isValid()) {
            return true;
        }
        if (!from.isValid() && to.isValid()) {
            return false;
        }
        if (!from.isValid() && !to.isValid()) {
            return true;
        }
        var _check = false;
        if (param[2] === 'true') {
            _check = to.diff(from) >= 0;
        } else {
            _check = to.diff(from) > 0;
        }

        console.log(param[2] === 'false')

        return (this.optional(target[0]) && this.optional(element)) || _check;
    }, "Invalid future date");

}));