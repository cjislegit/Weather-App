var lon, lat, url, newU, icon, unit = " °C", endP = "https://fcc-weather-api.glitch.me/api/current?";

$(document).ready(function() {
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      lat = "lat=" + position.coords.latitude;
      lon = "&lon=" + position.coords.longitude;
      weather(lat, lon);
    });
  };
})

function weather(lat, lon){
  url = endP + lat + lon;
  $.ajax({
    url: url, success: function(info){
      $("#city").text(info.name);
      $("#temp").text(Math.round(info.main.temp));
      $("#unit").text(unit);
      $("#desc").text(info.weather[0].main);
      var img = info.weather[0].icon;
      $("#icon").attr("src",img);
    }
  });
};

$("#unit").on("click", function(){
  if(unit === " °C"){
    var roundF = $("#temp").text()*9/5+32;
    roundF = Math.round(roundF);
    $("#temp").text(roundF);
    $("#unit").text(" °F");
    unit = " °F" 
  } else if(unit === " °F"){
    var roundC =  ($("#temp").text()-32)*5/9;
   roundC = Math.round(roundC);
    $("#temp").text(roundC);
    $("#unit").text(" °C");
    unit = " °C"
  }
});
