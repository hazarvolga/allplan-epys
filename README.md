# ALLPLAN ile Dijital Proje ve e-PYS Hazırlığı

Aluplan için Türkçe, kaynak bağlantılı dijital proje rehberi. Next.js App Router, TypeScript ve next-intl kullanır; varsayılan dil `/tr`, içerik sunucuda üretilir. Tasarım kararları [DESIGN.md](DESIGN.md), tamamlanacak yayın girdileri [docs/CONTENT-TODO.md](docs/CONTENT-TODO.md) içindedir.

## Yerel çalışma

Node.js 24 LTS ve `pnpm@11.17.0` kullanın. Projenin engine alt sınırı Node 22 olsa da Docker ortamı Node 24'tür.

```sh
corepack enable
corepack prepare pnpm@11.17.0 --activate
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

Adres: http://127.0.0.1:3100/tr. `.env.local` dosyasını Git'e eklemeyin. Alan adı ve form entegrasyonu olmadan yerel önizleme çalışır; form gönderimleri kapalıdır.

```sh
pnpm content:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm start
```

`build`, içerik güvenliği ve yapılandırma kontrolünden sonra Next.js derlemesini çalıştırır. Çıktı `.next/standalone` ve `.next/static` altındadır; container ayrıca `public` dizinini taşır. `pnpm start` üretim sunucusunu 3100 portunda açar. npm kuruluysa `npm run build` aynı script'i çalıştırır; script içinde kullanılan pnpm de PATH'te bulunmalıdır. Paket yöneticisini değiştirmeyin, ikinci lockfile üretmeyin.

Çalışan sunucuya karşı ayrı terminalde:

```sh
pnpm exec playwright install chromium
pnpm test:e2e
```

E2E varsayılan hedefi `http://127.0.0.1:3100`; farklı hedef için `BASE_URL` kullanın. Test yapılandırması sunucuyu kendisi başlatmaz. Rapor: `outputs/verification/playwright-report/index.html`; JUnit: `outputs/verification/junit.xml`; hata kayıtları: `outputs/verification/test-results`. Birim test kapsamı `coverage/` altındadır. Lighthouse hedefleri kabul ölçütüdür; ölçüm raporu olmadan sağlandığı varsayılmaz.

## İçerik yönetimi

Onaylı kaynak [docs/blueprint.md](docs/blueprint.md). `/content` dosyaları bunun tipli yayın izdüşümüdür; blueprint değişiklikleri otomatik içe aktarılmaz.

| Dosya | Sorumluluk |
| --- | --- |
| `content/home.ts` | Ana sayfanın sekiz bölümünün metni |
| `content/pages.ts` | İç sayfalar, bölüm sırası ve kaynak kimlikleri |
| `content/tables.ts` | Takvim, iş akışı ve karşılaştırma tabloları |
| `content/faq.ts` | Görünür SSS ve aynı metinden JSON-LD |
| `content/sources.ts` | K1–K3 ve U1–U5 bağlantıları |
| `content/assets.ts` | Dosya/video varlıkları ve `available` durumu |
| `content/support.ts` | Ticari/hukuki metin taslakları |
| `lib/site.ts`, `lib/seo.ts` | Yayın kimliği, doğrulama tarihi ve metadata |

Mevzuat güncelleme sırası:

1. Yeni ana metni, teknik ekleri ve değişiklik tarihini doğrulayın; taslağı yayımlanmış hükümden ayırın.
2. Blueprint'i ve ilgili kaynak bağlantılarını güncelleyin; metni ilgili tipli dosyalara aktarın. Kaynak kimliklerini koruyun.
3. Etkilenen takvim, karşılaştırma, SSS, metadata ve sayfa değişiklik günlüğünü birlikte gözden geçirin. `lib/site.ts` tarihini yalnız gerçek içerik incelemesinin tarihiyle değiştirin.
4. Hazır dosya yoksa `available: false` bırakın. İndirme bağlantısını ancak sürüm ve doğrulama bilgileri hazır olduğunda açın.
5. İçerik kontrolü, lint, typecheck, test, build ve ilgili tarayıcı akışını çalıştırın.

