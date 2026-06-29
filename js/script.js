// ==========================
// Sticky Nav Color Change
// ==========================
document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector(".main-nav");
  if (!nav) return;
  window.addEventListener("scroll", function () {
    nav.classList.toggle("scrolled", window.scrollY > 10);
  });
});

// ==========================
// Hero Banner Slider
// ==========================
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".banner-person");
  const dots = document.querySelectorAll(".slide-dots .dot");

  if (!slides.length) return;

  let current = 0;
  let autoSlide;

  function showSlide(index) {
    slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    current = index;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }
  function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 4000);
  }
  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", function () {
      showSlide(i);
      stopAutoSlide();
      startAutoSlide();
    });
  });

  startAutoSlide();
});

// ==========================
// Top Selling Owl Carousel
// ==========================
$(document).ready(function () {
  $("#tsOwl").owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    smartSpeed: 500,
    nav: true,
    navText: ["<span></span>", "<span></span>"],
    dots: false,
    margin: 12,
    responsive: {
      0: { items: 2 },
      768: { items: 2 },
      1024: { items: 3 },
    },
  });

  // ==========================
  // New Arrivals Owl Carousel
  // ==========================
  $("#naOwl").owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 3200,
    autoplayHoverPause: true,
    smartSpeed: 500,
    nav: true,
    navText: ["<span></span>", "<span></span>"],
    dots: false,
    margin: 14,
    responsive: {
      0: { items: 2 },
      640: { items: 2 },
      1024: { items: 3 },
    },
  });

  // ==========================
  // Social Commerce Owl Carousel
  // ==========================
  $("#scOwl").owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 3500,
    autoplayHoverPause: true,
    smartSpeed: 500,
    nav: true,
    navText: ["<span></span>", "<span></span>"],
    dots: false,
    margin: 14,
    responsive: {
      0: { items: 1 },
      480: { items: 2 },
      768: { items: 3 },
      1024: { items: 4 },
      1280: { items: 5 },
    },
  });
});

// ==========================
// Featured 2x2 Carousel
// ==========================
$(document).ready(function () {
  const products = $("#featuredCarousel .featured-product");
  const itemsPerPage = 4;
  let currentPage = 0;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  function showPage(page) {
      products.removeClass("is-visible");
      const start = page * itemsPerPage;
      const end = start + itemsPerPage;
      products.slice(start, end).addClass("is-visible");
  }

  if (products.length > 0) {
      showPage(currentPage);
  }

  $("#featuredCarousel .featured-nav--prev").click(function(e) {
      e.preventDefault();
      currentPage = (currentPage - 1 + totalPages) % totalPages;
      showPage(currentPage);
  });

  $("#featuredCarousel .featured-nav--next").click(function(e) {
      e.preventDefault();
      currentPage = (currentPage + 1) % totalPages;
      showPage(currentPage);
  });
});

// ==========================
// Scroll To Top Button
// ==========================
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("scrollTopBtn");
  if (!btn) return;
  window.addEventListener("scroll", function () {
    btn.classList.toggle("visible", window.scrollY > 400);
  });
  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// ==========================
// Mobile Bottom Bar + "All Categories" Menu Modal
// (data is read from the existing .sidebar-list so the
// 17 categories never need to be duplicated by hand)
// ==========================
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const overlay = document.getElementById("categoryModalOverlay");
  const closeBtn = document.getElementById("categoryModalClose");
  const listEl = document.getElementById("categoryModalList");
  const panelEl = document.getElementById("categoryModalPanel");
  const homeBtn = document.getElementById("mbHome");
  const allMbItems = document.querySelectorAll(".mb-item");

  if (!menuBtn || !overlay || !listEl || !panelEl) return;

  // ---- Build category data straight from the desktop sidebar ----
  function getCategories() {
    const sidebarItems = Array.from(document.querySelectorAll(".sidebar-list > li"));
    return sidebarItems.map(function (li) {
      const name = (li.querySelector("a > span") || {}).textContent?.trim() || "";
      const groups = [];

      const sub = li.querySelector(".mega-sub");
      if (sub) {
        const title = (sub.querySelector(".mega-sub-title") || {}).textContent?.trim() || "";
        const links = Array.from(sub.querySelectorAll(".mega-sub-list a")).map((a) => a.textContent.trim());
        if (title) groups.push({ title, links });
      }

      li.querySelectorAll(".mega-overview .mega-group").forEach(function (group) {
        const title = (group.querySelector(".mega-group-title") || {}).textContent?.trim() || "";
        const links = Array.from(group.querySelectorAll("a")).map((a) => a.textContent.trim());
        if (title) groups.push({ title, links });
      });

      return { name, groups };
    });
  }

  let categories = [];
  let activeIndex = 0;

  function renderList() {
    listEl.innerHTML = categories
      .map(function (cat, i) {
        const activeCls = i === activeIndex ? " is-active" : "";
        return '<button type="button" class="cm-cat' + activeCls + '" data-index="' + i + '">' + cat.name + "</button>";
      })
      .join("");
  }

  function renderPanel() {
    const cat = categories[activeIndex];
    if (!cat) {
      panelEl.innerHTML = "";
      return;
    }
    const groupsHtml = cat.groups
      .map(function (group, gi) {
        const linksHtml = group.links.map((l) => '<a href="#">' + l + "</a>").join("");
        return (
          '<div class="cm-group">' +
          '<button type="button" class="cm-group-toggle" data-gindex="' +
          gi +
          '"><span>' +
          group.title +
          '</span><i class="cm-chevron">&#9662;</i></button>' +
          '<div class="cm-group-links">' +
          linksHtml +
          "</div>" +
          "</div>"
        );
      })
      .join("");
    panelEl.innerHTML = '<h3 class="cm-panel-title">' + cat.name + "</h3>" + groupsHtml;
  }

  listEl.addEventListener("click", function (e) {
    const btn = e.target.closest(".cm-cat");
    if (!btn) return;
    activeIndex = Number(btn.dataset.index);
    renderList();
    renderPanel();
    panelEl.scrollTop = 0;
  });

  panelEl.addEventListener("click", function (e) {
    const toggle = e.target.closest(".cm-group-toggle");
    if (!toggle) return;
    toggle.parentElement.classList.toggle("is-open");
  });

  function setActiveTab(tab) {
    allMbItems.forEach((item) => item.classList.toggle("is-active", item === tab));
  }

  function openModal() {
    categories = getCategories();
    activeIndex = 0;
    renderList();
    renderPanel();
    overlay.classList.add("is-open");
    document.body.classList.add("category-modal-active");
    setActiveTab(menuBtn);
  }

  function closeModal() {
    overlay.classList.remove("is-open");
    document.body.classList.remove("category-modal-active");
    setActiveTab(homeBtn);
  }

  menuBtn.addEventListener("click", function (e) {
    e.preventDefault();
    overlay.classList.contains("is-open") ? closeModal() : openModal();
  });

  closeBtn?.addEventListener("click", closeModal);

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeModal();
  });

  // Home tab scrolls back to the top of the page
  homeBtn?.addEventListener("click", function (e) {
    e.preventDefault();
    closeModal();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Search / Sign Up / Sign In are placeholders for now —
  // just keep them from jumping the page via the empty href="#"
  document.querySelectorAll('.mb-item[data-mb="search"], .mb-item[data-mb="signup"], .mb-item[data-mb="signin"]').forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.preventDefault();
    });
  });
});