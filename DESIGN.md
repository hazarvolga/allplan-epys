# Tasarım ve uygulama kararları

## Yön: bir mimarlık ofisinin açık proje paftası

Sıcak kâğıt (#f3f1e9), mürekkep (#232a27), teknik turuncu (#a83f1f). Turuncu yalnızca bağlantı, ölçü vurgusu ve etkileşim için; rakipler arasında üstünlük rengi olarak kullanılmaz. Koyu tema aynı bilgi hiyerarşisini korur.

Instrument Serif başlık, Manrope gövde, IBM Plex Mono teknik etiketler. next/font ile kendi sunucumuzdan sunulur. Türkçe latin-ext alt kümeleri dahil. 4/8 px tabanlı aralıklar, 12 kolon, 1440 px içerik sınırı, akışkan başlık ölçeği.

Ana sayfa: solda editoryal başlık, sağda SVG izometrik yapı ve pafta başlık bloğu. Karşılıklı iki ölçülü kolon, geniş çizgili bölümler, koyu senaryo alanı ve yatay bilgi tabloları. Şablon kart/gradient kullanımı yok. Teknik koordinatlar yalnız görsel dekorasyon; mühendislik veya gerçek proje verisi olarak gösterilmez.

## Bilgi mimarisi

Blueprint'teki sekiz ana sayfa bölümü korunur. P0/P1 sayfaları ortak kaynak, breadcrumb ve içerik bileşenleri kullanır; içerik tek bir tasarımsız veri katmanındadır. /tr varsayılan next-intl rotasıdır. İngilizce içerik henüz yok ve sahte hreflang üretilmez.

## İçerik sözleşmesi

`docs/blueprint.md` onaylı içerik kaynağıdır. `content/` tipli yayın izdüşümüdür. Editör talimatları ve yasaklı iddialar ziyaretçiye basılmaz. Yeni sloganlar eklenmez. Eksik 40–60 kelimelik özetler yerine mevcut giriş metinleri korunur. Kaynaklar tek kayıt kümesinden gelir. Henüz olmayan varlıklar buton üretmez.

Aluplan ve ALLPLAN Türkiye distribütörü ilişkisi kullanıcı tarafından bu görüşmede doğrulandı. aluplan.com.tr kurumsal sitedir; yeni site için canonical alan adı ayrıca tanımlanmalıdır. Sahte yazar, değerlendiren, iletişim adresi ve gizlilik sorumlusu üretilmez.

## Bileşenler ve klasörler

- app/[locale]: server-rendered ana ve içerik sayfaları; Server Actions form uç noktası.
- content: home, pages, sources, tables, faq, assets; doğrulanmış metin.
- components: navigasyon/dialog, teknik SVG, kaynaklar, tablo, senaryo, form, JSON-LD.
- lib: site ayarı, metadata/schema yardımcıları ve güvenli form işleyicisi.
- i18n: routing/request; src yerine kökten düzenleme.
- scripts/tests: içerik güvenlik ve bütünlük denetimi, server form testleri, E2E.

## Erişilebilirlik ve hareket

Semantik tablo, mobilde takvim kartları; sticky sütunlu yatay karşılaştırma. Kaynaklar metin içinde bağlantıdır. Menü native dialog focus trap + Escape; 44 px hedefler. SVG çizimi decorative; örnek gösterim etiketi görünür. Animasyon reduced-motion ile kapanır. Sabit mobil CTA safe-area boşluğunu korur.

## Bağımlılıklar

Next/React: istenen uygulama çatısı. next-intl: locale routing. Tailwind/postcss: token yardımcıları. zod: sunucu doğrulaması. TypeScript/ESLint/jsx-a11y/Prettier: kalite. Vitest/coverage: iş mantığı. Playwright/axe: gerçek arayüz ve erişilebilirlik. tsx: içerik CLI. Ek animasyon/ikon/UI kütüphanesi yok.

## Güvenlik ve yayın

SSG ile uyumlu CSP Next inline hydration nedeniyle unsafe-inline içerir; user HTML çalıştırılmaz. Strict nonce CSP seçilirse dinamik rendering/performance etkisi değerlendirilir. Form canlı hedef olmadan başarı bildirmez. Redis tabanlı limit üretimde zorunlu; webhook sırları server-only. Analytics opsiyoneldir, yapılandırılmadıkça script yüklenmez; KVKK uyumluluğu yalnız analytics tercihinden çıkarılmaz.

Vercel adımları istenen README'de; ayrıca Docker standalone desteği. Deploy yapılmadan önce canonical, gizlilik/onay içeriği, form hedefi ve insan editör alanları tamamlanmalı.
