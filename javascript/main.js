/* ============================================================
   DEWY BAR — MAIN.JS
   File: javascript/main.js
   Fungsi: Homepage CTA, scroll animations, smart pre-order, payment
   ============================================================ */

/* ============================================================
   1. HOMEPAGE — CTA Banner Real-Time Route Auth Check (UPDATED)
   ============================================================ */
function initHomeCTA() {
  const ctaActionContainer = document.getElementById('ctaActionContainer');
  if (!ctaActionContainer) return;

  // Baca status login dari LocalStorage
  const loggedIn = localStorage.getItem('dewybar_logged_in') === 'true';

  if (loggedIn) {
    // JIKA SUDAH LOGIN -> Tombol Shop Now mengarah ke Katalog Produk
    ctaActionContainer.innerHTML = `
      <a href="views/AfterLogin/katalog-produk-mentah.html" class="btn-shop-now">
        Shop Now
      </a>
    `;
  } else {
    // JIKA BELUM LOGIN -> Tombol Shop Now mengarah ke halaman Login / Sign Up
    ctaActionContainer.innerHTML = `
      <a href="views/BeforeLogin/login-page.html" class="btn-shop-now">
        Shop Now
      </a>
    `;
  }
}

/* ============================================================
   2. ANIMASI SCROLL (IntersectionObserver) - UPDATED FOR NEW CARDS
   ============================================================ */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  /* Mendaftarkan .offer-product-card (Kartu Kotak Baru) & .category-item (Our Product Grid Baru) 
     agar animasi pemunculan fade-in berjalan mulus saat di-scroll.
  */
  document.querySelectorAll('.animate-fadeInUp, .team-card, .offer-product-card, .category-item, .produk-card, .testi-card, .farmer-card-jp, .jp-section').forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

/* ============================================================
   3. NAVBAR ABOUT & CONTACT SCROLL (homepage)
   ============================================================ */
