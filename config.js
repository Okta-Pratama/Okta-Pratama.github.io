/*
 * Site configuration — the one place to edit personal details.
 *
 * Any value that is empty ("") or starts with "TODO" is treated as "not set":
 * the related button or text is hidden instead of showing a dead link.
 *
 * NOTE: the <head> meta tags in index.html (title, description, JSON-LD,
 * Open Graph) cannot be filled by JavaScript, because Google, WhatsApp and
 * LinkedIn read the raw HTML. If you change name, role or location here,
 * update the lines marked "keep in sync with config.js" in index.html too.
 */
const siteConfig = {
  name: "Okta Pratama",
  role: "Web Developer",
  location: "Probolinggo, Indonesia",
  timezone: "Asia/Jakarta",
  timezoneLabel: "WIB (GMT+7)",
  email: "oktxip@gmail.com",
  whatsapp: "TODO: 62xxxxxxxxxx", // digits only, country code first, e.g. 6281234567890
  github: "https://github.com/Okta-Pratama",
  linkedin: "TODO: https://www.linkedin.com/in/...",
  cvUrl: "/cv-okta-pratama.pdf", // the button stays hidden until this file exists in the repo
  availability: "Available for remote part-time & freelance work"
};
