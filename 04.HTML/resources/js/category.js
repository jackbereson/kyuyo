
//Click to indicate launch which modal
$(document).on('click', '.table tbody a', function () {
    if ($(this).hasClass('fa-trash')) {
        $('#delete-confirmation').modal({
            backdrop: 'static',
            keyboard: false
        });
    } else {
        $('#edit-category').modal({
            backdrop: 'static',
            keyboard: false
        });
    }
});

//Collapse and expand category
$(document).on('click', '.cat-toggle', function () {
    $(this).parent().next().toggle();
    if ($(this).hasClass('cat-collapse')) {
        $(this).removeClass('cat-collapse');
    } else {
        $(this).addClass('cat-collapse');
    }
});


// Set whether call category tree when modal on or off
var rootClass = $('.main-search-zone');

function checkFirstCat2() {
    var countFirstCat2 = rootClass.find('.category-level-1-children>.category-level-2-wrapper').length;
    console.log(countFirstCat2);
    var iconTrash = '<a href=\'javascript:void(0);\' class=\'fa fa-trash\'></a>';
    if (countFirstCat2 < 2) {
        rootClass.find('.category-level-1-children>.category-level-2-wrapper:first-child .category-level-2 .fa-trash').remove();
    } else {
        if (rootClass.find('.category-level-1-children .category-level-2-wrapper:first-child .category-level-2 .fa-trash').length == 0) {
            rootClass.find('.category-level-1-children .category-level-2-wrapper:first-child .category-level-2 .category-input-wrapper').append(iconTrash);
        }
    }
}

// When modal is on, rootClass is modal
$('#edit-category').on('shown.bs.modal', function () {
    rootClass = $('.modal');
})

// When modal is on, rootClass is "main-search-zone"
$('#edit-category').on('hidden.bs.modal', function () {
    rootClass = $('.main-search-zone');
})

 