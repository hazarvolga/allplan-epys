# Yerel doğrulama — 11 Ekim 2026

Bu sonuçlar yerel üretim derlemesine aittir; canlı dağıtım, gerçek webhook teslimi veya hukuki uygunluk onayı değildir.

| Kontrol | Sonuç |
| --- | --- |
| Üretim build, içerik taraması, ESLint, TypeScript | Geçti |
| Vitest | 39/39 geçti |
| Kapsam | Form iş mantığı ve içerik tarayıcısında satır %90,65; dal %85,84. Tüm arayüz kapsamı değildir. |
| Playwright | Masaüstü ve mobil toplam 30/30 geçti |
| Erişilebilirlik | 16 otomatik axe AA taraması geçti; tam WCAG sertifikasyonu değildir |
| Üretim bağımlılık denetimi | pnpm audit: 0 bildirilen güvenlik açığı |
| Lighthouse masaüstü | Performans 100 / erişilebilirlik 100 / iyi uygulamalar 100 / SEO 63 |
| Lighthouse mobil | Performans 96 / erişilebilirlik 100 / iyi uygulamalar 100 / SEO 63 |
| Mobil ölçümler | LCP 2,7 sn; FCP 1,7 sn; TBT 30 ms; CLS 0 |

SEO puanı, yayın alan adı henüz tanımlanmamış yerel önizlemenin bilinçli noindex durumunu yansıtır. LCP 2,5 saniye hedefi henüz sağlanmadı. Gerçek kullanıcı INP ölçümü ve Google Rich Results testi yapılmadı. Yerel JSON-LD ve görünür SSS eşleşmesi test edildi.

Tarayıcı testleri sayfalar, mobil taşma, tema, menü/klavye, takvim, senaryo, kaynaklar, robots/sitemap, Markdown, llms çıktıları ve OG görselini kapsar. Etkin form testlerinde izole yerel sunucular ve taklit Redis/webhook kullanıldı; dış ağ istekleri engellendi. Başarısız teslimde alanların ve rızanın korunması, aynı başvurunun tekrarında aynı idempotency anahtarı, değiştirilen başvuruda yeni anahtar ve başarılı başvurunun kilitlenmesi doğrulandı. Gerçek kişisel veri gönderilmedi.

## Raporlar

Aşağıdaki raporlar yalnız yerel çalışma dizinindedir; oluşturulan çıktılar Git deposuna dahil edilmez.

- [Tarayıcı raporu](../outputs/verification/playwright-report/index.html)
- [JUnit](../outputs/verification/junit.xml)
- [Mobil Lighthouse](../outputs/verification/lighthouse-mobile.report.html)
- [Masaüstü Lighthouse](../outputs/verification/lighthouse-desktop.report.html)
- [Ana sayfa görüntüsü](../outputs/verification/hero-desktop.png)

## Yayın öncesi kalanlar

Yeni sitenin alan adı, uzman/yazar kimlikleri, veri sorumlusunun ticari ve iletişim bilgileri, hukuki metinler ve gerçek webhook/Redis yapılandırması tamamlanmalı. Örnek model/dosya/video varlıkları hazır değil; indirme bağlantıları kapalı. Ayrıntılar [CONTENT-TODO.md](CONTENT-TODO.md) ve [DEPLOYMENT.md](DEPLOYMENT.md) içinde.

Docker dosyaları hazırlandı; container build ve hedef platformda dağıtım bu çalışmada denenmedi. Mevcut sonuçlar bütün kabul kriterlerinin tamamlandığı anlamına gelmez.
