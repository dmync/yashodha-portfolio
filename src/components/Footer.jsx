export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-brass" aria-hidden="true" />
          <p className="font-mono text-caption tracking-wide text-text-muted">
            © 2026 Yashodha Ariyarathne. All rights reserved.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <a
                href="https://github.com/dmync"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center font-mono text-caption font-medium tracking-widest text-text-secondary transition-colors hover:text-primary"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/yashodha-ariyarathne-413335222/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center font-mono text-caption font-medium tracking-widest text-text-secondary transition-colors hover:text-primary"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
