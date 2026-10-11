import Link from "next/link";
import { site } from "@/lib/site";
import { Arrow, Mark } from "./icons";
export function Footer() {
  return (
    <>
      <footer className="site-footer">
        <div className="footer-top">
          <div>
            <div className="brand">
              <Mark />
              <span>aluplan</span>
            </div>
            <p>{site.affiliation}</p>
            <a href={site.corporateUrl} target="_blank" rel="noreferrer">
              aluplan.com.tr <Arrow diagonal />
            </a>
          </div>
          <nav aria-label="Alt gezinme">
            <Link href="/tr/hakkimizda">Hakkımızda</Link>
            <Link href="/tr/iletisim">İletişim</Link>
            <Link href="/tr/sik-sorulan-sorular">Sık sorulan sorular</Link>
            <Link href="/tr/gizlilik-politikasi">Gizlilik politikası</Link>
            <Link href="/tr/kvkk">KVKK</Link>
          </nav>
        </div>
        <div className="footer-bottom mono">
          <span>
            © {new Date().getFullYear()} {site.publisher}
          </span>
          <span>DİJİTAL PROJE / e-PYS HAZIRLIĞI</span>
          <span>TR / 01</span>
        </div>
      </footer>
      <Link href="/tr/demo" className="mobile-cta">
        Projem için demo iste <Arrow diagonal />
      </Link>
    </>
  );
}
