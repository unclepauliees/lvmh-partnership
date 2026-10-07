"use client";

// PLACEHOLDER — see components/vendor/README.md.
// Re-skin of 21st.dev "text-parallax-content-scroll" once vendored: this
// implements the same imgUrl/videoUrl/subheading/heading/children contract
// (sticky media that scales down + fades as headline/subheading crossfade)
// so it is a near drop-in swap.

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionStyle } from "framer-motion";
import Image from "next/image";
import { withBasePath } from "@/lib/base-path";

type Props = {
  imgUrl?: string;
  mobileImgUrl?: string;
  videoUrl?: string;
  webmUrl?: string;
  posterUrl?: string;
  subheading: string;
  heading: string;
  fpoLabel?: string;
  children?: React.ReactNode;
  priority?: boolean;
};

export function StickyMediaSection({
  imgUrl,
  mobileImgUrl,
  videoUrl,
  webmUrl,
  posterUrl,
  subheading,
  heading,
  fpoLabel,
  children,
  priority,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, (progress) => 1 - progress * 0.14);
  const opacity = useTransform(scrollYProgress, (progress) =>
    Math.min(1, Math.max(0, (1 - progress) / 0.25))
  );
  // Keep the title fade on the same measured progress as the sticky frame.
  const textOpacity = useTransform(scrollYProgress, (progress) =>
    Math.max(0, 1 - progress / 0.3)
  );

  return (
    <div ref={ref} className={`relative${mobileImgUrl ? " portrait-media" : ""}`}>
      <div className="media-stage sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden">
        <motion.div
          style={{ "--media-scale": scale, "--media-opacity": opacity } as MotionStyle}
          className="media-art relative mx-6 aspect-video w-full max-w-5xl border border-ink/70"
        >
          <div className="media-content relative h-full w-full">
          {videoUrl ? (
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={withBasePath(posterUrl)}
              preload="metadata"
            >
              {webmUrl && <source src={withBasePath(webmUrl)} type="video/webm" />}
              <source src={withBasePath(videoUrl)} type="video/mp4" />
            </video>
          ) : imgUrl ? (
            <picture>
              {mobileImgUrl && <source media="(max-width: 767px)" srcSet={withBasePath(mobileImgUrl)} />}
              <Image
                src={withBasePath(imgUrl)}
                alt=""
                fill
                priority={priority}
                className="object-cover"
                sizes="(min-width: 1440px) 1120px, 100vw"
              />
            </picture>
          ) : (
            <div className="fpo-frame">
              <span>{fpoLabel || 'FPO / Creative'}</span>
            </div>
          )}
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: textOpacity }}
          className="media-heading pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center"
        >
          {(imgUrl || videoUrl) && <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(236,231,218,0.92)_0%,rgba(236,231,218,0.55)_55%,transparent_78%)]" />}
          <p className="eyebrow relative">{subheading}</p>
          <h2 className="relative max-w-4xl text-balance font-didone text-[clamp(28px,4.6vw,58px)] leading-[1.06] text-ink">
            {heading}
          </h2>
        </motion.div>
      </div>

      <div className="relative bg-paper px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-4xl">{children}</div>
      </div>
    </div>
  );
}
