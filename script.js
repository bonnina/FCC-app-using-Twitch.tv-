
$(".container-fluid").css({'height' : '250vh'});
$(function(){
   $(".container-fluid").css({'height' : '100%'});
  
   var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
   var link; 
   var redirect = "https://www.twitch.tv/";
  
   users.forEach(function(chanel){
      link = "https://wind-bow.glitch.me/twitch-api/streams/" + chanel;
      $.ajax({
             type: "GET",
             url: link,
             dataType: "json",
             success: function(data) {
               if (data.stream !== null && data.stream !== undefined) {
                 $(".list").append("<div class='row on'><div class='col-sm-2'><img class='img-responsive' src='" + data.stream.channel.logo + "'></div><div class='col-sm-3'><p class='text-left name btn' id='"  + data.stream.channel.display_name + "'><b>" + data.stream.channel.display_name + "</b></p></div><div class='col-sm-7'><p class='text-left'>" + data.stream.channel.status + "</p></div></div><br>");
               }
               else {
                 $.ajax({
                     type: "GET",
                     url: "https://wind-bow.glitch.me/twitch-api/channels/" + chanel,
                     dataType: "json",
                     success: function(resp) {
                        $(".list").append("<div class='row off'><div class='col-sm-2'><img class='img-responsive' src='" + resp.logo + "'></div><div class='col-sm-4'><p class='text-left name btn' id='"  + resp.display_name + "'><b>" + resp.display_name + "</b></p></div><div class='col-sm-6'><p> offline </p></div></div><br>");
                     },
                     error: function(errorMessage) {}
                 })         
               } 
      $(".btn").click(function(){
        window.open(redirect + this.id);
        return false;
      });
           },
             error: function(errorMessage) {}
      })   
   });
  
   $("#online").click(function(){
     $("#all, #offline").removeClass("active");
     $("#online").addClass("active");
     $(".off").hide();
     $(".on").show();
     $(".list").css({'padding-bottom': '1vh'});
   })
   $("#offline").click(function(){
     $("#all, #online").removeClass("active");
     $("#offline").addClass("active");
     $(".on").hide();
     $(".off").show();
     $(".list").css({'padding-top': '2vh'});
   })
   $("#all").click(function(){
     $("#offline, #online").removeClass("active");
     $("#all").addClass("active");
     $(".on, .off").show();
   })
  
  // if user is on a mobile
  if (navigator.userAgent.match(/iphone|android|blackberry/ig)) {
    $(".list").css({'font-size' : '3vw'});
    $("li").css({'font-size' : '4vw'});
    $("h2").css({'font-size' : '13vw'});
  }
})