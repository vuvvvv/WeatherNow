
function openNav() {
  document.getElementById("mySidebar").style.left = "0";
  document.getElementById("main1").style.marginLeft = "250px";
  document.getElementById("main1").style.display = "none";
}

function closeNav() {
  document.getElementById("mySidebar").style.left = "-250px";
  document.getElementById("main1").style.marginLeft = "0";
  document.getElementById("main1").style.display = "block";
}

