//Click to indicate launch which modal
$(document).on('click', '.table tbody a', function(){
  if($(this).hasClass('fa-trash')){
    $('#delete-confirmation').modal();    
  }else{
    if($(this).hasClass('btn-draft-code')){
      $('.modal#edit-item .modal-title').text('Convert to Production code');
      $('.modal#edit-item .modal-footer>a:first-child').text('Convert to Production code');
      $('.modal#edit-item .modal-body .modal-production-code').show();
    }else{
      $('.modal#edit-item .modal-title').text('Edit item');
      $('.modal#edit-item .modal-footer>a:first-child').text('Update');
      $('.modal#edit-item .modal-body .modal-production-code').hide();       
    }
    $('#edit-item').modal(); 
  }
});
