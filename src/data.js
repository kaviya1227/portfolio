// ─────────────────────────────────────────────────────────────
// All portfolio content lives here. Edit this file to update the site.
// Items marked TODO are placeholders for you to replace.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Kaviya M",
  role: "Full Stack Developer",
  email: "kaviyakavi1227@gmail.com",
  linkedin: "https://www.linkedin.com/in/kaviya-m-4b5a1526a",
  // TODO: replace with your real GitHub profile URL
  github: "https://github.com/kaviya1227/pharmeasy",
  resume: "https://drive.google.com/drive/u/0/home",
};

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const about = {
  paragraphs: [
    "I'm a full MERN stack developer, and I'm skilled in every technology I work with. On the frontend I build responsive, interactive interfaces with HTML5, CSS3, JavaScript (ES6+) and React.js. On the backend I work with Node.js, Express.js and REST APIs, and I store and manage data with MongoDB and Mongoose.",
    "I use Git and GitHub for version control, and I'm skilled in AI tools like ChatGPT, Claude, Lovable, Antigravity, Vercel and v0 to design, build and ship faster. With Figma, Photoshop and Illustrator, I also bring a designer's eye to every interface.",
  ],
};

// icon keys are resolved in components/Skills.jsx
export const skillGroups = [
  {
    title: "Frontend",
    blurb: "Responsive, accessible interfaces",
    items: [
      { name: "HTML5", icon: "html" },
      { name: "CSS3", icon: "css" },
      { name: "JavaScript (ES6+)", icon: "js" },
      { name: "React.js", icon: "react" },
    ],
  },
  {
    title: "Backend",
    blurb: "APIs and server-side logic",
    items: [
      { name: "Node.js", icon: "node" },
      { name: "Express.js", icon: "express" },
      { name: "REST APIs", icon: "api" },
    ],
  },
  {
    title: "Database",
    blurb: "Storing and querying data",
    items: [
      { name: "MongoDB", icon: "mongo" },
      { name: "Mongoose", icon: "db" },
    ],
  },
  {
    title: "Tools & Cloud",
    blurb: "Version control and workflow",
    items: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "AWS (fundamentals)", icon: "aws" },
    ],
  },
  {
    title: "AI Tools",
    blurb: "Building and shipping faster",
    items: [
      { name: "ChatGPT", icon: "chatgpt" },
      { name: "Claude", icon: "claude" },
      { name: "Lovable", icon: "lovable" },
      { name: "Antigravity", icon: "antigravity" },
      { name: "Vercel", icon: "vercel" },
      { name: "v0", icon: "v0" },
    ],
  },
  {
    title: "Design",
    blurb: "A designer's eye for detail",
    items: [
      { name: "Figma (basic)", icon: "figma" },
      { name: "Photoshop", icon: "photoshop" },
      { name: "Illustrator", icon: "illustrator" },
      { name: "CorelDRAW", icon: "corel" },
    ],
  },
];

// TODO for each project:
//  - github: your repository link
//  - demo:   the live site's FIRST PAGE link. The card image is then a live
//            preview screenshot of that page, taken automatically.
//  - screenshot (optional): a local image like "/projects/my-shot.png" in
//            /public/projects — used instead of the automatic preview.
// Tech lists for the academic projects are placeholders — please confirm.
export const projects = [
  {
    title: "Organic Species — E-Commerce",
    description:
      "A responsive e-commerce storefront focused on clear product presentation and easy, user-friendly navigation across devices.",
    tech: ["React.js", "JavaScript", "CSS3", "Responsive UI"],
    github: "https://github.com/your-username/organic-species",
    demo: "#",
  },
  {
    title: "Vehicle Service Management System",
    description:
      "An academic project that manages vehicle service records and the processes around them, from booking details to service status tracking.",
    tech: ["Node.js", "Express.js", "MongoDB", "REST API"],
    github: "https://github.com/kaviya1227/pharmeasy",
    demo: "#",
  },
  {
    title: "Athlete Performance Analysis & Prediction",
    description:
      "An academic project that analyses athlete performance data to surface trends and predict future performance outcomes.",
    tech: ["Python", "Data Analysis", "Machine Learning"],
    github: "https://github.com/kaviya1227/pharmeasy",
    demo: "#",
  },
  {
    title: "PharmEasy Website Clone",
    description:
      "A front-end clone of the PharmEasy online pharmacy website, built with HTML and CSS.",
    tech: ["HTML5", "CSS3"],
    github: "https://github.com/kaviya1227/pharmeasy",
    demo: "#",
    // Unique colour theme for this card (teal) — change or remove as you like.
    theme: { bg: "linear-gradient(160deg, #0b3b3d 0%, #07262a 100%)", accent: "#2dd4bf", border: "rgba(45, 212, 191, 0.4)" },
  },
];

// Most recent first.
export const experience = [
  {
    period: "Jun 2026 – Present",
    title: "Full Stack Developer Intern · Kitkat Software Technology",
    place: "Coimbatore",
    text: "Building responsive interfaces with React.js, developing Node.js and Express.js REST APIs, working with MongoDB and Mongoose, and using Git/GitHub for version control.",
    current: true,
  },
  {
    period: "Jun 2025 – May 2026",
    title: "Graphic Designer · Siddhar Vanam Siddha Hospital",
    place: "Trichy",
    text: "Created digital graphics and designed promotional and communication materials in Adobe Photoshop.",
  },
];

export const learningFocus = [
  "Front-End Development (certified)",
  "Data Analytics (certified)",
  "Corizo Internship (certified)",
  "Nextskill Technologies Internship (certified)",
];

export const education = {
  degree: "B.Tech — Information Technology",
  institution: "University College of Engineering, BIT Campus",
  location: "Tiruchirappalli",
  years: "2021 – 2025",
  score: "CGPA 8.4",
  certifications: [
    "Front-End Development",
    "Data Analytics",
    "Corizo Internship",
    "Nextskill Technologies Internship",
  ],
  languages: ["English", "Tamil"],
};
