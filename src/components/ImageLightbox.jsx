import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR = 'button:not([disabled]), [href], video, [tabindex]:not([tabindex="-1"])';

export default function ImageLightbox({ item, onClose }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const restoreFocusRef = useRef(null);
  const isOpen = Boolean(item);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;

    restoreFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const getFocusable = () =>
      Array.from(dialogRef.current?.querySelectorAll(FOCUSABLE_SELECTOR) ?? []);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current?.();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = getFocusable();
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const focusIsInside = dialogRef.current?.contains(document.activeElement);

      if (event.shiftKey && (!focusIsInside || document.activeElement === first)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (!focusIsInside || document.activeElement === last)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      const restoreTarget = restoreFocusRef.current;
      if (restoreTarget && typeof restoreTarget.focus === 'function') restoreTarget.focus();
    };
  }, [isOpen]);

  if (!item) return null;

  const isVideo = item.type === 'video';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <button
        type="button"
        aria-label="Close viewer"
        tabIndex={-1}
        onClick={() => onCloseRef.current?.()}
        className="absolute inset-0 h-full w-full cursor-default bg-background"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-title"
        aria-describedby="lightbox-description"
        style={{ overscrollBehavior: 'contain' }}
        className="relative z-10 flex h-full w-full flex-col gap-4 bg-background p-4 sm:h-[80vh] sm:max-h-[60rem] sm:w-full sm:max-w-6xl sm:rounded-sm sm:border sm:border-border sm:bg-surface sm:p-6 sm:shadow-lg"
      >
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close viewer"
          onClick={() => onCloseRef.current?.()}
          className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-sm border border-border bg-background text-xl leading-none text-text-primary hover:border-primary hover:text-primary sm:right-4 sm:top-4"
        >
          <span aria-hidden="true">{'\u00D7'}</span>
        </button>

        <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto rounded-sm bg-surface-strong">
          {isVideo ? (
            <video
              src={item.src}
              width={item.width}
              height={item.height}
              controls
              preload="metadata"
              playsInline
              aria-label={item.alt || item.title}
              className="max-h-full max-w-full object-contain"
            >
              Your browser does not support video playback.
            </video>
          ) : (
            <img
              src={item.src}
              alt={item.alt || item.title}
              width={item.width}
              height={item.height}
              className="max-h-full max-w-full object-contain"
            />
          )}
        </div>

        <div className="shrink-0 text-center">
          <h2 id="lightbox-title" className="font-display text-h4 text-text-primary">
            {item.title}
          </h2>
          <p id="lightbox-description" className="mt-1 text-caption text-text-secondary">
            {item.description || item.role}
          </p>
        </div>
      </div>
    </div>
  );
}
