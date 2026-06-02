/* ============================================================
   DEWY BAR — AUTH.JS
   ============================================================ */

/* --- DETEKSI LOKASI FILE SAAT INI --- */
function getBasePath() {
  const src = document.querySelector('script[src*="auth.js"]')?.getAttribute('src') || '';
  if (src.startsWith('../../')) return '../../';
  if (src.startsWith('../'))    return '../';
  return '';
}

/* --- VALIDASI --- */
function isValidEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

/* --- TAMPILKAN PESAN --- */
function showAuthMsg(el, text, type = 'error') {
  if (!el) return;
  el.textContent   = text;
  el.className     = 'auth-alert ' + type;
  el.style.display = 'block';
}

/* --- REGISTER --- */
function handleRegister() {
  const name    = document.getElementById('regName')?.value.trim();
  const email   = document.getElementById('regEmail')?.value.trim();
  const pass    = document.getElementById('regPassword')?.value;
  const confirm = document.getElementById('regConfirm')?.value;
  const errEl   = document.getElementById('registerError');
  const btn     = document.getElementById('registerBtn');

  if (errEl) errEl.style.display = 'none';

  if (!name || !email || !pass || !confirm) { showAuthMsg(errEl, 'Semua field wajib diisi!'); return; }
  if (!isValidEmail(email))                 { showAuthMsg(errEl, 'Format email tidak valid.'); return; }
  if (pass.length < 8)                      { showAuthMsg(errEl, 'Password minimal 8 karakter.'); return; }
  if (pass !== confirm)                     { showAuthMsg(errEl, 'Konfirmasi password tidak cocok.'); return; }

  const users = JSON.parse(localStorage.getItem('dewybar_users') || '[]');
  if (users.some(u => u.email === email)) { showAuthMsg(errEl, 'Email sudah terdaftar. Silakan login.'); return; }

  users.push({ id: Date.now(), name, email, password: pass, avatar: '' });
  localStorage.setItem('dewybar_users', JSON.stringify(users));

  showAuthMsg(errEl, 'Akun berhasil dibuat! Mengarahkan ke login...', 'success');
  if (btn) { btn.textContent = '✓ Berhasil!'; btn.disabled = true; }

  /* Dari views/BeforeLogin/ → login-page.html (satu folder) */
  setTimeout(() => { window.location.href = 'login-page.html'; }, 1800);
}

/* --- LOGIN --- */
function handleLogin() {
  const name  = document.getElementById('loginName')?.value.trim();
  const email = document.getElementById('loginEmail')?.value.trim();
  const pass  = document.getElementById('loginPassword')?.value;
  const errEl = document.getElementById('loginError');
  const btn   = document.getElementById('loginBtn');

  if (errEl) errEl.style.display = 'none';

  // Validasi kelengkapan data termasuk kolom nama baru
  if (!name || !email || !pass) { 
    showAuthMsg(errEl, 'Nama, Email, dan Password wajib diisi!'); 
    return; 
  }
  if (!isValidEmail(email)) { 
    showAuthMsg(errEl, 'Format email tidak valid.'); 
    return; 
  }

  const users = JSON.parse(localStorage.getItem('dewybar_users') || '[]');
  // Mencocokkan data nama, email, dan password di lokal data penyimpanan
  const found = users.find(u => u.name.toLowerCase() === name.toLowerCase() && u.email === email && u.password === pass);

  if (!found) { 
    showAuthMsg(errEl, 'Data pengguna tidak ditemukan atau password salah.'); 
    return; 
  }

  // Menyimpan status sesi masuk aktif
  localStorage.setItem('dewybar_logged_in', 'true');
  localStorage.setItem('dewybar_user', JSON.stringify({
    id: found.id, name: found.name, email: found.email, avatar: found.avatar || ''
  }));

  if (btn) { btn.textContent = '✓ Masuk...'; btn.disabled = true; }

  /* Sukses redirect ke dashboard utama */
  setTimeout(() => { window.location.href = '../../index.html'; }, 1000);
}

/* --- LOGOUT --- */
function handleLogout() {
  localStorage.removeItem('dewybar_logged_in');
  localStorage.removeItem('dewybar_user');
  /* Deteksi posisi: AfterLogin = naik 2 level, root = tetap */
  const base = getBasePath();
  window.location.href = base + 'index.html';
}

/* --- PROTEKSI HALAMAN (AfterLogin) --- */
function requireLogin() {
  if (localStorage.getItem('dewybar_logged_in') !== 'true') {
    window.location.href = getBasePath() + 'views/BeforeLogin/login-page.html';
  }
}

/* --- AUTO-REDIRECT & ISI NAVBAR --- */
document.addEventListener('DOMContentLoaded', function () {
  const path   = window.location.pathname.replace(/\\/g, '/');
  const isAuth = path.includes('login-page') || path.includes('regist-page');

  /* Jika sudah login tapi buka halaman auth → redirect ke home */
  if (isAuth && localStorage.getItem('dewybar_logged_in') === 'true') {
    window.location.href = '../../index.html';
    return;
  }

  /* Isi nama & avatar di navbar dropdown */
  const userRaw = localStorage.getItem('dewybar_user');
  if (userRaw) {
    try {
      const user     = JSON.parse(userRaw);
      const nameEl   = document.getElementById('userName');
      const avatarEl = document.querySelector('#userAvatar .navbar__avatar');
      if (nameEl && user.name)          nameEl.textContent = user.name;
      if (avatarEl && user.avatar)      avatarEl.src       = user.avatar;
    } catch(e) {}
  }
});
