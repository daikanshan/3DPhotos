// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//= require bootstrap-sprockets
$(document).ready(function(){
  $("#menu-login").hover(function(){
    $(".login_menu").stop(true).delay(200).slideDown("fast");
  },function(){
    $(".login_menu").delay(200).slideUp("fast");
    $(".login_menu").hover(function(){
      $(".login_menu").stop(true).slideDown("fast");
    },function(){
      $(".login_menu").delay(200).slideUp("fast");
    })
  })
})
