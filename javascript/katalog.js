/* ============================================================
   DEWY BAR — PREMIUM COMPONENT ENGINE (javascript/katalog.js)
   ============================================================ */

// 1. Komponen Kartu Produk Premium (SINKRON PIX-PERFECT FIGMA)
class ProductPremiumCard extends HTMLElement {
  connectedCallback() {
    const id = this.getAttribute('id') || '';
    const name = this.getAttribute('name') || 'Nama Produk';
    const price = parseFloat(this.getAttribute('price')) || 0;
    const badge = this.getAttribute('badge') || 'Nutrition';
    const img = this.getAttribute('img') || '../../assets/images/placeholder.svg';
    const type = this.getAttribute('type') || 'mentah';

    this.innerHTML = `
      <div class="product-premium-card">
        <div class="prod-card-img-wrap">
          <img class="prod-card-img" src="${img}" alt="${name}" onerror="this.src='../../assets/images/placeholder.svg'">
        </div>
        <div class="prod-card-body">
          <p class="prod-card-title">${name}</p>
          
          <div class="prod-card-nutrition-container">
            <div class="nutrition-white-pill">
              <span class="nutrition-label-top">NUTRITION BAR</span>
              <span class="nutrition-value-text">${badge}</span>
            </div>
          </div>

          <button class="prod-card-pilih-btn" onclick="goToDetail('${id}', '${type}', event)">
            <img src="../../assets/svg/plus-circle-pilih.svg" width="16" height="16">
            PILIH
          </button>
        </div>
      </div>
    `;
  }
}

/* ============================================================
   DEWY BAR — PRODUCT JADI COMPONENT ENGINE
   File: javascript/katalog-jadi.js
   ============================================================ */

class ProductJadiCard extends HTMLElement {
  connectedCallback() {
    const id = this.getAttribute('id') || '';
    const name = this.getAttribute('name') || 'Nama Produk';
    const price = parseFloat(this.getAttribute('price')) || 0;
    const badge = this.getAttribute('badge') || 'Nutrition';
    const img = this.getAttribute('img') || '../../assets/images/placeholder.svg';

    // Format mata uang Rupiah
    const formattedPrice = price > 0 
      ? `Rp ${price.toLocaleString('id-ID')}` 
      : 'Rp 0';

    this.innerHTML = `
      <div class="product-premium-card" onclick="goToShopDetail('${id}')">
        <div class="prod-card-img-wrap">
          <img class="prod-card-img" src="${img}" alt="${name}" onerror="this.src='../../assets/images/placeholder.svg'">
        </div>
        <div class="prod-card-body">
          <p class="prod-card-title">${name}</p>
          <p class="prod-card-price">${formattedPrice}</p>
          
          <div class="prod-card-nutrition-container">
            <div class="nutrition-white-pill">
              <span class="nutrition-label-top">NUTRITION BAR</span>
              <span class="nutrition-value-text">${badge}</span>
            </div>
          </div>

          <button class="prod-card-pilih-btn" onclick="jadiAddToCart('${id}', '${name}', ${price}, '${img}', event)">
            <img src="../../assets/svg/plus-circle-pilih.svg" alt="Icon Plus" width="16" height="16" onerror="this.style.display='none'">
            PILIH
          </button>
        </div>
      </div>
    `;
  }
}

function goToShopDetail(id) {
  window.location.href = `shop-details.html?id=${id}`;
}

// Fungsi Tambah Ke Keranjang Khusus Produk Jadi
function jadiAddToCart(id, name, price, img, event) {
  event.stopPropagation();

  addToCart({
    id,
    name,
    price,
    img,
    type: 'jadi'
  });

  // Notifikasi toast
  const toast = document.getElementById('toastNotif');
  const toastMsg = document.getElementById('toastMsg');

  if (toast && toastMsg) {
    toastMsg.innerText = `${name} dimasukkan ke keranjang!`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }
}

// Registrasi tag kustom baru agar tidak bentrok dengan katalog mentah
if (!customElements.get('product-jadi-card')) {
  customElements.define('product-jadi-card', ProductJadiCard);
}

// Helper navigasi ke detail
function goToDetail(id, type, event) {
  if (event) event.stopPropagation();

  if (type === 'buah') {
    window.location.href = 'katalog-produk-jadi-buah.html';
  } else if (type === 'sayur') {
    window.location.href = 'katalog-produk-jadi-sayur.html';
  }
}

// 2. Komponen Kartu Petani Premium (SINKRON FIGMA PERFECT DETAIL)
class FarmerPremiumCard extends HTMLElement {
  connectedCallback() {
    const id = this.getAttribute('id') || '';
    const name = this.getAttribute('name') || 'Nama Petani';
    const lokasi = this.getAttribute('lokasi') || 'Lokasi';
    const img = this.getAttribute('img') || '../../assets/images/placeholder.svg';
    
    // Memisah string URL gambar buah
    const crops = this.getAttribute('crops-img') ? this.getAttribute('crops-img').split(',') : [];
    const cropBadges = crops.map(cropUrl => `
      <div class="farmer-crop-direct">
        <img src="${cropUrl.trim()}" onerror="this.src='../../assets/images/placeholder.svg'">
      </div>
    `).join('');

    this.innerHTML = `
      <div class="farmer-premium-card" onclick="goToFarmerDetail('${id}')">
        
        <div class="farmer-avatar-wrap">
          <img class="farmer-avatar" src="${img}" alt="${name}" onerror="this.src='../../assets/images/placeholder.svg'">
          
          <div class="farmer-badge-home-accent">
            <img src="../../assets/svg/icon-card-petani.svg" alt="Home Icon" width="16" height="16" onerror="this.style.display='none'">
          </div>
        </div>

        <div class="farmer-info-block">
          <p class="farmer-card-name">${name}</p>
          <p class="farmer-card-loc">${lokasi}</p>
        </div>

        <div class="farmer-products-label">
          <img src="../../assets/svg/icon-buah-card-petani.svg" alt="Products Icon" width="16" height="16" onerror="this.style.display='none'">
          <span>Products</span>
        </div>

        <div class="farmer-mini-crops">
          ${cropBadges}
        </div>

        <button class="farmer-action-wide-btn" onclick="event.stopPropagation(); goToFarmerDetail('${id}')">
          LIHAT DETAIL PRODUK
        </button>

      </div>
    `;
  }
}

