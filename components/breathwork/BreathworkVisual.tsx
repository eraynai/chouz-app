"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import type * as P5NS from "p5";

type P5Instance = P5NS.default extends new (...args: any[]) => infer R ? R : P5NS;

type PhaseLabel = "inhale" | "hold" | "exhale";

type P5WithAudio = P5Instance;

export function BreathworkVisual() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const p5InstanceRef = useRef<P5Instance | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function setupP5() {
      const p5Module = await import("p5");
      const P5Constructor =
        (p5Module as unknown as { default: typeof P5NS }).default ??
        (p5Module as unknown as typeof P5NS);

      // Total session length (5 minutes)
      const sessionTotalMs = 5 * 60 * 1000;

      // Script segments covering the full 5-minute experience.
      // Each segment has an explicit duration and optional breathing phase
      // so the orb can sync with the text.
      const scriptSegments: {
        text: string;
        durationMs: number;
        phase?: PhaseLabel;
      }[] = [
        // Intro / settling (neutral breathing)
        { text: "Welcome…", durationMs: 12000 },
        {
          text:
            "Take a moment to get comfortable…\nsitting or standing…\nhowever feels natural…",
          durationMs: 12000,
        },
        { text: "Let your shoulders soften…", durationMs: 12000 },
        { text: "Let your jaw relax…", durationMs: 12000 },
        {
          text:
            "There’s nothing you need to do right now…\nexcept be here…",
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
          text:
            "Again…\n\nBreathe in…\ntwo…\nthree…\nfour…",
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
          text:
            "One more time…\n\nIn…\ntwo…\nthree…\nfour…",
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

      // Web Audio setup shared between p5 callbacks
      let audioContext: AudioContext | null = null;
      let analyser: AnalyserNode | null = null;
      let dataArray: Uint8Array | null = null;
      let audioElement: HTMLAudioElement | null = null;

      async function ensureAudio() {
        if (audioContext) return;

        const AudioCtx =
          (window as any).AudioContext || (window as any).webkitAudioContext;
        audioContext = new AudioCtx();

        audioElement = new Audio("/audio/breath-5min.mp3");
        audioElement.crossOrigin = "anonymous";

        const source = audioContext.createMediaElementSource(audioElement);
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        source.connect(analyser);
        analyser.connect(audioContext.destination);

        await audioContext.resume();
        await audioElement.play();
      }

      const sketch = (p: P5WithAudio) => {
        let started = false;
        let sessionStartMs: number | null = null;

        p.setup = () => {
          const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
          if (containerRef.current) {
            canvas.parent(containerRef.current);
          }

          p.noStroke();
          p.textAlign(p.CENTER, p.CENTER);
        };

        p.draw = () => {
          p.background(10, 15, 30);

          if (!started) {
            p.fill(255);
            p.textSize(24);
            p.text(
              "Tap or click to begin your 5-minute breathing path",
              p.width / 2,
              p.height / 2
            );
            return;
          }

          // --- Audio level ---
          let level = 0;
          if (analyser && dataArray) {
            analyser.getByteTimeDomainData(dataArray);
            let sumSquares = 0;
            for (let i = 0; i < dataArray.length; i++) {
              const v = (dataArray[i] - 128) / 128; // normalize around 0
              sumSquares += v * v;
            }
            const rms = Math.sqrt(sumSquares / dataArray.length);
            level = rms; // typically 0..~0.5
          }

          // Smooth ease in/out curve for breathing
          const easeInOut = (t: number) =>
            t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

          // --- Script, phase, and timer based on absolute session time ---
          let scriptText = "";
          let timerText = "";
          let currentPhase: PhaseLabel | null = null;
          let phaseT = 0; // 0..1 within current phase segment

          if (sessionStartMs !== null) {
            const elapsedAbsolute = Math.min(
              p.millis() - sessionStartMs,
              sessionTotalMs
            );

            // Walk script segments to find current index and local time
            let remaining = elapsedAbsolute;
            let currentIndex = 0;
            for (; currentIndex < scriptSegments.length; currentIndex++) {
              const seg = scriptSegments[currentIndex];
              if (remaining <= seg.durationMs) {
                scriptText = seg.text;
                currentPhase = seg.phase ?? null;
                phaseT = seg.durationMs > 0 ? remaining / seg.durationMs : 0;
                break;
              }
              remaining -= seg.durationMs;
            }

            if (currentIndex >= scriptSegments.length) {
              const last = scriptSegments[scriptSegments.length - 1];
              scriptText = last.text;
              currentPhase = last.phase ?? null;
              phaseT = 1;
            }

            const remainingMs = Math.max(sessionTotalMs - elapsedAbsolute, 0);
            const totalSeconds = Math.round(remainingMs / 1000);
            const mm = Math.floor(totalSeconds / 60);
            const ss = totalSeconds % 60;
            timerText = `${mm}:${ss.toString().padStart(2, "0")}`;
          }

          // --- Breathing amount based on current phase ---
          let breathAmount = 0.5; // default gentle mid-breath
          let phaseLabel: PhaseLabel | null = null;

          if (currentPhase === "inhale") {
            phaseLabel = "inhale";
            breathAmount = easeInOut(phaseT);
          } else if (currentPhase === "hold") {
            phaseLabel = "hold";
            breathAmount = 1;
          } else if (currentPhase === "exhale") {
            phaseLabel = "exhale";
            breathAmount = easeInOut(1 - phaseT);
          } else {
            // Neutral segments: keep orb steady
            breathAmount = 0.8;
          }

          const baseRadius = Math.min(p.width, p.height) * 0.18;
          const breathRadius = baseRadius * (0.7 + 0.4 * breathAmount); // 0.7x..1.1x

          // Audio adds a softer, secondary motion only during breathwork segments
          const smoothed = p.lerp(0, level, 0.6);
          const audioBoost =
            currentPhase === "inhale" || currentPhase === "hold" || currentPhase === "exhale"
              ? smoothed * baseRadius * 1.5
              : 0;
          const radius = breathRadius + audioBoost;

          const glowAlpha = p.map(level, 0, 0.3, 40, 130, true);
          p.fill(120, 180, 255, glowAlpha);
          p.ellipse(p.width / 2, p.height / 2, radius * 2.6, radius * 2.6);

          p.fill(190, 225, 255);
          p.ellipse(p.width / 2, p.height / 2, radius * 2, radius * 2);

          p.fill(255, 255, 255, 180);
          p.ellipse(p.width / 2, p.height / 2, radius * 1.3, radius * 1.3);

          // Script text (center-top)
          if (scriptText) {
            p.textSize(22);
            p.fill(230, 235, 245, 235);
            p.textAlign(p.CENTER, p.CENTER);
            p.text(scriptText, p.width / 2, p.height * 0.22);
          }

          // Phase label text (bottom) only during guided cycles
          if (phaseLabel) {
            const labelText =
              phaseLabel === "inhale"
                ? "Inhale"
                : phaseLabel === "hold"
                ? "Hold"
                : "Exhale";
            p.textSize(18);
            p.fill(220, 225, 240, 220);
            p.textAlign(p.CENTER, p.TOP);
            p.text(labelText, p.width / 2, p.height * 0.82);
          }

          // Timer (top-right)
          if (timerText) {
            p.textSize(14);
            p.fill(200, 210, 230, 220);
            p.textAlign(p.RIGHT, p.TOP);
            p.text(timerText, p.width - 24, 24);
          }
        };

        p.mousePressed = () => {
          if (!started) {
            started = true;
            sessionStartMs = p.millis();
            void ensureAudio();
          }
        };

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
      };

      if (isMounted && containerRef.current) {
        const instance = new (P5Constructor as unknown as new (
          sketch: (p: P5Instance) => void
        ) => P5Instance)(sketch as unknown as (p: P5Instance) => void);
        p5InstanceRef.current = instance;
      }
    }

    void setupP5();

    return () => {
      isMounted = false;
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black text-white overflow-hidden"
    />
  );
}
