import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { LINE } from './line.ts';

// One-line joke for make.fun's "One-Line Laugh-Off" judged-text bounty.
// Final pass: guard the gate's exact constraints (UTF-8, 1-200 code points, single line).
const text = LINE;
const size = [...text].length;
if (size < 1 || size > 200) {
  throw new Error(`entry must be 1-200 characters, got ${size}`);
}
if (/[\u0000-\u0009\u000b-\u001f\u007f\u2028\u2029]/.test(text)) {
  throw new Error('entry must be one line with no control characters');
}
if (!text.trim()) {
  throw new Error('entry must not be only whitespace');
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.txt');
writeFileSync(target, text, 'utf8');
console.log(`wrote a ${size}-character line to ${target}`);
