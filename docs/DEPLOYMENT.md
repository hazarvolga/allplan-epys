# Dağıtım ve işletim

Bu belge uygulanabilir yayın adımlarını tarif eder; dağıtım yapılmış değildir. Yeni sitenin alan adı, hukuki metinleri ve form teslim altyapısı tamamlanmadan üretim yayını hazır sayılmaz.

## Yayın öncesi

Node 24 ve pnpm 11.17.0 ile README'deki lint, typecheck, test, build ve E2E akışını çalıştırın. Onaylı içerik, kaynaklar, kimlik bilgileri ve noindex kararlarını kontrol edin. Gerçek demo dosyaları yokken indirme bağlantılarını açmayın. Alan adı ve `NEXT_PUBLIC_*` değerlerini üretim build'inden önce verin; sırları build argümanlarına koymayın.

### Demo entegrasyonu

| Değişken | Kullanım |
| --- | --- |
| `PUBLISHER_NAME` | Veri alıcısının yayıncı adı; görünür kimlikle tutarlı olmalı |
| `DEMO_LEGAL_READY` | Onaylanmış aydınlatma ve gizlilik metinlerinden sonra `true` |
| `DEMO_WEBHOOK_URL` | Üretimde HTTPS alıcı adresi |
| `DEMO_WEBHOOK_TOKEN` | Sunucudan gönderilen Bearer token |
| `DEMO_RATE_SECRET` | En az 32 bayt rastgele sır; HMAC anahtar üretimi |
| `DEMO_REDIS_REST_URL`, `DEMO_REDIS_REST_TOKEN` | EVAL destekli üretim Redis REST servisi |
| `DEMO_TRUST_PROXY` | Doğrulanmış altyapıya göre `vercel` veya `nginx`; aksi durumda boş |

Bu sırların hiçbirine `NEXT_PUBLIC_` öneki vermeyin. Demo bileşeni `connection()` ile runtime ortamını okur; önceden kapalı form durumu statik build'e sabitlenmez. Üretimde Redis yoksa form kapalı kalır. Redis hatasında gönderim reddedilir; süreç içi limiter üretim alternatifi değildir.

IP ve e-posta başına 15 dakikada beş deneme uygulanır. Redis anahtarları HMAC ile türetilir ve süresi dolunca silinir. Bu işlem tek başına anonimleştirme garantisi değildir. Vercel seçeneğini yalnız origin'e Vercel dışında erişilemiyorsa kullanın. Nginx seçeneğinde güvenilen proxy `X-Real-IP` başlığını yeniden yazmalı ve origin dış erişime kapalı olmalıdır. Genel `X-Forwarded-For` istemci girdisine güvenilmez. Proxy ayarı boşsa bilinmeyen IP'ler ortak sınırlama kovasını paylaşır; güvenli fakat yoğun kullanımda kısıtlayıcıdır.

Webhook `POST` JSON `{type: "demo.request", data: ...}` alır. `Authorization: Bearer ...` doğrulaması ve `Idempotency-Key` üzerinden tekrar ayıklama gerekir. Aynı talebin yeniden gönderilmesi ikinci kayıt/e-posta oluşturmamalıdır. Alıcı ancak kalıcı kaydı veya dayanıklı kuyruğa kabulü tamamladığında 2xx dönmelidir. Site 8 saniyelik timeout kullanır, yönlendirmeleri takip etmez; alındığı doğrulanamayan talebe başarı demez. Redis timeout'u 5 saniyedir.

Alıcıda saklama süresi, erişim yetkileri, silme prosedürü ve yedekleme politikasını KVKK metniyle eşleştirin. Uygulama gönderilen alanları loglamaz; proxy, n8n/webhook, e-posta ve gözlemleme sistemlerinin de kişisel verileri loglamadığını ayrıca denetleyin. Üretim doğrulamasında gerçek müşteri verisi yerine kontrollü test kaydı kullanın.

## Vercel

