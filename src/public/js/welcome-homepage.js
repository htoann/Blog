let nowHourHp = new Date().getHours();
let welcomeHomepage = document.querySelector(".good-morning");
if (nowHourHp >= 0 && nowHourHp <= 11) {
  welcomeHomepage.innerHTML = "Good Morning";
} else if (nowHourHp > 11 && nowHourHp <= 18) {
  welcomeHomepage.innerHTML = "Good Afternoon";
} else welcomeHomepage.innerHTML = "Good Evening";
