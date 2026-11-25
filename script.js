const dataAwal = [
    {id: 1, judul: "Rapikan Readme", tenggat: "2026-11-25", selesai: false},
    {id: 2, judul: "Kerjakan laporan praktikum basis data", tenggat: "2026-11-25", selesai: false},
    {id: 3, judul: "Kirim berkas pendaftaran Maganghub", tenggat: "2026-11-27", selesai: false},
    {id: 4, judul: "Belajar dasar JavaScript", tenggat: "2026-11-25", selesai: true},
    {id: 5, judul: "Setup Git dan GitHub", tenggat: "2026-11-23", selesai: true},
    {id: 6, judul: "Buat repo task-manager", tenggat: "2026-11-23", selesai: true}
];

function muatData() {
  try {
    const tersimpan = localStorage.getItem("daftarTugas");
    if (tersimpan !== null) {
      return JSON.parse(tersimpan);
    }
  } catch (error) {
    console.log("Gagal membaca data tersimpan", error);
  }
  return dataAwal;
}

function simpanData() {
  try {
    localStorage.setItem("daftarTugas", JSON.stringify(daftarTugas));
  } catch (error) {
    console.log("Gagal menyimpan data", error);
  }
}

let daftarTugas = muatData();

let idBerikutnya = 1;
for (let i = 0; i < daftarTugas.length; i++) {
  if (daftarTugas[i].id >= idBerikutnya) {
    idBerikutnya = daftarTugas[i].id + 1;
  }
}

function hitungSisa() {
    let sisa = 0;
    for (let i = 0; i < daftarTugas.length; i++) {
        if (daftarTugas[i].selesai === false) {
            sisa = sisa + 1;
        }
    }
    return sisa;
}

function perbaruiSisa() {
  document.getElementById("sisa").textContent = hitungSisa() + " tugas tersisa";
}

const elDaftar = document.getElementById("daftar");
let filterAktif = "semua";
const tombolFilter = document.querySelectorAll(".filter button");

function perbaruiFilter() {
  const jumlahSisa = hitungSisa();
  const label = {
    semua: "Semua " + daftarTugas.length,
    aktif: "Aktif " + jumlahSisa,
    selesai: "Selesai " + (daftarTugas.length - jumlahSisa)
  };

  for (let i = 0; i < tombolFilter.length; i++) {
    const jenis = tombolFilter[i].dataset.filter;
    tombolFilter[i].textContent = label[jenis];
    tombolFilter[i].classList.toggle("terpilih", jenis === filterAktif);
    tombolFilter[i].setAttribute("aria-pressed", jenis === filterAktif);
  }
}

const namaBulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

function formatTenggat(tenggat) {
  if (tenggat === "") {
    return "Tanpa tenggat";
  }

  const bagian = tenggat.split("-");
  if (bagian.length !== 3) {
    return tenggat;
  }

  const tahun = Number(bagian[0]);
  const bulan = Number(bagian[1]);
  const hari = Number(bagian[2]);

  const sekarang = new Date();
  if (tahun === sekarang.getFullYear() && bulan === sekarang.getMonth() + 1 && hari === sekarang.getDate()) {
    return "Hari ini";
  }

  return hari + " " + namaBulan[bulan - 1];
}

function tampilkanDaftar() {
  elDaftar.innerHTML = "";

  for (let i = 0; i < daftarTugas.length; i++) {
    const tugas = daftarTugas[i];
    if (filterAktif === "aktif" && tugas.selesai) {
  continue;
}
if (filterAktif === "selesai" && !tugas.selesai) {
  continue;
}

    const li = document.createElement("li"); 
    li.dataset.id = tugas.id;
    li.className = tugas.selesai ? "tugas selesai" : "tugas";

    li.innerHTML = `
      <input id="t${tugas.id}" type="checkbox" ${tugas.selesai ? "checked" : ""}>
      <label for="t${tugas.id}"></label>
      <span class="badge"></span>
      <button type="button" class="hapus">Hapus</button>
    `;

    li.querySelector("label").textContent = tugas.judul;

    const teksTenggat = formatTenggat(tugas.tenggat);
    const badge = li.querySelector(".badge");
    badge.textContent = teksTenggat;
    if (teksTenggat === "Hari ini") {
      badge.classList.add("badge-hari-ini");
    }

    elDaftar.appendChild(li);
  }
 perbaruiSisa();
 perbaruiFilter();
 simpanData();
}

tampilkanDaftar();

const formTambah = document.querySelector(".form-tambah");
const inputJudul = document.getElementById("judul");
const inputTenggat = document.getElementById("tenggat");


formTambah.addEventListener("submit", function (event) {
  event.preventDefault();

  const judul = inputJudul.value.trim();
  if (judul === "") {
    return;
  }

  daftarTugas.push({
    id: idBerikutnya,
    judul: judul,
    tenggat: inputTenggat.value,
    selesai: false
  });
  idBerikutnya = idBerikutnya + 1;

  formTambah.reset();
  tampilkanDaftar();
});

elDaftar.addEventListener("change", function (event) {
  if (event.target.type !== "checkbox") {
    return;
  }

  const id = Number(event.target.closest("li").dataset.id);

  for (let i = 0; i < daftarTugas.length; i++) {
    if (daftarTugas[i].id === id) {
      daftarTugas[i].selesai = event.target.checked;
    }
  }

  tampilkanDaftar();
});

elDaftar.addEventListener("click", function (event) {
  if (!event.target.classList.contains("hapus")) {
    return;
  }

  const id = Number(event.target.closest("li").dataset.id);

  daftarTugas = daftarTugas.filter(function (tugas) {
    return tugas.id !== id;
  });

  tampilkanDaftar();

const formTambah = document.querySelector(".form-tambah");
const inputJudul = document.getElementById("judul");
const inputTenggat = document.getElementById("tenggat");

let idBerikutnya = 6;

formTambah.addEventListener("submit", function (event) {
  event.preventDefault();

  const judul = inputJudul.value.trim();
  if (judul === "") {
    return;
  }

  daftarTugas.push({
    id: idBerikutnya,
    judul: judul,
    tenggat: inputTenggat.value || "Tanpa tenggat",
    selesai: false
  });
  idBerikutnya = idBerikutnya + 1;

  formTambah.reset();
  tampilkanDaftar();
});
});

elDaftar.addEventListener("change", function (event) {
  if (event.target.type !== "checkbox") {
    return;
  }

  const id = Number(event.target.closest("li").dataset.id);

  for (let i = 0; i < daftarTugas.length; i++) {
    if (daftarTugas[i].id === id) {
      daftarTugas[i].selesai = event.target.checked;
    }
  }

  tampilkanDaftar();
});

elDaftar.addEventListener("click", function (event) {
  if (!event.target.classList.contains("hapus")) {
    return;
  }

  const id = Number(event.target.closest("li").dataset.id);

  daftarTugas = daftarTugas.filter(function (tugas) {
    return tugas.id !== id;
  });

  tampilkanDaftar();
});

document.querySelector(".filter").addEventListener("click", function (event) {
  const jenis = event.target.dataset.filter;
  if (jenis === undefined) {
    return;
  }

  filterAktif = jenis;
  tampilkanDaftar();
});
