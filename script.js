const daftarTugas = [
    {id: 1, judul: "Rapikan Readme", tenggat: "Hari ini", selesai: false},
    {id: 2, judul: "Kerjakan laporan praktikum basis data", tenggat: "Hari ini", selesai: false},
    {id: 3, judul: "Kirim berkas pendaftaran Maganghub", tenggat: "27 Nov", selesai: false},
    {id: 4, judul: "Belajar dasar JavaScript", tenggat: "25 Nov", selesai: true},
    {id: 5, judul: "Setup Git dan GitHub", tenggat: "23 Nov", selesai: true},
    {id: 6, judul: "Buat repo task-manager", tenggat: "23 Nov", selesai: true}
];

function hitungSisa() {
    let sisa = 0;
    for (let i = 0; i < daftarTugas.length; i++) {
        if (daftarTugas[i].selesai === false) {
            sisa = sisa + 1;
        }
    }
    return sisa;
}

console.log(hitungSisa());

const elDaftar = document.getElementById("daftar");

function tampilkanDaftar() {
  elDaftar.innerHTML = "";

  for (let i = 0; i < daftarTugas.length; i++) {
    const tugas = daftarTugas[i];

    const li = document.createElement("li");
    li.className = tugas.selesai ? "tugas selesai" : "tugas";

    li.innerHTML = `
      <input id="t${tugas.id}" type="checkbox" ${tugas.selesai ? "checked" : ""}>
      <label for="t${tugas.id}"></label>
      <span class="badge"></span>
      <button type="button" class="hapus">Hapus</button>
    `;

    li.querySelector("label").textContent = tugas.judul;

    const badge = li.querySelector(".badge");
    badge.textContent = tugas.tenggat;
    if (tugas.tenggat === "Hari ini") {
      badge.classList.add("badge-hari-ini");
    }

    elDaftar.appendChild(li);
  }
}

tampilkanDaftar();

document.getElementById("sisa").textContent = hitungSisa() + " tugas tersisa";