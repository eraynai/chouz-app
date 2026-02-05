"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Share2 } from "lucide-react";


type PhaseLabel = "inhale" | "hold" | "exhale";

type ScriptSegment = {
  text: string;
  durationMs: number;
  phase?: PhaseLabel;
};

function MoonSunIcon() {
  return (
    <svg
      className="moon-sun-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {/* Main circle (sun/moon body) */}
      <circle
        className="moon-sun-body"
        cx="12"
        cy="12"
        r="7"
      />
      {/* Rays */}
      <g className="moon-sun-rays">
        <line x1="12" y1="1.5" x2="12" y2="4" />
        <line x1="12" y1="20" x2="12" y2="22.5" />
        <line x1="1.5" y1="12" x2="4" y2="12" />
        <line x1="20" y1="12" x2="22.5" y2="12" />
        <line x1="4.5" y1="4.5" x2="6.25" y2="6.25" />
        <line x1="17.75" y1="17.75" x2="19.5" y2="19.5" />
        <line x1="4.5" y1="19.5" x2="6.25" y2="17.75" />
        <line x1="17.75" y1="6.25" x2="19.5" y2="4.5" />
      </g>
      {/* Cut-out circle that animates to create the crescent */}
      <g className="moon-sun-mask">
        <circle
          cx="12"
          cy="12"
          r="7"
        />
      </g>
    </svg>
  );
}

const SESSION_TOTAL_MS = 5 * 60 * 1000;

