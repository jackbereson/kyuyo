var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var popupType = 0;
$(function () {
    var d = new Date();
    startMonth = d.getMonth();
    startYear = d.getFullYear();
    endMonth = startMonth + 1;
    endYear = startYear + 1;
    fiscalMonth = startMonth;
    if (startMonth < 10)
        startDate = parseInt("" + startYear + '0' + startMonth + "");
    else
        startDate = parseInt("" + startYear + startMonth + "");
    if (endMonth < 10)
        endDate = parseInt("" + endYear + '0' + endMonth + "");
    else
        endDate = parseInt("" + endYear + endMonth + "");

    // Month range layout
    content = '<div class="row mpr-calendarholder">';
    calendarCount = endYear - startYear;
    if (calendarCount == 0)
        calendarCount++;
    for (y = 0; y < 2; y++) {
        content += '<div class="col-xs-6" ><div class="mpr-calendar row" id="mpr-calendar-' + (y + 1) + '">'
        + '<h5 class="col-xs-12"><i class="mpr-yeardown fa fa-chevron-circle-left"></i><span>' + (startYear + y).toString() + '</span><i class="mpr-yearup fa fa-chevron-circle-right"></i></h5><div class="mpr-monthsContainer"><div class="mpr-MonthsWrapper">';
        for (m = 0; m < 12; m++) {
            var monthval;
            if ((m + 1) < 10)
                monthval = "0" + (m + 1);
            else
                monthval = "" + (m + 1);
            content += '<span data-month="' + monthval + '" class="col-xs-3 mpr-month">' + MONTHS[m] + '</span>';
        }
        content += '</div></div></div></div>';
    }
    content += '</div>';
    $('#actStaPeriod').text('');
    $('#actEndPeriod').text('');

    //Single month layout
    $('.single-month .mrp-monthdisplay .mrp-lowerMonth').html('');

    contentSingle = '<div class="row mpr-calendarholder">';
    contentSingle += '<div class="col-xs-12" ><div class="mpr-calendar row" id="mpr-calendar-' + 1 + '">'
    + '<h5 class="col-xs-12"><i class="mpr-yeardown fa fa-chevron-circle-left"></i><span>' + (startYear).toString() + '</span><i class="mpr-yearup fa fa-chevron-circle-right"></i></h5><div class="mpr-monthsContainer"><div class="mpr-MonthsWrapper">';
    for (m = 0; m < 12; m++) {
        var monthval;
        if ((m + 1) < 10)
            monthval = "0" + (m + 1);
        else
            monthval = "" + (m + 1);
        if (m == startMonth) {
            contentSingle += '<span data-month="' + monthval + '" class="col-xs-3 mpr-month mpr-selected">' + MONTHS[m] + '</span>';
        } else {
            contentSingle += '<span data-month="' + monthval + '" class="col-xs-3 mpr-month">' + MONTHS[m] + '</span>';
        }
    }
    contentSingle += '</div></div></div></div>';
    contentSingle += '</div>';

    function getContentSingle(selectYear, selectMonth) {
        contentSingle = '<div class="row mpr-calendarholder">';
        contentSingle += '<div class="col-xs-12" ><div class="mpr-calendar row" id="mpr-calendar-' + 1 + '">'
        + '<h5 class="col-xs-12"><i class="mpr-yeardown fa fa-chevron-circle-left"></i><span>' + (selectYear).toString() + '</span><i class="mpr-yearup fa fa-chevron-circle-right"></i></h5><div class="mpr-monthsContainer"><div class="mpr-MonthsWrapper">';
        for (m = 0; m < 12; m++) {
            var monthval;
            if ((m + 1) < 10)
                monthval = "0" + (m + 1);
            else
                monthval = "" + (m + 1);
            if (m == selectMonth) {
                contentSingle += '<span data-month="' + monthval + '" class="col-xs-3 mpr-month mpr-selected">' + MONTHS[m] + '</span>';
            } else {
                contentSingle += '<span data-month="' + monthval + '" class="col-xs-3 mpr-month">' + MONTHS[m] + '</span>';
            }
        }
        contentSingle += '</div></div></div></div>';
        contentSingle += '</div>';
        return contentSingle;
    }

    $(document).on('click', '.mpr-month', function (e) {
        e.stopPropagation();
        // var popupDefined = $(this).parents().eq(6);
        $month = $(this);
        var monthnum = $month.data('month');
        var year = $month.parents('.mpr-calendar').children('h5').children('span').html();
        if ($month.parents('#mpr-calendar-1').size() > 0) {
            //Start Date
            startDate = parseInt("" + year + monthnum);
            if (startDate > endDate) {
                if (year != parseInt(endDate / 100))
                    $('.mpr-calendar:last h5 span').html(year);
                endDate = startDate;
            }
        } else {
            //End Date
            endDate = parseInt("" + year + monthnum);
            if (startDate > endDate) {
                if (year != parseInt(startDate / 100))
                    $('.mpr-calendar:first h5 span').html(year);
                startDate = endDate;
            }
        }
        paintMonths();
    });

    $(document).on('click', '.mpr-yearup', function (e) {
        $(this).prevAll(".mpr-yeardown:first").show();
        e.stopPropagation();
        var year = parseInt($(this).prev().html());
        year++;
        $(this).prev().html("" + year);
        $(this).parents('.mpr-calendar').find('.mpr-MonthsWrapper').fadeOut(175, function () {
            paintMonths();
            $(this).parents('.mpr-calendar').find('.mpr-MonthsWrapper').fadeIn(175);
        });
        if ($('#page-category-item-plan').length > 0) {
        if (year-startYear > 0) {
            $(this).hide();
        } else {
            $(this).show();
        }
        }

    });

    $(document).on('click', '.mpr-yeardown', function (e) {
        $(this).nextAll(".mpr-yearup:first").show();
        e.stopPropagation();
        var year = parseInt($(this).next().html());
        year--;
        $(this).next().html("" + year);
        //paintMonths();
        $(this).parents('.mpr-calendar').find('.mpr-MonthsWrapper').fadeOut(175, function () {
            paintMonths();
            $(this).parents('.mpr-calendar').find('.mpr-MonthsWrapper').fadeIn(175);
        });
        if ($('#page-category-item-plan').length > 0) {
        if (startYear-year > 1) {
            $(this).hide();
        } else {
            $(this).show();
        }
        }

    });

    $(document).on('click', '#edit-item.modal a.close', function (e) {
        if ($('.popover').length > 0) {
            $('.popover').remove();
        }
    });


    $("#edit-item .modal-body").scroll(function () {
        scroll = $("#edit-item .modal-body").scrollTop();
        if (scroll >= 130) {
            $('.popover').remove();
           
        }
    });

    initPopoverMulti();
    //////////popover for month range
    function initPopoverMulti() {
        $('.mrp-container.multi-month').popover({
            container: "#page-item-creation .primary-form",
            placement: "bottom",
            html: true,
            content: content
        }).on('show.bs.popover', function () {
            $('.popover').remove();
            $(this).data("bs.popover").tip().css("max-width", "1000px");
            popupType = 2;
            var waiter = setInterval(function () {
                if ($('.popover').size() > 0) {
                    clearInterval(waiter);
                    setViewToCurrentYears();
                    paintMonths();
                }
            }, 50);
        }).on('shown.bs.popover', function () {
            $('.popover').addClass('popover-multi');
            popupType = 2;
            mprVisible = true;
        }).on('hidden.bs.popover', function () {
            $('.popover').removeClass('popover-multi');
            mprVisible = false;
            popupType = 0;
            var $inputDate = $(".mrp-container.multi-month").find('input');
            $inputDate.val($(".mrp-container.multi-month").text().trim());
            angular.element($inputDate).triggerHandler('input');
        });
    }

    initPopoverSingle();
    //////////Popover for single month
    function initPopoverSingle() {
        $('.mrp-container.single-month').popover({
            container: "#main-content-zone .table",
            placement: "bottom",
            html: true,
            content: contentSingle
        }).on("show.bs.popover", function (e) {
            // hide all other popovers
            $(this).not(e.target).popover("destroy");
            $(".popover").remove();
        }).on('shown.bs.popover', function (e) {
            $('.popover').addClass('popover-single');
            popupType = 1;
            mprVisible = true;
            var currentDate = $(e.target).text().trim();
            if (currentDate) {
                var selectYear = currentDate.substr(4, 7);
                var selectMonth = currentDate.substr(0, 3);
                $('.popover-content').html(getContentSingle(selectYear, MONTHS.indexOf(selectMonth)));
                if ($('#page-category-item-plan').length > 0) {
                if (selectYear < startYear && startYear - selectYear > 1) {
                    $(".mpr-yeardown").hide();
                    $(".mpr-yearup").show();
                }
                if (selectYear > startYear && selectYear - startYear > 0) {
                    $(".mpr-yeardown").show();
                    $(".mpr-yearup").hide();
                }
                }

            }
        }).on('hidden.bs.popover', function () {
            //mprVisible = false;
            $('.popover').removeClass('popover-single');
            popupType = 1;
            var $inputDate = $(".mrp-container.single-month").find('input');
            $inputDate.val($(".mrp-container.single-month").text().trim());
            angular.element($inputDate).triggerHandler('input');
        });
    }
    var mprVisible = false;
    var activeFlag = $('#page-item-creation .item-creation-status select').val();
    activeFlag = "number:1";

    $(document).on("change", "#page-item-creation .item-creation-status select", function () {
        var selectedCalendar = $('#page-item-creation .mrp-container.multi-month');
        if ($(this).val() == "number:1") {
            if ($('#page-item-creation .mrp-container.multi-month.month-range-disabled').length > 0) {
                $('.mrp-container.multi-month').removeClass('month-range-disabled');
                initPopoverMulti();
            }
        }
        if ($(this).val() == "number:0") {
            if ($('#page-item-creation .mrp-container.multi-month.month-range-disabled').length == 0) {
                $('.popover').remove();
                $('.mrp-container.multi-month').addClass('month-range-disabled');
                $('.mrp-container.multi-month').popover('destroy');
            }
        }
    });

    $(document).on("click", ".popover-single .mpr-month, #page-item-creation #btnReset", function (e) {
        $(this).parents().eq(6).popover('hide');
        var selectedCalendar = $('#page-item-creation .mrp-container.multi-month');
        if ($('#page-item-creation .mrp-container.multi-month.month-range-disabled').length > 0) {
            $('.mrp-container.multi-month').removeClass('month-range-disabled');
        } 
        initPopoverMulti();
    });

    $(document).on("change", "#page-item-creation #dropDivision-select-id", function () {
        var selectedCalendar = $('#page-item-creation .mrp-container.multi-month');
        if ($('#page-item-creation .mrp-container.multi-month.month-range-disabled').length > 0) {
            $('.mrp-container.multi-month').removeClass('month-range-disabled');
        }
        initPopoverMulti();
    });
    $(document).on("change", ".modal#edit-item .item-edit-status select", function () {
        var selectedCalendar = $('#edit-item .mrp-container.single-month');
        if ($(this).val() == "number:1") {
            if ($('#edit-item .mrp-container.single-month.month-range-disabled').length > 0) {
                $('.modal#edit-item .mrp-container.single-month').removeClass('month-range-disabled');
                initPopoverSingle();
            }
        }
        if ($(this).val() == "number:0") {
            if ($('#edit-item .mrp-container.single-month.month-range-disabled').length == 0) {
                $('.popover').remove();
                $('.modal#edit-item .mrp-container.single-month').addClass('month-range-disabled');
                $('.modal#edit-item .mrp-container.single-month').popover('destroy');
            }
        }
    });
    $(document).on("click", ".mrp-container", function (e) {
        $('.mrp-container').removeClass('month-range-selected');
        $(this).addClass('month-range-selected');
        if (mprVisible) {
            e.preventDefault();
            e.stopPropagation();
        }
    });

    $(document).on("click", "body", function (e) {
        if (mprVisible) {
            $('.popover').remove();
            mprVisible = false;
        }
    });
});

