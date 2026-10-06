/* ===========================================================
   Publications data
   To add a paper, copy one object and edit it.
   type: "journal" | "conference"   status: "published" | "review"
   =========================================================== */
const ME = "Muhammad Saood Sarwar";

const publications = [
  {
    title: "Recurrent Imputation Network with Patterned Output (RINPO) for Sparse Data",
    authors: ["Shahzaib Ur Rehman", ME],
    venue: "Knowledge and Information Systems, Vol. 68, Art. 118 (Springer Nature)",
    year: 2026, type: "journal", status: "published",
    doi: "10.1007/s10115-026-02708-2"
  },
  {
    title: "Hybrid Quantum-Classical Machine Learning for Enhanced PCOS Classification",
    authors: [ME, "Shahzaib Ur Rehman"],
    venue: "Quantum Machine Intelligence, Vol. 7, Art. 83 (Springer Nature)",
    year: 2025, type: "journal", status: "published",
    doi: "10.1007/s42484-025-00307-y"
  },
  {
    title: "Identification of Rhythmic Sounds Patterns by Emotion Recognition Using Landmark and Euclidean Distance Techniques",
    authors: [ME, "Zain-ul-Abideen"],
    venue: "Journal of Image Processing and Intelligent Remote Sensing, Vol. 3, No. 03",
    year: 2023, type: "journal", status: "published",
    doi: "10.55529/jipirs.33.27.35"
  },
  {
    title: "Deep Feature Extraction with Pretrained CNNs for Sorghum Leaf Disease Classification Using SVM",
    authors: [ME, "Shahzaib Ur Rehman"],
    venue: "International Conference on Frontiers of Information Technology (FIT), IEEE",
    year: 2025, type: "conference", status: "published",
    doi: "10.1109/FIT67061.2025.11333699"
  },
  {
    title: "Enhancing Amazon Product Review Analysis by Using Bidirectional LSTM Neural Networks for Deep Multi-Domain Sentiment",
    authors: [ME, "Umer Asgher", "Shahzaib Ur Rehman"],
    venue: "19th International Conference on Emerging Technologies (ICET), IEEE",
    year: 2024, type: "conference", status: "published",
    doi: "10.1109/ICET63392.2024.10935260"
  },
  {
    title: "Q-SPRINT: A QUBO-Inspired Structured Pruning and Fine-Tuning Framework for Model Compression in Digital Pathology",
    authors: [ME],
    venue: "Submitted to Machine Learning",
    year: 2026, type: "journal", status: "review"
  },
  {
    title: "FDTD-Based Synthetic Dataset Generation and Quantum Ensemble Learning for Enhanced Microwave Tumor Localization",
    authors: [ME, "Shahzaib Ur Rehman"],
    venue: "Submitted to Quantum Machine Intelligence",
    year: 2026, type: "journal", status: "review"
  },
  {
    title: "A Quantum-Classical Hybrid Framework for Robust Medical Diagnostics via MCMC-Parameterised QUBO Optimization",
    authors: [ME, "Omar Usman Khan"],
    venue: "Submitted to International Journal of Quantum Information",
    year: 2026, type: "journal", status: "review"
  },
  {
    title: "RSU: A Novel Rectified Sine Unit Activation Function for Robust Pathological Diagnosis Across Multi-Cancer Datasets",
    authors: [ME, "Shahzaib Ur Rehman", "Hafeez Anwar"],
    venue: "Submitted to Sensing and Imaging",
    year: 2026, type: "journal", status: "review"
  },
  {
    title: "Scalable CNN-LSTM Intrusion Detection for Fog Nodes: Bridging Simulation and Deployment",
    authors: [ME, "Syed Hassnain Abbas", "Syed Muhammad Ali Musa"],
    venue: "Submitted to Mediterranean Conference on Emerging Technologies and Systems (MCETS 2026)",
    year: 2026, type: "conference", status: "review"
  },
  {
    title: "Scalable CNN-LSTM Intrusion Detection for Fog Nodes: Bridging Simulation and Deployment",
    authors: [ME, "Raqeeb", "Nashwa Raheem", "Fatima Khan"],
    venue: "Submitted to 23rd International Bhurban Conference on Applied Sciences & Technology (IBCAST 2026)",
    year: 2026, type: "conference", status: "review"
  },
  {
    title: "Evaluating Feature Extraction Robustness for Morphologically Complex Scripts under Extreme Data Scarcity: A Study on Dot-Dependent Character Recognition",
    authors: [ME, "Shahzaib Ur Rehman", "Syed Hassnain Abbas"],
    venue: "Submitted to 21st International Conference on Emerging Technologies (ICET 2026)",
    year: 2026, type: "conference", status: "review"
  }
];

