document.addEventListener("DOMContentLoaded", () => {
  // Jam realtime
  function update_time() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    document.getElementById("time").textContent = `${hours}:${minutes}:${seconds}`;
  }
  update_time();
  setInterval(update_time, 1000);

  // Hamburger menu
  const hamburger = document.getElementById("hamburger");
  const listMenu = document.getElementById("list-menu");
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    listMenu.classList.toggle("active");
  });
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !listMenu.contains(e.target)) {
      hamburger.classList.remove("active");
      listMenu.classList.remove("active");
    }
  });

  // Smooth scroll + underline active
  const menuLinks = document.querySelectorAll(".menu");
  const underline = document.querySelector(".underline");

  menuLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(link.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    });
  });

  const sections = document.querySelectorAll("section, footer");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        menuLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href").replace("#", "") === entry.target.id) {
            link.classList.add("active");
            const { offsetLeft, offsetWidth } = link;
            underline.style.left = offsetLeft + "px";
            underline.style.width = offsetWidth + "px";
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => observer.observe(section));

  // Posisi awal underline
  const firstActive = document.querySelector(".menu.active") || menuLinks[0];
  const { offsetLeft, offsetWidth } = firstActive;
  underline.style.left = offsetLeft + "px";
  underline.style.width = offsetWidth + "px";
});
