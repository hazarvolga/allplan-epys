import type { PageContent } from "./types";
export const pages: readonly PageContent[] = [
  {
    slug: "dijital-proje-yonetmeligi",
    title: "Dijital proje ve e-PYS düzenlemeleri ofisinizi nasıl etkiliyor?",
    description:
      "Bir düzenleme projenin nasıl hazırlanacağını, diğeri elektronik ortamda nasıl teslim edilip yönetileceğini ele alır. Kapsamı ve geçiş hükümlerini ayırmak, ofisinizin doğru işe doğru zamanda hazırlanmasını sağlar.",
    sourceIds: ["K1", "K2", "K3"],
    sections: [
      {
        id: "scope",
        title: "Kapsama giren yapılar",
        paragraphs: [
          "Dijital Hazırlama m.1/2, uygulama imar planı bulunan alanlardaki yeni binaları kapsar; bodrum hariç en çok iki katlı ve toplam yapı inşaat alanı 200 m²’yi geçmeyen müstakil yapılar ile belirtilen entegre olmayan tarım/hayvancılık yapı ve tesisleri istisnadır. Geçici m.2’de önceki ruhsat başvuruları ve kamu ihale karar/tarihleri için hükümler bulunur.",
        ],
        sources: ["K1"],
      },
      {
        id: "timeline",
        title: "Yayımlanan ana metne göre takvim",
        paragraphs: [],
        sources: ["K1", "K2", "K3"],
        tableId: "timeline",
      },
      {
        id: "preparation",
        title: "Model, bilgi ve teslim hazırlığı",
        paragraphs: [
          "Projenizin kullanımını ve kapsamını belirledikten sonra model, bilgi ve teslim hazırlığını birlikte planlayın.",
        ],
        sources: ["K1"],
      },
    ],
  },
  {
    slug: "allplan-ile-hazirlik",
    title: "ALLPLAN ile modelden kontrol edilebilir teslim paketine.",
    description:
      "Hazırlığın başarısı, yalnızca dosya dışa aktarabilmeye bağlı değildir. Gereksinimlerin modelde tanımlanması, verinin dosyaya doğru aktarılması ve çıkan dosyanın kontrol edilmesi birlikte ele alınmalıdır.",
    sourceIds: ["K1", "U1", "U2", "U3"],
    sections: [
      {
        id: "step-1",
        title: "Proje standardını kurun.",
        paragraphs: [
          "Disiplin, dosya, mahal ve nesne bilgilerini güncel teknik esaslara göre düzenleyin. Şablonun hangi mevzuat sürümüne göre oluşturulduğunu belirtin.",
        ],
        sources: ["K1"],
      },
      {
        id: "step-2",
        title: "Gerekli bilgiyi tanımlayın.",
        paragraphs: [
          "Geometri ile özellik verisini ayırın; zorunlu alanları, veri türlerini ve sorumlularını listeleyin. IDS/bSDD araçlarının ilgili özellikleri yönetmeye katkısını gösterin.",
        ],
        sources: ["U1"],
      },
      {
        id: "step-3",
        title: "Mahal ve kaplama verisini yönetin.",
        paragraphs: [
          "Seçilen IFC aktarım ayarlarıyla üretilen nesneleri inceleyin. Kaplama geometrisinin varlığı, metrajın ve emsal hesabının kendiliğinden doğrulandığı anlamına gelmez.",
        ],
        sources: ["U2"],
      },
      {
        id: "step-4",
        title: "Model ve paftayı aynı revizyondan hazırlayın.",
        paragraphs: [
          "Güncelleme ve dışa aktarma sonrası tutarlılığı kontrol edin. PDF/A standardına uygunluk ayrıca doğrulanır.",
        ],
        sources: ["K1", "U3"],
      },
      {
        id: "step-5",
        title: "Teslim paketini gözden geçirin.",
        paragraphs: [
          "Dosya adı, sınıf, özellik, birim, koordinat, revizyon ve kontrol kayıtlarını gözden geçirin.",
        ],
        sources: ["K1", "U2", "U3"],
      },
      {
        id: "output",
        title: "Çıktı örneği",
        paragraphs: [
          "IFC model + PDF/A paftalar + ilgili hesap/raporlar + kontrol formu + revizyon kaydı. Kesin paket, proje kapsamına ve idarenin güncel taleplerine göre hazırlanır.",
        ],
        sources: ["K1", "U3"],
      },
    ],
  },
  {
    slug: "allplan-revit-archicad",
    title:
      "e-PYS hazırlığında ALLPLAN, Revit ve Archicad: hangi iş akışı ofisinize uygun?",
    description:
      "Üç yazılımı aynı örnek proje, aynı bilgi gereksinimleri ve aynı teslim çıktısı üzerinden değerlendirin. Yazılım sürümü, eklenti, lisans ve şablon bilgisi karşılaştırmanın parçasıdır.",
    sourceIds: ["U1", "U2", "U3", "U4", "U5"],
    sections: [
      {
        id: "comparison",
        title: "Görev temelli karşılaştırma",
        paragraphs: [],
        sources: ["U1", "U2", "U3", "U4", "U5"],
        tableId: "comparison",
      },
      {
        id: "decision",
        title: "Karar metni",
        paragraphs: [
          "ALLPLAN’ın bu içerikteki güçlü gösterim alanı; bilgi gereksinimlerini, mahal-kaplama üretimini ve teslim çıktısını ortak bir proje senaryosunda değerlendirebilmektir. Bunun sizin ofisinizdeki karşılığı, mevcut araçlarla aynı görev üzerinden ölçülmelidir.",
        ],
        sources: ["U1", "U2", "U3"],
      },
      {
        id: "pilot",
        title: "Karşılaştırmalı demo planı",
        paragraphs: [
          "Aynı örnek kat; duvar, döşeme, kapı, pencere ve mahal içersin. Aynı özellik listesi kullanılsın. Her ürün için ilk şablon hazırlığı ve sonraki proje kullanımı ayrı ölçülsün.",
          "Ölçülecekler: kurulum süresi, tekrarlayan iş süresi, gerekli eklentiler, eksik/yanlış özellik sayısı, IFC sınıfı doğruluğu, model-pafta revizyon uyumu ve yeniden dışa aktarma süresi. Ekibin deneyimi, ürün sürümü ve lisanslar kaydedilsin.",
        ],
        sources: [],
      },
    ],
  },
  {
    slug: "demo",
    title: "ALLPLAN’ı proje teslim ihtiyaçlarınıza göre değerlendirin.",
    description:
      "Hangi yazılımı kullandığınızı ve neyi iyileştirmek istediğinizi belirtin. Görüşmede model bilgisi, IFC çıktısı, mahal-kaplama iş akışı veya pafta tesliminden sizin için önemli olan bölüme odaklanalım.",
    sections: [],
    sourceIds: [],
  },
  {
    slug: "ifc-pdfa-teslim-rehberi",
    title: "IFC ve PDF/A Teslimine Hazırlık Rehberi",
    description:
      "Proje bilgisi, model sınıfları, revizyon ve teslim kontrolü için uygulanabilir bir hazırlık sırası.",
    sections: [
      {
        id: "step-1",
        title: "Proje standardını kurun.",
        paragraphs: [
          "Disiplin, dosya, mahal ve nesne bilgilerini güncel teknik esaslara göre düzenleyin. Şablonun hangi mevzuat sürümüne göre oluşturulduğunu belirtin.",
        ],
        sources: ["K1"],
      },
      {
        id: "step-2",
        title: "Gerekli bilgiyi tanımlayın.",
        paragraphs: [
          "Geometri ile özellik verisini ayırın; zorunlu alanları, veri türlerini ve sorumlularını listeleyin. IDS/bSDD araçlarının ilgili özellikleri yönetmeye katkısını gösterin.",
        ],
        sources: ["U1"],
      },
      {
        id: "step-3",
        title: "Mahal ve kaplama verisini yönetin.",
        paragraphs: [
          "Seçilen IFC aktarım ayarlarıyla üretilen nesneleri inceleyin. Kaplama geometrisinin varlığı, metrajın ve emsal hesabının kendiliğinden doğrulandığı anlamına gelmez.",
        ],
        sources: ["U2"],
      },
      {
        id: "step-4",
        title: "Model ve paftayı aynı revizyondan hazırlayın.",
        paragraphs: [
          "Güncelleme ve dışa aktarma sonrası tutarlılığı kontrol edin. PDF/A standardına uygunluk ayrıca doğrulanır.",
        ],
        sources: ["K1", "U3"],
      },
      {
        id: "step-5",
        title: "Teslim paketini gözden geçirin.",
        paragraphs: [
          "Dosya adı, sınıf, özellik, birim, koordinat, revizyon ve kontrol kayıtlarını gözden geçirin.",
        ],
        sources: ["K1", "U2", "U3"],
      },
      {
        id: "output",
        title: "Çıktı örneği",
        paragraphs: [
          "IFC model + PDF/A paftalar + ilgili hesap/raporlar + kontrol formu + revizyon kaydı. Kesin paket, proje kapsamına ve idarenin güncel taleplerine göre hazırlanır.",
        ],
        sources: ["K1", "U3"],
      },
    ],
    sourceIds: ["K1", "U1", "U2", "U3"],
  },
  {
    slug: "sik-sorulan-sorular",
    title: "Sık sorulan sorular",
    description:
      "Yeni proje teslim dönemini, ALLPLAN iş akışlarını ve Revit/Archicad karşılaştırmasını inceleyin.",
    sections: [],
    sourceIds: ["K1", "U1", "U3", "U4", "U5"],
  },
  {
    slug: "kaynaklar",
    title: "Kaynak merkezi",
    description: "Tarihli mevzuat ve ürün belgeleri, kontrol listesi",
    sections: [],
    sourceIds: ["K1", "K2", "K3", "U1", "U2", "U3", "U4", "U5"],
  },
  {
    slug: "bursa-dijital-proje",
    title: "Bursa rehberi",
    description: "Doğrulanmış yerel koşullara göre açıklama",
    sections: [
      {
        id: "scope",
        title: "Bursa’daki tüm projeler aynı tarihe mi tabi?",
        paragraphs: [
          "Hayır. İl ve belediye nüfusu yanında yapı alanı, kullanım türü, kapsam ve başvuru durumu da önemlidir. Bursa adına tek bir zorunluluk tarihi verilmemelidir.",
        ],
        sources: ["K1"],
      },
    ],
    sourceIds: ["K1"],
    noindex: true,
  },
];
