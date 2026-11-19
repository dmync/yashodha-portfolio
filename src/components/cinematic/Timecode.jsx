import { useCinematicClock } from './clock.js';

const hudClass = (base, className) => [base, className].filter(Boolean).join(' ');

export function Timecode({ className }) {
  const { timecode } = useCinematicClock();
  return (
    <span className={hudClass('hud', className)}>
      TC <span>{timecode}</span>
    </span>
  );
}

export function FrameCounter({ className }) {
  const { frame } = useCinematicClock();
  return (
    <span className={hudClass('hud', className)}>
      <span>{frame}</span>
    </span>
  );
}

export default Timecode;
