import SceneFrame from './cinematic/SceneFrame';

export default function Hero() {
  return (
    <SceneFrame id="hero" scene={1} label="OPENING" className="!pt-20 md:!pt-24">
      <div className="container relative grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="rec hud">REC</span>
            <p className="inline-flex items-center gap-2 rounded-sm border border-border bg-surface px-3 py-2 text-caption font-semibold uppercase tracking-widest text-text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
              Software Developer | B.Tech Undergraduate
            </p>
          </div>

          <h1 className="max-w-3xl text-h1 font-display leading-1.1 tracking-tight text-text-primary sm:text-display">
            Building Web Experiences Through Code and Creativity.
          </h1>

          <p className="mt-6 max-w-prose text-body-lg text-text-secondary">
            I develop practical web applications by combining frontend development, backend technologies and creative
            problem-solving. I enjoy turning ideas and designs into functional digital experiences.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#featured-projects"
              className="inline-flex min-h-11 items-center justify-center rounded-sm bg-primary px-7 py-3 font-medium text-inverse-text transition-colors hover:bg-primary-hover"
            >
              View Projects
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative rounded-lg border border-border bg-surface p-8 shadow-sm md:p-10">
            <div className="absolute -left-3 top-8 h-16 w-1 bg-primary" aria-hidden="true" />
            <p className="text-caption font-semibold uppercase tracking-widest text-text-muted">Profile snapshot</p>
            <p className="mt-4 font-display text-h3 leading-1.3 text-text-primary">
              Yashodha Ariyarathne
            </p>
            <div className="mt-8 grid gap-5 border-t border-border pt-6">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-body-sm font-medium uppercase tracking-wider text-text-muted">Based in</span>
                <span className="text-right text-body font-medium text-text-primary">Kandy, Sri Lanka</span>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-body-sm font-medium uppercase tracking-wider text-text-muted">Focus</span>
                <span className="text-right text-body font-medium text-text-primary">Full-stack web development</span>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-body-sm font-medium uppercase tracking-wider text-text-muted">Studying</span>
                <span className="text-right text-body font-medium text-text-primary">B.Tech Multimedia &amp; Web Technology</span>
              </div>
            </div>
            <p className="mt-8 border-t border-border pt-6 text-body-sm text-text-secondary">
              Open to collaboration, internship placements, and software development roles.
            </p>
          </div>
        </div>
      </div>
    </SceneFrame>
  );
}