1. Yetkili yayın kararı sonrasında repoyu Next.js projesi olarak bağlayın. Node 24, pnpm kilit dosyası ve `pnpm build` kullanın.
2. Ortam değerlerini Preview ve Production için ayrı girin. Preview'da canlı form alıcısını kullanmayın; gizli preview erişim korumasını etkinleştirin. Noindex erişim kontrolü değildir.
3. Yeni sitenin onaylı HTTPS origin'ini `NEXT_PUBLIC_SITE_URL` yapın. `https://aluplan.com.tr` yalnız kurumsal bağlantıdır; yeni domain kararı yerine kullanmayın.
4. Demo sırlarını runtime ortamında tanımlayın; dağıtım değişikliklerinden sonra ilgili deployment'ı yenileyin. Güvenilir Vercel origin koşulu sağlanıyorsa `DEMO_TRUST_PROXY=vercel` kullanın.
5. Preview URL'de gezinme, OG/SEO çıktıları, form kapalı/açık durumları, kontrollü teslim ve tekrar gönderim testlerini tamamlayın.
6. Üretim yayını sonrasında HTTPS, header'lar, canonical, robots/sitemap, mobil görünüm ve alıcıdaki kalıcı test kaydını doğrulayın. Yerel sonuçlar canlı doğrulama sayılmaz.

## Docker / Coolify

`Dockerfile`, Node 24 üzerinde standalone build üretir ve root olmayan kullanıcıyla çalıştırır. Container iç portu 3000'dir; healthcheck `/tr` yanıtını denetler. Compose bellek limiti 512 MB'dır; build aşaması runtime'dan daha fazla bellek isteyebilir. Küçük Oracle VPS'de gerekirse imajı CI'da üretin.

Yerel container denemesi:

```sh
cp .env.example .env
# .env değerlerini güvenli bir editörde tamamlayın.
docker compose --env-file .env build
docker compose --env-file .env up -d
docker compose ps
```

Compose yalnız `127.0.0.1:3000` adresini açar. HTTPS reverse proxy üzerinden sunun. Coolify'da container ağı ve domain yönlendirmesine uygun port ayarı yapın; rate limiter için güvenilen IP başlığının gerçekten yeniden yazıldığını doğrulayın. Docker build argümanları canonical, yayıncı/ilişki, yazar, gözden geçiren, isteğe bağlı Plausible domain ve ALLOW_AI_CRAWLERS değerlerini taşır. Robots statik üretildiğinden tarayıcı izni değişikliklerinde yeniden build gerekir.

Uygulama kendi kalıcı verisini diske yazmaz; kalıcı demo kayıtları alıcı servistedir. Alıcı veri tabanı ve kuyruk için yedekleme/geri yükleme kanıtı gerekir. Redis rate-limit anahtarları kısa ömürlüdür. Sır içeren `.env` dosyasını imaja veya Git'e eklemeyin; Coolify secret/environment alanlarını tercih edin.

## Güvenlik ve gözlemleme

`next.config.ts`, CSP, HSTS (üretim), MIME sniffing engeli, referrer ve permissions politikalarını ayarlar. Mevcut CSP, SSG/Next inline bootstrap ve stil kullanımı için `unsafe-inline` içerir; nonce tabanlı sıkı CSP kadar güçlü XSS savunması sağlamaz. Sıkı nonce gereksiniminde request bazlı render/cache etkisini planlayın ve script'leri yeniden test edin. Geliştirmede ayrıca `unsafe-eval` izinlidir; üretimde değildir. HSTS `includeSubDomains` kapsamının dağıtılan host için uygunluğunu doğrulayın.

Plausible isteğe bağlıdır. Veri aktarımı ve hukuki metin incelemesi yapılmadan analytics'i açmayın; çerez kullanmamak bütün KVKK yükümlülüklerini ortadan kaldırmaz. Hata oranı, 5xx, webhook/Redis erişilebilirliği ve healthcheck izlenmeli; form alanları hata kaydına eklenmemelidir. Servis healthcheck'i webhook'un çalıştığını kanıtlamaz.

## Geri dönüş

Her yayında değişmez commit/imaj kimliği, build-time değerler ve runtime ortam sürümünü güvenli biçimde kaydedin; sırları rapora yazmayın. Önceki doğrulanmış Vercel deployment'ına veya değişmez container imajına dönün; ona ait ortam yapılandırmasını kontrollü geri yükleyin. Yeni form şemasını kabul eden alıcının önceki sürümle de uyumlu olduğundan emin olun. Geri dönüşten sonra ana sayfa, form hazırlık durumu, kontrollü teslim ve SEO çıktısını tekrar doğrulayın. Güvenlik olayı varsa ifşa olmuş sırları eski sürüme geri taşımayın.
