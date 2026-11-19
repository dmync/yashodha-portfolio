import { FrameCounter, Timecode } from './Timecode.jsx';

export function SceneFrame({
  scene,
  label,
  tag,
  footerTag,
  children,
  id,
  className = '',
  ...rest
}) {
  const sceneNumber = String(scene).padStart(2, '0');

  return (
    <section id={id} className={['scene', className].filter(Boolean).join(' ')} {...rest}>
      <div className="frame">
        <div className="letterbox">
          <span className="hud hud--teal">SCENE {sceneNumber} — {label}</span>
          <Timecode />
          {tag ? <span className="hud hud--brass">{tag}</span> : null}
        </div>

        <div className="frame__body">
          <span className="corner corner--tl" aria-hidden="true" />
          <span className="corner corner--tr" aria-hidden="true" />
          <span className="corner corner--bl" aria-hidden="true" />
          <span className="corner corner--br" aria-hidden="true" />
          <span className="reg reg--tr" aria-hidden="true" />
          <span className="reg reg--bl" aria-hidden="true" />
          <div className="frame__inner">{children}</div>
        </div>

        <div className="letterbox letterbox--bottom">
          <span className="hud">REEL 001 / FRAME <FrameCounter /></span>
          {footerTag ? <span className="hud">{footerTag}</span> : null}
        </div>
      </div>
    </section>
  );
}

export default SceneFrame;
