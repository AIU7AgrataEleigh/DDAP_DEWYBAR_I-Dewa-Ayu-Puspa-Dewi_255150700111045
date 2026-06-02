/* ============================================================
   DEWY BAR — CART.JS
   Logika keranjang belanja (localStorage-based)
   ============================================================ */

/* --- UTILITAS DASAR --- */
function getCart()       { return JSON.parse(localStorage.getItem('dewybar_cart') || '[]'); }
function saveCart(items) { localStorage.setItem('dewybar_cart', JSON.stringify(items)); }

function getTotalItems() {
  return getCart().reduce((t, i) => t + (i.qty || 1), 0);
}

function getTotalPrice() {
  return getCart().reduce((t, i) => t + i.price * (i.qty || 1), 0);
}

function formatRupiah(n) { return 'Rp' + Number(n).toLocaleString('id-ID'); }

/* --- TAMBAH ITEM --- */
function addToCart(product, qty = 1) {
  const cart  = getCart();
  const idx   = cart.findIndex(i => i.id === product.id);
  if (idx !== -1) {
    cart[idx].qty += qty;
  } else {
    cart.push({
      id:    product.id,
      name:  product.name,
      price: product.price,
      qty,
      type:  product.type  || 'umum',
      img:   product.img   || '../../assets/images/placeholder.svg',
      badge: product.badge || 'Vitamin C'
    });
  }
  saveCart(cart);
  updateCartBadge();
  showToast(`${product.name} ditambahkan ke keranjang 🛒`);
}

/* --- HAPUS & MANAJEMEN QTY --- */
function removeFromCart(id) {
  saveCart(getCart().filter(i => i.id !== id));
  updateCartBadge();
  renderCartPage();
}

function decreaseQty(id) {
  const cart = getCart();
  const idx  = cart.findIndex(i => i.id === id);
  if (idx !== -1) {
    cart[idx].qty -= 1;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);
  }
  saveCart(cart);
  updateCartBadge();
  renderCartPage();
}

function increaseQty(id) {
  const cart = getCart();
  const idx  = cart.findIndex(i => i.id === id);
  if (idx !== -1) cart[idx].qty += 1;
  saveCart(cart);
  updateCartBadge();
  renderCartPage();
}

/* --- UPDATE BADGE DI NAVBAR --- */
function updateCartBadge() {
  document.querySelectorAll('#cartBadge').forEach(badge => {
    const total = getTotalItems();
    badge.textContent   = total;
    badge.style.display = total > 0 ? 'flex' : 'none';
  });
}

/* --- RENDER HALAMAN KERANJANG --- */
function renderCartPage() {
  const container = document.getElementById('cartContainer');
  if (!container) return; // Jika elemen tidak ada di halaman, hentikan fungsi

  const cart      = getCart();
  const emptyEl   = document.getElementById('cartEmpty');
  const contentEl = document.getElementById('cartContent');

  if (cart.length === 0) {
    if (emptyEl)   emptyEl.style.display = 'block';
    if (contentEl) contentEl.style.display = 'none';
    return;
  }

  // Jika keranjang ada isinya
  if (emptyEl)   emptyEl.style.display = 'none';
  if (contentEl) contentEl.style.display = 'block';

  container.innerHTML = cart.map(item => `
    <div class="cart-item" id="ci-${item.id}">
      <input type="checkbox" class="cart-item__checkbox" checked>
      <div class="cart-item__img">
        <img src="${item.img}" alt="${item.name}" onerror="this.src='../../assets/images/placeholder.svg'">
      </div>
      <div class="cart-item__info">
        <p class="cart-item__name">${item.name}</p>
        <span class="badge badge-primary cart-item__badge">${item.badge || 'Vitamin C'}</span>
        <p class="cart-item__price">${formatRupiah(item.price)}</p>
      </div>
      <div class="cart-item__qty-control">
        <button class="cart-qty-btn" onclick="decreaseQty('${item.id}')">−</button>
        <span class="cart-qty-display">${item.qty}</span>
        <button class="cart-qty-btn" onclick="increaseQty('${item.id}')">+</button>
      </div>
      <p style="font-weight:700;white-space:nowrap;">${formatRupiah(item.price * item.qty)}</p>
      <button onclick="removeFromCart('${item.id}')" style="color:#ef5350;font-size:1.1rem;background:none;border:none;cursor:pointer;">
        <i class="bi bi-trash3"></i>
      </button>
    </div>
  `).join('');

  // Update total di halaman jika elemen tersebut ada
  const totalEl = document.getElementById('totalPrice');
  const grandEl = document.getElementById('grandTotal');
  if (totalEl) totalEl.textContent = formatRupiah(getTotalPrice());
  if (grandEl) grandEl.textContent = formatRupiah(getTotalPrice() + 1000); // Asumsi service fee 1000
}

/* --- CLEAR CART (dipakai setelah payment berhasil) --- */
function clearCart() {
  saveCart([]);
  updateCartBadge();
}

/* --- TOAST --- */
function showToast(msg, duration = 2500) {
  const toast    = document.getElementById('toastNotif');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;
  toastMsg.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

/* --- INIT --- */
document.addEventListener('DOMContentLoaded', function () {
  updateCartBadge();
  renderCartPage();
});
