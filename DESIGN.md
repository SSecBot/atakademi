# Ata Akademi - Tasarım Sistemi ve Stil Rehberi (DESIGN.md)

Bu belge, **Ata Akademi** web platformunun ve yönetim panelinin tüm görsel tasarım kurallarını, renk paletlerini, tipografi standartlarını, gölge/yükseklik hiyerarşisini ve bileşen tasarım şablonlarını tanımlar. Stitch MCP tasarım motoruyla tam uyumludur.

---

## 1. Marka Kimliği & Tasarım Felsefesi

- **Kurum Adı:** Ata Akademi
- **Konum:** Tepeköy, 4550. Sk. No:51/A, 35000 Torbalı/İzmir, İzmir, Türkiye
- **Tasarım Teması:** Lumina Academic (Modern / Minimalist / White-Plus)
- **Görsel Dil:** Modern eğitim kurumu ciddiyeti ile sıcak, erişilebilir ve dinamik bir kullanıcı deneyimini birleştirir. Saf beyaz ve açık gri-mavi zeminler üzerinde enerjik mor (`#712AE2`) ve fuşya-pembe (`#B4136D`) vurgular kullanılır.

---

## 2. Renk Paleti (Color Tokens)

### 2.1. Zemin ve Yüzey Renkleri
| Token Adı | HEX Kodu | Kullanım Alanı |
|---|---|---|
| `surface` / `background` | `#F7F9FB` | Genel sayfa arka planı |
| `surface-container-lowest` | `#FFFFFF` | Kartlar, modallar, giriş formları zeminleri |
| `surface-container-low` | `#F2F4F6` | İkincil bloklar, filtre çubukları |
| `surface-container` | `#ECEEF0` | Bölüm ayırıcıları, tablo başlıkları |
| `surface-container-high` | `#E6E8EA` | Vurgulu arka planlar |

### 2.2. Vurgu & Marka Renkleri
| Token Adı | HEX Kodu | Kullanım Alanı |
|---|---|---|
| `primary-accent` (Mor) | `#712AE2` / `#7C3AED` | Birincil butonlar, aktif menü ögeleri, ikonlar |
| `secondary-accent` (Pembe/Fuşya) | `#B4136D` / `#EC4899` | Vurgu etiketleri, rozetler, başarı göstergeleri |
| `brand-gradient` | `linear-gradient(135deg, #712AE2 0%, #B4136D 100%)` | CTA butonları, kahraman başlık vurguları, özel kart kenarları |
| `accent-light` | `#F3E8FF` | Mor hafif arka plan tonu |
| `accent-pink-light` | `#FCE7F3` | Pembe hafif arka plan tonu |

### 2.3. Tipografi ve Kontrast Renkleri
| Token Adı | HEX Kodu | Kullanım Alanı |
|---|---|---|
| `on-surface` | `#191C1E` | Ana başlıklar, yüksek kontrastlı metinler |
| `on-surface-variant` | `#444748` / `#64748B` | Gövde metinleri, açıklamalar, alt başlıklar |
| `outline` | `#747878` | Form kenarlıkları, pasif çizgiler |
| `outline-variant` | `#E2E8F0` / `#C4C7C8` | Kart sınır çizgileri (1px subtle border) |

---

## 3. Tipografi Standartları

- **Başlık Font Ailesi:** `Poppins`, sans-serif (Font Weight: 600, 700, 800)
- **Gövde Metin Font Ailesi:** `Montserrat`, sans-serif (Font Weight: 400, 500, 600)

### 3.1. Tipografi Hiyerarşisi
| Stil Adı | Font | Boyut / Line-Height | Weight | Harf Aralığı |
|---|---|---|---|---|
| `display-lg` | Poppins | 48px / 1.2 | 700 | -0.02em |
| `headline-lg` | Poppins | 32px / 1.3 | 700 | Normal |
| `headline-md` | Poppins | 24px / 1.4 | 600 | Normal |
| `headline-sm` | Poppins | 20px / 1.4 | 600 | Normal |
| `body-lg` | Montserrat | 18px / 1.6 | 400 | Normal |
| `body-md` | Montserrat | 16px / 1.6 | 400 | Normal |
| `body-sm` | Montserrat | 14px / 1.5 | 400 | Normal |
| `label-md` | Montserrat | 14px / 1.2 | 600 | +0.05em |
| `caption` | Montserrat | 12px / 1.4 | 500 | Normal |

