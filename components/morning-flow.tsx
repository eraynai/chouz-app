"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import InlineLoading from "@/components/InlineLoading";

// High-level states of the morning flow. These correspond to the diagram:
// ARRIVE -> one of the EXPLORE_* branches -> LAND_INTENTION.

type ArrivalState = "foggy" | "on-edge" | "neutral" | "okay" | "clear";

type FlowStep =
  | "ARRIVE"
  | "EXPLORE_FOGGY_Q1"
  | "EXPLORE_FOGGY_Q2"
  | "EXPLORE_ONEDGE_Q1"
  | "EXPLORE_ONEDGE_Q2"
  | "EXPLORE_NEUTRAL_Q1"
  | "EXPLORE_NEUTRAL_Q2"
  | "LAND_INTENTION";

export default function MorningFlow() {
  const router = useRouter();

  const [step, setStep] = useState<FlowStep>("ARRIVE");

  // Per-branch response state (for future use / potential persistence)
  const [foggySelected, setFoggySelected] = useState<string[]>([]);
  const [foggyCustom, setFoggyCustom] = useState("");
  const [foggyQ2Selected, setFoggyQ2Selected] = useState<string[]>([]);
  const [foggyQ2Custom, setFoggyQ2Custom] = useState("");
  const [onEdgeSelected, setOnEdgeSelected] = useState<string[]>([]);
  const [onEdgeCustom, setOnEdgeCustom] = useState("");
  const [onEdgeQ2Selected, setOnEdgeQ2Selected] = useState<string[]>([]);
  const [onEdgeQ2Custom, setOnEdgeQ2Custom] = useState("");
  const [neutralSelected, setNeutralSelected] = useState<string[]>([]);
  const [neutralCustom, setNeutralCustom] = useState("");
  const [neutralQ2Selected, setNeutralQ2Selected] = useState<string[]>([]);
  const [neutralQ2Custom, setNeutralQ2Custom] = useState("");

  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [customWord, setCustomWord] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  function handleSelectArrival(state: ArrivalState) {
    if (state === "foggy") {
      setStep("EXPLORE_FOGGY_Q1");
      return;
    }

    if (state === "on-edge") {
      setStep("EXPLORE_ONEDGE_Q1");
      return;
    }

    // Neutral / okay / clear all share the same explore branch for now.
    setStep("EXPLORE_NEUTRAL_Q1");
  }

  async function handleComplete() {
    const word = selectedWord === "custom" ? customWord.trim() : selectedWord?.trim();

    if (!word) return;

    setSubmitting(true);
    setIsTransitioning(true);
    try {
      // In the future we could POST this conversation to an API route so it can
      // show up in history or gently inform future prompts.
      //
      // For now, once the intention is chosen we simply guide the user into the
      // main greet experience. We include a flag so the greet page knows this
      // visit came after the morning flow.
      router.push("/greet?fromMorning=1");
    } finally {
      // Keep the transition state for a brief moment so the loader is perceptible
      setTimeout(() => {
        setSubmitting(false);
        setIsTransitioning(false);
      }, 400);
    }
  }

  function renderArrival() {
    const states: { id: string; label: string; value: ArrivalState }[] = [
      { id: "foggy", label: "Foggy", value: "foggy" },
      { id: "onedge", label: "On edge", value: "on-edge" },
      { id: "neutral", label: "Neutral / Okay", value: "neutral" },
      { id: "clear", label: "Clear", value: "clear" },
    ];

    return (
      <div className="min-h-screen flex flex-col p-8 max-w-md mx-auto bg-charcoal text-white">
        <div className="flex-1 flex flex-col justify-center space-y-12">
          <h1 className="text-2xl leading-relaxed font-light font-display">
            How are you arriving this morning?
          </h1>

          <div className="space-y-1">
            {states.map((state) => (
              <button
                key={state.id}
                type="button"
                onClick={() => handleSelectArrival(state.value)}
                className="w-full text-left py-5 text-lg border-b border-zinc-900 last:border-0 hover:text-zinc-300 active:text-zinc-400"
              >
                {state.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function renderFoggyQ1() {
    const options = [
      "Mental noise",
      "Physical tiredness",
      "Emotional heaviness",
      "I'm not sure",
    ];

    const toggleOption = (option: string) => {
      setFoggySelected((prev) =>
        prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option],
      );
    };

    const canContinue = foggySelected.length > 0 || foggyCustom.trim().length > 0;

    const handleNext = () => {
      setStep("EXPLORE_FOGGY_Q2");
    };

    return (
      <div className="min-h-screen flex flex-col p-8 max-w-md mx-auto bg-charcoal text-white">
        <div className="flex-1 flex flex-col justify-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-2xl leading-relaxed font-light font-display">Foggy is okay.</h1>
            <p className="text-zinc-500 text-lg leading-relaxed">
              What&apos;s one thing you don&apos;t need to hold right now?
            </p>
          </div>

          <div className="space-y-1">
            {options.map((option) => {
              const isSelected = foggySelected.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleOption(option)}
                  className={`w-full text-left py-5 text-lg border-b border-zinc-900 last:border-0 transition-colors ${
                    isSelected
                      ? "text-white"
                      : "text-zinc-600 hover:text-zinc-400 active:text-zinc-400"
                  }`}
                >
                  {isSelected && "✓ "}
                  {option}
                </button>
              );
            })}
          </div>

          <Textarea
            value={foggyCustom}
            onChange={(e) => setFoggyCustom(e.target.value)}
            placeholder="Or write your own..."
            rows={2}
            className="bg-transparent border-b border-zinc-800 px-4 py-4 text-lg placeholder-zinc-700 focus-visible:ring-0 focus-visible:border-zinc-600 resize-none"
          />
        </div>

        <div className="pb-8">
          <button
            type="button"
            onClick={handleNext}
            disabled={!canContinue}
            className="w-full text-white py-4 text-base disabled:text-zinc-700 hover:text-zinc-200 active:text-zinc-300"
          >
            {canContinue ? "Next" : "—"}
          </button>
        </div>
      </div>
    );
  }

  function renderFoggyQ2() {
    const options = [
      "A slower start",
      "Less screen time",
      "Moving my body",
      "Saying no to one thing",
    ];

    const toggleOption = (option: string) => {
      setFoggyQ2Selected((prev) =>
        prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option],
      );
    };

    const handleContinue = () => {
      setStep("LAND_INTENTION");
    };

    return (
      <div className="min-h-screen flex flex-col p-8 max-w-md mx-auto bg-charcoal text-white">
        <div className="flex-1 flex flex-col justify-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-2xl leading-relaxed font-light font-display">
              Thank you for naming that.
            </h1>
            <p className="text-zinc-500 text-lg leading-relaxed">
              What could help you feel even 5% clearer?
            </p>
          </div>

          <div className="space-y-1">
            {options.map((option) => {
              const isSelected = foggyQ2Selected.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleOption(option)}
                  className={`w-full text-left py-5 text-lg border-b border-zinc-900 last:border-0 transition-colors ${
                    isSelected
                      ? "text-white"
                      : "text-zinc-600 hover:text-zinc-400 active:text-zinc-400"
                  }`}
                >
                  {isSelected && "✓ "}
                  {option}
                </button>
              );
            })}
          </div>

          <Textarea
            value={foggyQ2Custom}
            onChange={(e) => setFoggyQ2Custom(e.target.value)}
            placeholder="Or write your own..."
            rows={2}
            className="bg-transparent border-b border-zinc-800 px-4 py-4 text-lg placeholder-zinc-700 focus-visible:ring-0 focus-visible:border-zinc-600 resize-none"
          />
        </div>

        <div className="pb-8">
          <button
            type="button"
            onClick={handleContinue}
            className="w-full text-white py-4 text-base hover:text-zinc-200 active:text-zinc-300"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  function renderOnEdgeQ1() {
    const options = [
      "Work or responsibilities",
      "Relationships",
      "Health / body",
      "Everything at once",
    ];

    const toggleOption = (option: string) => {
      setOnEdgeSelected((prev) =>
        prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option],
      );
    };

    const canContinue = onEdgeSelected.length > 0 || onEdgeCustom.trim().length > 0;

    const handleNext = () => {
      setStep("EXPLORE_ONEDGE_Q2");
    };

    return (
      <div className="min-h-screen flex flex-col p-8 max-w-md mx-auto bg-charcoal text-white">
        <div className="flex-1 flex flex-col justify-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-2xl leading-relaxed font-light font-display">
              On edge is understandable.
            </h1>
            <p className="text-zinc-500 text-lg leading-relaxed">
              What feels heavy this morning?
            </p>
          </div>

          <div className="space-y-1">
            {options.map((option) => {
              const isSelected = onEdgeSelected.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleOption(option)}
                  className={`w-full text-left py-5 text-lg border-b border-zinc-900 last:border-0 transition-colors ${
                    isSelected
                      ? "text-white"
                      : "text-zinc-600 hover:text-zinc-400 active:text-zinc-400"
                  }`}
                >
                  {isSelected && "✓ "}
                  {option}
                </button>
              );
            })}
          </div>

          <Textarea
            value={onEdgeCustom}
            onChange={(e) => setOnEdgeCustom(e.target.value)}
            placeholder="Or write your own..."
            rows={2}
            className="bg-transparent border-b border-zinc-800 px-4 py-4 text-lg placeholder-zinc-700 focus-visible:ring-0 focus-visible:border-zinc-600 resize-none"
          />
        </div>

        <div className="pb-8">
          <button
            type="button"
            onClick={handleNext}
            disabled={!canContinue}
            className="w-full text-white py-4 text-base disabled:text-zinc-700 hover:text-zinc-200 active:text-zinc-300"
          >
            {canContinue ? "Next" : "—"}
          </button>
        </div>
      </div>
    );
  }

  function renderOnEdgeQ2() {
    const options = [
      "Lower my expectations a little",
      "Let one thing wait",
      "Ask for help / share how I feel",
      "Give myself permission to be how I am",
    ];

    const toggleOption = (option: string) => {
      setOnEdgeQ2Selected((prev) =>
        prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option],
      );
    };

    const handleContinue = () => {
      setStep("LAND_INTENTION");
    };

    return (
      <div className="min-h-screen flex flex-col p-8 max-w-md mx-auto bg-charcoal text-white">
        <div className="flex-1 flex flex-col justify-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-2xl leading-relaxed font-light font-display">
              Thank you for naming that.
            </h1>
            <p className="text-zinc-500 text-lg leading-relaxed">
              How could you be gentle with yourself about this?
            </p>
          </div>

          <div className="space-y-1">
            {options.map((option) => {
              const isSelected = onEdgeQ2Selected.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleOption(option)}
                  className={`w-full text-left py-5 text-lg border-b border-zinc-900 last:border-0 transition-colors ${
                    isSelected
                      ? "text-white"
                      : "text-zinc-600 hover:text-zinc-400 active:text-zinc-400"
                  }`}
                >
                  {isSelected && "✓ "}
                  {option}
                </button>
              );
            })}
          </div>

          <Textarea
            value={onEdgeQ2Custom}
            onChange={(e) => setOnEdgeQ2Custom(e.target.value)}
            placeholder="Or write your own..."
            rows={2}
            className="bg-transparent border-b border-zinc-800 px-4 py-4 text-lg placeholder-zinc-700 focus-visible:ring-0 focus-visible:border-zinc-600 resize-none"
          />
        </div>

        <div className="pb-8">
          <button
            type="button"
            onClick={handleContinue}
            className="w-full text-white py-4 text-base hover:text-zinc-200 active:text-zinc-300"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  function renderNeutralQ1() {
    const options = [
      "My body feels okay",
      "My mind feels clear enough",
      "I feel supported",
      "Not sure, but I'm basically okay",
    ];

    const toggleOption = (option: string) => {
      setNeutralSelected((prev) =>
        prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option],
      );
    };

    const canContinue = neutralSelected.length > 0 || neutralCustom.trim().length > 0;

    const handleNext = () => {
      setStep("EXPLORE_NEUTRAL_Q2");
    };

    return (
      <div className="min-h-screen flex flex-col p-8 max-w-md mx-auto bg-charcoal text-white">
        <div className="flex-1 flex flex-col justify-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-2xl leading-relaxed font-light font-display">
              Where you are is enough.
            </h1>
            <p className="text-zinc-500 text-lg leading-relaxed">
              What feels good or steady as you start today?
            </p>
          </div>

          <div className="space-y-1">
            {options.map((option) => {
              const isSelected = neutralSelected.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleOption(option)}
                  className={`w-full text-left py-5 text-lg border-b border-zinc-900 last:border-0 transition-colors ${
                    isSelected
                      ? "text-white"
                      : "text-zinc-600 hover:text-zinc-400 active:text-zinc-400"
                  }`}
                >
                  {isSelected && "✓ "}
                  {option}
                </button>
              );
            })}
          </div>

          <Textarea
            value={neutralCustom}
            onChange={(e) => setNeutralCustom(e.target.value)}
            placeholder="Or write your own..."
            rows={2}
            className="bg-transparent border-b border-zinc-800 px-4 py-4 text-lg placeholder-zinc-700 focus-visible:ring-0 focus-visible:border-zinc-600 resize-none"
          />
        </div>

        <div className="pb-8">
          <button
            type="button"
            onClick={handleNext}
            disabled={!canContinue}
            className="w-full text-white py-4 text-base disabled:text-zinc-700 hover:text-zinc-200 active:text-zinc-300"
          >
            {canContinue ? "Next" : "—"}
          </button>
        </div>
      </div>
    );
  }

  function renderNeutralQ2() {
    const options = [
      "My pace",
      "My boundaries",
      "My focus",
      "My softness",
    ];

    const toggleOption = (option: string) => {
      setNeutralQ2Selected((prev) =>
        prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option],
      );
    };

    const handleContinue = () => {
      setStep("LAND_INTENTION");
    };

    return (
      <div className="min-h-screen flex flex-col p-8 max-w-md mx-auto bg-charcoal text-white">
        <div className="flex-1 flex flex-col justify-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-2xl leading-relaxed font-light font-display">
              Hold onto what supports you.
            </h1>
            <p className="text-zinc-500 text-lg leading-relaxed">
              What would you like to protect as the day gets busier?
            </p>
          </div>

          <div className="space-y-1">
            {options.map((option) => {
              const isSelected = neutralQ2Selected.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleOption(option)}
                  className={`w-full text-left py-5 text-lg border-b border-zinc-900 last:border-0 transition-colors ${
                    isSelected
                      ? "text-white"
                      : "text-zinc-600 hover:text-zinc-400 active:text-zinc-400"
                  }`}
                >
                  {isSelected && "✓ "}
                  {option}
                </button>
              );
            })}
          </div>

          <Textarea
            value={neutralQ2Custom}
            onChange={(e) => setNeutralQ2Custom(e.target.value)}
            placeholder="Or write your own..."
            rows={2}
            className="bg-transparent border-b border-zinc-800 px-4 py-4 text-lg placeholder-zinc-700 focus-visible:ring-0 focus-visible:border-zinc-600 resize-none"
          />
        </div>

        <div className="pb-8">
          <button
            type="button"
            onClick={handleContinue}
            className="w-full text-white py-4 text-base hover:text-zinc-200 active:text-zinc-300"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  function renderLandIntention() {
    if (isTransitioning) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-charcoal text-white">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-[#f59e0b]/60 animate-pulse" />
              <div className="absolute -inset-4 rounded-full border border-[#f59e0b]/20 animate-ping" />
            </div>
            <p className="text-sm text-zinc-400 lowercase tracking-[0.16em]">
              arriving at your morning…
            </p>
          </div>
        </div>
      );
    }
    const words = ["Soft", "Steady", "Open", "Brave", "Gentle", "Rooted"] as const;

    const isCustom = selectedWord === "custom";
    const canContinue = !!(isCustom ? customWord.trim() : selectedWord);

    const handleWordSelect = (word: string) => {
      setSelectedWord(word);
      setCustomWord("");
    };

    const handleCustomSelect = () => {
      setSelectedWord("custom");
    };

    const handleClickComplete = () => {
      if (!canContinue || submitting) return;
      void handleComplete();
    };

    return (
      <div className="min-h-screen flex flex-col p-8 max-w-md mx-auto bg-charcoal text-white">
        <div className="flex-1 flex flex-col justify-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-2xl leading-relaxed font-light font-display">
              Choose a word for today.
            </h1>
            <p className="text-zinc-500 text-lg leading-relaxed">
              Not a promise. Just a gentle direction you can come back to.
            </p>
          </div>

          <div className="space-y-1">
            {words.map((word) => (
              <button
                key={word}
                type="button"
                onClick={() => handleWordSelect(word)}
                className={`w-full text-left py-5 text-lg border-b border-zinc-900 transition-colors ${
                  selectedWord === word
                    ? "text-white"
                    : "text-zinc-600 hover:text-zinc-400 active:text-zinc-400"
                }`}
              >
                {selectedWord === word && "✓ "}
                {word}
              </button>
            ))}

            <button
              type="button"
              onClick={handleCustomSelect}
              className={`w-full text-left py-5 text-lg border-b border-zinc-900 last:border-0 transition-colors ${
                isCustom
                  ? "text-white"
                  : "text-zinc-600 hover:text-zinc-400 active:text-zinc-400"
              }`}
            >
              {isCustom && "✓ "}
              Your own word
            </button>
          </div>

          {isCustom && (
            <Textarea
              value={customWord}
              onChange={(e) => setCustomWord(e.target.value)}
              placeholder="Type a word or phrase..."
              rows={2}
              className="bg-transparent border-b border-zinc-700 px-0 py-4 text-lg placeholder-zinc-700 focus-visible:ring-0 focus-visible:border-zinc-500 resize-none mt-4"
            />
          )}
        </div>

        <div className="pb-8">
          <button
            type="button"
            onClick={handleClickComplete}
            disabled={!canContinue || submitting}
            className="w-full text-white py-4 text-base disabled:text-zinc-700 hover:text-zinc-200 active:text-zinc-300"
          >
            {canContinue ? (
              submitting ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <InlineLoading variant="spinner" size="md" />
                  <span>Arriving…</span>
                </span>
              ) : (
                <span>Complete my morning</span>
              )
            ) : (
              "—"
            )}
          </button>
        </div>
      </div>
    );
  }

  switch (step) {
    case "ARRIVE":
      return renderArrival();
    case "EXPLORE_FOGGY_Q1":
      return renderFoggyQ1();
    case "EXPLORE_FOGGY_Q2":
      return renderFoggyQ2();
    case "EXPLORE_ONEDGE_Q1":
      return renderOnEdgeQ1();
    case "EXPLORE_ONEDGE_Q2":
      return renderOnEdgeQ2();
    case "EXPLORE_NEUTRAL_Q1":
      return renderNeutralQ1();
    case "EXPLORE_NEUTRAL_Q2":
      return renderNeutralQ2();
    case "LAND_INTENTION":
      return renderLandIntention();
    default:
      return renderArrival();
  }
}
