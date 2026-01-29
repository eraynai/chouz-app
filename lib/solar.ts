import SunCalc from "suncalc";

export type SunPhase =
  | "night"
  | "astronomical-twilight"
  | "nautical-twilight"
  | "civil-twilight"
  | "dawn"
  | "morning"
  | "midday"
  | "afternoon"
  | "evening";

export interface SunPhaseResult {
  altitudeDeg: number;
  phase: SunPhase;
}

export interface OrbColors {
  base: string;
  glow: string;
}

export function getSunAltitude(
  latitude: number,
  longitude: number,
  date: Date = new Date(),
): number {
  const { altitude } = SunCalc.getPosition(date, latitude, longitude);
  // altitude is in radians; convert to degrees
  return (altitude * 180) / Math.PI;
}

export function getSunPhaseFromAltitude(altitudeDeg: number): SunPhase {
  if (altitudeDeg < -18) return "night"; // sun well below horizon
  if (altitudeDeg < -12) return "astronomical-twilight";
  if (altitudeDeg < -6) return "nautical-twilight";
  if (altitudeDeg < -0.5) return "civil-twilight"; // just before sunrise / after sunset
  if (altitudeDeg < 10) return "dawn"; // low on the horizon
  if (altitudeDeg < 30) return "morning";
  if (altitudeDeg < 55) return "midday";
  if (altitudeDeg < 70) return "afternoon"; // descending but still relatively high
  return "evening";
}

export function getSunPhase(
  latitude: number,
  longitude: number,
  date: Date = new Date(),
): SunPhaseResult {
  const altitudeDeg = getSunAltitude(latitude, longitude, date);
  const phase = getSunPhaseFromAltitude(altitudeDeg);
  return { altitudeDeg, phase };
}

export function getOrbColorsForPhase(phase: SunPhase): OrbColors {
  switch (phase) {
    case "night":
      return { base: "#020617", glow: "#020617" }; // deep navy
    case "astronomical-twilight":
      return { base: "#020617", glow: "#0b1120" };
    case "nautical-twilight":
      return { base: "#0b1120", glow: "#1e293b" };
    case "civil-twilight":
      return { base: "#1e293b", glow: "#4b5563" }; // blue-grey before sunrise/after sunset
    case "dawn":
      return { base: "#f97316", glow: "#fed7aa" }; // warm orange dawn
    case "morning":
      return { base: "#fde68a", glow: "#fef9c3" }; // soft pale yellow
    case "midday":
      return { base: "#facc15", glow: "#fde68a" }; // bright sun
    case "afternoon":
      return { base: "#fbbf24", glow: "#fed7aa" }; // warm golden light
    case "evening":
    default:
      return { base: "#ea580c", glow: "#9f1239" }; // sunset / dusk
  }
}
