"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { SECTIONS } from "@/lib/sections-meta";
import { withBasePath } from "@/lib/base-path";

export function Navbar() {
  const [active, setActive] = useState(SECTIONS[0].index);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismiss = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', dismiss);
    return () => window.removeEventListener('keydown', dismiss);
  }, []);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => !!el
    );
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const meta = SECTIONS.find((s) => s.id === visible.target.id);
          if (meta) setActive(meta.index);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className="flex w-full max-w-5xl items-center justify-between gap-2 border border-[color:color-mix(in_oklab,var(--paper)_35%,transparent)] bg-[color:color-mix(in_oklab,var(--espresso)_72%,transparent)] px-3 py-3 text-paper backdrop-blur-md sm:gap-4 sm:px-5"
        aria-label="Presentation navigation"
      >
        <div className="flex items-center gap-2.5 whitespace-nowrap font-mono-rh text-[10px] tracking-[0.12em] uppercase sm:tracking-[0.24em]">
          <span className="inline-block h-4 w-6 shrink-0" aria-hidden>
            <Image
              src={withBasePath("/brand/emblem-on-dark.svg")}
              alt=""
              width={24}
              height={16}
            />
          </span>
          <span>Project Rhapsody</span>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="shrink-0 font-mono-rh text-[10px] tracking-[0.24em] uppercase text-[color:rgba(236,231,218,0.72)] hover:text-paper"
          aria-expanded={open}
          aria-label="Open section index"
        >
          {active} / 16
        </button>

        <div className="flex shrink-0 items-center gap-4">
          <span className="hidden font-mono-rh text-[10px] tracking-[0.24em] uppercase text-[color:rgba(236,231,218,0.55)] lg:block">
            Confidential · LVMH
          </span>
          <a
            href={withBasePath("/downloads/rhapsody-lvmh-partnership.pdf")}
            download="Project-Rhapsody-LVMH-Partnership.pdf"
            aria-label="Download PDF"
            title="Download the LVMH partnership deck"
            className="inline-flex min-h-9 min-w-9 items-center justify-center gap-2 font-mono-rh text-[10px] uppercase text-paper/80 hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
          >
            <Download className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Download PDF</span>
          </a>
        </div>
      </nav>

      {open && (
        <div className="absolute top-[80px] max-h-[calc(100dvh-100px)] overflow-y-auto w-[calc(100%-32px)] max-w-5xl border border-[color:rgba(236,231,218,0.18)] bg-[color:color-mix(in_oklab,var(--espresso)_92%,transparent)] p-3">
          <ol className="grid grid-cols-2 gap-1 sm:grid-cols-4">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className={`block px-2 py-1.5 font-mono-rh text-[10px] tracking-[0.1em] uppercase ${
                    s.index === active
                      ? "text-signal"
                      : "text-[color:rgba(236,231,218,0.65)] hover:text-paper"
                  }`}
                >
                  {s.index} {s.label}
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </header>
  );
}
