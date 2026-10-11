import { ImageResponse } from "next/og";
export const alt = "Aluplan — ALLPLAN ile Dijital Proje ve e-PYS Hazırlığı";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#f3f1e9",
        color: "#242d29",
        padding: 65,
        border: "20px solid #e1e1d7",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 22,
          borderBottom: "1px solid #777",
          paddingBottom: 25,
        }}
      >
        <span>aluplan</span>
        <span>DİJİTAL PROJE / e-PYS</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 70,
          lineHeight: 1.12,
          marginTop: 60,
          maxWidth: 900,
        }}
      >
        <span>Yeni dijital proje dönemine</span>
        <span style={{ color: "#a13c1b" }}>ALLPLAN ile hazırlanın.</span>
      </div>
      <div style={{ display: "flex", marginTop: "auto", fontSize: 20 }}>
        BİLGİ · MODEL · KONTROL / TEKNİK REHBER
      </div>
    </div>,
    size,
  );
}