const SCRIPT_SEGMENTS: ScriptSegment[] = [
  // Intro / settling (neutral)
  { text: "Welcome…", durationMs: 12000 },
  {
    text:
      "Take a moment to get comfortable…\nsitting or standing…\nhowever feels natural…",
    durationMs: 12000,
  },
  { text: "Let your shoulders soften…", durationMs: 12000 },
  { text: "Let your jaw relax…", durationMs: 12000 },
  {
    text: "There’s nothing you need to do right now…\nexcept be here…",
    durationMs: 12000,
  },
  {
    text:
      "If your eyes want to close, that’s okay…\nIf not… simply soften your gaze…",
    durationMs: 12000,
  },
  {
    text: "Begin by noticing your breath…\njust as it is…",
    durationMs: 12000,
  },
  { text: "No need to change it yet…", durationMs: 12000 },
  {
    text:
      "Notice where you feel it most…\nin your chest…\nin your belly…\nor in your nose…",
    durationMs: 12000,
  },
  {
    text: "Let the breath come and go…\nlike waves…\nwithout effort…",
    durationMs: 12000,
  },
  { text: "Now, we’ll begin breathing together…", durationMs: 12000 },
  { text: "I’ll guide the rhythm…", durationMs: 12000 },

  // Cycle 1 (4-2-6)
  { text: "Breathe in…\ntwo…\nthree…\nfour…", durationMs: 4000, phase: "inhale" },
  { text: "Hold…\ntwo…", durationMs: 2000, phase: "hold" },
  {
    text:
      "And slowly breathe out…\ntwo…\nthree…\nfour…\nfive…\nsix…",
    durationMs: 6000,
    phase: "exhale",
  },

  // Cycle 2 (4-2-6)
  {
    text: "Again…\n\nBreathe in…\ntwo…\nthree…\nfour…",
    durationMs: 4000,
    phase: "inhale",
  },
  { text: "Hold…\ntwo…", durationMs: 2000, phase: "hold" },
  {
    text:
      "And slowly breathe out…\ntwo…\nthree…\nfour…\nfive…\nsix…",
    durationMs: 6000,
    phase: "exhale",
  },

  // Softening
  {
    text:
      "Let the exhale soften your body…\n\nFeel the release in your shoulders…\nin your chest…\nin your face…",
    durationMs: 12000,
  },

  // Cycle 3
  { text: "Breathe in…\ntwo…\nthree…\nfour…", durationMs: 4000, phase: "inhale" },
  { text: "Hold…\ntwo…", durationMs: 2000, phase: "hold" },
  {
    text:
      "And breathe out…\ntwo…\nthree…\nfour…\nfive…\nsix…",
    durationMs: 6000,
    phase: "exhale",
  },

  // Reminder
  {
    text:
      "If your mind wanders… that’s okay…\n\nGently return to the count…",
    durationMs: 12000,
  },

  // Cycle 4
  { text: "Breathe in…\ntwo…\nthree…\nfour…", durationMs: 4000, phase: "inhale" },
  { text: "Hold…\ntwo…", durationMs: 2000, phase: "hold" },
  {
    text:
      "And slowly out…\ntwo…\nthree…\nfour…\nfive…\nsix…",
    durationMs: 6000,
    phase: "exhale",
  },

  // Cycle 5
  {
    text: "One more time…\n\nIn…\ntwo…\nthree…\nfour…",
    durationMs: 4000,
    phase: "inhale",
  },
  { text: "Hold…\ntwo…", durationMs: 2000, phase: "hold" },
  {
    text:
      "And out…\ntwo…\nthree…\nfour…\nfive…\nsix…",
    durationMs: 6000,
    phase: "exhale",
  },

  // Outro / integration
  {
    text:
      "Now… release the counting…\n\nLet your breath flow naturally again…",
    durationMs: 12000,
  },
  {
    text:
      "Notice how it feels…\n\nSlower…\nDeeper…\nMore open…",
    durationMs: 12000,
  },
  {
    text:
      "Sense the space you’ve created…\ninside your body…\nand your mind…",
    durationMs: 12000,
  },
  {
    text:
      "Take one final, easy breath in…\n\nAnd a long, gentle breath out…",
    durationMs: 12000,
  },
  {
    text:
      "Carry this calm with you…\ninto the next moment of your day…",
    durationMs: 12000,
  },
  {
    text: "When you’re ready…\n\ngently open your eyes…",
    durationMs: 12000,
  },
];

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export function BreathworkExperience() {
  const [started, setStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0); // ms since session start
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Session clock driven by requestAnimationFrame
  useEffect(() => {
    if (!isPlaying) return;

    let frameId: number;
    const start = performance.now() - elapsed;

    const loop = (now: number) => {
      const t = now - start;
      if (t >= SESSION_TOTAL_MS) {
        setElapsed(SESSION_TOTAL_MS);
        setIsPlaying(false);
        if (audioRef.current) {
          audioRef.current.pause();
        }
        return;
      }
      setElapsed(t);
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, elapsed]);

  // Derive current script segment, phase, phase progress, timer
  let currentPhase: PhaseLabel | null = null;
  let phaseT = 0;

  let remaining = Math.min(elapsed, SESSION_TOTAL_MS);
  let idx = 0;
  for (; idx < SCRIPT_SEGMENTS.length; idx++) {
    const seg = SCRIPT_SEGMENTS[idx];
    if (remaining <= seg.durationMs) {
      currentPhase = seg.phase ?? null;
      phaseT = seg.durationMs > 0 ? remaining / seg.durationMs : 0;
      break;
    }
    remaining -= seg.durationMs;
  }
  if (idx >= SCRIPT_SEGMENTS.length) {
    const last = SCRIPT_SEGMENTS[SCRIPT_SEGMENTS.length - 1];
    currentPhase = last.phase ?? null;
    phaseT = 1;
  }

  const remainingMs = Math.max(SESSION_TOTAL_MS - elapsed, 0);
  const totalSeconds = Math.round(remainingMs / 1000);
  const mm = Math.floor(totalSeconds / 60);
  const ss = totalSeconds % 60;
  const timerText = `${mm}:${ss.toString().padStart(2, "0")}`;

  // Breathing position based on phase: 0 = base, 1 = peak
  let breathAmount = 0; // 0..1
  if (currentPhase === "inhale") {
    breathAmount = easeInOut(phaseT);
  } else if (currentPhase === "hold") {
    breathAmount = 1;
  } else if (currentPhase === "exhale") {
    breathAmount = easeInOut(1 - phaseT);
  } else {
    breathAmount = 0; // narration / neutral
  }

  const isBreathingSegment = !!currentPhase;

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } else {
      setStarted(true);
      setIsPlaying(true);
      if (audioRef.current) {
        void audioRef.current.play();
      }
    }
  };

  const handleRestart = () => {
    setStarted(true);
    setElapsed(0);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      void audioRef.current.play();
    }
  };

  const handleShare = async () => {
    if (typeof window === "undefined") return;
    const shareUrl = window.location.origin; // landing page
    const shareTitle = "Chouz — A calmer way to begin";
    const shareText =
      "I just completed a 5-minute breathing path with Chouz.";

    const nav = navigator as Navigator & { share?: Function };

    if (nav.share) {
      try {
        await nav.share({ title: shareTitle, text: shareText, url: shareUrl });
      } catch {
        // user cancelled or share failed – silently ignore
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard");
      } catch {
        // ignore
      }
    } else {
      window.open(shareUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-[#171923] text-white flex flex-col">
      {/* Hidden audio element for the 5-minute guide */}
      <audio ref={audioRef} src="/audio/breath-5min.mp3" preload="auto" />

      {/* Header */}
      <div className="px-8 py-6 border-b border-white/10">
  <div className="max-w-4xl mx-auto flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:text-left">
    {/* Logo + brand */}
    <div className="flex items-center gap-3">
      <Link
        href="/"
        aria-label="Reload homepage"
        className="inline-flex items-center justify-center"
      >
        <MoonSunIcon />
      </Link>
      <Link
        className="font-display text-4xl font-medium tracking-tight leading-none transition-opacity hover:opacity-70"
        href="/"
      >
        chouz
      </Link>
    </div>

    {/* Subtitle: stacks *below* on mobile, to the right on larger screens */}
    <div className="text-sm text-white/40">
      <span>5-minute guided breathwork meditation</span>
    </div>
  </div>
</div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-10">
        <div className="w-full max-w-3xl flex flex-col gap-10 items-center">
          {/* Orb + (no script text) */}
          <div className="relative w-full max-w-xl flex flex-col items-center gap-8">
            {/* Orb visuals */}
            <div className="relative w-80 h-80 flex items-center justify-center">
              {/* Center dot */}
              <div className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 z-10" />

              {/* Concentric rings */}
              {[...Array(8)].map((_, i) => {
                const baseSize = 40 + i * 30;
                const baseOpacity = 0.4 - i * 0.04;

                let scale = 1;
                let opacity = baseOpacity;

                if (isBreathingSegment) {
                  // Smooth, continuous mapping from breathAmount (0..1) to ring scale
                  const minScale = 0.9 - i * 0.01;
                  const maxScale = 1.3 + i * 0.02;
                  scale = minScale + (maxScale - minScale) * breathAmount;
                } else {
                  // Narration state: subtle endless wave of light moving through rings
                  const t = elapsed / 1000; // seconds
                  const wave =
                    0.5 +
                    0.5 * Math.sin((t * 0.8 - i * 0.4) * Math.PI * 2);
                  scale = 0.98 + wave * 0.06; // gentle pulsing
                  opacity = baseOpacity * (0.4 + 0.6 * wave);
                }

                return (
                  <div
                    key={i}
                    className="absolute rounded-full border-2 border-blue-400/40 transition-transform transition-opacity ease-in-out"
                    style={{
                      width: `${baseSize}px`,
                      height: `${baseSize}px`,
                      opacity,
                      transform: `scale(${scale})`,
                    }}
                  />
                );
              })}

              {/* Ambient glow during breathing segments */}
              {isBreathingSegment && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className="w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl transition-transform transition-opacity ease-in-out"
                    style={{
                      transform:
                        currentPhase === "exhale"
                          ? "scale(0.9)"
                          : currentPhase === "inhale" ||
                            currentPhase === "hold"
                          ? "scale(1.2)"
                          : "scale(1)",
                      opacity:
                        currentPhase === "exhale"
                          ? 0.6
                          : currentPhase === "inhale" ||
                            currentPhase === "hold"
                          ? 1
                          : 0.8,
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Phase label and timer */}
          <div className="flex items-center justify-center w-full max-w-xl text-sm text-white/60">
            <div className="min-h-[1.5rem]">
              {isBreathingSegment && (
                <span>
                  {currentPhase === "inhale"
                    ? "Inhale"
                    : currentPhase === "hold"
                    ? "Hold"
                    : "Exhale"}
                </span>
              )}
            </div>
            <div className="font-mono tracking-wide text-[var(--color-primary)]">
              {started ? timerText : "5:00"}
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white p-5 rounded-full transition-all shadow-lg"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-0.5" />
              )}
            </button>

            {/* Restart Button */}
            <button
              onClick={handleRestart}
              disabled={elapsed === 0}
              className="bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 border border-white/20 text-white p-4 rounded-full transition-all group"
              title="Restart"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="bg-white/5 hover:bg-white/10 border border-white/20 text-white p-4 rounded-full transition-all group"
              title="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* CSS for fade if you want to extend later */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