function setViewToCurrentYears() {
    var startyear = parseInt(startDate / 100);
    var endyear = parseInt(endDate / 100);
    $('.mpr-calendar h5 span').eq(0).html(startyear);
    $('.mpr-calendar h5 span').eq(1).html(endyear);
}


function paintMonths() {
    $('.popover-multi .mpr-calendar').each(function () {
        var $cal = $(this);
        var year = $('h5 span', $cal).html();
        $('.mpr-month', $cal).each(function (i) {
            if ((i + 1) > 9)
                cDate = parseInt("" + year + (i + 1));
            else
                cDate = parseInt("" + year + '0' + (i + 1));
            if (cDate >= startDate && cDate <= endDate) {
                $(this).addClass('mpr-selected');
            } else {
                $(this).removeClass('mpr-selected');
            }
        });
    });

    $('.mpr-calendar .mpr-month').css("background", "");
    //Write Text
    var startyear = parseInt(startDate / 100);
    var startmonth = parseInt(safeRound((startDate / 100 - startyear)) * 100);
    var endyear = parseInt(endDate / 100);
    var endmonth = parseInt(safeRound((endDate / 100 - endyear)) * 100);
    $('.month-range-selected .mrp-monthdisplay .mrp-lowerMonth').html(MONTHS[startmonth - 1] + " " + startyear);
    $('.month-range-selected .mrp-monthdisplay .mrp-upperMonth').html(MONTHS[endmonth - 1] + " " + endyear);
    $('.month-range-selected .mpr-lowerDate').val(startDate);
    $('.month-range-selected .mpr-upperDate').val(endDate);
    if (startyear == parseInt($('.mpr-calendar:first h5 span').html()))
        $('.mpr-calendar:first .mpr-selected:first').css("background", "#5270ad");
    if (endyear == parseInt($('.mpr-calendar:last h5 span').html()))
        $('.mpr-calendar:last .mpr-selected:last').css("background", "#5270ad");
    if (!$.isEmptyObject($('.month-range-selected .mrp-monthdisplay .mrp-lowerMonth'))) {
        var $inputDate = $('.month-range-selected .mrp-monthdisplay .mrp-lowerMonth').parent().parent().parent().find('input');
        angular.element($inputDate).triggerHandler('input');
    }
    if (!$.isEmptyObject($('.month-range-selected .mrp-monthdisplay .mrp-upperMonth'))) {
        var $inputDate = $('.month-range-selected .mrp-monthdisplay .mrp-upperMonth').parent().parent().parent().find('input');
        angular.element($inputDate).triggerHandler('input');
    }

}

function safeRound(val) {
    return Math.round(((val) + 0.00001) * 100) / 100;
}

$(document).on('click', '.mpr-month', function () {
    var $inputDate = $(".mrp-container.multi-month").find('input');
    $inputDate.val($(".mrp-container.multi-month").text().trim());
    angular.element($inputDate).triggerHandler('input');

    if ($(this).siblings().hasClass('mpr-selected')) {
        $(this).siblings().removeClass('mpr-selected');
    }
    $(this).addClass('mpr-selected');
    var singleMonthValue = $(this).text();
    $('.single-month.month-range-selected').find('.mrp-lowerMonth').text(singleMonthValue);
});