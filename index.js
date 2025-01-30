import { Alphabet } from './alphabet.js';
import { Codepoints } from './codepoints.js';
import { Metrics } from './metrics.js';
import { Stats } from './stats.js';

let codepoints = new Codepoints();

let stats = new Stats();

stats.attach(document.body);

let current = stats.stat('current');
current.value = codepoints[0];

let candidates = stats.stat('candidates');
candidates.value = codepoints.codepoints.length;

let min = stats.stat('min');
min.value = Infinity;

let max = stats.stat('max');
max.value = 0;

let alpha = stats.stat('alphabet');
alpha.dd.style.fontFamily = 'sans-serif';
alpha.dd.style.wordBreak = 'break-all';

let metrics = new Metrics();

metrics.attach(document.body);

let alphabet = new Alphabet();

alphabet.attach(document.body);

for (let codepoint of codepoints.codepoints) {
  current.value = codepoint;

  metrics.measure(codepoint);

  if (codepoint.bearing >= 0 ) {
    min.value = Math.min(min.value, codepoint.advance);
    max.value = Math.max(max.value, codepoint.advance);
  }

  alphabet.insert(codepoint);

  alpha.value = alphabet.render();

  await new Promise(requestAnimationFrame);
}
