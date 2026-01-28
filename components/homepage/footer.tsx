import Link from "next/link";

export default function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-background-light py-12 dark:border-gray-800 dark:bg-background-dark">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 text-sm text-muted-light opacity-80 dark:text-muted-dark md:flex-row md:justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="transition-colors hover:text-primary dark:hover:text-white">
            © chouz {year}
          </Link>
          <span className="hidden md:inline">·</span>
        </div>
        <div className="flex flex-col items-center gap-3 md:flex-row md:items-center md:gap-6">
          <Link
            href="/privacy"
            className="transition-colors hover:text-primary dark:hover:text-white"
          >
            Privacy &amp; Terms of Use
          </Link>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/chouz.app/"
              target="_blank"
              rel="noreferrer"
              aria-label="Chouz on Instagram"
              className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-transparent text-muted-light transition-colors hover:border-primary hover:text-primary dark:text-muted-dark dark:hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  ry="5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4.2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@chouz-app"
              target="_blank"
              rel="noreferrer"
              aria-label="Chouz on YouTube"
              className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-transparent text-muted-light transition-colors hover:border-primary hover:text-primary dark:text-muted-dark dark:hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                aria-hidden="true"
                fill="currentColor"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