/* ---------- Helpers ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

function citation(p) {
  const authors = p.authors.join(", ");
  const doi = p.doi ? ` https://doi.org/${p.doi}` : "";
  const status = p.status === "review" ? " (under review)" : "";
  return `${authors} (${p.year}). ${p.title}. ${p.venue}${status}.${doi}`;
}

/* ---------- Publications ---------- */
let currentFilter = "all";
let currentQuery = "";

function matches(p) {
  if (currentFilter === "review" && p.status !== "review") return false;
  if ((currentFilter === "journal" || currentFilter === "conference") &&
      (p.type !== currentFilter || p.status !== "published")) return false;
  if (!currentQuery) return true;
  const hay = `${p.title} ${p.venue} ${p.authors.join(" ")} ${p.year}`.toLowerCase();
  return hay.includes(currentQuery);
}

function renderPubs() {
  const list = $("#pubList");
  const items = publications
    .map((p, i) => ({ p, i }))
    .filter(({ p }) => matches(p))
    .sort((a, b) => (a.p.status === b.p.status ? b.p.year - a.p.year : a.p.status === "published" ? -1 : 1));

  list.innerHTML = items.map(({ p, i }) => {
    const authors = p.authors.map((a) => (a === ME ? `<strong>${escapeHtml(a)}</strong>` : escapeHtml(a))).join(", ");
    const tag = p.status === "review"
      ? `<span class="tag review">Under review</span>`
      : `<span class="tag">${p.type === "journal" ? "Journal" : "Conference"}</span>`;
    const doi = p.doi
      ? `<a href="https://doi.org/${p.doi}" target="_blank" rel="noopener">DOI: ${escapeHtml(p.doi)}</a>`
      : "";
    return `
      <li class="pub">
        <span class="pub-year">${p.year}</span>
        <div>
          <h3>${escapeHtml(p.title)}</h3>
          <p class="authors">${authors}</p>
          <p class="venue">${escapeHtml(p.venue)}</p>
          <div class="pub-meta">${tag}${doi}<button type="button" class="cite-btn" data-cite="${i}">Copy citation</button></div>
        </div>
      </li>`;
  }).join("");

  $("#pubEmpty").hidden = items.length > 0;

  const published = publications.filter((p) => p.status === "published").length;
  const review = publications.length - published;
  $("#pubCount").textContent = `${published} published, ${review} under review`;
}

$$(".chip").forEach((btn) => {
  btn.addEventListener("click", () => {
    $$(".chip").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    currentFilter = btn.dataset.filter;
    renderPubs();
  });
});

$("#pubSearch").addEventListener("input", (e) => {
  currentQuery = e.target.value.trim().toLowerCase();
  renderPubs();
});

$("#pubList").addEventListener("click", async (e) => {
  const btn = e.target.closest(".cite-btn");
  if (!btn) return;
  const ok = await copyText(citation(publications[+btn.dataset.cite]));
  toast(ok ? "Citation copied" : "Couldn't copy. Select the text manually.");
});

renderPubs();

/* ---------- Copy email ---------- */
$("#copyEmail").addEventListener("click", async () => {
  const ok = await copyText("saood.ali21@gmail.com");
  toast(ok ? "Email copied" : "Couldn't copy. Select the address manually.");
});

/* ---------- Theme ---------- */
const root = document.documentElement;
function getStoredTheme() { try { return localStorage.getItem("theme"); } catch { return null; } }
function storeTheme(t) { try { localStorage.setItem("theme", t); } catch {} }
const stored = getStoredTheme();
if (stored) root.dataset.theme = stored;

