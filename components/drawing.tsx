"use client";
import { useEffect, useRef } from "react";
export function Drawing({
  compact = false,
  step = 0,
}: {
  compact?: boolean;
  step?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current?.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`drawing ${compact ? "drawing-compact" : ""} step-${step}`}
    >
      <svg
        viewBox="0 0 660 540"
        fill="none"
        role="img"
        aria-labelledby={
          compact ? "scenario-drawing-title" : "hero-drawing-title"
        }
      >
        <title id={compact ? "scenario-drawing-title" : "hero-drawing-title"}>
          Örnek gösterim: izometrik yapı, katlar ve mahal ilişkisi
        </title>
        <defs>
          <pattern
            id={compact ? "grid-small" : "grid-main"}
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M30 0H0v30"
              stroke="currentColor"
              strokeWidth=".35"
              opacity=".2"
            />
          </pattern>
        </defs>
        <rect
          width="660"
          height="540"
          fill={`url(#${compact ? "grid-small" : "grid-main"})`}
        />
        <g
          className="drawing-guides"
          stroke="currentColor"
          strokeWidth=".75"
          opacity=".35"
        >
          <path
            d="M42 428 330 264 620 428M330 28v480M42 236l578 0"
            strokeDasharray="5 7"
          />
          <path d="m58 436 271 156m298-153L330 606" />
          <path d="M82 392v54M556 374v46M64 415l253 146M88 399l-23 32M297 541l23 33" />
          <circle cx="330" cy="270" r="210" strokeDasharray="2 8" />
        </g>
        <g
          className="building-lines"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinejoin="round"
        >
          <path
            className="building-face"
            d="m110 195 234-134 217 125-233 136Z"
          />
          <path className="building-face" d="M110 195v196l218 127V322Z" />
          <path className="building-face" d="M328 322v196l233-135V186Z" />
          <path d="m110 241 218 127 233-135M110 290l218 127 233-135M110 340l218 127 233-135" />
          <path d="M158 223v196m53-166v197m56-165v198M387 288v197m58-231v197m57-230v196" />
          <path d="m110 195 218 127 233-136M168 161l217 125m-158-159 217 125M286 94l217 125M164 226 399 93M218 258 452 124M273 290 507 156" />
          <path
            d="m120 349 26 15v28l-26-15Zm48 27 31 18v28l-31-18Zm55 32 32 19v27l-32-18Zm55 32 36 21v27l-36-21Z"
            opacity=".65"
          />
          <path
            d="m120 299 26 15v28l-26-15Zm48 27 31 18v28l-31-18Zm55 32 32 19v27l-32-18Zm55 32 36 21v27l-36-21Z"
            opacity=".65"
          />
          <path
            d="m340 375 36-21v29l-36 21Zm58-34 36-21v29l-36 21Zm58-33 35-20v29l-35 20Zm58-34 36-21v29l-36 21Z"
            opacity=".65"
          />
        </g>
        <g className="accent-lines" stroke="var(--accent)" strokeWidth="1.5">
          <path fill="var(--accent-wash)" d="m168 211 60-34 105 61-60 34Z" />
          <path d="M168 211v-50l60-35 105 61v51M228 126v51M168 161l105 61 60-35M273 222v50" />
          <path d="m333 187 115-65h105M183 443l-55 34H65" />
          <circle cx="333" cy="187" r="3" fill="var(--accent)" />
          <circle cx="183" cy="443" r="3" fill="var(--accent)" />
        </g>
        <g fill="currentColor" className="drawing-labels">
          <text x="450" y="107">
            IFC / MODEL
          </text>
          <text x="65" y="495">
            PDF/A / PAFTA
          </text>
          <text x="27" y="30">
            Z
          </text>
          <text x="616" y="434">
            X
          </text>
          <text x="28" y="437">
            Y
          </text>
          <text x="358" y="44">
            A—A
          </text>
        </g>
        <g stroke="currentColor" opacity=".6">
          <path d="M22 18v24M10 30h24M626 18v24M614 30h24M22 498v24M10 510h24M626 498v24M614 510h24" />
        </g>
      </svg>
      <div className="drawing-title mono">
        <span>ÖRNEK GÖSTERİM</span>
        <span>İZOMETRİK / 01</span>
        <span>ÖLÇEKSİZ</span>
      </div>
    </div>
  );
}
