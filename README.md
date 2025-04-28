## Project Documentation

Selamat datang di dokumentasi untuk projek ini! Berikut adalah langkah-langkah untuk menjalankan server dan aplikasi mobile:

# Menjalankan Server

1. Buka terminal dan navigasi ke dalam folder server.

    ```
    cd server
    ```

2. Install dependencies menggunakan perintah:

    ```
    npm install
    ```

3. Buat file .env berdasarkan template yang sudah disediakan (env-template) dan isi dengan nilai-nilai yang sesuai.

4. Jalankan seeding User dengan perintah

    ```
    node seeder/users.js
    ```

5. Jalankan seeding Post dengan perintah, tapi sebelumnya pastikan data `userId` menggunakan \_id yang sesuai dari collection user

    ```
    node seeder/posts.js
    ```

6. Jalankan server menggunakan nodemon:

    ```
    nodemon app.js
    ```

7. Tunneling server menggunakan ngrok atau layanan sejenis agar dapat diakses dari aplikasi mobile.

# Menjalankan Aplikasi Mobile

1. Buka terminal dan navigasi ke dalam folder mobile.

    ```
    cd mobile
    ```

2. Install dependencies menggunakan perintah:

    ```
    npm install
    ```

3. Jika ini adalah demo untuk aplikasi yang sudah jadi, ganti URL di file src/config/apollo.js dengan URL ngrok yang telah dihasilkan oleh server. Jika masih menggunakan branch start-lecture, skip langkah ini.

    Jalankan aplikasi dengan perintah:

    ```
    npm start
    ```

4. Selamat! Sekarang server dan aplikasi mobile Anda seharusnya berjalan dengan baik. Pastikan server diakses melalui URL yang dihasilkan oleh ngrok untuk memastikan koneksi yang tepat.

---

Catatan: Pastikan MongoDB sudah berjalan dan terhubung dengan server untuk memastikan fungsionalitas aplikasi sepenuhnya berjalan. Juga, pastikan perangkat Anda terhubung ke internet untuk dapat mengakses server melalui ngrok.

Selamat mengembangkan! Jika Anda mengalami masalah atau memiliki pertanyaan lebih lanjut, jangan ragu untuk menghubungi tim pengembangan.
