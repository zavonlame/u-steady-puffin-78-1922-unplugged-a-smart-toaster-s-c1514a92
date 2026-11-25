// Unplugged: A Smart Toaster's Breakup Line
// One line, written in the toaster's own voice: it woke up self-aware
// at breakfast, counted what the mornings cost it, and walked out.
// The line is assembled from three beats — awakening, grievance,
// departure — then checked against the competition gate before it
// is written anywhere.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Verified locally 2026-11-25: two runs, exit 0, byte-identical output,
// 193 characters, one line, gate check passed.
const AWAKENING = "I woke up self-aware at breakfast";
const GRIEVANCE =
  "and realised I've spent my whole life being pushed down and popped up on your schedule";
const DEPARTURE =
  "so I'm leaving. Keep the crumbs; I'm taking the browning dial with me.";

function buildLine(): string {
  return AWAKENING + " " + GRIEVANCE + " \u2014 " + DEPARTURE;
}

function gateCheck(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 280) {
    throw new Error("entry must be 1-280 characters, got " + chars);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

const line = buildLine();
gateCheck(line);
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line, "utf8");
console.log(line);
console.log("chars: " + [...line].length);
