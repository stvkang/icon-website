/* ICON Pipeline E&C — shared header, footer and small interactions.
   The menu below is used on every page: edit it once here. */

const NAV = [
  { label: "About Us", href: "about.html", key: "about", sub: [
    { label: "Who We Are", href: "about.html#who-we-are" },
    { label: "Our Approach", href: "about.html#approach" },
    { label: "Why ICON", href: "about.html#why-icon" },
    { label: "Equipment Fleet", href: "equipment-fleet.html" },
  ]},
  { label: "Services", href: "services.html", key: "services", sub: [
    { label: "Oil & Gas Pipeline", href: "service-pipeline.html" },
    { label: "Shore Approach", href: "service-shore-approach.html" },
    { label: "HDD & Microtunneling", href: "service-hdd-microtunneling.html" },
    { label: "Associated Works", href: "service-associated-works.html" },
  ]},
  { label: "QHSE", href: "qhse.html", key: "qhse", sub: [
    { label: "Quality", href: "qhse.html#quality" },
    { label: "Health & Safety", href: "qhse.html#health-safety" },
    { label: "Environment", href: "qhse.html#environment" },
  ]},
];

const CONTACT = {
  company: "ICON Pipeline E&amp;C Co., Ltd.",
  address: "240/37, 19th Floor, Ayothaya Tower,<br>Soi Ratchada 18, Ratchadapisek Road,<br>Huaykwang, Bangkok 10320, Thailand",
  email: "info@iconenc.com",
  yard: "Equipment yard:<br>Free zone complex<br>Tongsukla, Sriracha, Chonburi 20230, Thailand",
};

function buildHeader(active) {
  const items = NAV.map(item => `
      <li class="has-sub">
        <a href="${item.href}"${item.key === active ? ' class="is-active"' : ""}>${item.label}</a>
        <ul class="sub">${item.sub.map(s => `<li><a href="${s.href}">${s.label}</a></li>`).join("")}</ul>
      </li>`).join("");
  return `
  <div class="container">
    <a class="logo" href="index.html" aria-label="ICON Pipeline E&C home">
      <img class="logo-light" src="assets/img/logo-white.svg?v=2" alt="ICON Pipeline E&C">
      <img class="logo-dark" src="assets/img/logo.svg?v=2" alt="ICON Pipeline E&C">
    </a>
    <nav class="nav" aria-label="Main">
      <ul>${items}</ul>
      <a class="nav-cta" href="contact.html">Contact</a>
    </nav>
    <button class="menu-btn" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
  </div>`;
}

function buildFooter() {
  const cols = NAV.map(item => `
      <div>
        <h4>${item.label}</h4>
        <ul>${item.sub.map(s => `<li><a href="${s.href}">${s.label}</a></li>`).join("")}</ul>
      </div>`).join("");
  return `
  <div class="container">
    <div class="cols">
      <div>
        <a class="logo" href="index.html"><img src="assets/img/logo-footer.svg?v=2" alt="ICON Pipeline E&C"></a>
        <p><strong style="color:#fff">${CONTACT.company}</strong><br>${CONTACT.address}</p><p>${CONTACT.yard}</p><p><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></p>
      </div>${cols}
    </div>
    <div class="bottom">
      <span>&copy; 2011&ndash;${new Date().getFullYear()} ICON Pipeline E&amp;C Co., Ltd. All rights reserved.</span>
      <span><a href="contact.html">Contact us</a></span>
    </div>
  </div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const active = document.body.dataset.page || "";
  const header = document.querySelector(".site-header");
  const footer = document.querySelector(".site-footer");
  if (header) header.innerHTML = buildHeader(active);
  if (footer) footer.innerHTML = buildFooter();

  // Header: transparent over the banner, white once the page scrolls
  const onScroll = () => header.classList.toggle("is-solid", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  const btn = header.querySelector(".menu-btn");
  const nav = header.querySelector(".nav");
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", open);
    btn.setAttribute("aria-expanded", open);
  });
  // On mobile, the first tap on a menu heading opens its sub-menu
  header.querySelectorAll(".has-sub > a").forEach(a => {
    a.addEventListener("click", e => {
      if (window.matchMedia("(max-width: 840px)").matches) {
        const li = a.parentElement;
        if (!li.classList.contains("is-open")) { e.preventDefault(); li.classList.add("is-open"); }
      }
    });
  });
  // Close the mobile menu after choosing a link
  nav.querySelectorAll(".sub a, .nav-cta").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("is-open"); document.body.classList.remove("menu-open");
  }));

  // Fade sections in as they scroll into view
  const els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
    }), { threshold: 0.12 });
    els.forEach(el => io.observe(el));
  } else {
    els.forEach(el => el.classList.add("is-visible"));
  }
});
