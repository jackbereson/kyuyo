var MAXDECIMAL = 99.99;
$(document).ready(function () {
    $("#menu-toggle").click(function (e) {
        $("#wrapper").toggleClass("toggled");
    });

    //if ($('.selectpicker').length) {
    //    $('.selectpicker').selectpicker({
    //        style: 'btn-default',
    //        container: 'body'
    //    });
    //}

    if ($('body #authority-page').length > 0) {
        $('body').css('min-width', '600px');
    }

});

function redirecToErrorPage() {
    window.location.href = '@Url.Action("Index", "Error/5")';
}

// Clone Object
function cloneObject(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    var temp = obj.constructor(); // give temp the original obj's constructor
    for (var key in obj) {
        temp[key] = cloneObject(obj[key]);
    }

    return temp;
}

// Convert list object property to list object
function convertObjectPropertyToArray(obj) {
    var arr = [];
    if (obj === null || typeof obj !== 'object') {
        return arr;
    }
    for (var key in obj) {
        arr.push(cloneObject(obj[key]));
    }
    return arr;
}

// count items in a object dictionary
var getLengthObject = function (object) {
    if (Object == null) {
        return 0;
    }
    return Object.keys(object).length;
}

//common function
function isInArray(array, search) {
    return $.inArray(search, array) >= 0;

}

function isArray1InArray2(array1, array2) {
    var ret = true;
    $.each(array1, function (index, value) {
        if (!isInArray(array2, value)) {
            ret = false;
            return;
        }
    });
    return ret;
}

function createArrayFromString(str, separator) {
    str = $.trim(str);
    var array = [];
    if (str == '') {
        return array;
    } else {
        array = str.split(separator);
        return array;
    }
}

function createStringFromArray(array, separator) {
    var strRet = '';
    if (array.length == 0) {
        return strRet;
    }
    $.each(array, function (index, value) {
        if (strRet.length > 0) {
            strRet = strRet + separator;
        }
        strRet += value;
    });
    return strRet;
}