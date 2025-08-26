function update_time() {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();

  hours = hours < 10 ? '0'+hours : hours;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  seconds = seconds < 10 ? '0'+seconds : seconds;

  var time = hours + ':' + minutes + ':' + seconds;
  document.getElementById('time').innerHTML = time;
}

update_time();
setInterval(update_time, 1000);

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const menuMobile = document.getElementById('list-menu');

  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    menuMobile.classList.toggle('active');
  });

  document.addEventListener('click', function(e) {
    if (!hamburger.contains(e.target) && !menuMobile.contains(e.target)) {
      hamburger.classList.remove('active');
      menuMobile.classList.remove('active');
    }
  });
});