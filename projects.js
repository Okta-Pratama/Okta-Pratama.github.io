/*
 * Project list — edit this file to add, remove, or update projects.
 *
 * Fields:
 *   title        Project name
 *   subtitle     Short tagline shown above the description (optional)
 *   description  1–2 sentences about the project
 *   category     Array of filter tags: "web", "app", "games", "project", "learn"
 *                (a filter tab is hidden automatically when no project uses it)
 *   tech         Array of technologies
 *   image        Optional fallback image. Cards automatically use a screenshot of
 *                liveUrl (see autoScreenshot in config.js); this image is used when
 *                there is no liveUrl or the screenshot fails.
 *   liveUrl      Live demo URL. Leave "" (or "TODO") to hide the "Live Demo" button.
 *   repoUrl      Source code URL. Leave "" (or "TODO") to hide the "Source Code" button.
 */
const projectsData = [
  {
    "title": "InsBook",
    "subtitle": "Read, Highlight, and Summarize Anywhere",
    "description": "TODO: describe InsBook in 1–2 sentences (what it does and who it is for).",
    "category": ["web", "project"],
    "image": "https://ik.imagekit.io/rxvi2ripqh/Insbook.jpg",
    "tech": ["React", "TypeScript", "Supabase", "PostgreSQL", "CSS"],
    "liveUrl": "https://insbook.vercel.app/",
    "repoUrl": "TODO: https://github.com/Okta-Pratama/..."
  },
  {
    "title": "AMP",
    "subtitle": "Smart Medical Analysis via Classification Algorithms",
    "description": "TODO: describe AMP in 1–2 sentences (what it predicts and how).",
    "category": ["web", "app", "project"],
    "image": "https://ik.imagekit.io/rxvi2ripqh/AMP.jpg",
    "tech": ["Python", "Streamlit"],
    "liveUrl": "https://amp-heart.streamlit.app/",
    "repoUrl": "TODO: https://github.com/Okta-Pratama/..."
  },
  {
    "title": "K3 SR",
    "subtitle": "Safety & Compliance",
    "description": "A school project I built to learn web development.",
    "category": ["web", "learn"],
    "image": "https://ik.imagekit.io/rxvi2ripqh/192.168.100.7_3000_index.html.png",
    "tech": ["HTML", "JavaScript", "Webpack", "Bootstrap", "Sass"],
    "liveUrl": "https://k3-sumber-rezeky.vercel.app",
    "repoUrl": "TODO: https://github.com/Okta-Pratama/..."
  },
  {
    "title": "Monika Eight",
    "subtitle": "Simple Game with Statistics Questions",
    "description": "A game built for a client's rather unusual request.",
    "category": ["games", "web"],
    "image": "https://ik.imagekit.io/rxvi2ripqh/moeg.jpg",
    "tech": ["HTML", "CSS", "JavaScript", "Bootstrap", "PHP"],
    "liveUrl": "https://monopoli-eight.vercel.app/",
    "repoUrl": "TODO: https://github.com/Okta-Pratama/..."
  },
  
  {
    "title": "OPStore",
    "subtitle": "Bookkeeping and Inventory Management",
    "description": "A simple web application to help manage a business.",
    "category": ["web"],
    "image": "https://ik.imagekit.io/rxvi2ripqh/ops-diamond.vercel.app_login.png",
    "tech": ["HTML", "JavaScript", "Supabase", "PostgreSQL", "CSS"],
    "liveUrl": "https://diamondgroup-store.vercel.app/",
    "repoUrl": "TODO: https://github.com/Okta-Pratama/..."
  },
  {
    "title": "Command Protocol",
    "subtitle": "2D Game with Command Protocol Mechanics",
    "description": "Coming soon.",
    "category": ["games", "project"],
    "image": "",
    "tech": ["Godot"],
    "liveUrl": "",
    "repoUrl": ""
  },
  {
    "title": "101",
    "subtitle": "101 Mini Games in One Place",
    "description": "Coming soon.",
    "category": ["web", "games", "project"],
    "image": "",
    "tech": ["HTML", "JavaScript", "Supabase", "PostgreSQL", "CSS"],
    "liveUrl": "",
    "repoUrl": ""
  }
];
