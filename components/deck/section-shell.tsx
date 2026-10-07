import { FooterStrip } from "@/components/chrome/footer-strip";

export function SectionShell({
  id,
  index,
  dark,
  children,
}: {
  id: string;
  index: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={dark ? "bg-espresso text-paper" : "bg-paper text-ink"}
    >
      {children}
      <FooterStrip index={index} dark={dark} />
    </section>
  );
}
