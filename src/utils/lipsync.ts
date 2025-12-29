const ATTACK = 0.06;
const RELEASE = 0.07;

export function weightEnvelope(t: number, s: number, e: number): number {
  if (t < s - ATTACK || t > e + RELEASE) return 0;
  if (t < s) return (t - (s - ATTACK)) / ATTACK;
  if (t > e) return 1 - (t - e) / RELEASE;
  return 1;
}
