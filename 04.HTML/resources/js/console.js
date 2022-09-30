// Initial setting
$('#summary-table-wrapper table tbody:not(.cat-level-1-wrapper)').hide();
updateBtnState();

$('.btn-cat-expand').click(function(){
	$(this).siblings().andSelf().removeClass('disabled');
	$(this).addClass('disabled');
	var defineCatLevel = $(this).parents().eq(3);
	var conditionForChild = defineCatLevel.next();
	defineCatLevel.nextUntil('.'+ defineCatLevel.attr('class')).filter('.'+ conditionForChild.attr('class')).show();
	updateBtnState();		
});

$('.btn-cat-collapse').click(function(){
	$(this).siblings().andSelf().removeClass('disabled');
	$(this).addClass('disabled');

	var defineCatLevel = $(this).parents().eq(3);
	defineCatLevel.nextUntil('.'+ defineCatLevel.attr('class')).hide();
	updateBtnState();	

});

function updateBtnState(){

	$('#summary-table-wrapper table tbody').each(function(){
		if($(this).is(':hidden')){
			$(this).find('.btn-group-cat-toggle a.disabled').removeClass('disabled')

		}else{
			var keyObject = $(this).attr('class');
			var keyObjectBtn = $(this).find('.td-category a.btn-cat-collapse');

			if($(this).find('.td-category a.btn-cat-collapse')){

				var con1 = $(this).next().is(':visible');
				console.log(con1);
				if(con1){
					keyObjectBtn.removeClass('disabled');
				}else{
					keyObjectBtn.addClass('disabled');
				}			
			}				
		}
	});

}

function collapseOnOff(){
	$('#summary-table-wrapper table>tbody').each(function(){
		if($(this).is(':visible')){
			
			var keyObject = $(this).attr('class');
			if($(this).find('a.btn-cat-collapse')){
				var keyObjectBtn = $(this).find('a.btn-cat-collapse');
				var closestCat = $(this).nextAll('.'+keyObject+':first').filter(":visible");	
				
				if(closestCat.length>-1){				
					keyObjectBtn.addClass('disabled');
				}				
			}	


		}
	});
}


// Find index of special column in header to set in body
var tdTotal = $('#summary-table-wrapper table thead tr td').length;

//Add class figure total for body
var figureArray= [] ;
$('#summary-table-wrapper table thead tr td').each(function(){
	if($(this).hasClass('figure-total')){
		var figureConverse = -(tdTotal-$(this).index());
		figureArray.push(figureConverse);			
	}		
});

for(i=0;i<figureArray.length;i++){
	$('#summary-table-wrapper table tbody tr').each(function(){
		$(this).find('td').eq(figureArray[i]).addClass('figure-total');	
	});
}

//Add class p-term and year for body
var pTermIndex = $('#summary-table-wrapper table thead .col-p-term').index();
var pTermIndexConverse = -(tdTotal-pTermIndex);

var yearIndex = $('#summary-table-wrapper table thead .figure-year').index();
var yearIndexConverse = -(tdTotal-yearIndex);


$('#summary-table-wrapper table tr').each(function(){
	$(this).find('td').eq(pTermIndexConverse).addClass('col-p-term');
	$(this).find('td').eq(yearIndexConverse).addClass('figure-year');
});

//Rowspan for company
$('#summary-table-wrapper tbody').each(function(){
	var totalCompInTbody = $(this).find('td.row-category-company').length;
	var countComp = 0;
	$(this).find('tr').each(function(){
		var hasCompany = $(this).find('td.row-category-company');
		if(hasCompany.length>0){
			countComp++;			
			$(this).find('td').each(function(){
				if($(this).hasClass('row-category-company')){
					if(countComp==totalCompInTbody){
						var rowSpan = $(this).closest('tr').nextAll().length;
						$(this).attr('rowspan',rowSpan+1);	
					}else if(countComp<totalCompInTbody){
						var nextCompRow = $('td.row-category-company').closest('tr');
						var rowSpan = $(this).closest('tr').nextUntil(nextCompRow).length;						
						$(this).attr('rowspan',rowSpan+1);	
					}
				}
			});
		}	

	});
});



//Rowspan for category
$('table tbody').each(function(){
	var catRowSpan = $(this).find('tr').length;	
	$(this).find('tr>td.td-category').attr('rowspan',catRowSpan);
})