function initHomeNavScroll() {
  document.querySelectorAll('[data-scroll]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('data-scroll'));
      if (target) {
        const offset = 70;
        const top    = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ============================================================
   4. PRODUCT TABS (homepage) - DISABLED (SAFE)
   ============================================================ */
function initProductTabs() {
  // Dinonaktifkan dengan aman karena section "Our Product" beralih menggunakan susunan grid 4 kolom statis
}

/* ============================================================
   5. SMART PRE-ORDER — Kalender
   ============================================================ */
function initSmartPreOrder() {
  const calDates  = document.getElementById('calDates');
  const calMonth  = document.getElementById('calMonth');
  const prevBtn   = document.getElementById('calPrev');
  const nextBtn   = document.getElementById('calNext');

  if (!calDates) return;

  function calculateSharedShipping(distanceKm, totalPeople) {
    return Math.ceil((distanceKm * 2500) / totalPeople);
  }

  let currentDate = new Date();
  let selectedDate = null;

  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  /* Pasang listener timeSelect SEKALI saja di sini, bukan di dalam renderCalendar */
  const timeSelect = document.getElementById('timeSelect');
  if (timeSelect) {
    function applyTimeSelection(val) {
      if (!val) return;
      localStorage.setItem('dewybar_delivery_time', val);
      const shippingCost = calculateSharedShipping(8, 5);
      localStorage.setItem('dewybar_shipping', shippingCost);
      const shippingBox = document.getElementById('shippingTotal');
      if (shippingBox) shippingBox.textContent = `Rp${shippingCost.toLocaleString('id-ID')}`;
    }
    /* Simpan nilai default (option selected) langsung saat halaman load */
    applyTimeSelection(timeSelect.value);
    timeSelect.addEventListener('change', function () { applyTimeSelection(this.value); });
  }

  function renderCalendar() {
    const year  = currentDate.getFullYear();
    const month = currentDate.getMonth();
    if (calMonth) calMonth.textContent = `${MONTHS[month]} ${year}`;

    const firstDay  = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const today     = new Date();
    today.setHours(0,0,0,0);

    const orderHistory = JSON.parse(localStorage.getItem('dewybar_order_history') || '[]');
    const offset = (firstDay + 6) % 7;

    let html = '';
    for (let i = 0; i < offset; i++) html += '<span></span>';

    for (let d = 1; d <= totalDays; d++) {
      const thisDate = new Date(year, month, d);
      thisDate.setHours(0,0,0,0);

      let cls = 'cal-date-cell';
      const hasHistory = orderHistory.some(o => new Date(o.date).toDateString() === thisDate.toDateString());

      if (thisDate < today) {
        cls += ' past';
        if (hasHistory) cls += ' has-order';
      } else if (thisDate.getTime() === today.getTime()) {
        cls += ' today';
      }
      if (selectedDate && thisDate.getTime() === selectedDate.getTime()) cls += ' active';

      html += `<button class="${cls}" data-date="${thisDate.toISOString()}">${d}</button>`;
    }
    calDates.innerHTML = html;

    calDates.querySelectorAll('.cal-date-cell').forEach(btn => {
      btn.addEventListener('click', function () {
        selectedDate = new Date(this.getAttribute('data-date'));
        renderCalendar();
        handleDateSelect(selectedDate);
      });
    });
  }

  function handleDateSelect(date) {

    localStorage.setItem(
        'dewybar_delivery_date',
        date.toISOString()
    );

    const today = new Date(); today.setHours(0,0,0,0);
    const rightPanel = document.getElementById('rightPanel');
    const pesananBox = document.getElementById('pesananBox');

    if (date < today) {
      /* Masa lalu: tampilkan riwayat */
      showPesananKamu(true);
    } else {
      /* Hari ini / masa depan: tampilkan pilih waktu & ongkir */
      showPesananKamu(false);
    }

    localStorage.setItem(
        'dewybar_delivery_date',
        date.toISOString()
    );

  }

  function showPesananKamu(isPast) {
    const cart     = JSON.parse(localStorage.getItem('dewybar_cart') || '[]');
    const container = document.getElementById('pesananList');
    const empty     = document.getElementById('pesananEmpty');
    if (!container) return;

    if (cart.length === 0) {
      if (empty)     empty.style.display     = 'block';
      container.style.display = 'none';
    } else {
      if (empty)     empty.style.display     = 'none';
      container.style.display = 'block';
      container.innerHTML = cart.map(item => `
        <div class="spo-pesanan-item">
          <img class="spo-pesanan-img" src="${item.img}" alt="${item.name}" onerror="this.src='../../assets/images/placeholder.svg'">
          <div class="spo-pesanan-info">
            <p class="spo-pesanan-name">${item.name}</p>
            <p class="spo-pesanan-price">Rp${Number(item.price).toLocaleString('id-ID')}</p>
          </div>
          ${!isPast ? `<button class="btn-selesai" onclick="removeFromCart('${item.id}')">Selesai</button>` : ''}
        </div>`).join('');
    }
  }

  //baru

    const areaOrders = {
        lowokwaru: 5,
        dau: 3,
        suhat: 8,
        batu: 2
    };

  /* Nav bulan */
  if (prevBtn) prevBtn.addEventListener('click', () => { currentDate.setMonth(currentDate.getMonth() - 1); renderCalendar(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { currentDate.setMonth(currentDate.getMonth() + 1); renderCalendar(); });

  renderCalendar();
  showPesananKamu(false);

  /* Tombol Pesan Sekarang → ke katalog */
  const pesanBtn =
  document.getElementById(
  'pesanSekarangBtn'
  );

  if(pesanBtn)
  {
      pesanBtn.addEventListener(
          'click',
          () => {

              const selectedDate =
              localStorage.getItem(
                  'dewybar_delivery_date'
              );

              const selectedTime =
              localStorage.getItem(
                  'dewybar_delivery_time'
              );

              const shipping =
              localStorage.getItem(
                  'dewybar_shipping'
              );

              localStorage.setItem(
                  'dewybar_preorder',
                  JSON.stringify({
                      date: selectedDate || new Date().toISOString(),
                      time: selectedTime || '',
                      shipping: shipping || '0'
                  })
              );

              window.location.href =
              './katalog-produk-mentah.html';

          }
      );
    }

  }

/* ============================================================
   6. PAYMENT — Timer & Konfirmasi
   ============================================================ */
function initPayment() {
  const user         = JSON.parse(localStorage.getItem('dewybar_user') || '{}');
  const savedProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
  const preorderDate = localStorage.getItem('dewybar_delivery_date');
  const preorderTime = localStorage.getItem('dewybar_delivery_time');
  const shipping     = localStorage.getItem('dewybar_shipping');

  const displayName    = user.name || savedProfile.name || '-';
  const displayAddress = savedProfile.address || user.address || 'Jl. Bendungan Batu Jahe No.9';

  setPayVal('payName',   displayName);
  setPayVal('payAddr',   displayAddress);
  setPayVal('payOngkir', shipping ? `Rp${Number(shipping).toLocaleString('id-ID')}` : 'Rp0');

  if (preorderDate) setPayVal('payDate', formatDateID(new Date(preorderDate)));
  if (preorderTime) setPayVal('payTime', preorderTime);

  /* Countdown timer 5 menit */
  let seconds = 300;
  const timerEl = document.getElementById('payTimer');
  const interval = setInterval(() => {
    seconds--;
    if (timerEl) timerEl.textContent = formatTimer(seconds);
    if (seconds <= 0) {
      clearInterval(interval);
      showPaymentModal('gagal');
    }
  }, 1000);

  /* Tombol konfirmasi */
  const konfBtn = document.getElementById('konfirmasiBtn');
  if (konfBtn) konfBtn.addEventListener('click', () => {
    clearInterval(interval);
    clearCart();
    showPaymentModal('berhasil');
  });
}

function setPayVal(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }

function formatTimer(s) {
  const m  = Math.floor(s / 60);
  const ss = s % 60;
  return `${String(m).padStart(2,'0')}:${String(ss).padStart(2,'0')}`;
}

function formatDateID(d) {
  const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function showPaymentModal(type) {
  const overlay = document.getElementById('payModalOverlay');
  if (!overlay) return;
  overlay.classList.add('open');

  const icon  = document.getElementById('payModalIcon');
  const title = document.getElementById('payModalTitle');
  if (type === 'berhasil') {
    if (icon)  { icon.className = 'modal-icon success'; icon.innerHTML = '<i class="bi bi-check-lg"></i>'; }
    if (title) title.textContent = 'Pembayaran Selesai';
  } else {
    if (icon)  { icon.className = 'modal-icon danger'; icon.innerHTML = '<i class="bi bi-x-lg"></i>'; }
    if (title) title.textContent = 'Pembayaran Gagal';
  }

  setTimeout(() => {
    window.location.href = type === 'berhasil' ? './katalog-produk-mentah.html' : './keranjang.html';
  }, 2500);
}

/* ============================================================
   7. PROFILE PENGGUNA — Edit & Simpan
   ============================================================ */
function initProfilePage() {
  // Baca dari kedua key (dewybar_user dari auth, userProfile dari form simpan)
  const authUser     = JSON.parse(localStorage.getItem('dewybar_user') || '{}');
  const savedProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');

  // Gabungkan: savedProfile lebih prioritas untuk field form
  const user = { ...authUser, ...savedProfile };

  /* Isi form */
  setFormVal('profileName',    user.name || '');
  setFormVal('profileUsername', user.username || '');
  setFormVal('profilePhone',   user.phone || '');
  setFormVal('profileAddress', user.address || '');

  /* Tampilkan nama di sidebar */
  const nameEl = document.getElementById('profileDisplayName');
  if (nameEl) nameEl.textContent = user.name || 'Pengguna';

  /* Foto avatar */
  const avatarEl = document.getElementById('profileAvatar');
  if (avatarEl && user.avatar) avatarEl.src = user.avatar;

  /* Simpan profil — tulis ke KEDUA key agar konsisten */
  const saveBtn = document.getElementById('saveProfileBtn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const updated = {
        ...user,
        name:     document.getElementById('profileName')?.value || user.name,
        username: document.getElementById('profileUsername')?.value || '',
        phone:    document.getElementById('profilePhone')?.value || '',
        address:  document.getElementById('profileAddress')?.value || ''
      };
      localStorage.setItem('dewybar_user',    JSON.stringify(updated));
      localStorage.setItem('userProfile',     JSON.stringify(updated));
      showToast('Profil berhasil disimpan ✓');
      if (nameEl) nameEl.textContent = updated.name;
    });
  }
}

function setFormVal(id, val) { const el = document.getElementById(id); if (el) el.value = val; }

/* ============================================================
   8. CONTACT FORM
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Pesan berhasil dikirim! Kami akan segera menghubungi Anda. 📩');
    form.reset();
  });
}

/* ============================================================
   9. INIT ALL
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  initHomeCTA();
  initScrollAnimations();
  initHomeNavScroll();
  initProductTabs();
  initSmartPreOrder();
  initPayment();
  initProfilePage();
  initContactForm();
});

/* =========================================================================
   LOGIKA PEMANGGILAN PARTIAL COMPONENT FOOTER DI BAGIAN PALING BAWAH FILE
   ========================================================================= */
document.addEventListener("DOMContentLoaded", () => {
    loadPartialFooter();
});

function loadPartialFooter() {
    const container = document.getElementById("footer-container");
    if (!container) return;

    const isSubPage = window.location.href.includes("/views/");
    const imgBase   = isSubPage ? "../../assets/svg/" : "assets/svg/";

    container.innerHTML = `
<div class="footer-stripe"></div>
<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <div class="footer__brand">
        <div class="footer__brand-logo">
          <img src="${imgBase}logo_dewy_bar_putih.svg.svg" alt="Dewy Bar" style="height:40px;margin-bottom:10px;">
        </div>
        <p class="footer__brand-desc">Platform agritech Malang yang menghadirkan buah dan sayur segar langsung dari petani lokal ke dapur Anda. Solusi hidup sehat, praktis, dan terjangkau bagi mahasiswa Malang Raya.</p>
      </div>
      <div>
        <h5 class="footer__col-title">Our Social Media</h5>
        <div class="footer__social-list">
          <a href="https://twitter.com" target="_blank" class="footer__social-item" style="text-decoration:none;">
            <div class="footer__social-icon"><i class="bi bi-twitter-x"></i></div>
            <span class="footer__social-text">Dewy Bar</span>
          </a>
          <a href="https://facebook.com" target="_blank" class="footer__social-item" style="text-decoration:none;">
            <div class="footer__social-icon"><i class="bi bi-facebook"></i></div>
            <span class="footer__social-text">Dewy Bar Indonesia</span>
          </a>
          <a href="https://instagram.com" target="_blank" class="footer__social-item" style="text-decoration:none;">
            <div class="footer__social-icon"><i class="bi bi-instagram"></i></div>
            <span class="footer__social-text">@DewyBar_id</span>
          </a>
          <a href="https://tiktok.com" target="_blank" class="footer__social-item" style="text-decoration:none;">
            <div class="footer__social-icon"><i class="bi bi-tiktok"></i></div>
            <span class="footer__social-text">@DewyBar.id</span>
          </a>
        </div>
      </div>
      <div>
        <h5 class="footer__col-title">Contact</h5>
        <div class="footer__contact-list">
          <div class="footer__contact-item"><i class="bi bi-telephone-fill footer__contact-icon"></i><span>+6287868889068</span></div>
          <div class="footer__contact-item"><i class="bi bi-envelope-fill footer__contact-icon"></i><span>needhelp@company.com</span></div>
          <div class="footer__contact-item"><i class="bi bi-geo-alt-fill footer__contact-icon"></i><span>Jl. Sigura-Gura, Lowokwaru, Malang</span></div>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <div class="footer__copyright">&copy; All Copyright 2026 by Dewy Bar</div>
      <div class="footer__bottom-links">
        <a href="#" class="footer__bottom-link" style="text-decoration:none;">Terms of Use</a>
        <a href="#" class="footer__bottom-link" style="text-decoration:none;">Privacy Policy</a>
      </div>
    </div>
  </div>
</footer>`;
}
