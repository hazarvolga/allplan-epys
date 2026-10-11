import type { ContentSection } from "./types";
export const home: {
  eyebrow: string;
  title: string;
  description: string;
  trustText: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  sections: readonly ContentSection[];
} = {
  eyebrow: "Dijital proje hazırlığı • BIM • IFC • e-PYS",
  title: "Yeni dijital proje dönemine ALLPLAN ile hazırlanın.",
  description:
    "Proje bilgilerini düzenleyin, model ve pafta ilişkisini yönetin, teslim çıktılarınızı kontrol edin. Yeni yönetmeliklerin ofisinize etkisini ve ALLPLAN’ın bu hazırlıkta sunduğu araçları somut iş akışlarıyla keşfedin.",
  trustText:
    "Mevzuat kaynakları ve karşılaştırmada kullanılan ürün sürümleri içeriklerde açıkça belirtilir.",
  primaryCta: {
    label: "Projem için demo iste",
    href: "/demo",
  },
  secondaryCta: {
    label: "Yeni düzenlemeleri incele",
    href: "/dijital-proje-yonetmeligi",
  },
  sections: [
    {
      id: "change",
      title: "Teslim hazırlığı, çizimin yanında model bilgisini de kapsıyor.",
      paragraphs: [
        "Yeni düzenlemeler, dijital proje hazırlığı ile elektronik teslim ve inceleme sürecini iki ayrı çerçevede ele alıyor. Ofisinizin hazırlığı; hangi projelerin ne zaman kapsama girdiğini belirlemek, gerekli veriyi üretmek ve teslim dosyalarını kontrol etmekle başlar.",
      ],
      sources: ["K1", "K2"],
      items: [
        "Dosya standardı: Uygulama aşamasına göre PDF/A ve IFC teslim gereklerini belirleyin.",
        "Model bilgisi: Doğru IFC sınıfı, özellikler, proje bilgileri ve isimlendirmeyi birlikte ele alın.",
        "Teslim kontrolü: Revizyonları, model-pafta uyumunu ve kontrol kayıtlarını izleyin.",
      ],
      cta: {
        label: "Projem hangi aşamaya giriyor?",
        href: "/dijital-proje-yonetmeligi",
      },
    },
    {
      id: "timeline",
      title: "Tek bir tarih yerine, projenize göre geçiş takvimi.",
      paragraphs: [
        "Yayımlanma tarihi, yürürlük tarihi ve projenize uygulanacak tarih farklıdır. Bina kullanımı, alan, il ve belediye nüfusu ile başvuru durumu birlikte değerlendirilir.",
      ],
      sources: ["K1", "K2", "K3"],
      items: [
        "5 Ağustos 2026: İki yönetmeliğin yayımı.",
        "1 Eylül 2027: Dijital Hazırlama Yönetmeliğinin yürürlüğü.",
        "1 Eylül 2028: Elektronik Teslim ve Yönetim Yönetmeliğinin yürürlüğü.",
        "2029–2033: Proje özelliklerine göre kademeli uygulama dönemleri.",
      ],
      cta: {
        label: "Kapsam ve istisnaları gör",
        href: "/dijital-proje-yonetmeligi",
      },
    },
    {
      id: "benefits",
      title: "Gereksinimleri günlük proje işlerinize taşıyın.",
      paragraphs: [],
      sources: ["U1", "U2", "U3"],
      tableId: "workflow",
    },
    {
      id: "scenario",
      title: "Bir mahal değiştiğinde teslimde neleri kontrol edersiniz?",
      paragraphs: [
        "Bir mahalin sınırı veya kaplaması değiştiğinde yalnızca plan görünüşünü güncellemek yeterli olmayabilir. Mahal bilgilerini, ilgili kaplamaları, listeleri ve dışa aktarılan modeli aynı revizyon üzerinden incelemek gerekir. Demoda bir değişikliğin bu çıktılara nasıl yansıdığını birlikte kontrol ederiz.",
      ],
      sources: ["U2", "U3"],
      items: [
        "Mahal oluştur",
        "kaplama tanımla",
        "ilgili bilgileri eşleştir",
        "modeli dışa aktar",
        "bağımsız görüntüleyicide incele",
        "pafta ile karşılaştır.",
      ],
      cta: {
        label: "Bu iş akışını demoda gör",
        href: "/demo",
      },
    },
    {
      id: "comparison",
      title: "Yazılımları aynı teslim görevi üzerinden karşılaştırın.",
      paragraphs: [
        "ALLPLAN, Revit ve Archicad farklı üretim alışkanlıklarına ve BIM araçlarına sahiptir. Karar verirken yalnızca bir özelliğin varlığına değil; ekibinizin o özelliği nasıl kullandığına, şablon ihtiyacına ve üretilen IFC verisine bakın.",
      ],
      sources: ["U1", "U2", "U3", "U4", "U5"],
      cta: {
        label: "Görev temelli karşılaştırmayı incele",
        href: "/allplan-revit-archicad",
      },
    },
    {
      id: "plan",
      title: "Ofisiniz için uygulanabilir bir hazırlık planı.",
      paragraphs: [],
      sources: [],
      items: [
        "Kapsamı belirleyin: Proje türü, takvim ve teslim gereksinimlerini değerlendirin.",
        "Mevcut iş akışını inceleyin: Yazılım, ekip, şablon ve veri eksiklerini çıkarın.",
        "Pilot proje hazırlayın: Küçük ama temsil gücü olan bir model seçin.",
        "Çıktıyı kontrol edin: Model bilgisini, PDF/A paftalarını ve IFC dosyasını inceleyin.",
        "Ofis standardına dönüştürün: Doğrulanmış ayarları, sorumlulukları ve kontrol adımlarını belgeleyin.",
      ],
      cta: {
        label: "Ofisim için hazırlık görüşmesi iste",
        href: "/demo",
      },
    },
    {
      id: "contact",
      title:
        "ALLPLAN’ın ofisinize katkısını kendi iş akışınızda değerlendirin.",
      paragraphs: [
        "Kullandığınız yazılımı, proje türünüzü ve teslimde zorlandığınız noktayı paylaşın. Görüşmeyi bu ihtiyaçlara göre kurgulayalım.",
      ],
      sources: [],
      cta: {
        label: "Demo talebi oluştur",
        href: "/demo",
      },
    },
  ],
};
