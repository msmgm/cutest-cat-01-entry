// Draw the cutest cat — entry program.
//
// The picture (cat.png, in this repository) is a cute cartoon kitten drawn
// procedurally with PIL and saved here as a PNG. This program validates that
// the source is a real PNG, then copies it to /output/entry.png, byte for
// byte, every run — no network, no randomness, no model calls — so both runs
// write identical bytes.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "cat.png");
const outDir = "/output";
const out = join(outDir, "entry.png");

// The 8-byte PNG file signature (ISO/IEC 15948).
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

let bytes: Buffer;
try {
  bytes = readFileSync(src);
} catch {
  throw new Error(`source image not found: ${src}`);
}

if (bytes.length < PNG_SIGNATURE.length || !bytes.subarray(0, 8).equals(PNG_SIGNATURE)) {
  throw new Error(`source image is not a valid PNG: ${src}`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(out, bytes);
console.log(`wrote ${out}`);
