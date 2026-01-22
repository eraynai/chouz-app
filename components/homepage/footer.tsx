import Link from "next/link";

export default function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-background-light py-12 dark:border-gray-800 dark:bg-background-dark">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 text-sm text-muted-light opacity-80 dark:text-muted-dark md:flex-row md:justify-between">
        <div className="flex items-center gap-6">
          <span>© chouz {year}</span>
          <span className="hidden md:inline">·</span>
          <span className="hidden md:inline">No streaks. No pressure. Just a calm way to begin.</span>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="#"
            className="transition-colors hover:text-primary dark:hover:text-white"
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="transition-colors hover:text-primary dark:hover:text-white"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
