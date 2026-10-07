import slides from '@/lib/slides.json';
import { ApertureHero } from '@/components/vendor/aperture-hero';
import { StickyMediaSection } from '@/components/vendor/sticky-media-section';
import { SectionShell } from '@/components/deck/section-shell';
import { SlideCopy } from '@/components/deck/slide-copy';
export default function Page() {
  return <main><section id={slides[0].id}><ApertureHero /></section>{slides.slice(1).map(slide => <SectionShell id={slide.id} index={slide.index} key={slide.id}>
    <StickyMediaSection subheading={slide.label} heading={slide.heading} imgUrl={slide.index === '03' ? '/media/03-ardbeg-research.jpg' : slide.index === '05' ? '/media/05-cosmos.png' : slide.index === '07' ? '/media/07-lvmh-value.png' : slide.index === '08' ? '/media/08-watch.png' : slide.index === '09' ? '/media/09-dom-perignon.png' : undefined} videoUrl={slide.index === '02' ? '/media/02-sneaker-loop.mp4' : slide.index === '04' ? '/media/04-lv-loop.mp4' : slide.index === '06' ? '/media/02-satellite-loop.mp4' : slide.index === '10' ? '/media/02-perfume-loop.mp4' : undefined} posterUrl={slide.index === '02' ? '/media/02-sneaker-poster.jpg' : slide.index === '04' ? '/media/04-lv-poster.jpg' : slide.index === '06' ? '/media/02-satellite-poster.jpg' : slide.index === '10' ? '/media/02-perfume-poster.jpg' : undefined} fpoLabel={`FPO ${slide.index} / ${slide.label}`}><SlideCopy slide={slide} /></StickyMediaSection>
  </SectionShell>)}</main>;
}
