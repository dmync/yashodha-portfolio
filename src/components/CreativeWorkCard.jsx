export default function CreativeWorkCard({ item, onOpen, wide = false }) {
  const isVideo = item.type === 'video';

  return (
    <article
      role="listitem"
      className={`flex flex-col overflow-hidden border border-border bg-surface transition-[border-color] duration-300 hover:border-text-muted focus-within:border-primary ${
        wide ? 'md:col-span-2 lg:col-span-2' : 'md:col-span-1 lg:col-span-1'
      }`}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-surface-strong">
        {isVideo ? (
          <video
            src={item.src}
            width={item.width}
            height={item.height}
            controls
            preload="metadata"
            playsInline
            aria-label={item.alt || item.title}
            className="h-full w-full object-contain"
          >
            Your browser does not support video playback.
          </video>
        ) : (
          <img
            src={item.src}
            alt={item.alt || item.title}
            width={item.width}
            height={item.height}
            loading="lazy"
            className="h-full w-full object-contain"
          />
        )}

        {onOpen && (
          <button
            type="button"
            onClick={() => onOpen(item)}
            aria-label={`Expand ${item.title}`}
            className="absolute right-3 top-3 inline-flex min-h-11 items-center rounded-sm border border-border bg-background px-3 text-caption font-semibold text-text-primary hover:border-primary hover:text-primary"
          >
            Expand
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span className="hud">{item.category}</span>
        <h4 className="mt-2 font-display text-h4 leading-1.3 text-text-secondary">{item.title}</h4>
        <p className="mt-1 text-body-sm text-text-muted">{item.role}</p>
      </div>
    </article>
  );
}
