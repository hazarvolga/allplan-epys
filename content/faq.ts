import type { SourceId } from "./types";
export const faqs: readonly {
  question: string;
  answer: string;
  sources: readonly SourceId[];
}[] = [
  {
    question: "ALLPLAN kullanmak zorunlu mu?",
    answer:
      "Hayır. İncelenen düzenleme bir ürün markasını zorunlu kılmıyor; proje ve teslim standartlarını tanımlıyor. Yazılımın bu standartları uygulayabilen bir iş akışına sahip olması gerekir.",
    sources: ["K1"],
  },
  {
    question: "ALLPLAN satın almak tek başına uyumluluk sağlar mı?",
    answer:
      "Hayır. Doğru modelleme, bilgi tanımları, proje standardı, dışa aktarım ayarları ve teslim kontrolü de gerekir.",
    sources: ["K1", "U1"],
  },
  {
    question: "2027’de bütün projeler IFC olarak mı teslim edilecek?",
    answer:
      "Hayır. Yürürlük tarihi ile IFC için belirlenen aşamalı uygulama tarihleri farklıdır. Kapsam, kullanım, nüfus, alan ve geçiş hükümleri birlikte değerlendirilir.",
    sources: ["K1"],
  },
  {
    question: "PDF dosyamı PDF/A olarak adlandırmam yeterli mi?",
    answer:
      "Hayır. PDF/A bir dosya adlandırma yöntemi değildir. Çıktının ilgili standarda uygun biçimde oluşturulması ve doğrulanması gerekir.",
    sources: ["K1", "U3"],
  },
  {
    question: "DWG veya DXF tamamen kullanılamaz mı?",
    answer:
      "Böyle bir sonuç çıkarılamaz. Yayımlanan ana metnin teslim gerekleri PDF/A ve IFC üzerinde kuruludur; ofis içi üretim ve veri alışverişi ile resmî teslim formatı farklı konulardır. Yerel taslaklardaki DXF teslim ifadesi güncel zorunluluk diye aktarılmamalıdır.",
    sources: ["K1"],
  },
  {
    question: "Revit ve Archicad ile hazırlık yapılamaz mı?",
    answer:
      "Bu yönde bir iddia doğru olmaz. İki ürünün de IFC ve veri eşleştirme iş akışları vardır. Karşılaştırma aynı teslim ihtiyacı ve gerçek proje çıktısı üzerinden yapılmalıdır.",
    sources: ["U4", "U5"],
  },
  {
    question: "IDS ve bSDD zorunlu mu?",
    answer:
      "İncelenen ana mevzuat metni bunları isimleriyle zorunlu kılmıyor. Bunlar bilgi gereksinimlerini ve ortak tanımları yönetmeye yardımcı araçlardır. Güncel ek veya idare şartnamesinde ayrıca istenip istenmediği kontrol edilir.",
    sources: ["K1", "U1"],
  },
  {
    question: "Bursa’daki tüm projeler aynı tarihe mi tabi?",
    answer:
      "Hayır. İl ve belediye nüfusu yanında yapı alanı, kullanım türü, kapsam ve başvuru durumu da önemlidir. Bursa adına tek bir zorunluluk tarihi verilmemelidir.",
    sources: ["K1"],
  },
];
