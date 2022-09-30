//Click to indicate launch which modal
$(document).on('click', '.table tbody a', function(){
  if($(this).hasClass('fa-trash')){
    $('#delete-confirmation').modal();    
  }else{
    $('#edit-cus').modal(); 
  }
});
