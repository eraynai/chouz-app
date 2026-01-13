"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// YouTube Player API types
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function IntroVideoSection() {
  const playerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const ytPlayerRef = useRef<any>(null);
  const iframeWrapperRef = useRef<HTMLDivElement | null>(null);
  
  const videoId = "Xr7IdtxRI_U";

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
  }, []);

  const showTitleCard = () => {
    // Immediately hide the iframe to prevent showing YouTube's end screen
    if (iframeWrapperRef.current) {
      iframeWrapperRef.current.style.display = 'none';
    }
    
    // Set playing to false to trigger fade-in of placeholder
    setIsPlaying(false);
    
    // Clean up player after a brief delay
    setTimeout(() => {
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

    setIsPlaying(true);

    // Wrapper for the YouTube player
    const iframeWrapper = document.createElement('div');
    iframeWrapper.id = 'intro-video-iframe-wrapper';
    iframeWrapper.className = 'absolute inset-0 w-full h-full';
    playerRef.current.appendChild(iframeWrapper);
    iframeWrapperRef.current = iframeWrapper;

    // Create YT player
    ytPlayerRef.current = new window.YT.Player(iframeWrapper, {
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
      },
      events: {
        onReady: (event: any) => {
          // Poll for video ending to hide it before YouTube's end screen
          const checkVideoTime = setInterval(() => {
            if (ytPlayerRef.current && ytPlayerRef.current.getCurrentTime) {
              const currentTime = ytPlayerRef.current.getCurrentTime();
              const duration = ytPlayerRef.current.getDuration();
              
              // Hide video 0.5 seconds before it ends to avoid YouTube end screen
              if (duration - currentTime < 0.5) {
                clearInterval(checkVideoTime);
                showTitleCard();
              }
            }
          }, 100);
        },
        onStateChange: (event: any) => {
          if (event.data === window.YT.PlayerState.ENDED) {
            showTitleCard();
          }
        },
      },
    });
  };

  const handleClick = () => {
    // If API is ready, start immediately; otherwise wait for it
    if (window.YT && window.YT.Player) {
      startVideo();
      return;
    }

    const prevReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () {
      if (typeof prevReady === 'function') prevReady();
      startVideo();
    };
  };

  return (
    <section className="reveal">
      <div className="relative mx-auto w-full max-w-4xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-serif md:text-3xl">Hi, I&apos;m Elli</h2>
          <p className="mt-2 text-sm font-light text-gray-500 dark:text-gray-400">
            Please click on the video to learn why adopting a morning routine transformed my relationship to
            stress and changed my life.
          </p>
        </div>

        <div
          ref={playerRef}
          className="group relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-secondary shadow-xl ring-1 ring-gray-900/5 dark:bg-surface-dark dark:ring-white/10"
        >
          <Image
            src="/images/place-holder-morning-routine.png"
            alt="Elli speaking about chouz and the 7-morning path"
            fill
            className={`object-cover transition-opacity ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
            priority
          />

          <button
            type="button"
            className={`absolute inset-0 flex cursor-pointer items-center justify-center transition-all duration-500 group-hover:bg-gray-50/60 dark:group-hover:bg-black/60 ${
              isPlaying ? 'pointer-events-none opacity-0' : ''
            }`}
            aria-label="Play introduction video"
            onClick={handleClick}
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/80 bg-transparent shadow-lg transition-transform duration-300 group-hover:scale-110 dark:border-white/60">
              <span className="material-symbols-outlined ml-1 text-3xl text-white">play_arrow</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
