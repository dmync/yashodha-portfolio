export default function CaseStudyCard({
  index,
  title,
  description,
  contributions,
  technologies,
  link,
  media,
  onMediaOpen,
  contributionLabel = 'Recorded contributions',
  statusLabel,
  footnote,
}) {
  const spanClasses = 'md:col-span-1 lg:col-span-2';
  const recordNumber = String(index + 1).padStart(2, '0');

  return (
    <article
      role="listitem"
      className={`relative flex flex-col overflow-hidden border border-border bg-surface ${spanClasses}`}
    >
      <span className="absolute inset-y-0 left-0 w-0.5 bg-brass" aria-hidden="true" />

      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border pb-3 pl-4 sm:pl-6">
        <span className="hud hud--brass">RECORD {recordNumber} / CASE STUDY</span>
        <span className="hud">{statusLabel || 'FILED / 04'}</span>
      </div>

      <div className="flex flex-1 flex-col p-6 pl-5 md:p-8 md:pl-7">
        <h3 className="font-display leading-1.3 text-h4 text-text-primary">
          {title}
        </h3>
        <p className="mt-4 text-body-sm text-text-secondary md:text-body">{description}</p>

        {contributions && contributions.length > 0 && (
          <ul className="mt-6 border-t border-border" aria-label={contributionLabel}>
            {contributions.map((item) => (
              <li key={item} className="flex gap-3 border-b border-border py-2 text-body-sm text-text-secondary">
                <span className="hud mt-1 shrink-0" aria-hidden="true">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {media && media.length > 0 && (
          <div className="mt-6">
            <p className="hud">EXHIBITS / DIAGRAMS</p>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${title} diagrams`}>
              {media.map((item) => (
                <li key={item.src}>
                  {onMediaOpen ? (
                    <button
                      type="button"
                      onClick={() => onMediaOpen(item)}
                      aria-label={`View ${item.title}`}
                      className="flex min-h-11 items-center gap-2 rounded-sm border border-border bg-background px-2 text-caption font-medium text-text-secondary hover:border-primary hover:text-primary"
                    >
                      <img
                        src={item.src}
                        alt=""
                        width={item.width}
                        height={item.height}
                        loading="lazy"
                        className="h-8 w-12 object-contain"
                      />
                      <span>{item.label}</span>
                    </button>
                  ) : (
                    <img
                      src={item.src}
                      alt={item.alt || item.title}
                      width={item.width}
                      height={item.height}
                      loading="lazy"
                      className="h-8 w-12 rounded-sm border border-border object-contain"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto pt-8">
          <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
            {technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-sm border border-border bg-background px-2.5 py-1 font-mono text-caption text-text-secondary"
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
                View source on GitHub
                <span aria-hidden="true">{'\u2192'}</span>
              </a>
            )}

            {footnote && (
              <p className="text-caption text-text-muted">{footnote}</p>
            )}
          </div>

          <p className="hud mt-8 border-t border-border pt-3" aria-hidden="true">END OF RECORD / {recordNumber}</p>
        </div>
      </div>
    </article>
  );
}
