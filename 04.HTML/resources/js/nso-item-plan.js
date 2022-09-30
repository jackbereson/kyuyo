

$( document ).ready(function() {
	paintTable();
	setAllTableHeight();
});

$('.term-next').click(function(){
	paintTable();
	setAllTableHeight();

});

$(document).on('change','.item-plan-div .selectpicker', function(){
	resetStatus();
	if($(this).val()=='FF'||$(this).val()=='ER'||$(this).val()=='CZ'){
		$('.item-plan-status .item-status').text('Open');
		$('.item-plan-status .item-status').addClass('status-open');
	}
	if($(this).val()=='EA'||$(this).val()=='FM'){
		$('.item-plan-status .item-status').text('Submitted');
		$('.item-plan-status .item-status').addClass('status-submitted');	
	}
});

function resetStatus(){
	var resetStatus = $('.item-plan-status .item-status');
	if(resetStatus.hasClass('status-open')){
		resetStatus.removeClass('status-open');
	}
	if(resetStatus.hasClass('status-submitted')){
		resetStatus.removeClass('status-submitted');
	}	
}
function paintTable(){

//Set color for table by condition. All class can be control by change class in table header
//If 1st term expand 7 columns
if($('.col-term').hasClass('term-1')){
	$('.term-1').attr('colspan',7);
}

//If 2nd term expand 8 columns
if($('.col-term').hasClass('term-2')){
	$('.term-2').attr('colspan',8);
}

if($('.col-term').hasClass('current-term')){
	$('.current-term').append('<span>(CURRENT)</span>');	
}

//Index of "P-TERM"
var pTermIndex = $('.table-header-match-below-col .col-p-term').index();

//Index of "CURRENT MONTH"
var currentMonthIndex = $('.table-header-match-below-col .current-month').index();

//Index of "YEAR"
var yearIndex = $('.table-header-match-below-col .figure-year').index();

$('tbody tr').each(function(){
//Add class for "P-TERM" for table body	
$(this).find('td').eq(pTermIndex).addClass('col-p-term');

//Add class for "CURRENT MONTH" for table body	
$(this).find('td').eq(currentMonthIndex).addClass('current-month');

//Define previous month
$(this).find('td.current-month').prevUntil('.col-p-term').addClass('prev-month');

//Define column year in table body
$(this).find('td').eq(yearIndex).addClass('figure-year');

});

$('.table-header-match-below-col td').each(function(){
	var figureColIndex;
	if($(this).hasClass('figure-total')){
		figureColIndex = $(this).index();		
		$('tbody tr').each(function(){
			$(this).find('td').eq(figureColIndex).addClass('figure-total');
		});
	}
});
}


//set height for customer table to scroll

$(window).resize(function () {
	setAllTableHeight();
});

// nsoScreenChange();
$('#menu-toggle').click(function(){	
	setAllTableHeight();
	
})

//on page load 
$(window).resize();

function setAllTableHeight(){

    	//Set height for table customer
    	var h_page_header= $('.page-header').height();
    	var h_search= $('.advance-form').height();
    	var h_footer= $('.table-term-navigation').height();	
    	var the_whole_screen = $(window).height();
    	
    	var allTableWrapper = the_whole_screen - h_page_header - h_search - h_footer;
    	console.log('the whole' + allTableWrapper);
    	$('#main-content-zone').height(allTableWrapper);

    	var h_table_cus = allTableWrapper/2;
		var h_table_cus_actual = $('#nso-item-plan-table-customer-wrapper table').height(); 
		var h_table_cus_display = h_table_cus_actual>h_table_cus?h_table_cus:h_table_cus_actual;
    	$('#nso-item-plan-table-customer-wrapper').height(h_table_cus_display);

    	var h_table_plan = allTableWrapper/2; 
    	var h_table_plan_actual = $('#item-plan-wrapper table').height();
    	var h_table_plan_display = h_table_plan_actual>h_table_plan?h_table_plan:h_table_plan_actual;
    	$('#item-plan-wrapper').height(h_table_plan_display);



//Table customer
var cwidthNoScroll = $('#nso-item-plan-table-customer')[0].clientWidth;     
var cwidthHaveScroll = $('#nso-item-plan-table-customer').width();   

var tableCustomer=$('#nso-item-plan-table-customer-wrapper');
if(scrollbarVisible(tableCustomer[0])){
	$('#nso-item-plan-table-customer thead').width(cwidthHaveScroll);		
	$('#nso-item-plan-table-customer tfoot').width(cwidthHaveScroll);		
}else{
	$('#nso-item-plan-table-customer thead').width(cwidthNoScroll);	
	$('#nso-item-plan-table-customer tfoot').width(cwidthNoScroll);		
}

//Table item plan
var pwidthNoScroll = $('#nso-item-plan-table-plan')[0].clientWidth;     
var pwidthHaveScroll = $('#nso-item-plan-table-plan').width();   

var tablePlan=$('.item-plan-parent-wrapper');
if(scrollbarVisible(tablePlan[0])){
	$('#item-plan-wrapper thead').width(pwidthHaveScroll);		
}else{
	$('#item-plan-wrapper thead').width(pwidthNoScroll);	
}

}

//Check whether if has scrollbar or not
function scrollbarVisible(element) {
	return element.scrollHeight > element.clientHeight;
}