---

## 4. Boyutlandırma, Boşluklar ve Izgara

- **Temel Ölçü Birimi:** 8px grid sistemi
- **Maksimum Konteyner Genişliği:** `1280px` (`max-w-7xl` / `container-max`)
- **Sayfa Kenar Boşlukları (Padding):**
  - Masaüstü: `40px` (`px-6 md:px-10`)
  - Mobil: `16px` (`px-4`)
- **Bölümler Arası Boşluk:** `80px` - `120px` (`py-16 md:py-24`)
- **Kart İçi Boşluk:** `24px` - `32px` (`p-6` veya `p-8`)

---

## 5. Köşe Yuvarlaklığı (Border Radius) & Yükseklik (Elevation)

### 5.1. Yuvarlaklık Skalası
- **Küçük Öğeler (Form Input, Tag):** `0.5rem` (8px - `rounded-lg`)
- **Kartlar, Modallar ve Bloklar:** `1rem` (16px - `rounded-2xl`)
- **Büyük Bannerlar & Galeri Görselleri:** `1.5rem` (24px - `rounded-3xl`)
- **Hap Şeklindeki Rozetler (Pills) & Butonlar:** `9999px` (`rounded-full`)

### 5.2. Gölgeler (Ambient Shadows)
- **Kart Normal Durum:** `box-shadow: 0px 10px 30px rgba(124, 58, 237, 0.08);`
- **Kart Hover Durumu:** `transform: translateY(-4px); box-shadow: 0px 20px 40px rgba(124, 58, 237, 0.14); transition: all 0.3s ease;`
- **Modal / Dropdown:** `box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.15);`

---

## 6. Bileşen Tasarım Kuralları

### 6.1. Butonlar
- **Birincil (Primary) CTA Buton:** `linear-gradient(135deg, #712AE2, #B4136D)` zemin rengi, beyaz metin, `rounded-xl`, hover durumunda parlaklık artışı (`brightness-110`) ve hafif yukarı kalkma (`-translate-y-0.5`).
- **İkincil (Secondary) Buton:** Şeffaf zemin, `1.5px solid #712AE2` sınır çizgisi, mor metin, hover durumunda `%10` mor zemin dolgusu.
- **Yönetim Paneli Butonları:** Net, yüksek kontrastlı, güvenli onay/silme renkleri (Kırmızı `#DC2626` silme, Yeşil `#16A34A` kaydetme).

### 6.2. Kurs Kartları
- 16:9 en-boy oranına sahip yerel kurs kapak görseli (`public/assets/courses/...`).
- Üst sağ köşede zorluk derecesi veya kategori hap rozeti (`rounded-full`).
- Kurs adı (`font-poppins font-bold text-xl`), kısa açıklama, süre/ders saati ikonlu rozetleri, eğitmen adı ve "İncele / Kayıt Ol" CTA butonu.

### 6.3. Eğitmen Kartları
- Dairesel veya yumuşak köşeli yerel eğitmen portresi (`public/assets/instructors/...`).
- Eğitmenin uzmanlık alanı (ör. "İngilizce & Almanca Uzmanı").
- Kısa biyografi ve deneyim rozeti.

### 6.4. Öğrenci Yorum Kartları
- 5 yıldızlı değerlendirme göstergesi (altın sarısı `#F59E0B`).
- Öğrencinin aldığı kurs adı ve samimi Türkçe geri bildirimi.
- Öğrenci yerel profil fotoğrafı ve adı-soyadı.

---

## 7. Logo & Görsel Varlık Kuralları
- **Resmi Logo:** Tüm başlıklarda, altbilgide ve yönetim paneli ekranlarında yerel dosya yolu `public/assets/logo.png` olarak sabitlenmiştir.
- **Harici URL Yasağı:** Hiçbir görsel harici CDN veya rastgele URL üzerinden yüklenemez; tüm görseller `public/assets/...` dizininde yerel olarak barındırılır.
