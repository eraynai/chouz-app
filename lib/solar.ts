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

// Time-based phase calculation using SunCalc.getTimes so we can distinguish
// morning vs afternoon/evening even when the sun is at a similar altitude.
function getSunPhaseFromTimes(
  latitude: number,
  longitude: number,
  date: Date,
  altitudeDeg: number,
): SunPhase {
  const times = SunCalc.getTimes(date, latitude, longitude) as {
    nightEnd?: Date;
    nauticalDawn?: Date;
    dawn?: Date;
    sunrise?: Date;
    sunriseEnd?: Date;
    goldenHourEnd?: Date;
    solarNoon?: Date;
    goldenHour?: Date;
    sunsetStart?: Date;
    sunset?: Date;
    dusk?: Date;
    nauticalDusk?: Date;
    night?: Date;
  };

  const nowMs = date.getTime();
  const ms = (d?: Date) => (d ? d.getTime() : NaN);

  const nightEnd = ms(times.nightEnd);
  const nauticalDawn = ms(times.nauticalDawn);
  const dawn = ms(times.dawn);
  const sunrise = ms(times.sunrise);
  const goldenHourEnd = ms(times.goldenHourEnd ?? times.sunriseEnd);
  const solarNoon = ms(times.solarNoon);
  const goldenHour = ms(times.goldenHour);
  const sunsetStart = ms(times.sunsetStart);
  const sunset = ms(times.sunset);
  const dusk = ms(times.dusk);
  const nauticalDusk = ms(times.nauticalDusk);
  const night = ms(times.night);

  // If we don't have reasonable time data (e.g. polar regions), fall back to
  // the simpler altitude-based phase.
  if (!Number.isFinite(sunrise) || !Number.isFinite(sunset) || !Number.isFinite(solarNoon)) {
    return getSunPhaseFromAltitude(altitudeDeg);
  }

  if (nowMs < nightEnd) return "night";
  if (nowMs < nauticalDawn) return "astronomical-twilight";
  if (nowMs < dawn) return "nautical-twilight";
  if (nowMs < sunrise) return "civil-twilight";
  if (nowMs < goldenHourEnd) return "dawn"; // early morning golden hour
  if (nowMs < solarNoon) return "morning";
  if (nowMs < goldenHour) return "midday";
  if (nowMs < sunsetStart) return "afternoon";
  if (nowMs < sunset) return "evening";
  if (nowMs < dusk) return "civil-twilight";
  if (nowMs < nauticalDusk) return "nautical-twilight";
  if (nowMs < night) return "astronomical-twilight";

  return "night";
}

export function getSunPhase(
  latitude: number,
  longitude: number,
  date: Date = new Date(),
): SunPhaseResult {
  const altitudeDeg = getSunAltitude(latitude, longitude, date);
  const phase = getSunPhaseFromTimes(latitude, longitude, date, altitudeDeg);
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