function isDark() {
  if (root.dataset.theme) return root.dataset.theme === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
$("#themeToggle").addEventListener("click", () => {
  const next = isDark() ? "light" : "dark";
  root.dataset.theme = next;
  storeTheme(next);
  $("#themeToggle").setAttribute("aria-label", next === "dark" ? "Switch to light theme" : "Switch to dark theme");
  readFieldColor();
});

/* ---------- Mobile menu ---------- */
const nav = $("#nav");
const menuBtn = $("#menuBtn");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
$$(".nav a").forEach((a) => a.addEventListener("click", () => {
  nav.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
}));

/* ---------- Header border + current section ---------- */
const topbar = $(".topbar");
window.addEventListener("scroll", () => topbar.classList.toggle("scrolled", window.scrollY > 8), { passive: true });

const navLinks = $$(".nav a");
const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((a) => a.classList.toggle("is-current", a.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });
$$("main section[id]").forEach((s) => spy.observe(s));

$("#year").textContent = new Date().getFullYear();

/* ===========================================================
   Hero: emergent alignment field
   Each particle only aligns with nearby particles (a Vicsek-style
   model). No global rule exists, yet coherent currents emerge.
   =========================================================== */
const canvas = $("#field");
const ctx = canvas.getContext("2d");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let W = 0, H = 0, DPR = 1, particles = [], fieldRGB = "75, 59, 219";
const mouse = { x: -9999, y: -9999 };

function readFieldColor() {
  fieldRGB = getComputedStyle(root).getPropertyValue("--field").trim() || fieldRGB;
  if (reduceMotion) drawFrame();
}

function resize() {
  const rect = canvas.getBoundingClientRect();
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  W = rect.width; H = rect.height;
  canvas.width = W * DPR; canvas.height = H * DPR;
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  const count = Math.round(Math.min(220, Math.max(70, (W * H) / 5200)));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    a: Math.random() * Math.PI * 2
  }));
}

const R = 46, SPEED = 0.7, NOISE = 0.35;

function step() {
  const cell = R, cols = Math.ceil(W / cell) + 1, grid = new Map();
  particles.forEach((p, i) => {
    const k = Math.floor(p.x / cell) + Math.floor(p.y / cell) * cols;
    if (!grid.has(k)) grid.set(k, []);
    grid.get(k).push(i);
  });
  const next = particles.map((p) => {
    let sx = Math.cos(p.a), sy = Math.sin(p.a);
    const cx = Math.floor(p.x / cell), cy = Math.floor(p.y / cell);
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
      const bucket = grid.get(cx + dx + (cy + dy) * cols);
      if (!bucket) continue;
      for (const j of bucket) {
        const q = particles[j];
        const ddx = q.x - p.x, ddy = q.y - p.y;
        if (ddx * ddx + ddy * ddy < R * R) { sx += Math.cos(q.a); sy += Math.sin(q.a); }
      }
    }
    let a = Math.atan2(sy, sx) + (Math.random() - 0.5) * NOISE;
    const mx = p.x - mouse.x, my = p.y - mouse.y, md = mx * mx + my * my;
    if (md < 120 * 120) {
      const away = Math.atan2(my, mx);
      let diff = away - a;
      diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      a += diff * 0.25;
    }
    return a;
  });
  particles.forEach((p, i) => {
    p.a = next[i];
    p.x += Math.cos(p.a) * SPEED;
    p.y += Math.sin(p.a) * SPEED;
    if (p.x < 0) p.x += W; if (p.x > W) p.x -= W;
    if (p.y < 0) p.y += H; if (p.y > H) p.y -= H;
  });
}

function drawFrame() {
  ctx.clearRect(0, 0, W, H);
  ctx.lineWidth = 1.4;
  ctx.lineCap = "round";
  const narrow = W < 700;
  for (const p of particles) {
    // Fade toward the left so the text stays readable
    const t = p.x / W;
    const alpha = narrow ? 0.18 : 0.08 + Math.max(0, t - 0.25) * 0.75;
    ctx.strokeStyle = `rgba(${fieldRGB}, ${alpha.toFixed(3)})`;
    const len = 9;
    ctx.beginPath();
    ctx.moveTo(p.x - Math.cos(p.a) * len, p.y - Math.sin(p.a) * len);
    ctx.lineTo(p.x + Math.cos(p.a) * len, p.y + Math.sin(p.a) * len);
    ctx.stroke();
  }
}

let running = true;
function loop() {
  if (running) { step(); drawFrame(); }
  requestAnimationFrame(loop);
}

const heroEl = $(".hero");
heroEl.addEventListener("pointermove", (e) => {
  const r = canvas.getBoundingClientRect();
  mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
});
heroEl.addEventListener("pointerleave", () => { mouse.x = mouse.y = -9999; });

// Pause the simulation when the hero is off screen to save battery
new IntersectionObserver(([entry]) => { running = entry.isIntersecting; }).observe(heroEl);

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => { resize(); if (reduceMotion) drawFrame(); }, 150);
});

readFieldColor();
resize();
if (reduceMotion) {
  for (let i = 0; i < 200; i++) step();
  drawFrame();
} else {
  loop();
}
