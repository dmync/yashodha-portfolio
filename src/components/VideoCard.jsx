export default function VideoCard({ src, poster, title, role, tool, width = 1280, height = 720 }) {
  return (
    <article
      role="listitem"
      className="flex flex-col overflow-hidden border border-border bg-surface transition-[border-color] duration-300 hover:border-text-muted md:col-span-2 lg:col-span-2"
    >
      <video
        src={src}
        poster={poster}
        width={width}
        height={height}
        controls
        preload="metadata"
        playsInline
        aria-label={title}
        className="aspect-video w-full bg-surface-strong object-contain"
      >
        Your browser does not support video playback.
      </video>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="hud">VIDEO PRODUCTION / SUPPORTING</span>
          <span className="hud hud--brass">{tool}</span>
        </div>
        <h4 className="mt-3 font-display text-h4 leading-1.3 text-text-secondary">{title}</h4>
        <p className="mt-1 text-body-sm text-text-muted">{role}</p>
      </div>
    </article>
  );
}
