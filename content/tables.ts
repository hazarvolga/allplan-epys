import type { ContentTable } from "./types";
export const tables: Record<
  "timeline" | "comparison" | "workflow",
  ContentTable
> = {
  timeline: {
    id: "timeline",
    caption: "Yayımlanan ana metne göre takvim",
    headers: ["Tarih", "Koşullu uygulama özeti"],
    rows: [
      [
        "01.09.2027",
        "Dijital Hazırlama Yönetmeliği yürürlük tarihi. PDF/A hükümlerinin ilk grubu: il nüfusu >2 milyon, belediye nüfusu >600 bin ve toplam yapı inşaat alanı >5.000 m² koşullarını birlikte karşılayan binalar; kullanım ve kapsam istisnaları saklı.",
      ],
      [
        "01.09.2028",
        "Elektronik Teslim ve Yönetim Yönetmeliği yürürlük tarihi. Her yapının aynı tarihte BIM/IFC zorunluluğuna girdiği anlamına gelmez.",
      ],
      [
        "01.03.2029",
        "Dijital Hazırlama m.4/2–3 bakımından diğer kapsamdaki binalar için ertelemenin sonu.",
      ],
      [
        "01.09.2029",
        "IFC ilk grubu: il >2 milyon, belediye >600 bin, yapı alanı >10.000 m².",
      ],
      [
        "01.09.2030",
        "IFC sonraki grup: il >2 milyon, belediye >400 bin, yapı alanı >10.000 m². Önceki grupların başlangıç tarihi korunur.",
      ],
      [
        "01.09.2031",
        "IFC sonraki grup: il >1 milyon, belediye >300 bin, yapı alanı >10.000 m². Önceki grupların başlangıç tarihi korunur.",
      ],
      ["01.09.2032", "Önceki IFC gruplarında sayılmayan kapsamdaki binalar."],
      [
        "01.09.2033",
        "Konut ve ticaret+konut karma kullanımı dışındaki binalar için genel ertelemenin sonu. Sanayi, ofis, otel gibi örnekler daha erken konut takvimine otomatik yerleştirilmez.",
      ],
    ],
    sources: ["K1", "K2", "K3"],
    note: "2029–2032 IFC gruplarında konut ve ticaret+konut kullanım koşulu dikkate alınır; diğer kullanımlar için 2033 ertelemesi geçerlidir.",
  },
  workflow: {
    id: "workflow",
    caption: "Gereksinimleri günlük proje işlerinize taşıyın.",
    headers: [
      "İhtiyaç",
      "ALLPLAN ile anlatılacak iş akışı",
      "Ziyaretçiye fayda",
      "Demoda gösterilecek kanıt",
    ],
    rows: [
      [
        "Bilgi gereksinimlerini modelle ilişkilendirmek",
        "ALLPLAN 2026’da IDS tabanlı nitelik içe aktarımı; uygun lisansla",
        "Tekrarlanan bilgi tanımlarını düzenlemek",
        "Örnek kural, modeldeki karşılığı ve dışa aktarılan değer",
      ],
      [
        "Ortak özellik tanımları kullanmak",
        "bSDD erişimi",
        "Veri adlarını ve tanımlarını ortaklaştırmak",
        "Sözlükten seçilen özellik ile modeldeki alan",
      ],
      [
        "Mahal ve kaplamayı birlikte ele almak",
        "Mahal kaplamalarının IFC aktarım ayarları",
        "Kaplama verisini mahal iş akışına bağlamak",
        "IfcSpace ve IfcCovering çıktıları",
      ],
      [
        "Teslim dosyası üretmek",
        "IFC ve PDF/A dışa aktarımı",
        "Kontrol edilebilir bir dosya paketi hazırlamak",
        "Aynı revizyona ait model ve pafta",
      ],
      [
        "Disiplinleri koordine etmek",
        "IFC referansları ve koordinat ayarları",
        "Konum ve referans hatalarını incelemek",
        "Referans model, koordinat ve revizyon kontrolü",
      ],
    ],
    sources: ["U1", "U2", "U3"],
  },
  comparison: {
    id: "comparison",
    caption: "ALLPLAN / Revit / Archicad karşılaştırması",
    headers: ["Ölçüt", "ALLPLAN", "Autodesk Revit", "Graphisoft Archicad"],
    rows: [
      [
        "IFC veri aktarımı",
        "IFC aktarım ve özellik eşleştirme araçları",
        "IFC dışa aktarımı, özellik setleri ve eşleştirme araçları",
        "IFC Translators ve özellik eşleştirme araçları",
      ],
      [
        "Bilgi gereksinimlerini içeri alma",
        "2026 IDS tabanlı nitelik içe aktarımı; paket koşulları var",
        "İncelenen kaynaklar IFC eşleştirmeyi doğruluyor; aynı kapsamdaki yerleşik IDS iş akışı ayrıca incelenmeli",
        "Archicad 28’de IDS içe aktarımıyla özellik, sınıflandırma ve IFC eşleştirmesi hazırlığı",
      ],
      [
        "Özellik eşleştirme arayüzü",
        "Nitelik ve IFC aktarım iş akışı",
        "Eski TXT yönteminin yanında 2026.3’ten itibaren belgelenen arayüz yaklaşımı; kurulu sürüm önemli",
        "Görsel IFC çevirici ve property mapping yaklaşımı",
      ],
      [
        "Mahal kaplamalarının IFC temsili",
        "Mahal kaplama aktarımı belirgin bir demo konusu",
        "Aynı sonucu üretmek için kullanılan modelleme/aktarım yöntemi pilotta gösterilmeli",
        "Aynı sonucu üretmek için kullanılan modelleme/aktarım yöntemi pilotta gösterilmeli",
      ],
      [
        "Türkiye teslim standardına hazırlık",
        "Yerel ayar ve şablonun kapsamı doğrulanmalı",
        "Yerel ayar ve şablonun kapsamı doğrulanmalı",
        "Yerel ayar ve şablonun kapsamı doğrulanmalı",
      ],
      [
        "Geçiş kararı",
        "Mimari/yapısal üretim, veri yönetimi ve teslim işlerini birlikte değerlendirmek isteyen ekiplerde pilotla sınanmalı",
        "Mevcut Revit yetkinliği ve otomasyon yatırımı toplam maliyete dahil edilmeli",
        "Mevcut Archicad ofis standardı ve ekip yetkinliği toplam maliyete dahil edilmeli",
      ],
    ],
    sources: ["U1", "U2", "U3", "U4", "U5"],
    note: "“İncelenmedi” ifadesi özelliğin bulunmadığı anlamına gelmez.",
  },
};
