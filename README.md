#  FarmTrack – Çiftlik Yönetim Paneli

FarmTrack, tarımsal üretim ve gider kayıtlarını yönetmek için React ile geliştirdiğim bir çiftlik yönetim panelidir.

##  Özellikler

- Üretim kayıtları ekleme, düzenleme ve silme
- Gider kayıtları ekleme, düzenleme ve silme
- Üretim ve gider kayıtlarında arama
- Form doğrulama ve kullanıcıya başarı/hata mesajları gösterme
- Verileri LocalStorage ile tarayıcıda saklama
- Üretim miktarlarını birime göre görüntüleme
- Ürünlerin toplam miktarlarını sütun grafiğinde gösterme
- Giderleri kategorilere göre görselleştirme

##  Kullanılan Teknolojiler

- React
- JavaScript
- Vite
- Recharts
- HTML
- CSS
- LocalStorage

##  Kurulum

Projeyi bilgisayarında çalıştırmak için:

1. Depoyu klonla:

   ```bash
   git clone GITHUB_REPOSITORY_URL
   ```

2. Proje klasörüne gir:

   ```bash
   cd farmtrack
   ```

3. Bağımlılıkları yükle:

   ```bash
   npm install
   ```

4. Geliştirme sunucusunu başlat:

   ```bash
   npm run dev
   ```

5. Terminalde gösterilen yerel adresi tarayıcıda aç.

##  Veri Saklama

Üretim ve gider kayıtları şu anda tarayıcının LocalStorage alanında saklanmaktadır. Projede henüz backend API veya veritabanı bağlantısı bulunmamaktadır.

##  Projenin Amacı

React bileşenleri, state yönetimi, form işlemleri, dizi metotları, LocalStorage kullanımı ve grafiklerle veri görselleştirme konularında pratik yapmak amacıyla geliştirilmiştir.