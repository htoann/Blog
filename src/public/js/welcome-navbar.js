let nowHourNb = new Date().getHours();
let welcomeNavbar = document.querySelector(".nav-link-welcome");
if (nowHourNb >= 0 && nowHourNb <= 11) {
  welcomeNavbar.innerHTML = "Good Morning";
} else if (nowHourNb > 11 && nowHourNb <= 18) {
  welcomeNavbar.innerHTML = "Good Afternoon";
} else welcomeNavbar.innerHTML = "Good Evening";
