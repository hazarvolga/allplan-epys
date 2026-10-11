import Link from "next/link";
export default function NotFound() {
  return (
    <main className="not-found" id="main-content">
      <span className="mono">404 / SAYFA BULUNAMADI</span>
      <h1>Bu sayfa bulunamadı.</h1>
      <p>Adresi kontrol edebilir veya ana sayfaya dönebilirsiniz.</p>
      <Link href="/tr" className="button">
        Ana sayfaya dön ↗
      </Link>
    </main>
  );
}
