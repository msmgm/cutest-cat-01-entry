// Draw the cutest cat — entry program.
//
// The picture (cat.png, in this repository) is a cute cartoon kitten drawn
// procedurally with PIL and saved here as a PNG. This program only copies it
// to /output/entry.png, byte for byte, every run — no network, no randomness,
// no model calls — so both runs write identical bytes.
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "cat.png");
const outDir = "/output";
const out = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(src, out);
console.log(`wrote ${out}`);
