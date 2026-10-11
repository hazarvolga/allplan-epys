"use client";
import Link from "next/link";
import { useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { navigation, site } from "@/lib/site";
import { Arrow, Mark } from "./icons";
const subscribe = (callback: () => void) => {
  window.addEventListener("theme-change", callback);
  return () => window.removeEventListener("theme-change", callback);
};
export function Header() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const theme = useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.theme || "light",
    () => "light",
  );
  function toggleTheme() {
    const value = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = value;
    try {
      localStorage.setItem("theme", value);
    } catch {}
    window.dispatchEvent(new Event("theme-change"));
  }
  function close() {
    dialog.current?.close();
    setOpen(false);
    trigger.current?.focus();
  }
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/tr" className="brand">
          <Mark />
          <span>
            aluplan
            <span className="brand-caption">
              {site.affiliation.toLocaleUpperCase("tr")}
            </span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Ana gezinme">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-tools">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Açık temaya geç" : "Koyu temaya geç"
            }
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="7" />
              <path d="M12 5v14" />
              <path d="M12 5a7 7 0 0 1 0 14Z" fill="currentColor" />
            </svg>
          </button>
          <Link className="header-cta" href="/tr/demo">
            Demo iste <Arrow diagonal />
          </Link>
          <button
            ref={trigger}
            className="menu-button"
            aria-controls="mobile-navigation"
            aria-expanded={open}
            onClick={() => {
              dialog.current?.showModal();
              setOpen(true);
            }}
          >
            Menü <span aria-hidden="true">☰</span>
          </button>
        </div>
      </div>
      <dialog
        ref={dialog}
        id="mobile-navigation"
        className="mobile-dialog"
        aria-label="Mobil gezinme"
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement>(
              "a[href],button:not([disabled]),input:not([disabled])",
            ),
          );
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onCancel={() => {
          setOpen(false);
          trigger.current?.focus();
        }}
        onClose={() => setOpen(false)}
      >
        <div className="dialog-heading">
          <span className="mono">{site.publisher} / Gezinme</span>
          <button onClick={close} autoFocus aria-label="Menüyü kapat">
            Kapat ×
          </button>
        </div>
        <nav aria-label="Mobil gezinme">
          {[
            ...navigation,
            { label: "Teslim rehberi", href: "/tr/ifc-pdfa-teslim-rehberi" },
            { label: "Sık sorulan sorular", href: "/tr/sik-sorulan-sorular" },
            { label: "Projem için demo iste", href: "/tr/demo" },
          ].map((item, i) => (
            <Link href={item.href} key={item.href} onClick={close}>
              <span className="mono">0{i + 1}</span>
              {item.label}
              <Arrow />
            </Link>
          ))}
        </nav>
      </dialog>
    </header>
  );
}
