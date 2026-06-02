(function() {

let qty = 1;
let currentProduct = null;

function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function setupQuantity() {
  const minus = document.getElementById('qtyMinus');
  const plus  = document.getElementById('qtyPlus');
  const display = document.getElementById('qtyDisplay');

  if (!minus || !plus || !display) return;

  minus.addEventListener('click', () => {
    if (qty > 1) qty--;
    display.innerText = qty;
  });

  plus.addEventListener('click', () => {
    qty++;
    display.innerText = qty;
  });
}

function setupAddToCart() {
  const btn = document.getElementById('addToCartBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    if (!currentProduct) return;
    addToCart(currentProduct, qty);
  });
}

function setupFarmerButton() {
  const btn = document.getElementById('farmerDetailBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.location.href = 'profile-petani.html';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const productId = getProductIdFromURL();
  if (!productId) return;

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

})();