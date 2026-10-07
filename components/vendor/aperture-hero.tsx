"use client";

// PLACEHOLDER — see components/vendor/README.md.
// Re-skin of 21st.dev "sunset-skyline-hero" once vendored: a still
// first-light frame that lightens as the user scrolls down and dims back
// if they scroll up (pure scroll position, no autoplay). Near the bottom
// of the scroll range the light fades back down for contrast and the full
// lockup + headline + footnote rise out of 3D depth, then hold there
// while the pin finishes before releasing into Section 01.

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ChevronDown, Pause, Play } from "lucide-react";
import { withBasePath } from "@/lib/base-path";

export function ApertureHero() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Autoplay may start before React attaches the playback listeners.
    setPlaying(!video.paused);
    if (reducedMotion) video.pause();
  }, [reducedMotion]);
  // Framer's useScroll(target) derives progress from the target's own
  // bounding rect, and that rect briefly destabilizes at the exact instant
  // this element's sticky child un-pins (verified: revealOpacity would
  // collapse toward 0 for a span of scroll right at that boundary — a
  // rect-tracking edge case, not anything in our keyframes). Driving it
  // from plain window.scrollY compared against precomputed pixel bounds
  // sidesteps that entirely: it's just arithmetic, clamped by hand, with
  // no dependency on whether the element is still intersecting anything.
  const progress = useMotionValue(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let pinTop = 0;
    let pinRange = 1;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      pinTop = rect.top + window.scrollY;
      const unpinAt = pinTop + el.offsetHeight - window.innerHeight;
      pinRange = Math.max(1, unpinAt - pinTop);
    };

    const onScroll = () => {
      const raw = (window.scrollY - pinTop) / pinRange;
      progress.set(Math.min(1, Math.max(0, raw)));
    };

    measure();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [progress]);

  const bgScale = useTransform(progress, [0, 1], [1, 1.15]);

  // Light builds as you scroll down, then fades back for contrast once the
  // copy starts revealing — and reverses cleanly if you scroll back up,
  // since this all reads straight off scroll position, not a timeline.
  const bgBrightness = useTransform(progress, [0, 0.62, 0.8, 1], [1, 2.15, 0.85, 0.85]);
  const bgFilter = useTransform(bgBrightness, (v) => `brightness(${v})`);

  const scrimOpacity = useTransform(progress, [0.68, 0.85, 1], [0, 0.55, 0.55]);

  const revealOpacity = useTransform(progress, [0.78, 0.92], [0, 1]);
  const revealRotateX = useTransform(progress, [0.78, 0.94], [70, 0]);
  const revealScale = useTransform(progress, [0.78, 0.94], [0.6, 1]);
  const revealZ = useTransform(progress, [0.78, 0.94], [-500, 0]);
  const scrollHintOpacity = useTransform(progress, [0, 0.08, 0.22], [1, 1, 0]);

  return (
    <div ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-ink">
        {/* The supplied film sits behind the inherited scroll reveal. */}
        <motion.div style={{ scale: bgScale, filter: bgFilter }} className="absolute inset-0">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={withBasePath('/media/01-opening-film.mp4')}
            poster={withBasePath('/media/01-opening-poster.jpg')}
            autoPlay={!reducedMotion}
            muted
            loop
            playsInline
            preload="metadata"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            aria-label="Project Rhapsody sizzle film"
          />
        </motion.div>
        <button type="button" className="absolute bottom-6 right-6 z-20 flex size-11 items-center justify-center border border-paper/50 bg-ink/70 text-paper" aria-label={playing ? 'Pause opening film' : 'Play opening film'} title={playing ? 'Pause opening film' : 'Play opening film'} onClick={() => { const video = videoRef.current; if (!video) return; if (video.paused) void video.play().catch(() => setPlaying(false)); else video.pause(); }}>
          {playing ? <Pause size={18} /> : <Play size={18} />}
        </button>


        {/* dark scrim so the reveal always has contrast, regardless of the frame */}
        <motion.div
          style={{ opacity: scrimOpacity }}
          className="pointer-events-none absolute inset-0 bg-ink"
        />

        {/* the reveal: lockup + headline + footnote, held back until the very end */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ perspective: "1400px" }}
        >
          <motion.div
            style={{
              opacity: reducedMotion ? 1 : revealOpacity,
              scale: reducedMotion ? 1 : revealScale,
              rotateX: reducedMotion ? 0 : revealRotateX,
              z: reducedMotion ? 0 : revealZ,
              transformStyle: "preserve-3d",
            }}
            className="flex flex-col items-center gap-8 px-6 text-center"
          >
            <p className="font-mono-rh text-[10px] tracking-[0.3em] uppercase text-paper/60">
              [ LVMH Partnership · Confidential ]
            </p>
            <h1 className="max-w-3xl text-balance font-didone text-[clamp(28px,4.8vw,58px)] leading-[1.05] text-paper">
              Project Rhapsody for LVMH
            </h1>
            <Image
              src={withBasePath("/brand/primary-glow-clear.svg")}
              alt="Project Rhapsody · Orbital Media Studio"
              width={620}
              height={300}
              className="w-full max-w-sm"
              priority
            />
            <p className="max-w-xl font-mono-rh text-sm leading-relaxed text-paper">
              A new setting for creation. A new environment for discovery.
              <br /><br />A proposed partnership with
              <span className="platform-logo title-partner-logo">
                <Image
                  src={withBasePath("/media/06-symphony-logo.png")}
                  alt="Symphony Space"
                  width={6250}
                  height={6250}
                />
              </span>
            </p>
          </motion.div>
        </div>
        <motion.div
          aria-hidden="true"
          style={{ opacity: scrollHintOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-[max(24px,env(safe-area-inset-bottom))] flex flex-col items-center gap-2 text-paper drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
        >
          <span className="font-mono-rh text-[10px] uppercase">Scroll</span>
          <ChevronDown
            className="size-5 motion-safe:animate-bounce"
            strokeWidth={1.5}
          />
        </motion.div>
      </div>
    </div>
  );
}
