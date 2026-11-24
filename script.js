const daftarTugas = [
    {id: 1, judul: "Kerjakan laporan praktikum basis data", tenggat: "Hari ini", selesai: false},
    {id: 2, judul: "Kirim berkas pendaftaran Maganghub", tenggat: "27 Nov", selesai: false},
    {id: 3, judul: "Belajar dasar JavaScript", tenggat: "25 Nov", selesai: false},
    {id: 4, judul: "Setup Git dan GitHub", tenggat: "23 Nov", selesai: true},
    {id: 5, judul: "Buat repo task-manager", tenggat: "23 Nov", selesai: true}
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

document.getElementById("sisa").textContent = hitungSisa() + " tugas tersisa";