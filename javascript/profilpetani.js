function goToFarmerDetail(id) {
  window.location.href = `profile-petani.html?id=${id}`;
}

function getFarmerId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function renderFarmerProfile(farmer) {
  if (!farmer) return;

  document.getElementById('farmerNameTitle').innerText = farmer.name;
  document.getElementById('farmerLokasiTitle').innerText = farmer.lokasi;

  const img = document.getElementById('farmerHeroImg');
  if (img) img.src = farmer.img;
}

const MASTER_PETANI_DATA = [
    { id: "petani-1", name: "Budi Santoso", lokasi: "Poncokusumo", img: "../../assets/img/petani/budi.png", crops: ["pisang.png", "apel.png", "stroberi.png"], wilayah: "poncokusumo" },
    { id: "petani-2", name: "Pak Haji Rustam", lokasi: "Poncokusumo", img: "../../assets/img/petani/pak-haji.png", crops: ["mangga.png", "alpukat.png"], wilayah: "poncokusumo" },
    { id: "petani-3", name: "Sari Handayani", lokasi: "Poncokusumo", img: "../../assets/img/petani/handayani.png", crops: ["stroberi.png", "naga.png"], wilayah: "poncokusumo" },
    { id: "petani-4", name: "Mang Dadang", lokasi: "Poncokusumo", img: "../../assets/img/petani/dadang.png", crops: ["pisang.png", "pepaya.png"], wilayah: "poncokusumo" },
    { id: "petani-5", name: "Fajar Hidayat", lokasi: "Batu", img: "../../assets/img/petani/fajar.png", crops: ["pisang.png", "stroberi.png"], wilayah: "batu" },
    { id: "petani-6", name: "Bli Wayan", lokasi: "Batu", img: "../../assets/img/petani/bli.png", crops: ["apel.png", "jeruk.png"], wilayah: "batu" },
    { id: "petani-7", name: "Cak Imron", lokasi: "Batu", img: "../../assets/img/petani/imron.png", crops: ["semangka.png", "melon.png"], wilayah: "batu" },
    { id: "petani-8", name: "Martha Sitorus", lokasi: "Batu", img: "../../assets/img/petani/martha.png", crops: ["apel.png"], wilayah: "batu" },
    { id: "petani-9", name: "Siti Aisyah", lokasi: "Kepanjen", img: "../../assets/img/petani/siti.png", crops: ["pir.png"], wilayah: "kepanjen" },
    { id: "petani-10", name: "Pak Slamet", lokasi: "Kepanjen", img: "../../assets/img/petani/pak-slamet.png", crops: ["timun.png", "selada.png"], wilayah: "kepanjen" },
    { id: "petani-11", name: "Kang Asep", lokasi: "Kepanjen", img: "../../assets/img/petani/kang-asep.png", crops: ["jagung.png", "tomat.png"], wilayah: "kepanjen" },
    { id: "petani-12", name: "Ibu Ni Luh", lokasi: "Kepanjen", img: "../../assets/img/petani/ibu-ni-luh.png", crops: ["bayam.png", "brokoli.png"], wilayah: "kepanjen" },
    { id: "petani-13", name: "Citra Lestari", lokasi: "Dau", img: "../../assets/img/petani/citra.png", crops: ["labu.png", "brokoli.png"], wilayah: "dau" },
    { id: "petani-14", name: "Pak Mansur", lokasi: "Dau", img: "../../assets/img/petani/pak-mansyur.png", crops: ["wortel.png", "bayam.png"], wilayah: "dau" },
    { id: "petani-15", name: "Pak Dedi", lokasi: "Dau", img: "../../assets/img/petani/pak-dedi.png", crops: ["brokoli.png", "wortel.png"], wilayah: "dau" },
    { id: "petani-16", name: "Mas Bayu", lokasi: "Dau", img: "../../assets/img/petani/mas-bayu.png", crops: ["jagung.png", "tomat.png"], wilayah: "dau" }
  ];

  document.addEventListener('DOMContentLoaded', () => {
  const id = getFarmerId();

  const farmer = MASTER_PETANI_DATA.find(p => p.id === id);

  renderFarmerProfile(farmer);
});