`scripts/check-content.ts`, yayın verilerini, `app/components/lib/content` kod yüzeylerini ve `NEXT_PUBLIC_*` değerlerini yasaklı iddialara karşı tarar; kaynak kimliklerini ve aktif varlık bağlantılarını kontrol eder. Hata build'i durdurur. Editoryal yasak örnekleri içeren özgün blueprint bu taramanın dışındadır. Bu kontrol içerik doğruluğunun veya mevzuata uygunluğun hukuki onayı değildir.

## Yapılandırma ve yayın hazırlığı

Tüm değişkenlerin örneği `.env.example` içindedir. Yeni sitenin gerçek alan adı `NEXT_PUBLIC_SITE_URL` ile tanımlanır; `aluplan.com.tr` kurumsal bağlantıdır, yeni sitenin alan adı olarak varsayılmaz. Alan adı boşken canonical üretilmez, sitemap boştur ve sayfalar noindex kalır. `NEXT_PUBLIC_*` değerleri istemciye açık olabilir ve build sırasında gömülür; değiştiklerinde yeniden build gerekir.

Yazar ve gözden geçiren alanları bilinmiyorsa boş kalır; sahte Person bilgisi üretilmez. Hakkımızda, iletişim ve hukuki sayfalar taslaktır; Bursa dahil eksik sayfalar noindex tutulur. Eksik alanları [içerik listesi](docs/CONTENT-TODO.md) üzerinden tamamlayın.

Demo, `connection()` kullanan sunucu bileşeninde çalışma anındaki yapılandırmayı okur. `DEMO_LEGAL_READY=true`, yayıncı, webhook, kimlik doğrulama token'ı ve rate-limit sırrı gerekir; üretimde Redis REST de zorunludur. Eksik/hatalı altyapı başarı mesajı üretmez. Form sunucuda zod ile doğrulanır; honeypot, IP ve e-posta sınırı uygulanır. Saklama ve teslim sorumluluğu webhook alıcısındadır. Ayrıntılar [dağıtım rehberinde](docs/DEPLOYMENT.md).

Plausible isteğe bağlıdır; `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` boşsa etkinleşmez. Çerez kullanmayan analytics seçimi tek başına KVKK uygunluğu garantisi değildir; veri akışı ve aydınlatma metni değerlendirilmelidir.

## SEO/GEO kontrol listesi

- Gerçek HTTPS alan adı, canonical ve dil bağlantılarını kontrol edin.
- Başlık/açıklama, `/tr/opengraph-image`, `/sitemap.xml`, `/robots.txt` yanıtlarını doğrulayın.
- `/llms.txt`, `/llms-full.txt` ve `/<slug>.md` çıktılarını kaynak sayfayla karşılaştırın.
- Bursa ve tamamlanmamış destek sayfalarını sitemap dışında tutun.
- JSON-LD'yi yayın URL'sinde doğrulayın; SSS cevapları görünür metinle aynı kalmalı.
- Kaynak bağlantıları, tarih ve uzman kimliklerini kontrol edin; yeni doğrulama yapılmadan tarihi ilerletmeyin.
- Mobil taşma, klavye erişimi, koyu tema ve azaltılmış hareket ayarını gerçek tarayıcıda sınayın.
- Lighthouse ve Rich Results sonuçlarını ayrı ölçün; yerel build bunların yerine geçmez.

## Bağımlılık tercihleri

Next.js/React sunucu render'ı, metadata ve Server Actions; next-intl dil yönlendirmesi; zod sunucu doğrulaması sağlar. Tailwind/PostCSS tasarım token'larını ve stil üretimini destekler. Animasyonlar CSS/SVG'dir; ayrı motion kütüphanesi gerekmez. ESLint/jsx-a11y ve Prettier kod kalitesi; Vitest/V8 kapsam ölçümü; Playwright/axe tarayıcı ve erişilebilirlik denetimi; tsx içerik betikleri içindir. CMS, veri tabanı ORM'si ve istemci analytics paketi eklenmemiştir.

Dağıtım, sır yönetimi ve geri dönüş için [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) dosyasını izleyin. Ölçülen sonuçlar ve kalan kabul kriterleri [docs/VERIFICATION.md](docs/VERIFICATION.md) içindedir. Bu repo hazırlığı herhangi bir canlı dağıtım yapıldığı anlamına gelmez.
