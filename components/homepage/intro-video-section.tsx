"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type YTStateChangeEvent = { data: number };

type YTPlayerInstance = {
  destroy: () => void;
  getCurrentTime?: () => number;
  getDuration?: () => number;
};

type YTPlayerConstructor = new (
  element: HTMLElement | string,
  options: {
    videoId: string;
    playerVars?: Record<string, string | number>;
    events?: {
      onReady?: () => void;
      onStateChange?: (e: YTStateChangeEvent) => void;
    };
  },
) => YTPlayerInstance;

declare global {
  interface Window {
    YT?: {
      Player?: YTPlayerConstructor;
      PlayerState?: { ENDED: number };
    };
    onYouTubeIframeAPIReady?: (() => void) | undefined;
  }
}

export default function IntroVideoSection() {
  const playerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const ytPlayerRef = useRef<YTPlayerInstance | null>(null);
  const iframeWrapperRef = useRef<HTMLDivElement | null>(null);

  const videoId = "Xr7IdtxRI_U";

  useEffect(() => {
    // Load YouTube IFrame API once
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.youtube.com/iframe_api"]',
    );
    if (existing) return;

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
  }, []);

  const showTitleCard = () => {
    // Hide iframe immediately to avoid YouTube end screen flash
    if (iframeWrapperRef.current) {
      iframeWrapperRef.current.style.display = "none";
    }

    setIsPlaying(false);

    window.setTimeout(() => {
      if (ytPlayerRef.current) {
        ytPlayerRef.current.destroy();
        ytPlayerRef.current = null;
      }
      if (iframeWrapperRef.current) {
        iframeWrapperRef.current.remove();
        iframeWrapperRef.current = null;
      }
    }, 100);
  };

  const startVideo = () => {
    if (!playerRef.current) return;

    // Ensure API is ready
    const PlayerCtor = window.YT?.Player;
    if (!PlayerCtor) return;

    setIsPlaying(true);

    const iframeWrapper = document.createElement("div");
    iframeWrapper.id = "intro-video-iframe-wrapper";
    iframeWrapper.className = "absolute inset-0 w-full h-full";
    playerRef.current.appendChild(iframeWrapper);
    iframeWrapperRef.current = iframeWrapper;

    ytPlayerRef.current = new PlayerCtor(iframeWrapper, {
      videoId,
      playerVars: {
        autoplay: 1,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
      },
      events: {
        onReady: () => {
          // Poll to hide just before end screen appears
          const checkVideoTime = window.setInterval(() => {
            const player = ytPlayerRef.current;
            if (!player?.getCurrentTime || !player?.getDuration) return;

            const currentTime = player.getCurrentTime();
            const duration = player.getDuration();

            if (duration - currentTime < 0.5) {
              window.clearInterval(checkVideoTime);
              showTitleCard();
            }
          }, 100);
        },
        onStateChange: (e: YTStateChangeEvent) => {
          if (e.data === window.YT?.PlayerState?.ENDED) {
            showTitleCard();
          }
        },
      },
    });
  };

  const handleClick = () => {
    if (window.YT?.Player) {
      startVideo();
      return;
    }

    const prevReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prevReady === "function") prevReady();
      startVideo();
    };
  };

  return (
    <section className="pt-20 reveal">
      <div className="relative mx-auto w-full max-w-4xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-serif md:text-3xl">From burnout to breathing space. My story behind Chouz.</h2>
          {/* <p className="mt-2">
            I didn&apos;t set out to build a morning ritual. I was trying to stop stress from deciding how my day began.
          </p> */}
        </div>

        <div
          ref={playerRef}
          className="group relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-secondary shadow-xl ring-1 ring-gray-900/5 dark:bg-surface-dark dark:ring-white/10"
        >
          <Image
            src="/images/place-holder-morning-routine.png"
            alt="Elli speaking about chouz and the 7-morning path"
            fill
            className={`object-cover transition-opacity ${isPlaying ? "opacity-0" : "opacity-100"}`}
            priority
          />

          <button
            type="button"
            className={`absolute inset-0 flex cursor-pointer items-center justify-center transition-all duration-500 group-hover:bg-gray-50/60 dark:group-hover:bg-black/60 ${
              isPlaying ? "pointer-events-none opacity-0" : ""
            }`}
            aria-label="Play introduction video"
            onClick={handleClick}
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/80 bg-transparent shadow-lg transition-transform duration-300 group-hover:scale-110 dark:border-white/60">
              {/* OLD: <span className="material-symbols-outlined ml-1 text-3xl text-white">play_arrow</span> */}
              <svg
                viewBox="0 0 24 24"
                className="ml-1 h-8 w-8 text-white"
                aria-hidden="true"
              >
                <path d="M9 7l8 5-8 5V7z" fill="currentColor" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
