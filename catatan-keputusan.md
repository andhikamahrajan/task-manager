# Catatan Keputusan Teknis: Tugasku

Catatan ini berisi keputusan yang saya ambil selama mengerjakan proyek, alasannya, dan alternatif yang tidak saya pilih. Saya mengerjakannya sambil belajar dengan bantuan AI, dan saya menulis catatan ini supaya paham kenapa kodenya dibuat seperti itu.

## 1. Menghubungkan label dengan checkbox

- **Keputusan:** Tulisan tiap tugas memakai `<label for="...">` yang dihubungkan ke checkbox lewat `id` yang sama.
- **Alasan:** Mengklik tulisan ikut mencentang kotaknya. Area klik jadi lebih luas, terutama nyaman di HP, dan pembaca layar bisa mengaitkan tulisan dengan kotaknya.
- **Alternatif:** Tulisan biasa di samping checkbox tanpa `label`. Pengguna harus mengklik kotak kecilnya saja.

## 2. Menyimpan tugas sebagai array objek

- **Keputusan:** Daftar tugas disimpan di array JavaScript, dan tiap tugas berupa objek (`id`, `judul`, `tenggat`, `selesai`).
- **Alasan:** Data dipisah dari tampilan. Menambah, menghapus, mencentang, atau memfilter cukup mengubah data, lalu daftar digambar ulang. Jumlah tugas tersisa juga dihitung otomatis dari data yang sama.
- **Alternatif:** Menulis tugas langsung di HTML. Awalnya lebih cepat, tapi tiap perubahan harus mengedit HTML dan angka "tugas tersisa" gampang tidak sinkron.

## 3. Menata tampilan lewat class yang dipasang JavaScript

- **Keputusan:** JavaScript memasang class (`tugas`, `selesai`, `badge-hari-ini`) saat membuat elemen, dan CSS yang mengatur tampilannya.
- **Alasan:** CSS dan JavaScript cukup dihubungkan lewat nama class. Saya sempat mencoba menghapus baris yang memasang class `tugas`, dan seluruh penataan tugas hilang, jadi saya paham bahwa CSS menemukan elemen lewat nama class.
- **Alternatif:** Menulis gaya langsung dari JavaScript (`li.style...`). Itu mencampur tampilan dengan logika dan sulit dirapikan.

## 4. Memakai `textContent` untuk teks dari pengguna

- **Keputusan:** Judul dan tenggat dipasang lewat `textContent`, bukan dimasukkan ke `innerHTML`.
- **Alasan:** Judul tugas diketik pengguna. Kalau yang diketik berupa kode HTML, `innerHTML` akan menjalankannya, sedangkan `textContent` menampilkannya sebagai teks biasa. Ini langkah dasar mencegah penyisipan kode berbahaya.
- **Alternatif:** Menyusun seluruh baris tugas dengan `innerHTML` termasuk judulnya. Lebih singkat, tapi rawan.

## 5. Satu pendengar kejadian di daftar (event delegation)

- **Keputusan:** Klik tombol hapus dan perubahan checkbox ditangkap oleh satu pendengar di elemen `<ul>`, bukan satu pendengar per tombol atau kotak.
- **Alasan:** Daftar digambar ulang setiap ada perubahan, jadi elemen lama hilang dan elemen baru muncul. Pendengar di induknya tetap bekerja untuk tugas yang baru ditambahkan.
- **Alternatif:** Memasang pendengar di tiap elemen saat daftar dibuat. Lebih banyak kode, dan harus dipasang ulang setiap gambar ulang.

## 6. Menandai tugas lewat `data-id`

- **Keputusan:** Tiap baris tugas diberi atribut `data-id` berisi `id` tugasnya.
- **Alasan:** Saat tombol hapus atau checkbox diklik, kode perlu tahu tugas mana yang dimaksud. `data-id` menjadi jembatan antara tampilan dan data.
- **Alternatif:** Memakai urutan posisi di daftar (indeks). Itu salah sasaran kalau daftar sedang difilter atau urutannya berubah.

## 7. Menyimpan data di `localStorage`

- **Keputusan:** Data tugas disimpan di `localStorage` browser, dengan `try ... catch` saat membaca dan menulis.
- **Alasan:** Aplikasi tidak butuh akun atau server, dan data bertahan setelah halaman di-refresh. `try ... catch` menjaga aplikasi tetap jalan dengan data awal kalau penyimpanan diblokir atau datanya rusak.
- **Alternatif:** Database dengan backend. Lebih kuat dan bisa dipakai lintas perangkat, tapi di luar cakupan proyek ini. Itu langkah pengembangan berikutnya.

## 8. Membuat `id` unik yang terus naik

- **Keputusan:** `id` tugas baru dihitung dari `id` terbesar yang ada, lalu ditambah 1.
- **Alasan:** Setelah data bisa tersimpan, memakai angka tetap bisa membuat `id` bentrok, dan tombol centang atau hapus bisa mengenai tugas yang salah.
- **Alternatif:** Memakai panjang daftar sebagai `id`. Itu bentrok setelah ada tugas yang dihapus.

## 9. Menyimpan tanggal dalam format standar

- **Keputusan:** Tenggat disimpan sebagai `2026-11-27`, dan diformat jadi `27 Nov` atau `Hari ini` hanya saat ditampilkan.
- **Alasan:** Penanda "Hari ini" otomatis mengikuti tanggal sebenarnya, dan data standar gampang diurutkan nanti. Saya juga belajar bahwa `getMonth()` mulai dari 0.
- **Alternatif:** Menyimpan teks yang sudah diformat (`"27 Nov"`). Tidak bisa dihitung atau diurutkan, dan "Hari ini" harus ditulis manual.

## 10. Variabel CSS untuk warna

- **Keputusan:** Warna utama disimpan di variabel CSS (`--aksen`, `--garis`, dan lainnya) di `:root`.
- **Alasan:** Warna cukup diubah di satu tempat, dan tampilan tetap konsisten.
- **Alternatif:** Menulis kode warna langsung di tiap aturan. Repot kalau mau mengganti tema.

## 11. Responsif dengan media query

- **Keputusan:** Satu blok `@media (max-width: 600px)` mengatur tampilan HP: form bertumpuk, tab filter selebar layar, jarak lebih rapat.
- **Alasan:** Pengguna sering membuka dari HP. Satu titik patah sudah cukup untuk aplikasi sekecil ini. Saya belajar bahwa `flex: 1 1 260px` bisa terbaca sebagai tinggi kalau arah flex berubah jadi vertikal, jadi harus ditimpa dengan `flex: none`.
- **Alternatif:** Membuat versi terpisah untuk HP. Dua kali kerja dan dua kali perawatan.

## 12. HTML, CSS, dan JavaScript murni

- **Keputusan:** Tidak memakai framework (React dan sejenisnya).
- **Alasan:** Saya baru belajar, jadi ingin memahami dasar-dasarnya dulu: DOM, event, dan penyimpanan data. Framework baru masuk akal setelah paham apa yang dikerjakannya di balik layar.
- **Alternatif:** React atau Vue. Lebih rapi untuk aplikasi besar, tapi menambah konsep baru yang belum saya kuasai.