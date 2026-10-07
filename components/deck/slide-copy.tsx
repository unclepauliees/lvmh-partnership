import slides from '@/lib/slides.json';
import Image from 'next/image';
export function SlideCopy({ slide }: { slide: typeof slides[number] }) {
  return <div className="slide-copy">{slide.blocks.map((block, i) => block.type === 'list' ?
    <ol className="copy-ledger" key={i}>{block.items?.map((item, j) => <li className="ledger-row" key={item}><span className="ledger-number">{String(j + 1).padStart(2, '0')}</span><p>{item}</p></li>)}</ol> :
    block.type === 'subtitle' ? <h3 key={i}>{block.text}</h3> : <p key={i}>{block.text}</p>
  )}{slide.index === '06' && <div className="platform-summary"><div className="platform-identity"><span className="platform-logo"><Image src="/media/06-symphony-logo.png" alt="Symphony Space" width={6250} height={6250} /></span><span className="platform-name">Adagio</span></div><Image className="platform-cutout" src="/media/06-adagio-cutout.png" alt="Adagio spacecraft with its full solar-array wingspan" width={1560} height={1008} /><dl className="platform-specs" aria-label="Platform specifications">
    <div><dt>kg hosted</dt><dd>1,200</dd></div>
    <div><dt>module bays</dt><dd>12</dd></div>
    <div><dt>kW power</dt><dd>~12</dd></div>
    <div><dt>years on station</dt><dd>15</dd></div>
  </dl></div>}</div>;
}
