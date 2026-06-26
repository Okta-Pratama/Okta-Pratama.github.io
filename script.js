document.addEventListener("DOMContentLoaded", () => {
  function update_time() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    document.getElementById("time").textContent = `${hours}:${minutes}:${seconds}`;
  }
  update_time();
  setInterval(update_time, 1000);
  const hamburger = document.getElementById("hamburger");
  const listMenu = document.getElementById("list-menu");
  // Mobile menu toggle
  function closeMenu() {
    hamburger && hamburger.classList.remove('active');
    hamburger && hamburger.setAttribute('aria-expanded','false');
    listMenu && listMenu.classList.remove('active');
  }

  hamburger && hamburger.addEventListener('click', (e) => {
    const active = hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', String(active));
    if (listMenu) listMenu.classList.toggle('active', active);
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !listMenu.contains(e.target)) closeMenu();
  });

  // Smooth scroll + close mobile menu on link click
  const menuLinks = document.querySelectorAll('.menu');
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({behavior:'smooth'});
      closeMenu();
    });
  });

  // section observer for desktop underline (if underline exists)
  const underline = document.querySelector('.underline');
  const sections = document.querySelectorAll('section, footer');
  if (sections.length && underline) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const desktopLink = document.querySelector(`.list-menu .menu[href="#${entry.target.id}"]`);
          document.querySelectorAll('.list-menu .menu').forEach(l=>l.classList.remove('active'));
          if (desktopLink) {
            desktopLink.classList.add('active');
            const { offsetLeft, offsetWidth } = desktopLink;
            underline.style.left = offsetLeft + 'px';
            underline.style.width = offsetWidth + 'px';
          } else {
            underline.style.width = '0';
          }
        }
      });
    },{threshold:0.35});
    sections.forEach(s=>observer.observe(s));
    const firstActive = document.querySelector('.list-menu .menu.active') || document.querySelector('.list-menu .menu');
    if (firstActive) {
      const { offsetLeft, offsetWidth } = firstActive;
      underline.style.left = offsetLeft + 'px';
      underline.style.width = offsetWidth + 'px';
    }
  }

  // no theme toggle / dark mode — simplified site behavior
});
 
AOS && AOS.init && AOS.init();