# CODEX PROMPT — ALLPLAN ile Dijital Proje ve e-PYS Hazırlığı Web Sitesi

> Kullanım: Bu dosyayı repo köküne `AGENTS.md` olarak (veya `docs/PROMPT.md`) koy. İçerik blueprint belgesini `docs/blueprint.md` olarak ekle.
> Köşeli parantezli alanları doldur: [YAYINCI MARKA ADI], [ALAN ADI].

---

# GÖREV

Mimarlık ve mühendislik yazılımları alanında, ALLPLAN odaklı "Dijital Proje ve e-PYS Hazırlığı" konulu, production-ready bir kurumsal web sitesi geliştir.
Hedef kitle: mimarlık ofisi sahipleri, statik proje ofisleri, BIM yöneticileri, CAD kullanan küçük ofisler ve Revit/Archicad kullanıcıları.
Site dili Türkçe. Mimari ileride İngilizce eklenebilecek şekilde i18n-ready olsun (next-intl, `/tr` varsayılan).
Yayıncı: [YAYINCI MARKA ADI]. Alan adı: [ALAN ADI].

---

# TEKNİK YIĞIN

- Next.js (güncel kararlı sürüm), App Router, TypeScript (strict), React Server Components öncelikli
- Tailwind CSS + CSS değişkenleriyle design token sistemi (renk, tipografi, spacing, motion)
- Animasyon: Motion (framer-motion) veya saf CSS/SVG; ağır kütüphane ekleme
- İçerik: `/content` altında typed veri dosyaları veya MDX; CMS'e geçişe uygun soyutlama
- Form: Server Actions + zod doğrulama + honeypot + rate limit
- Analytics: Vercel Analytics veya Plausible (çerez banner'ı gerektirmeyen, KVKK uyumlu)
- ESLint, Prettier, jsx-a11y; gereksiz bağımlılık ekleme, eklediğin her paketi gerekçelendir

---

# İÇERİK KAYNAĞI VE SAYFA YAPISI

Site içeriğinin tek kaynağı `docs/blueprint.md` ("ALLPLAN ile Dijital Proje ve e-PYS Hazırlığı – İçerik Blueprint v1") belgesidir.
Metinleri, bölüm sırasını, tablo içeriklerini ve çağrı (CTA) ifadelerini bu belgeden birebir al; kendi pazarlama metnini ekleme.
İçeriği `/content` altında typed veri dosyaları veya MDX olarak tut (tablolar ve SSS ayrı veri dosyalarında), böylece mevzuat değiştiğinde kod değil içerik güncellenir.

## Sayfalar (blueprint bölüm 3)

| Öncelik | Sayfa | Adres |
|---|---|---|
| P0 | Ana sayfa | `/` |
| P0 | Yeni düzenlemeler | `/dijital-proje-yonetmeligi` |
| P0 | ALLPLAN iş akışı | `/allplan-ile-hazirlik` |
| P0 | Karşılaştırma | `/allplan-revit-archicad` |
| P0 | Demo ve değerlendirme | `/demo` |
| P1 | Teslim rehberi | `/ifc-pdfa-teslim-rehberi` |
| P1 | SSS | `/sik-sorulan-sorular` |
| P1 | Kaynak merkezi | `/kaynaklar` |
| P2 | Bursa rehberi | `/bursa-dijital-proje` (içerik doğrulanana kadar `noindex` ve sitemap dışında) |

Ek sayfalar: `/hakkimizda`, `/iletisim`, `/gizlilik-politikasi`, `/kvkk`, 404 ve error sayfaları.
Ana sayfa bölüm sırası blueprint bölüm 4'teki gibidir: Açılış → Ne değişiyor? → Takvim özeti → ALLPLAN nasıl yardımcı olur? → Somut senaryo → Karşılaştırmaya giriş → Geçiş planı → Son çağrı.

## İçerik güvenlik kuralları (kodda zorunlu)

- Şu ifadeleri hiçbir yerde kullanma: "Bakanlık onaylı", "tek uyumlu BIM programı", "garantili ruhsat", "sıfır hata", "en hızlı", "en ucuz", yüzde tasarruf iddiaları. Build sırasında bu ifadeleri tarayan bir lint/test betiği ekle; bulursa build başarısız olsun.
- Hazır olmayan varlıklar (demo videosu, örnek IFC, PDF/A pafta, kontrol listesi dosyası) için indirme/izleme butonu render etme. İçerik verisinde `available: false` ise bileşen gizlensin.
- Her mevzuat ve karşılaştırma bilgisinin yanında kaynak etiketi ([K1], [U1] ...) bağlantılı olarak gösterilsin. Kaynaklar bölümü sayfa altında ve `/kaynaklar` içinde tek veri dosyasından üretilsin.
- Mevzuat ve karşılaştırma sayfalarında "Son doğrulama tarihi", yazar/gözden geçiren ve değişiklik günlüğü alanı olsun.
- Takvim tablosu semantik `<table>` olsun, mobilde kart yapısına dönüşsün; "geri sayım" bileşeni kullanma (tüm projeler için zorunluluk izlenimi yaratır).
- "ALLPLAN Bakanlıkça sertifikalıdır / hazır e-PYS şablonu içerir / doğrudan e-PYS'ye yükler" anlamına gelebilecek hiçbir ifade yazma.
- Footer'da yayıncı kimliği alanı ve "ALLPLAN ile resmî bağlantı" notu config dosyasından gelsin (boşsa build uyarısı versin).
- Marka adını her yerde tutarlı yaz: ALLPLAN (tamamı büyük harf), Revit, Archicad.

---

# TASARIM YÖNÜ (EN ÖNEMLİ BÖLÜM)

Sıradan "AI yapmış" görünümünden kesinlikle kaçın. Tasarım dili: **teknik çizim / mimari pafta / mühendislik dokümantasyonu** estetiği, modern ve editoryal bir yorumla. Konu mevzuat ve teslim dosyası olduğu için ton güven veren, ölçülü ve titiz olmalı; gösterişli değil, hassas hissettirmeli.

## Yasaklar

- Mor-mavi gradient arka planlar, neon glow, aurora/blob efektleri
- Glassmorphism kart yığınları, her şeyi yuvarlak köşeli gölgeli kart yapmak
- Ortalanmış büyük başlık + iki buton + altında 3'lü ikon kartı kalıbı
- Inter/Roboto/Arial'ı tek başına kullanmak, emoji ikonlar, jenerik stok illüstrasyonlar
- "Geleceği inşa edin", "Yenilikçi çözümler", "Dijital dönüşüm" gibi içi boş slogan metinleri
- Her bölümü aynı ritimle (başlık-alt başlık-3 kart) tekrarlamak
- Blueprint'te olmayan sahte referans logoları, sahte müşteri yorumları, uydurma istatistikler

## Yapılacaklar

- **Görsel dil:** İnce çizgili grid/pafta çerçevesi, ölçü çizgileri, kesit işaretleri, koordinat etiketleri, başlık bloğu (title block) detayları, bölüm numaralandırma (01 / 02 / 03).
- **Renk:** Sıcak kâğıt tonu veya koyu antrasit zemin + **tek** güçlü vurgu rengi (ör. sinyal turuncusu veya teknik çizim mavisi). Kontrast WCAG AA üstü. Açık ve koyu tema desteği. Renkleri CSS değişkenlerinde tanımla.
- **Tipografi:** Karakterli bir display/serif başlık fontu + okunaklı grotesk gövde + monospace teknik etiketler (tarih, madde numarası, kaynak etiketi). `next/font` ile self-host. Türkçe karakterleri (ğ, ş, ı, İ) test et. Fluid type scale (`clamp`).
- **Layout:** Asimetrik, editoryal kompozisyon; 12 kolonlu grid; bilinçli boşluk; bölümler arası farklı ritim. Kartları azalt, çizgi ve tipografiyle hiyerarşi kur.
- **Hero:** SVG ile çizilen parametrik/izometrik bir yapı veya kat planı/kesit çizimi, scroll ile "çizilerek" belirsin (`stroke-dashoffset`). Hazır stok görsel kullanma.
- **Mevzuat takvimi:** Yatay bir zaman çizelgesi ("proje paftası" gibi), tarihler monospace; kullanıcı kendi proje koşullarını işaretleyince ilgili satır vurgulansın. Kesin hukuki sonuç vermeyen, "bilgilendirme amaçlı" bir etkileşim olsun.
- **Somut senaryo bölümü (blueprint 4.5):** Mahal → kaplama → eşleştirme → dışa aktarma → görüntüleyici → pafta adımlarını, adım adım ilerleyen çizim animasyonuyla göster. Gerçek demo kaydı yoksa yer tutucu çizim kullan ve "örnek gösterim" olarak etiketle.
- **Karşılaştırma tablosu:** Semantik tablo, sticky ilk sütun, mobilde yatay kaydırılabilir veya kart görünümü. Üstünlük iddiası veren renk/ikon kullanma; yansız ve bilgilendirici görün.
- **Motion:** Amaçlı ve ölçülü; `prefers-reduced-motion`'a tam saygı; layout shift yaratma.
- **Görseller:** `next/image`, AVIF/WebP, doğru `sizes`, LCP görseli `priority`; yer tutucular için SVG çizimleri üret.
- **Mikro-detaylar:** Özel focus stilleri, özel seçim rengi, anlamlı hover durumları, tek bir çizgi ikon ailesi, desktop'ta ince crosshair/koordinat imleci (mobilde kapalı).

---

# MOBİL UYUMLULUK

- Mobile-first tasarla; 360px'den 1920px+ ekranlara kadar test et.
- Dokunmatik hedefler min 44x44px, thumb-zone dostu navigasyon, mobilde alt sabit CTA ("Projem için demo iste").
- Mobil menü: tam ekran, erişilebilir (focus trap, ESC, `aria-expanded`).
- Tablolar ve teknik çizimler mobilde yatay kaydırılabilir veya kart yapısına dönüşsün; sayfa gövdesi yatay kaymasın.
- Hover'a bağımlı hiçbir işlev olmasın; `100dvh` kullan; safe-area inset'lere uy.
- Mobilde animasyon yükünü azalt, ağır efektleri devre dışı bırak.

---

# SEO

- Her sayfada `generateMetadata`: benzersiz title (≤60 karakter), description (≤155), canonical, Open Graph, Twitter card. Başlık ve açıklamaları blueprint bölüm 11'den al.
- Dinamik OG görselleri (`opengraph-image.tsx`), marka tasarımıyla uyumlu.
- `app/sitemap.ts` ve `app/robots.ts`; sitemap'te `lastModified`.
- JSON-LD (tip güvenli yardımcı bileşenle): Organization, WebSite, SoftwareApplication (yalnızca ALLPLAN ürün sayfası bağlamında ve doğru alanlarla), BreadcrumbList, FAQPage, Article, Person (yazar). Review/AggregateRating yalnızca gerçek veri varsa.
- Semantik HTML: tek h1, doğru başlık hiyerarşisi, landmark'lar, anlamlı alt metinler.
- Temiz URL yapısı, breadcrumb, güçlü iç linkleme (mevzuat ↔ iş akışı ↔ karşılaştırma ↔ rehber ↔ SSS ↔ demo).
- Statik üretim (SSG) + gerektiğinde ISR; gereksiz client component kullanma.
- Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1; Lighthouse mobil 95+ (Performance, SEO, A11y, Best Practices).
- `hreflang` ve canonical'ı i18n'e hazır kur; 404'lerde `noindex`.

---

# GEO (AI ARAMA / ÜRETKEN MOTOR OPTİMİZASYONU)

- `/llms.txt` ve `/llms-full.txt` oluştur: site özeti, ana sayfalar, mevzuat takvimi, SSS ve ALLPLAN iş akışı özeti; temiz Markdown; içerik verisinden otomatik üretilsin.
- `robots.txt`'te GPTBot, ClaudeBot, PerplexityBot, Google-Extended, OAI-SearchBot gibi AI tarayıcılarına izin ver (tek yerden yönetilebilir yapılandırma).
- İçerik "answer-first": her sayfa ve bölümün başında 40-60 kelimelik net, alıntılanabilir özet cevap.
- SSS cevapları FAQPage JSON-LD ile görünür metinle birebir aynı olsun.
- Takvim tablosu ve karşılaştırma tablosu semantik `<table>` olarak sunulsun; tarihler ve koşullar metin olarak DOM'da bulunsun.
- Varlık (entity) tutarlılığı: marka adı, ürün adları, yayıncı kimliği, adres, sosyal profiller her yerde aynı yazılsın; `sameAs` bağlantıları.
- E-E-A-T: yazar sayfaları, gözden geçiren uzman, "son güncelleme" tarihi, kaynak bağlantıları.
- Tüm kritik içerik sunucu tarafında render edilsin; sekme/accordion içeriği DOM'da bulunsun.
- Blog/rehber içerikleri için `/[slug].md` veya düz metin alternatif çıktı.

---

# FORM VE DEMO SAYFASI

- `/demo` formu blueprint bölüm 9'daki alanlarla: ad soyad, iş e-postası, firma/ofis, disiplin, mevcut yazılım, proje türü, görüşme konusu. Telefon isteğe bağlı; proje dosyası ilk başvuruda istenmez.
- KVKK aydınlatma metni linki ve açık rıza onay kutusu, honeypot, rate limit, sunucu tarafı zod doğrulaması.
- Başarı metni: "Talebiniz alındı. Paylaştığınız ihtiyaçlara göre sizinle iletişime geçeceğiz." Yanıt süresi veya ücretsiz danışmanlık vaadi ekleme.
- Gönderimler için e-posta/webhook entegrasyonu ortam değişkeniyle yapılandırılsın; `.env.example` ekle.

---

# ERİŞİLEBİLİRLİK VE GÜVENLİK

- WCAG 2.2 AA, klavye ile tam gezinme, skip link, görünür focus, ARIA'yı yalnızca gerektiğinde kullan.
- Güvenlik başlıkları (CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) `next.config` içinde.
- Girdiler sunucuda doğrulansın; sırlar yalnızca ortam değişkenlerinde.
- KVKK uyumlu aydınlatma metni ve gizlilik/çerez politikası taslağı.

---

# ÇALIŞMA ŞEKLİ

1. Önce kısa bir plan çıkar: bilgi mimarisi, design token'lar (renk/font/spacing), bileşen listesi, klasör yapısı, içerik veri şeması. `DESIGN.md` dosyasında tasarım kararlarını gerekçeleriyle belgele. Onay beklemeden devam et.
2. Aşamalar:
   - (a) Proje iskeleti, design system, içerik veri şeması
   - (b) Ana sayfa
   - (c) Mevzuat, ALLPLAN iş akışı ve karşılaştırma sayfaları
   - (d) Rehber, SSS, kaynak merkezi, demo formu
   - (e) SEO/GEO katmanı (metadata, JSON-LD, sitemap, robots, llms.txt)
   - (f) İçerik güvenlik betiği, performans, a11y ve mobil denetimi
3. Her aşama sonunda `build`, `lint` ve `typecheck` çalıştır; hataları kendin düzelt.
4. Tekrarlayan yapıları yeniden kullanılabilir bileşenlere ayır, ama bileşenler jenerik şablon hissi vermesin.
5. Blueprint'te olmayan içerik gerekiyorsa uydurma; `TODO(content)` olarak işaretle ve sonunda eksik içerik listesini raporla.
6. Sonda README ekle: kurulum, içerik ekleme/güncelleme, mevzuat güncelleme prosedürü, SEO/GEO kontrol listesi, deploy adımları (Vercel).

---

# KABUL KRİTERLERİ

- Siteyi ilk gören biri "bu bir AI şablonu" demeden marka kimliğini hatırlamalı.
- Mobilde ve masaüstünde kırık layout, yatay taşma, okunmayan metin yok.
- Tüm metinler blueprint ile birebir uyumlu; yasaklı ifade taraması geçiyor.
- Hazır olmayan varlıklar için indirme/izleme butonu görünmüyor.
- Lighthouse skorları hedefte; JSON-LD rich results testinden hatasız geçiyor.
- `llms.txt`, sitemap, robots, OG görselleri çalışır durumda.
- `npm run build` hatasız tamamlanıyor.
