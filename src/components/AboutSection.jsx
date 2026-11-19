import SceneFrame from './cinematic/SceneFrame';

const DISCIPLINES = [
  {
    title: 'Web Application Development',
    level: 'Primary focus',
    description: 'Building full-stack web applications with frontend and backend technologies.',
  },
  {
    title: 'Frontend Development',
    level: 'Core strength',
    description: 'Creating responsive, accessible user interfaces with modern frontend tools.',
  },
  {
    title: 'Backend Development',
    level: 'Core strength',
    description: 'Server-side development with Node.js and PHP, database design with MySQL.',
  },
  {
    title: 'UI/UX Design & Multimedia Production',
    level: 'Complementary',
    description: 'Visual design, user experience, and multimedia content production skills.',
  },
];

// CSS-only film-strip channel: gradient + perforation pattern, no image assets.
const CHANNEL_MEDIA_STYLE = {
  backgroundImage:
    'linear-gradient(160deg, var(--color-primary-soft), transparent 70%), repeating-linear-gradient(90deg, transparent 0 14px, var(--color-border) 14px 15px)',
};

export default function AboutSection() {
  return (
    <SceneFrame id="about" scene={2} label="ABOUT">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="hud hud--teal">02 — About</p>
            <h2 className="mt-4 text-h2 font-display text-text-primary">About / Disciplines</h2>
            <p className="mt-5 max-w-prose text-body text-text-secondary">
              I am a B.Tech student in Multimedia and Web Technology with hands-on experience in web development,
              backend technologies, and multimedia production. I build practical, functional digital experiences by
              combining code and creativity.
            </p>
          </div>

          <div className="lg:col-span-7">
            <ol className="grid gap-4 sm:grid-cols-2">
              {DISCIPLINES.map((discipline, index) => (
                <li
                  key={discipline.title}
                  className="fcard group flex flex-col overflow-hidden rounded-md border border-border bg-surface transition-colors hover:border-primary"
                >
                  <div
                    className="fcard__media relative h-16 shrink-0 overflow-hidden border-b border-border"
                    style={CHANNEL_MEDIA_STYLE}
                    aria-hidden="true"
                  >
                    <span className="absolute inset-y-0 left-4 w-0.5 bg-primary opacity-70" />
                    <span className="absolute inset-y-0 right-4 w-0.5 bg-primary opacity-70" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-display text-h3 font-semibold text-text-muted" aria-hidden="true">
                        0{index + 1}
                      </span>
                      <span className="rounded-sm bg-primary-soft px-2 py-1 text-caption font-semibold uppercase tracking-wider text-primary">
                        {discipline.level}
                      </span>
                    </div>
                    <h3 className="mt-5 text-h4 font-display text-text-primary">{discipline.title}</h3>
                    <p className="mt-2 text-body-sm text-text-secondary">{discipline.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </SceneFrame>
  );
}
