$(function () {
    //////////////////////// START Function to initialize the whole layout////////////////////////////
    initLayout = function (init) {
        if (!($('#category-item-plan-table thead>tr:last-child').hasClass('thead-key-row'))) {
            $('#category-item-plan-table thead>tr:last-child').addClass('thead-key-row');
        }
        $(".commun-col-1 textarea").autogrow();
        $(".commun-col-2 textarea").autogrow();
        if (init) {
            var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
            var d = new Date();
            var curr_month = d.getMonth();
            var curr_year = d.getFullYear();
            $('#CommunicationMonth').text(m_names[curr_month] + " " + curr_year);
        }
        defineTbodyHeight(defineRowSpan());
        paintTable(defineRowSpan());
        setAllTableHeight();
        autoCalculateWidth();
        showHideCommunication($('.category-plan-communication .selectpicker').val());
    };
    //////////// END "Initialize layout"////////////////////
    initLayout(true);

    ///////////// Depend on Division, number of rows will be re-calculate
    function defineRowSpan() {
        var noOfBody = $('thead tr.item-row-body').length;
        return noOfBody + 1;
    }

    ///////////// Number of rows will be re-calculate, the total height of each item will be re-calculate
    function defineTbodyHeight(value) {
        var eachTdHeight = $('table#category-item-plan-table tbody tr td').height;
        $('tbody tr td').height(eachTdHeight);
        var totalTbodyheight = (value + 1) * 35;
        $('tbody .commun-col>.mess-wrapper').height(totalTbodyheight - 30);
        $(".commun-col-1 textarea").height(totalTbodyheight);
        $(".commun-col-1 textarea").css('max-height', totalTbodyheight);
    }

    $(document).on('change', '.category-plan-communication .selectpicker', function () {
        showHideCommunication($(this).val());
        setAllTableHeight();
        autoCalculateWidth();
    });

    function showHideCommunication(value) {
        if (value == '1') {
            $('#category-item-plan-table td.commun-col').show();
            $('td.communication-zone').show();
        } else {
            $('#category-item-plan-table td.commun-col').hide();
            $('td.communication-zone').hide();
        }
        setAllTableHeight();
        autoCalculateWidth();
    }

    // fixed height table
    $(document).on('click', '#menu-toggle', function () {
        if ($('.category-plan-parent-wrapper').width() < 1150) {
            $('.category-plan-communication .selectpicker').val('0');
            $('.category-plan-communication .selectpicker').selectpicker('refresh');
            showHideCommunication(0);
        } else {
            $('.category-plan-communication .selectpicker').val('1');
            $('.category-plan-communication .selectpicker').selectpicker('refresh');
            showHideCommunication(1);
        }
        smallSizeLayout();        
        setAllTableHeight();
        autoCalculateWidth();
    });

    ///////////// Pain table
    function paintTable(value) {
        //Depending on Pattern. Each division has its own Pattern, the pattern has number of display row.
        $('#category-item-plan-table thead .table-header-match-below-col').next().find('td:eq(0),td:eq(1)').attr('rowspan', value - 1);
        $('#category-item-plan-table tbody .item-row-header').find('td:eq(0),td:eq(1)').attr('rowspan', value + 1);
        $('#category-item-plan-table thead .communication-zone').attr('rowspan', value + 1).attr('colspan', 2);
        var communCol1 = '<td class=\"commun-col commun-col-1\">Allocation</td>';
        var communCol2 = '<td class=\"commun-col commun-col-2\">Communication</td>';

        if (communCol1.length) {
            $('#category-item-plan-table thead>tr>td.commun-col').remove();
            $('#category-item-plan-table thead>tr').eq(value + 1).append(communCol1);
            $('#category-item-plan-table thead>tr').eq(value + 1).append(communCol2);
        }

        $('#category-item-plan-table tbody>tr.item-row-header .commun-col').attr('rowspan', value + 1);

        //Find current month to insert communication column after current month
        var currentMonthIndex = $('thead tr.table-header-match-below-col>td.current-month').index();
        var currentMonthBodyIndex = currentMonthIndex - 2;
        var colSpanTerm1 = 7;
        var colSpanTerm2 = 8;

        //If 1st term expand 7 columns
        if ($('.col-term').hasClass('term-1')) {
            $('.term-1').attr('colspan', colSpanTerm1);
        }

        //If 2nd term expand 8 columns
        if ($('.col-term').hasClass('term-2')) {
            $('.term-2').attr('colspan', colSpanTerm2);
        }

        //Add text Current
        $('.col-term.current-term>span').remove();
        $('.col-term.current-term').append('<span>(CURRENT)</span>');

        //Index of "P-TERM"
        var pTermIndex = $('.table-header-match-below-col .col-p-term').index();
        //Index of "YEAR"
        var yearIndex = $('.table-header-match-below-col .figure-year').index();

        //Insert communication column
        var currentMonth = $('.item-row-header td').eq(currentMonthIndex);
        var currentMonthBody = $('.item-row-body td').eq(currentMonthBodyIndex);
        //Insert for header (with full td not have rowspan)
        var figureArray = [];
        $('tr.table-header-match-below-col td').each(function () {
            if ($(this).hasClass('figure-total')) {
                figureArray.push($(this).index());
            }
        });

        for (i = 0; i < figureArray.length; i++) {
            $('table tr').each(function () {
                if ($(this).hasClass('item-row-body')) {
                    if ($(this).hasClass('thead-key-row')) {
                        $(this).find('td').eq(figureArray[i]).addClass('figure-total');
                    } else {
                        $(this).find('td').eq(figureArray[i] - 2).addClass('figure-total');
                    }
                }
                if ($(this).hasClass('item-row-header')) {
                    $(this).find('td').eq(figureArray[i]).addClass('figure-total');
                }
            });
        }

        // SET FOR HEADER
        $('table tr.item-row-header').each(function () {
            //Add class for "CURRENT MONTH" for table header
            $(this).find('td').eq(currentMonthIndex).addClass('current-month');
        });

        // SET FOR BODY
        $('table tr.item-row-body').each(function () {
            if (!$(this).hasClass('thead-key-row')) {
                //Define column year in table body
                $(this).find('td').eq(yearIndex - 2).addClass('figure-year');

                //Add class for "P-TERM"
                $(this).find('td').eq(pTermIndex - 2).addClass('col-p-term');

                //Add class for "CURRENT MONTH" for table body	
                $(this).find('td').eq(currentMonthBodyIndex).addClass('current-month');

            } else {
                // It is thead-key-row
                $(this).find('td').eq(yearIndex).addClass('figure-year');

                //Add class for "P-TERM"
                $(this).find('td').eq(pTermIndex).addClass('col-p-term');

                //Add class for "CURRENT MONTH" for table body	
                $(this).find('td').eq(currentMonthBodyIndex + 2).addClass('current-month');
            }
        });
    }

    function smallSizeLayout() {
        if ($('#page-category-item-plan').width() < 1050) {
            $('.category-plan-communication .selectpicker').attr('disabled', true);
            $('.category-plan-communication .selectpicker').selectpicker('refresh');
        } else {
            $('.category-plan-communication .selectpicker').attr('disabled', false);
            $('.category-plan-communication .selectpicker').selectpicker('refresh');
        }
    }

    //set height for customer table to scroll
    $(window).resize(function () {
        if ($('#page-category-item-plan').width() < 1050) {
            // When small screen, communication column disappear		
            $('.category-plan-communication .selectpicker').attr('disabled', true);
            $('.category-plan-communication .selectpicker').val(0);
            $('.category-plan-communication .selectpicker').selectpicker('refresh');
            showHideCommunication(0);
        }
        setAllTableHeight();
        autoCalculateWidth();
        smallSizeLayout();
    });

    $("table#category-item-plan-table tbody .form-control").on("change paste keyup", function () {
        setAllTableHeight();
        autoCalculateWidth();
    });

    $("table#category-item-plan-table thead tr.thead-key-row>td:first .form-control").on("change paste keyup", function () {
        setAllTableHeight();
        autoCalculateWidth();
    });

    //on page load 
    $(window).resize();

    function setAllTableHeight() {
        //Calculate height of thead
        var h_table_header = $('table#category-item-plan-table>thead').outerHeight();
        //Set height for table customer
        var h_page_header = $('.page-header').height();
        var h_search = $('.advance-form').height();
        var h_table_navigation = $('.table-term-navigation').height();
        var the_whole_screen = $('#page-content-wrapper').height();
        var h_table_plan = the_whole_screen - h_page_header - h_search - h_table_navigation - h_table_header - 11;
        $("#category-plan-wrapper").css('padding-top', h_table_header);
        $('#category-plan-wrapper').height(h_table_plan);
    }

    function autoCalculateWidth() {
        // Find the row has maximum td: The last 2nd child of header
        var header_key_td = $('thead tr.thead-key-row>td');
        var number_of_header_td = header_key_td.length;
        var width_tbody_header;
        var width_theader_header;
        // Run loop to equalize the td of thead and tbody. Td of tbody is the primary, tf of header will follow tbody td
        if ($('table#category-item-plan-table tbody').length < 1) {            
            $('table#category-item-plan-table thead>tr:first>td.col-term').css('width', '28%');
            $('table#category-item-plan-table thead>tr:first>td.communication-zone').css('width', '20%');
            $('table#category-item-plan-table thead>tr:first>td').eq(0).css('width', '8%');
            $('table#category-item-plan-table thead>tr:first>td').eq(1).css('width', '4%');
            $('table#category-item-plan-table thead>tr:first>td').eq(2).css('width', '8%');
            $('table#category-item-plan-table thead>tr:first>td').eq(3).css('width', '4%');
        } else {
            $('table#category-item-plan-table thead>tr:first>td.col-term').css('width', '');
            $('table#category-item-plan-table thead>tr:first>td.communication-zone').css('width', '');
        $('tbody>tr:first-child>td').each(function () {
            width_tbody_header = $(this).outerWidth();
            header_key_td.eq($(this).index()).css('width', Math.round(width_tbody_header));
            header_key_td.eq($(this).index()).css('min-width', Math.round(width_tbody_header));
            header_key_td.eq($(this).index()).css('max-width', Math.round(width_tbody_header));
        });
        }


        // Set general with for the whole table
        var cwidthNoScroll = $('#category-item-plan-table')[0].clientWidth;
        var cwidthHaveScroll = $('#category-item-plan-table').width();
        var tableCustomer = $('#category-plan-wrapper');
        if (scrollbarVisible(tableCustomer[0])) {
            $('#category-plan-wrapper thead').width(cwidthHaveScroll);
        } else {
            $('#category-plan-wrapper thead').width(cwidthNoScroll);
        }
    }

    //Check whether if has scrollbar or not
    function scrollbarVisible(element) {
        return element.scrollHeight > element.clientHeight;
    }

    $('#category-plan-wrapper').scroll(function () {
        if ($('.popover').is(':visible')) {
            $('.popover').hide();
        }
    });
    $('body').on('click', function (e) {
        if (!$(e.target).parent().hasClass('btn-download-mess')) {
            //$('.popover').addClass('hidden');
            $('.btn-download-mess').popover('destroy');
        }
        //if ($(e.target).is('#CommunicationMonth') || $(e.target).is('.monthGroup')) {
        //    $('.popover').removeClass('hidden');
        //}
    });
});