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

  $('.waiting').click(function(){
    waiting_div = document.createElement('div');
    waiting_img = document.createElement('img');
    waiting_img.src = '/assets/loading.gif';

    waiting_div.style.position = 'absolute';
    waiting_div.style.top = '0px';
    waiting_div.style.right = '0px';
    waiting_div.style.bottom = '0px';
    waiting_div.style.left = '0px';
    waiting_div.style.zIndex = '9999';
    waiting_div.style.backgroudColor = '#CCC';
    waiting_div.style.textAlign = 'center';

    waiting_img.style.marginTop = "20%"

    waiting_div.appendChild(waiting_img);
    document.body.appendChild(waiting_div);
    
  })
  // source = new EventSource("/admin/photos/upload_process");
  // console.log(source)
  // source.addEventListener('update', function(event){
  //   // update a div, reload a section of the page
  //   console.log(event);
  //   $('#progress_show').css("width", event.data);
  // };
})
