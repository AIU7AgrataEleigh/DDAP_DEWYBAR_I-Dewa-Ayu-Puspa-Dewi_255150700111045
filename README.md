# 🥬 DEWY BAR — Frontend Project

**Platform Agritech Malang | Natural & Healthy Buddy**

---

## 📁 Struktur Folder

```
dewy-bar/
├── index.html                          ← Homepage (before/after login)
│
├── assets/
│   └── images/                         ← Semua gambar (wajib diisi manual)
│
├── style/
│   ├── global.css                      ← Design tokens, reset, utilities global
│   ├── header.css                      ← Navbar (transparan, sticky, hamburger)
│   ├── footer.css                      ← Footer 3-kolom
│   ├── homepage.css                    ← Semua section homepage
│   ├── auth.css                        ← Login & Register layout
│   ├── katalog.css                     ← Semua halaman katalog
│   └── pages.css                       ← Shop details, keranjang, payment,
│                                          jejak petani, profil petani,
│                                          smart pre-order, profile pengguna
│
├── javascript/
│   ├── auth.js                         ← Login, Register, Logout, requireLogin()
│   ├── cart.js                         ← Keranjang (localStorage), toast, wishlist
│   ├── navbar.js                       ← Scroll shadow, hamburger, dropdown
│   ├── katalog.js                      ← Database produk & petani, navigasi,
│   │                                      initShopDetails(), initProfilPetani()
│   └── main.js                         ← Homepage CTA, scroll animations,
│                                          kalender SPO, payment timer, profile form
│
├── components/
│   └── partials/
│       ├── navbar-after.html           ← Referensi navbar AfterLogin
│       └── footer.html                 ← Referensi footer
│
└── views/
    ├── BeforeLogin/
    │   ├── login-page.html             ← Halaman Login
    │   └── regist-page.html            ← Halaman Registrasi
    │
    └── AfterLogin/
        ├── katalog-produk-mentah.html  ← Katalog buah & sayur mentah
        ├── katalog-produk-jadi-buah.html ← Smoothie, Juice, Sliced Fruit
        ├── katalog-produk-jadi-sayur.html ← Smoothie sayur, Salad, Spring Roll
        ├── shop-details.html           ← Detail produk + add to cart
        ├── keranjang.html              ← Cart summary + checkout
        ├── payment.html                ← QR payment + timer + konfirmasi
        ├── smart-pre-order.html        ← Kalender + pilih waktu + ongkir
        ├── jejak-petani.html           ← List semua petani per lokasi
        ├── profil-petani.html          ← Detail profil + cerita + galeri petani
        └── profile-page.html           ← Profil pengguna + edit + rekomendasi
```

---

## 🎨 Design System

### Warna
| Token | Hex | Kegunaan |
|---|---|---|
| `--clr-primary` | `#49A760` | Warna utama hijau |
| `--clr-primary-2` | `#4BAF47` | Varian hijau |
| `--clr-primary-dark` | `#1F4E3D` | Hijau gelap (footer, hover) |
| `--clr-accent` | `#EEC044` | Kuning/emas (CTA, badge) |

### Font
| Font | Kegunaan |
|---|---|
| **Covered By Your Grace** | Display / eyebrow dekoratif |
| **Manrope ExtraBold** | Heading, tombol |
| **Manrope Medium** | Body text, paragraf |

---

## 🔁 Logika Alur (sesuai dokumen LOGIKA FLOW)

### Autentikasi
- **Sebelum login**: Navbar hanya tampilkan Home, About, Contact + tombol Login/Register
- **Sesudah login**: Navbar tampilkan + Katalog, Smart Order, Jejak Petani + avatar + keranjang
- Status login disimpan di `localStorage` key `dewybar_logged_in` & `dewybar_user`

### Alur Katalog
```
Katalog (navbar) 
  → katalog-produk-mentah.html
    → [klik card produk] → shop-details.html?id=XXX
        → [Add to Cart] → keranjang.html → payment.html
        → [Lihat Selengkapnya Farmer] → profil-petani.html?id=XXX
    → [klik Pilih] → langsung add to cart
    → [klik Produk Jadi Buah/Sayur] → katalog-produk-jadi-buah/sayur.html
```

### Alur Smart Pre-Order
```
Smart Pre-Order (navbar)
  → smart-pre-order.html
    → Pilih tanggal di kalender
      → Tanggal LAMPAU: tampilkan riwayat pesanan
      → Tanggal HARI INI / DEPAN: pilih waktu + lihat ongkir
    → Klik "Pesan Sekarang" → katalog-produk-mentah.html
```

### Alur Jejak Petani
```
Jejak Petani (navbar)
  → jejak-petani.html
    → [Lihat Detail Produk] → profil-petani.html?id=XXX
        → [Klik card produk] → shop-details.html → (alur katalog)
```

### Alur Payment
```
keranjang.html → [Checkout] → payment.html
  → Timer 5 menit berjalan
  → [Klik Konfirmasi] → Modal "Pembayaran Selesai" → redirect katalog
  → [Timer habis]    → Modal "Pembayaran Gagal"  → redirect keranjang
```

