// CSS-only film-strip feature media: gradients + perforation pattern, no image assets.
const FEATURE_MEDIA_STYLE = {
  backgroundImage:
    'linear-gradient(160deg, var(--color-primary-soft), transparent 68%), repeating-linear-gradient(90deg, transparent 0 16px, var(--color-border) 16px 17px)',
};

const SPROCKET_STYLE = {
  backgroundImage: 'repeating-linear-gradient(90deg, var(--color-primary) 0 9px, transparent 9px 19px)',
};

export default function ProjectCard({ index, title, description, features, technologies, link, linkLabel, footnote, statusLabel }) {
  const spanClasses = 'md:col-span-1 lg:col-span-2';

  return (
    <article
      role="listitem"
      className={`fcard group flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-primary ${spanClasses}`}
    >
      <div
        className="fcard__media relative h-24 shrink-0 overflow-hidden border-b border-border md:h-28"
        style={FEATURE_MEDIA_STYLE}
        aria-hidden="true"
      >
        <span className="absolute inset-x-0 top-0 h-2 opacity-40" style={SPROCKET_STYLE} />
        <span className="absolute inset-x-0 bottom-0 h-2 opacity-40" style={SPROCKET_STYLE} />
        <span className="absolute left-4 top-1/2 h-8 w-px -translate-y-1/2 bg-primary opacity-70" />
        <span className="absolute right-4 top-1/2 h-8 w-px -translate-y-1/2 bg-primary opacity-70" />
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-caption font-semibold uppercase tracking-widest text-text-muted">
            Project {String(index + 1).padStart(2, '0')}
          </span>
          {statusLabel && (
            <span className="rounded-sm bg-primary-soft px-2 py-1 text-caption font-semibold uppercase tracking-wider text-primary">
              {statusLabel}
            </span>
          )}
        </div>

        <h3 className="mt-6 font-display leading-1.3 text-h4 text-text-primary">
          {title}
        </h3>
        <p className="mt-4 text-body-sm text-text-secondary md:text-body">{description}</p>

        {features?.length > 0 && (
          <ul className="mt-6 grid gap-x-6 gap-y-2 lg:grid-cols-2" aria-label="Key features">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-body-sm text-text-secondary">
                <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-8">
          <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
            {technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-sm border border-border bg-background px-2.5 py-1 text-caption font-medium text-text-secondary"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex min-h-11 flex-wrap items-center gap-4">
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-sm font-medium text-primary underline underline-offset-4"
              >
                {linkLabel || 'View Project'}
                <span aria-hidden="true">{'\u2192'}</span>
              </a>
            )}
            {footnote && <p className="text-caption text-text-muted">{footnote}</p>}
          </div>
        </div>
      </div>
    </article>
  );
}
