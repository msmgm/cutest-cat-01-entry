// This is the cutest-cat-01 entry for make.fun.
// It copies cat.png to /output/entry.png byte for byte.
// It uses no network, no randomness and no model calls.
// The output is deterministic.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const src = "cat.png";
const outDir = "/output";
const out = join(outDir, "entry.png");

// This constant represents the eight-byte PNG file signature.
// It is used to validate the input file format.
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

let buffer: Buffer;
try {
  buffer = readFileSync(src);
} catch (err) {
  throw new Error(`File is missing: ${src}`);
}

function assertValidPng(buffer: Buffer) {
  if (buffer.length < 8 || !buffer.subarray(0, 8).equals(PNG_SIGNATURE)) {
    throw new Error(`Not a valid PNG: ${src}`);
  }
}

assertValidPng(buffer);

// The validated bytes are written unchanged.
mkdirSync(outDir, { recursive: true });
writeFileSync(out, buffer);