---

## 📸 Gambar yang Perlu Ditambahkan

Letakkan semua gambar di folder `assets/images/`. Nama file yang digunakan:

**Layout Umum**
- `logo.png` — Logo Dewy Bar
- `avatar-default.png` — Avatar default user
- `placeholder.jpg` — Fallback gambar produk

**Homepage**
- `hero-bg.jpg`, `welcome-1/2/3.jpg`, `team-1/2/3/4.jpg`
- `offer-1/2/3.jpg`, `cta-bg.jpg`, `eco-bg.jpg`
- `promo-bg.jpg`, `testi-1/2.jpg`
- `prod-1/2/3/4.jpg`, `prod-smoothie-1/2/3/4.jpg`

**Auth**
- `auth-bg.jpg` (login), `auth-bg-regist.jpg` (register)

**Katalog Hero**
- `katalog-mentah-hero.jpg`, `katalog-buah-hero.jpg`, `katalog-sayur-hero.jpg`

**Produk Jadi Buah**
- `jadi-minty-strawberry.jpg`, `jadi-strawberry-lemonade.jpg`
- `jadi-honey-berry.jpg`, `jadi-nutty-strawberry.jpg`
- `jadi-classic-berry.jpg`, `jadi-oatmeal-strawberry.jpg`
- `jadi-yogurt-power.jpg`, `jadi-fresh-slices.jpg`
- `jadi-strawberry-dip.jpg`, `jadi-malang-medley.jpg`, `jadi-berry-goji.jpg`

**Produk Jadi Sayur**
- `jadi-green-velvet.jpg`, `jadi-tropical-lettuce.jpg`
- `jadi-berry-green.jpg`, `jadi-avocado-lettuce.jpg`
- `jadi-malang-orchard.jpg`, `jadi-sunset-corn.jpg`
- `jadi-protein-bowl.jpg`, `jadi-crispy-sesame.jpg`
- `jadi-dewy-roll.jpg`, `jadi-mango-wrap.jpg`
- `jadi-tofu-roll.jpg`, `jadi-peanut-roll.jpg`

**Produk Mentah**
- `mentah-apel.jpg`, `mentah-buah-naga.jpg`
- `mentah-stroberi.jpg`, `mentah-selada.jpg`, `mentah-tomat.jpg`

**Petani**
- `petani-budi.jpg`, `petani-siti.jpg`, `petani-slamet.jpg`
- `petani-rustam.jpg`, `petani-dadang.jpg`, `petani-sari.jpg`
- `petani-citra.jpg`, `petani-dedi.jpg`, `petani-asep.jpg`, `petani-martha.jpg`

**Galeri Petani** (5 per petani)
- `galeri-budi-1.jpg` s.d. `galeri-budi-5.jpg`
- (ulangi pola untuk siti, slamet, rustam, dadang, sari, citra, dedi, asep, martha)

**Halaman Lain**
- `details-hero.jpg`, `cart-hero.jpg`, `payment-hero.jpg`
- `spo-hero.jpg`, `spo-cal-bg.jpg`, `jp-hero.jpg`
- `pp-hero.jpg`, `profile-hero-bg.jpg`

---

## 🚀 Cara Menjalankan

1. Ekstrak folder `dewy-bar`
2. Tambahkan semua gambar ke `assets/images/` (lihat daftar di atas)
3. Buka `index.html` di browser — **tidak perlu server** (pure static)
4. Atau gunakan ekstensi **Live Server** di VS Code untuk pengalaman terbaik

> **Catatan**: Semua data disimpan di `localStorage` browser. Tidak ada backend/database.

---

## ✅ Fitur yang Sudah Selesai

- [x] Homepage before & after login (dinamis)
- [x] Login & Register dengan validasi
- [x] Proteksi halaman (requireLogin)
- [x] Navbar responsif (desktop + tablet + mobile hamburger)
- [x] Katalog Produk Mentah (rekomendasi, buah, sayur, petani)
- [x] Katalog Produk Jadi Buah (smoothie, juice, sliced)
- [x] Katalog Produk Jadi Sayur (smoothie, salad, spring roll)
- [x] Shop Details (dinamis dari URL param `?id=`)
- [x] Add to Cart & Wishlist
- [x] Keranjang (tambah/kurang qty, hapus, total)
- [x] Payment (QR, timer 5 menit, modal berhasil/gagal)
- [x] Smart Pre-Order (kalender interaktif, pilih waktu, ongkir)
- [x] Jejak Petani (per lokasi/daerah)
- [x] Profil Petani (dinamis dari URL param `?id=`)
- [x] Profile Pengguna (edit, upload foto, favorit, rekomendasi)
- [x] Toast notification
- [x] Scroll animations
- [x] Responsive design (desktop / tablet / mobile)

---

*Dibuat dengan ❤️ untuk proyek akhir Dewy Bar*
