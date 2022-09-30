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
    $.validator.addMethod("date", function (value, element) {
        console.log(value)
        var check = false,
            re = /^\d{4}\/\d{1,2}\/\d{1,2}$/,
            adata, gg, mm, aaaa, xdata;
        if (re.test(value)) {
            adata = value.split("/");
            aaaa = parseInt(adata[0], 10);
            mm = parseInt(adata[1], 10);
            gg = parseInt(adata[2], 10);
            xdata = new Date(Date.UTC(aaaa, mm - 1, gg, 12, 0, 0, 0));
            if ((xdata.getUTCFullYear() === aaaa) && (xdata.getUTCMonth() === mm - 1) && (xdata.getUTCDate() === gg)) {
                check = true;
            } else {
                check = false;
            }
        } else {
            check = false;
        }
        return this.optional(element) || check;
    }, $.validator.messages.date);

}));