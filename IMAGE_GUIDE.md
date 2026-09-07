# Ata Akademi - Görsel ve Medya Yönetim Rehberi (IMAGE_GUIDE.md)

Bu rehber, **Ata Akademi** web platformunda ve Yönetim Panelinde (CMS) kullanılan tüm kurumsal logoların, kurs kapak fotoğraflarının, eğitmen portrelerinin, öğrenci avatarlarının ve arayüz bannerlarının dosya yapısını, çözünürlük standartlarını ve değiştirilme yönergelerini ayrıntılı olarak açıklamaktadır.

---

## 1. Genel Kurallar ve Yerel Dosya Mimarisi

- **Sıfır Harici URL Politikası:** Platform genelinde hiçbir harici resim URL'si veya kırılgan CDN bağlantısı kullanılmaz. Tüm medya varlıkları doğrudan `public/assets/` dizini altında yerel olarak barındırılır ve sunulur.
- **Optimizasyon Standartları:** Vektörel/Şeffaf logolar için `.png` veya `.svg`, fotoğraflar ve kapak görselleri için ise yüksek sıkıştırma ve performans sağlayan `.webp` veya optimize `.jpg`/`.png` formatları önerilir.

---

## 2. Dizin Yapısı (Asset Directory Tree)

Tüm görsel varlıklar projenin `public/assets/` dizini altında organize edilmiştir:

```text
public/
└── assets/
    ├── logo.png                     # Resmi Şeffaf Ata Akademi Kurumsal Logosu (Header/Footer/Admin)
    ├── hero-banner.webp             # Ana Sayfa Kahraman (Hero) Bölüm Görseli
    ├── about-campus.webp            # Hakkımızda Sayfası Torbalı Kampüs & Derslik Görseli
    ├── courses/                     # Kurs Kapak Fotoğrafları (16:9 Oran)
    │   ├── ingilizce.webp           # İngilizce Eğitimi
    │   ├── almanca.webp             # Almanca Eğitimi
    │   ├── romence.webp             # Romence Eğitimi
    │   ├── korece.webp              # Korece Eğitimi
    │   ├── italyanca.webp           # İtalyanca Eğitimi
    │   ├── hizli-okuma.webp         # Hızlı Okuma ve Anlama Eğitimi
    │   └── diksiyon.webp            # Diksiyon ve Etkili İletişim Eğitimi
    ├── instructors/                 # Eğitmen Portre Fotoğrafları (1:1 veya 4:5 Oran)
    │   ├── instructor-1.webp        # Elif Yılmaz (İngilizce & İtalyanca)
    │   ├── instructor-2.webp        # Markus Weber (Almanca)
    │   ├── instructor-3.webp        # Elena Dumitru (Romence)
    │   ├── instructor-4.webp        # Min-jun Park (Korece)
    │   └── instructor-5.webp        # Burak Çelik (Hızlı Okuma & Diksiyon)
    └── reviews/                     # Öğrenci Yorum Avatarları (1:1 Oran)
        ├── student-1.webp           # Zeynep Kaya
        ├── student-2.webp           # Ahmet Demir
        ├── student-3.webp           # Selin Yıldız
        └── student-4.webp           # Mehmet Öztürk
```

---

## 3. Logo Değiştirme Yönergesi (`logo.png`)

Kurumsal logo, web sitesinin üst menüsünde (Header/Navbar), altbilgisinde (Footer) ve Yönetim Paneli giriş ekranında dinamik olarak `public/assets/logo.png` üzerinden yüklenir.

### Logoyu Güncelleme Adımları:
1. Yeni logo dosyanızı hazırlayın (Şeffaf arka planlı, yüksek çözünürlüklü PNG formatında).
2. Dosya adını kesin olarak `logo.png` yapın.
3. Dosyayı `public/assets/` klasörüne kopyalayın ve mevcut `logo.png` dosyasının üzerine yazın (`Overwrite`).
4. Tarayıcınızı yenilediğinizde (veya `Ctrl + F5` ile önbelleği temizlediğinizde) yeni logo sitenin tüm sayfalarında ve yönetim panelinde otomatik olarak güncellenecektir.

### Önerilen Logo Özellikleri:
- **Dosya Adı:** `logo.png`
- **Konum:** `public/assets/logo.png`
- **Format:** Şeffaf PNG (`.png`)
- **Önerilen Çözünürlük:** `600x600 px` veya `800x800 px` (Kare veya Yatay Şeffaf)
- **Renk Modu:** RGB / 32-bit (Alfa kanallı)

---

## 4. Sayfa ve Bileşen Bazlı Görsel Standartları

| Varlık Türü | Dosya Yolu | Önerilen Çözünürlük | En-Boy Oranı | Format |
|---|---|---|---|---|
| **Kurumsal Logo** | `public/assets/logo.png` | `800x800 px` | 1:1 veya Yatay | PNG (Şeffaf) |
| **Hero (Kahraman) Görseli** | `public/assets/hero-banner.webp` | `1920x1080 px` | 16:9 | WebP / PNG |
| **Kurs Kapak Görselleri** | `public/assets/courses/<kurs-adi>.webp` | `1280x720 px` | 16:9 | WebP / JPG |
| **Eğitmen Portreleri** | `public/assets/instructors/<egitmen>.webp` | `800x800 px` | 1:1 (Kare) | WebP / PNG |
| **Öğrenci Avatarları** | `public/assets/reviews/<ogrenci>.webp` | `400x400 px` | 1:1 (Kare) | WebP / PNG |
| **Hakkımızda Kampüs Görseli** | `public/assets/about-campus.webp` | `1200x800 px` | 3:2 | WebP / JPG |

---

## 5. Yönetim Paneli (CMS) Üzerinden Görsel Yönetimi

Yönetim Panelinde (`/dashboard/admin/ata`):
1. **Kurs Ekleme/Düzenleme:** Her kursun "Görsel Dosya Yolu" alanına `/assets/courses/kurs-adi.webp` şeklinde yerel yol atanabilir.
2. **Eğitmen Ekleme/Düzenleme:** Eğitmen profil fotoğrafı alanına `/assets/instructors/egitmen-adi.webp` yolu tanımlanır.
3. **Öğrenci Yorumu Ekleme:** Öğrenci avatarı alanına `/assets/reviews/ogrenci-adi.webp` yolu atanır.
4. Yeni bir görsel eklemek istediğinizde dosyayı `public/assets/<ilgili-klasor>/` içine atıp admin panelindeki görsel yolu alanına bu ismi yazmanız yeterlidir.
