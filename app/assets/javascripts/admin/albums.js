// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function(){
  $(".choose_photos").each(function(){
    var that = this;
    $(that).click(function(){
      checkbox = $(that).find("input")[0];
      // console.log(checkbox.checked);
      if(checkbox.checked==false){
        $(that).css("border" , "2px solid #A0A");
      }else{
        $(that).css("border" , "1px solid #AAA");
      }
      checkbox.checked = !checkbox.checked
    })
  })
})
