// A value counts as "set" when it is a non-empty string that is not a TODO placeholder
// (or a leftover "#" / "unavailable.html" stand-in link).
function isSet(value) {
  if (typeof value !== "string") return false;
  const v = value.trim();
  return v !== "" && v !== "#" && v !== "unavailable.html" && !/^TODO/i.test(v);
}

const config = typeof siteConfig !== "undefined" ? siteConfig : {};

// Builds the href for a config key, or returns null when the value is not set.
function configHref(key) {
  const value = config[key];
  if (!isSet(value)) return null;
  switch (key) {
    case "email": return `mailto:${value}`;
    case "whatsapp": {
      const digits = value.replace(/\D/g, "");
      return digits ? `https://wa.me/${digits}` : null;
    }
    default: return value;
  }
}

// Fill text from config:   <span data-config-text="location">fallback</span>
// Wire links from config:  <a data-config-link="github" hidden>…</a>
// Links stay hidden when their config value is empty or a TODO.
function applyConfig() {
  document.querySelectorAll("[data-config-text]").forEach(el => {
    const value = config[el.getAttribute("data-config-text")];
    if (isSet(value)) el.textContent = value;
  });

  document.querySelectorAll("[data-config-link]").forEach(el => {
    const href = configHref(el.getAttribute("data-config-link"));
    if (href) {
      el.href = href;
      el.hidden = false;
    } else {
      el.hidden = true;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();

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

  // Load Projects from projects.js data
  const projectsContainer = document.getElementById("projects-container");
  if (projectsContainer && typeof projectsData !== 'undefined') {
    projectsData.forEach((proj) => {
      projectsContainer.appendChild(createProjectCard(proj));
    });
    initFilters();
  }

  function createEl(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  }

  function createProjectCard(proj) {
    const categories = Array.isArray(proj.category) ? proj.category : [proj.category];

    // Cards are NOT given data-aos: AOS only tracks elements that exist when it
    // initialises, so injected cards stayed at opacity 0 forever.
    const card = createEl("article", "project-card bento-card");
    card.setAttribute("data-category", categories.join(" ").toLowerCase());

    const figure = createEl("figure", "project-figure");
    if (isSet(proj.image)) {
      const img = document.createElement("img");
      img.src = proj.image;
      img.alt = `Screenshot of ${proj.title}`;
      img.loading = "lazy";
      img.decoding = "async";
      img.width = 1600;
      img.height = 900;
      figure.appendChild(img);
    } else {
      figure.classList.add("project-figure--empty");
      figure.appendChild(createEl("span", "project-placeholder", "Preview coming soon"));
    }
    card.appendChild(figure);

    const body = createEl("div", "project-body");
    body.appendChild(createEl("h3", "project-title", proj.title));
    if (isSet(proj.subtitle)) body.appendChild(createEl("div", "project-subtitle", proj.subtitle));
    if (isSet(proj.description)) body.appendChild(createEl("p", "project-desc", proj.description));

    const tech = createEl("div", "project-tech");
    (proj.tech || []).filter(Boolean).forEach(t => {
      tech.appendChild(createEl("span", "bento-pill", t));
      tech.appendChild(document.createTextNode(" "));
    });
    body.appendChild(tech);

    const actions = createEl("div", "project-actions");
    [
      { url: proj.liveUrl, label: "Live Demo", icon: "fa-external-link" },
      { url: proj.repoUrl, label: "Source Code", icon: "fa-github" }
    ].forEach(({ url, label, icon }) => {
      if (!isSet(url)) return;
      const a = createEl("a", "project-btn");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.setAttribute("aria-label", `${label}: ${proj.title} (opens in a new tab)`);
      const i = createEl("i", `fa ${icon}`);
      i.setAttribute("aria-hidden", "true");
      a.append(i, ` ${label}`);
      actions.appendChild(a);
    });
    if (actions.children.length) body.appendChild(actions);

    card.appendChild(body);
    return card;
  }

  function initFilters() {
    const MAX_VISIBLE = 6;
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
    const showMoreContainer = document.getElementById("show-more-container");
    const showMoreBtn = document.getElementById("show-more-btn");
    let maxVisible = MAX_VISIBLE;
    let currentFilter = "all";

    const cardMatches = (card, filter) =>
      filter === "all" || card.getAttribute("data-category").split(" ").includes(filter);

    // Hide filter tabs that have no projects
    filterBtns.forEach(btn => {
      const filter = btn.getAttribute("data-filter");
      const hasProjects = [...projectCards].some(card => cardMatches(card, filter));
      btn.hidden = !hasProjects;
    });

    function applyFilter() {
      let visibleCount = 0;
      let totalMatch = 0;

      projectCards.forEach(card => {
        if (cardMatches(card, currentFilter)) {
          totalMatch++;
          card.hidden = visibleCount >= maxVisible;
          if (!card.hidden) visibleCount++;
        } else {
          card.hidden = true;
        }
      });

      if (showMoreContainer) showMoreContainer.hidden = totalMatch <= maxVisible;
    }

    if (showMoreBtn) {
      showMoreBtn.addEventListener("click", () => {
        maxVisible = Infinity;
        applyFilter();
      });
    }

    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => {
          b.classList.remove("active");
          b.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");
        currentFilter = btn.getAttribute("data-filter");
        maxVisible = MAX_VISIBLE;
        applyFilter();
      });
    });

    applyFilter();
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