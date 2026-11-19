import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#featured-projects' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Creative', href: '#creative-work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const sceneNumber = (index) => String(index + 1).padStart(2, '0');

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.href.slice(1))).filter(Boolean);
    if (sections.length === 0) return undefined;

    const updateActiveSection = () => {
      const threshold = window.innerHeight * 0.4;
      let activeSection = sections[0];

      // Recompute from every observed section on each trigger. The last section whose
      // top has passed the threshold wins, so scrolling back up also updates correctly.
      // Because #creative-work follows #case-studies in document order, it takes
      // precedence as soon as its own top passes the threshold.
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= threshold) {
          activeSection = section;
        }
      });

      setActiveId(activeSection.id);
    };

    updateActiveSection();
    window.addEventListener('resize', updateActiveSection);

    // IntersectionObserver is only a change trigger; active state comes from the
    // full recomputation above rather than from the changed entries.
    const observer = new IntersectionObserver(
      () => updateActiveSection(),
      { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? 'border-b border-border bg-background'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="container flex h-16 items-center justify-between gap-4" aria-label="Main navigation">
        <a
          href="#hero"
          className="inline-flex min-h-11 items-center font-display text-xl font-bold tracking-tight text-text-primary sm:text-2xl"
          onClick={() => setIsOpen(false)}
        >
          YASHODHA<span className="text-primary">.</span>
        </a>

        <ul
          className="relative hidden items-start gap-0 font-mono before:absolute before:inset-x-3 before:top-[7px] before:h-px before:bg-border before:content-[''] lg:flex"
        >
          {NAV_LINKS.map((link, index) => {
            const isActive = activeId === link.href.slice(1);
            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative flex min-w-0 flex-col items-center gap-0.5 px-1 py-1 text-center font-mono text-[0.65rem] leading-tight tracking-tight transition-colors hover:text-primary ${
                    isActive ? 'text-primary' : 'text-text-secondary'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`relative z-10 h-[7px] w-[7px] shrink-0 rotate-45 border ${
                      isActive ? 'border-primary bg-primary' : 'border-border bg-surface'
                    }`}
                  />
                  <span className={isActive ? 'text-primary' : 'text-text-muted'}>{sceneNumber(index)}</span>
                  <span className="whitespace-nowrap">{link.label}</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="h-0 w-0"
                      style={{
                        borderLeft: '5px solid transparent',
                        borderRight: '5px solid transparent',
                        borderTop: '6px solid var(--color-primary)',
                      }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-text-primary transition-colors hover:border-primary hover:text-primary lg:hidden"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            <span className="text-xl leading-none" aria-hidden="true">{isOpen ? '\u00D7' : '\u2630'}</span>
          </button>
        </div>
      </nav>

      <div
        id="mobile-navigation"
        className={`border-t border-border bg-background lg:hidden ${isOpen ? '' : 'hidden'}`}
      >
        <ul className="container grid gap-1 py-4">
          {NAV_LINKS.map((link, index) => {
            const isActive = activeId === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`flex min-h-11 items-center gap-3 border-l-2 py-3 pl-4 text-base font-medium transition-colors ${
                    isActive
                      ? 'border-primary bg-primary-soft text-primary'
                      : 'border-transparent text-text-secondary hover:text-primary'
                  }`}
                >
                  <span className="font-mono text-caption text-text-muted">{sceneNumber(index)}</span>
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
