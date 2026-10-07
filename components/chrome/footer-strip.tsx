export function FooterStrip({
  index,
  dark,
}: {
  index: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4 font-mono-rh text-[10px] tracking-[0.16em] uppercase sm:px-0 ${
        dark
          ? "border-t border-[color:rgba(236,231,218,0.18)] text-[color:rgba(236,231,218,0.55)]"
          : "border-t border-line-soft text-ink-mute"
      }`}
    >
      <span>Project Rhapsody</span>
      <span className="hidden sm:inline">LVMH Partnership</span>
      <span>Confidential</span>
      <span>{index} / 16</span>
    </div>
  );
}
