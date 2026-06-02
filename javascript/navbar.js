/* ============================================================
   DEWY BAR — NAVBAR.JS
   ============================================================ */

function initNavbar() {
  const navbar    = document.getElementById('mainNavbar');
  const hamburger = document.getElementById('hamburgerBtn');

  if (!navbar) return;

  /* --- SHADOW SAAT SCROLL --- */
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
  const hasHero = document.querySelector('.katalog-hero, .katalog-hero-clean, .spo-hero, .cart-hero, .details-hero, .pp-hero, .jp-hero, .payment-hero, .profile-hero, .hero, .home-hero');
  if (!hasHero || window.scrollY > 20) navbar.classList.add('scrolled');

  /* --- HAMBURGER (mobile) --- */
  if (hamburger) {
    const allNavLists = document.querySelectorAll('.navbar__nav-links');

    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      allNavLists.forEach(list => list.classList.toggle('mobile-open', isOpen));
    });

    allNavLists.forEach(list => {
      list.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('open');
          allNavLists.forEach(l => l.classList.remove('mobile-open'));
        });
      });
    });
  }

  /* --- HIGHLIGHT LINK AKTIF --- */
  const currentPath = window.location.pathname;
  document.querySelectorAll('.navbar__menu-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (!href || href === '#') return;
    const cleanHref = href.replace(/^(\.\.\/)*/,'');
    if (currentPath.includes(cleanHref)) link.classList.add('active');
    if ((currentPath.endsWith('index.html') || currentPath.endsWith('/')) && href.includes('index.html')) {
      link.classList.add('active');
    }
  });

  /* --- SMOOTH SCROLL --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - (navbar.offsetHeight + 8);
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* --- TOGGLE PROFILE DROPDOWN --- */
function toggleProfileDropdown() {
  const dropdown = document.getElementById('profileDropdown');
  if (dropdown) dropdown.classList.toggle('open');
}

document.addEventListener('click', function (e) {
  const dropdown = document.getElementById('profileDropdown');
  const profile  = e.target.closest('.navbar__profile');
  if (dropdown && !profile) dropdown.classList.remove('open');
});

document.addEventListener('DOMContentLoaded', initNavbar);