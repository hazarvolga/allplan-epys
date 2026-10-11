// TODO(content): publisher must approve legal texts before DEMO_LEGAL_READY is enabled.
export const supportPages = [
  {
    slug: "hakkimizda",
    title: "Hakkımızda",
    description: "Aluplan — ALLPLAN Türkiye distribütörü",
    paragraphs: ["Aluplan, ALLPLAN Türkiye distribütörüdür."],
    todo: "Kurumsal tanıtım metni ve yayın sorumlusu bilgileri bekleniyor.",
  },
  {
    slug: "iletisim",
    title: "İletişim",
    description: "Aluplan",
    paragraphs: ["Aluplan — ALLPLAN Türkiye distribütörü"],
    todo: "İletişim e-postası, telefon ve açık adres bilgileri bekleniyor.",
  },
  {
    slug: "gizlilik-politikasi",
    title: "Gizlilik politikası",
    description: "Gizlilik ve çerez politikası taslağı",
    paragraphs: [
      "Bu sayfa yayın öncesi taslaktır. Veri sorumlusu, barındırma sağlayıcısı, varsa analiz hizmeti, saklama süreleri ve başvuru kanalı tamamlanmalıdır.",
      "Tema tercihi tarayıcınızda saklanır. Analytics hizmeti varsayılan olarak kapalıdır. Demo formu, yapılandırma ve aydınlatma metni tamamlanmadan gönderim kabul etmez.",
    ],
    todo: "Veri işleme envanterine göre amaç, hukuki sebep, alıcılar, saklama ve varsa yurt dışı aktarım süreçleri onaylanmalıdır.",
  },
  {
    slug: "kvkk",
    title: "KVKK aydınlatma metni",
    description: "Demo talebi aydınlatma metni taslağı",
    paragraphs: [
      "Bu metin henüz yürürlüğe alınmış bir aydınlatma metni değildir. Formda ad soyad, iş e-postası, firma/ofis, disiplin, mevcut yazılım, proje türü, görüşme konusu ve isteğe bağlı telefon alanı bulunur.",
      "Yayın öncesinde veri sorumlusunun tam ticari kimliği, işleme amaçları ve hukuki sebepleri, toplama yöntemi, alıcı grupları, aktarım koşulları, saklama süresi ve ilgili kişi hakları için başvuru kanalı belirlenmelidir.",
      "Açık rıza gereken işlemler varsa rıza metni aydınlatmadan ayrı değerlendirilmelidir. Bu taslak, kuruma özgü hukuki değerlendirme yerine geçmez.",
    ],
    todo: "Aydınlatma, iletişim talebi ve açık rıza kapsamını yetkili gözden geçiren tamamlamalıdır.",
  },
] as const;
