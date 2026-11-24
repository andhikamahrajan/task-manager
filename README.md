# catatan-keputusan
`Keputusan`: Saya menghubungkan tiap text tugas dengan kotak centangnya dengan `<label for="...">` dan `id` yang sama.
`Alasannya`: Kalau tulisannya diklik, kotaknya jadi ikut tercentang, jadi area kliknya lebih luas dan lebih nyaman dipakai apalagi ketika pakai hp.
`Alternatif`: Menaruh tulisan biasa di samping `label`, tapi pengguna harus mengklik kotak kecilnya.

`Keputusan`: Saya menyimpan daftar tugas sebagai array berisi objekk (`{id, judul, tenggat, selesai}), bukan menulis tiap tugas manual di HTML.
`Alasan`: Data dipisahkan dari tampilan. Jadi untuk menambah, menghapus, mencentang, atau memfilter tugas, saya cukup mengubah datanya dan jumlah tugas tersisa dihitung otomatis dari data yang sama.
`Alternatif`: Menulis semua tugas langsung di HTML, awalnya lebih cepat, tapi setiap perubahan harus mengedit HTML dan angka "tugas tersisa" harus diubah manual, jadi gampang tidak sinkron.

`Keputusan`: Data tugas disimpan di localStorage browser.
`Alasan`: Aplikasi ini tidak butuh akun atau server, dan data bertahan setelah direfresh
`Alternatif`: Database dengan backend. Lebih kuat dan bisa dipakai lintas perangkat, tapi di luar cakupan proyek ini. Itu langkah berikutnya kalau mau dikembangkan.