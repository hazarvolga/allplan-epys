"use client";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main-content" className="not-found">
      <span className="mono">SAYFA YÜKLENEMEDİ</span>
      <h1>Bir sorun oluştu.</h1>
      <p>Lütfen yeniden deneyin.</p>
      <button onClick={reset} className="button">
        Yeniden dene
      </button>
    </main>
  );
}
