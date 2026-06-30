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

  // Dark Mode Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const htmlEl = document.documentElement;
  
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    htmlEl.setAttribute("data-theme", "dark");
    if(themeIcon) themeIcon.classList.replace("fa-moon-o", "fa-sun-o");
  }

  themeToggle && themeToggle.addEventListener("click", () => {
    const isDark = htmlEl.getAttribute("data-theme") === "dark";
    if (isDark) {
      htmlEl.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
      if(themeIcon) themeIcon.classList.replace("fa-sun-o", "fa-moon-o");
    } else {
      htmlEl.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      if(themeIcon) themeIcon.classList.replace("fa-moon-o", "fa-sun-o");
    }
  });

  // Project Filtering
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach(card => {
        // ensure transition
        card.style.transition = "all 0.3s ease";
        if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.8)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // Init Vanilla Tilt
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".project-card"), {
      max: 10,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
    });
  }

  // Init Particles.js
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      "particles": {
        "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#6b7280" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.3, "random": false },
        "size": { "value": 3, "random": true },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#6b7280",
          "opacity": 0.2,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1.5,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": { "enable": true, "mode": "grab" },
          "onclick": { "enable": true, "mode": "push" },
          "resize": true
        },
        "modes": {
          "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } },
          "push": { "particles_nb": 4 }
        }
      },
      "retina_detect": true
    });
  }
});
 
AOS && AOS.init && AOS.init({ once: true });