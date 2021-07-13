var progressbar = document.getElementById("progressbar");
var percent = document.getElementById("percent");

var totalHeight = document.body.scrollHeight - window.innerHeight;
window.onscroll = function(){
  var progress = (window.pageYOffset / totalHeight) * 100;
  progressbar.style.height = progress + "%";
  percent.innerHTML = "Page Scrolled" + Math.round(progress) + "%";
}