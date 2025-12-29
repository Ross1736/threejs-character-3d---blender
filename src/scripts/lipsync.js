// scripts:
// npm run lipsync -- voz.wav

import { execSync } from "child_process";
import path from "path";

const audio = process.argv[2];
if (!audio) {
  console.error("Falta el audio");
  process.exit(1);
}

const input = `public/audios/${audio}`;
const wav = input.replace(path.extname(input), ".wav");
const output = `${wav}.json`;

if (!audio.endsWith(".wav")) {
  execSync(`ffmpeg -y -i "${input}" "${wav}"`);
}

const RHUBARB = "Rhubarb-Lip-Sync-1.14.0-Windows/rhubarb.exe";

execSync(`"${RHUBARB}" -f json "${wav}" -o "${output}"`, { stdio: "inherit" });

console.log("✅ Lip-sync generado:", output);
