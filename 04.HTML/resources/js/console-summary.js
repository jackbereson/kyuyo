$(function () {
    initLayout = function (parentCategoryID) {
        // Find index of special column in header to set in body
        var tdTotal = $('#summary-table-wrapper table thead tr td').length;

        //Add class figure total for body
        var figureArray = [];
        $('#summary-table-wrapper table thead tr td').each(function () {
            if ($(this).hasClass('figure-total')) {
                var figureConverse = -(tdTotal - $(this).index());
                figureArray.push(figureConverse);
            }
        });

        for (i = 0; i < figureArray.length; i++) {
            $('#summary-table-wrapper table tbody tr').each(function () {
                $(this).find('td').eq(figureArray[i]).addClass('figure-total');
            });
        }

        //Add class p-term and year for body
        var pTermIndex = $('#summary-table-wrapper table thead .col-p-term').index();
        var pTermIndexConverse = -(tdTotal - pTermIndex);

        var yearIndex = $('#summary-table-wrapper table thead .figure-year').index();
        var yearIndexConverse = -(tdTotal - yearIndex);

        $('#summary-table-wrapper table tr').each(function () {
            $(this).find('td').eq(pTermIndexConverse).addClass('col-p-term');
            $(this).find('td').eq(yearIndexConverse).addClass('figure-year');
        });

        //Rowspan for company
        $('#summary-table-wrapper').find("tbody[parent-category='" + parentCategoryID + "']").each(function () {
            var totalCompInTbody = $(this).find('td.row-category-company').length;
            var countComp = 0;
            $(this).find('tr').each(function () {
                var hasCompany = $(this).find('td.row-category-company');
                if (hasCompany.length > 0) {
                    countComp++;
                    $(this).find('td').each(function () {
                        if ($(this).hasClass('row-category-company')) {
                            if (countComp == totalCompInTbody) {
                                var rowSpan = $(this).closest('tr').nextAll().length;
                                $(this).attr('rowspan', rowSpan + 1);
                            } else if (countComp < totalCompInTbody) {
                                var nextCompRow = $('td.row-category-company').closest('tr');
                                var rowSpan = $(this).closest('tr').nextUntil(nextCompRow).length;
                                $(this).attr('rowspan', rowSpan + 1);
                            }
                        }
                    });
                }
            });
        });

        //Rowspan for category
        $('table').find("tbody[parent-category='" + parentCategoryID + "']").each(function () {
            var catRowSpan = $(this).find('tr').length;
            $(this).find('tr>td.td-category').attr('rowspan', catRowSpan);
        }).promise().done(function () {
            setTimeout(function () {
                $('#console-loading').hide();
            }, 500);
        });

        var maxLevel = $('#division-level').val();
        if (maxLevel == '1') {
            $('#summary-table-wrapper td.td-category.td-category-2').hide();
            $('#summary-table-wrapper td.td-category.td-category-3').hide();
        } else if (maxLevel == '2') {
            $('#summary-table-wrapper td.td-category.td-category-2').show();
            $('#summary-table-wrapper td.td-category.td-category-3').hide();
        }
    };

    updateBtnState = function () {
        $('#summary-table-wrapper table tbody').each(function () {
            if ($(this).is(':hidden')) {
                $(this).find('.btn-group-cat-toggle a.disabled').removeClass('disabled')
            } else {
                var keyObject = $(this).attr('class');
                var keyObjectBtn = $(this).find('.td-category a.btn-cat-collapse');

                if ($(this).find('.td-category a.btn-cat-collapse')) {
                    var con1 = $(this).next().is(':visible');
                    var categoryID = $(this).attr('category');
                    var parentCategoryID = $(this).attr('parent-category');
                    var countChild = $(this).parent().find("tbody[parent-category='" + categoryID + "']").length;
                    if (con1) {
                        keyObjectBtn.removeClass('disabled');
                        if (parentCategoryID != '-1') {
                            if (countChild == 0) {
                                keyObjectBtn.addClass('disabled');
                                $(this).find('.td-category a.btn-cat-expand').addClass('disabled');
                            }
                        }
                    } else {
                        keyObjectBtn.addClass('disabled');
                        if (countChild == 0) {
                            $(this).find('.td-category a.btn-cat-expand').addClass('disabled');
                        }
                    }
                }
            }
        });
    };

    bindButtonClick = function () {
        $('.btn-cat-expand').click(function () {
            $(this).siblings().andSelf().removeClass('disabled');
            $(this).addClass('disabled');
            var defineCatLevel = $(this).parents().eq(3);
            var flagLoaded = $(defineCatLevel).is('[child-node-loaded]');
            if (!flagLoaded) {
                $('#console-loading').show();
            }

            var conditionForChild = defineCatLevel.next();
            var category = defineCatLevel.attr('category');
            var nodes = $('#summary-table-wrapper table').find("tbody[parent-category='" + category + "']").show();
            updateBtnState();
            if (!flagLoaded) {
                $(defineCatLevel).attr('child-node-loaded', '');
                initLayout($(defineCatLevel).attr('category'));
            }
        });

        $('.btn-cat-collapse').click(function () {
            $(this).siblings().andSelf().removeClass('disabled');
            $(this).addClass('disabled');
            var defineCatLevel = $(this).parents().eq(3);
            defineCatLevel.nextUntil('.' + defineCatLevel.attr('class')).hide();
            updateBtnState();
        });
    };

    $("#division").change(function () {
        $.ajax({
            type: 'GET',
            dataType: 'text',
            contentType: 'application/json',
            data: {
                divisionID: $("#division").val()
            },
            url: '/ConsoleSummary/RenderCategorySelectItem',
            cache: false,
            success: function (result) {
                $("#category-select").html(result);
                $('.selectpicker').selectpicker('refresh');
                categoryChange();
            }, error: function (error) {
                redirecToErrorPage();
            }
        });
    });

    $("#category-select").change(function () {
        categoryChange();
    });

    categoryChange = function () {
        if ($("#category-select").val() == null
            || $("#category-select").val().length == 0) {
            $("#summary-table-wrapper").html(" <div class=\"no-result-found\"><h2>No category found<\/h2><\/div>");
            $('#btn-export-excel').attr('disabled', true);
            return;
        }
        $('#console-loading').show();
        $.ajax({
            type: 'GET',
            dataType: 'text',
            contentType: 'application/json',
            data: {
                divisionID: $("#division").val(),
                categoryID: $("#category-select").val()
            },
            url: '/ConsoleSummary/RenderCategoryConsoleSummary',
            cache: false,
            async: true,
            success: function (result) {
                $("#summary-table-wrapper").html(result);
                $('#summary-table-wrapper table tbody:not(.cat-level-1-wrapper)').hide();
                updateBtnState();
                initLayout(-1);
                bindButtonClick();
                $('#btn-export-excel').attr('disabled', false);
                $('#console-loading').hide();
            }, error: function (error) {
                redirecToErrorPage();
            }
        });
    };

    exportExcel = function () {
        if ($("#category-select").val() == null
            || $("#category-select").val().length == 0) {
            $("#summary-table-wrapper").html(" <div class=\"no-result-found\"><h2>No category found<\/h2><\/div>");
            return;
        }
        $('#console-loading').show();
        $.ajax({
            type: 'POST',
            data: {
                divisionID: $("#division").val(),
                categoryID: $("#category-select").val()
            },
            url: '/ConsoleSummary/ExportExcel',
            cache: false,
            async: true,
            success: function (data) {
                //TODO: download file excel
                if (data) {
                    window.location = "/ConsoleSummary/DownloadExcel?fileName=" + data;
                } else {
                    redirecToErrorPage();
                }
                $('#console-loading').hide();
            }, error: function (error) {
                $('#console-loading').hide();
                redirecToErrorPage();
            }
        });
    };

    categoryChange();

    $("#page-content-wrapper").scroll(function () {
        var sticky = $('#summary-table-wrapper table thead.console-header-original');
        scroll = $("#page-content-wrapper").scrollTop();
        if (scroll >= 130) {
            if ($('#summary-table-wrapper table thead.console-header-fixed').length < 1) {
                sticky.clone().removeClass('console-header-original').addClass('console-header-fixed').prependTo('#summary-table-wrapper table');
            }
            headerResize();
        }
        else {
            $('.console-header-fixed').remove();
        }
    });

    $(window).resize(function () {
        headerResize();
    });

    //on page load
    $(window).resize();

    function headerResize() {
        if ($('.console-header-fixed').length>0) {
            var tableTbodyWidth = $('.console-header-original').width();
            $('.console-header-fixed').width(tableTbodyWidth);
            $('.console-header-original>tr>td').each(function () {
                var consoleTDIndex = $(this).index();
                var consoleTDIndexLength = $(this).css('width');
                $('.console-header-fixed tr td').eq(consoleTDIndex).css('width',consoleTDIndexLength);
            });
        }
    }

    $(document).on('click', '#menu-toggle', function () {
        headerResize();
    });

    var timer;
    if ($('#back-to-top').length) {
        var scrollTrigger = 100, // px
        backToTop = function () {
            var scrollTop = $('#page-content-wrapper').scrollTop();
            if (scrollTop > scrollTrigger) {
                $('#back-to-top').addClass('show');
            } else {
                $('#back-to-top').removeClass('show');
            }
        };
        backToTop();
        $('#page-content-wrapper').scroll(function () {
            backToTop();
            if (timer) clearTimeout(timer);

            timer = setTimeout(function () {
                $('#back-to-top').removeClass('show');
            }, 1500);
        });

        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('#page-content-wrapper').animate({
                scrollTop: 0
            }, 700);
        });
    }
});