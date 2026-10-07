import fs from 'node:fs';
const source = fs.readFileSync(new URL('../../output/LVMH-Partnership-Copy-v5.md', import.meta.url), 'utf8');
const slides = source.split(/^## /m).slice(1).map(section => {
  const [label, ...rest] = section.trim().split('\n');
  const [number, ...name] = label.split('. ');
  const blocks = rest.join('\n').trim().split(/\n\s*\n/);
  const heading = blocks.shift().replaceAll('**', '');
  return { id: `slide-${number.padStart(2, '0')}`, index: number.padStart(2, '0'), label: name.join('. '), heading, blocks: blocks.map(text => text.startsWith('- ') ? { type: 'list', items: text.split('\n').map(line => line.replace(/^- /, '')) } : { type: text.startsWith('**') ? 'subtitle' : 'paragraph', text: text.replaceAll('**', '') }) };
});
fs.writeFileSync(new URL('../lib/slides.json', import.meta.url), JSON.stringify(slides, null, 2) + '\n');
