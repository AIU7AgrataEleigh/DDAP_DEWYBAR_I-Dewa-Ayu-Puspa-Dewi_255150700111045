# TODO - Fix tampilan jadi emoji & gambar tidak muncul

## Step 1 — Analisis kode yang relevan
- [x] Baca `views/AfterLogin/jejak-petani.html` (cek `MASTER_PETANI_DATA` dan cara render kartu).
- [x] Baca `components/partials/navbar-after.html` (cek path asset setelah navbar).
- [x] Baca file JS/CSS yang mempengaruhi render kartu (contoh `javascript/main.js`, `javascript/katalog.js`, `style/katalog.css`).

## Step 2 — Susun edit plan & minta persetujuan
- [ ] Ubah path asset di `components/partials/navbar-after.html` agar konsisten relatif terhadap halaman `views/AfterLogin/*`.

## Step 3 — Implementasi fix
- [ ] Edit `components/partials/navbar-after.html`: ganti `assets/...` menjadi `../../assets/...`.

## Step 4 — Verifikasi
- [ ] Buka `views/AfterLogin/jejak-petani.html` di browser dan pastikan:
  - logo & avatar navbar tampil
  - gambar petani dan crop tampil
  - tidak ada karakter “emoji/teks” menggantikan gambar.