function customAddToCart(id, name, price, img, event) {
  event.stopPropagation();

  addToCart({
    id,
    name,
    price,
    img,
    type: 'mentah'
  });

  const toast = document.getElementById('toastNotif');
  const toastMsg = document.getElementById('toastMsg');

  if (toast && toastMsg) {
    toastMsg.innerText = `${name} dimasukkan ke keranjang!`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }
}

function goBack() {
  if (document.referrer) {
    history.back();
  } else {
    window.location.href = 'katalog-produk-jadi-buah.html';
  }
}

// ============================================================
// LOGIKA UNTUK HALAMAN DETAIL PRODUK (SINKRON FIGMA TWO-COLUMN)
// ============================================================
function renderProductDetail(product) {
  if (!product) return;

  // 1. Panel Atas (Nama, Harga, Gambar Utama)
  if (document.getElementById('detailName')) document.getElementById('detailName').innerText = product.name;
  if (document.getElementById('detailPrice')) document.getElementById('detailPrice').innerText = `Rp${Number(product.price).toLocaleString('id-ID')}`;
  
  const imgEl = document.getElementById('detailImg');
  if (imgEl) imgEl.src = product.img || '../../assets/img/smart-pre-order/minty-strawberry.png';

  // 2. Mengubah Gambar Bahan Utama (Signature Of) secara Dinamis
  const sigImg = document.getElementById('signatureImg');
  if (sigImg && product.signature_buah) {
    // Menyesuaikan gambar stroberi/pisang/mangga berdasarkan database produk
    sigImg.src = `../../assets/img/smart-pre-order/${product.signature_buah}.png`;
    sigImg.alt = product.signature_buah;
  }

  // 3. Kolom Bawah Kiri: Deskripsi Utama Teks
  const descEl = document.getElementById('detailDesc');
  if (descEl) descEl.innerText = product.deskripsi || "No description available for this product.";

  // 4. Kolom Bawah Kiri: Komposisi Buah (Array Objek)
  const compGrid = document.getElementById('compositionGrid');
  if (compGrid) {
    compGrid.innerHTML = ""; // Reset kontainer
    if (product.komposisi && product.komposisi.length > 0) {
      product.komposisi.forEach(item => {
        compGrid.innerHTML += `
          <div class="composition-item">
            <div class="composition-item__icon">
              <img src="../../assets/img/smart-pre-order/${item.icon}.png" alt="${item.nama}">
            </div>
            <span class="composition-item__name">${item.nama}</span>
          </div>
        `;
      });
    }
  }

  // 5. Kolom Bawah Kanan: Nutrition Facts (Pil Vitamin Kotak Ceria)
  const nutritionPills = document.getElementById('nutritionPills');
  if (nutritionPills) {
    nutritionPills.innerHTML = "";
    if (product.nutrisi && product.nutrisi.length > 0) {
      product.nutrisi.forEach(nut => {
        // nut.warna bisa bernilai: 'green', 'yellow', 'blue', atau 'pink' sesuai CSS baru kita
        nutritionPills.innerHTML += `
          <div class="nutrition-pill ${nut.warna || 'green'}">${nut.nama_vitamin}</div>
        `;
      });
    }
  }

  // 6. Kolom Bawah Kanan: Benefits List
  const benefitsList = document.getElementById('benefitsList');
  if (benefitsList) {
    benefitsList.innerHTML = "";
    if (product.manfaat && product.manfaat.length > 0) {
      product.manfaat.forEach(manfaatTeks => {
        benefitsList.innerHTML += `<li>${manfaatTeks}</li>`;
      });
    }
  }
}

// Daftarkan komponen secara aman ke engine browser
if (!customElements.get('product-card')) {
  customElements.define('product-card', ProductPremiumCard);
}
if (!customElements.get('farmer-card')) {
  customElements.define('farmer-card', FarmerPremiumCard);
}

/* ===============================
   PRODUCT DETAIL CONTROLLER
   =============================== */

let qty = 1;
let currentProduct = null;

// Setup halaman detail saat dibuka
document.addEventListener('DOMContentLoaded', () => {
  const productId = getProductIdFromURL();

  if (!productId) return;

  // 🔴 SEMENTARA (dummy data, nanti bisa dari database)
  currentProduct = {
    id: productId,
    name: document.getElementById('detailName')?.innerText || 'Produk',
    price: parseInt(document.getElementById('detailPrice')?.innerText.replace(/\D/g,'')) || 0,
    img: document.getElementById('detailImg')?.src || '',
    type: 'jadi'
  };

  setupQuantity();
  setupAddToCart();
  setupFarmerButton();
});

// Tambahkan fungsi ini di javascript/katalog.js untuk menangani klik detail petani
function goToFarmerDetail(id) {
  if (!id) {
    console.warn("ID Petani tidak ditemukan!");
    return;
  }
  // Alihkan ke halaman detail petani yang kamu tuju (bisa disesuaikan nama filenya)
  window.location.href = `profil-petani.html?id=${id}`;
}
