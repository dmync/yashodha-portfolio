import { useSyncExternalStore } from 'react';

// One clock for every HUD in the app: one interval, one snapshot per tick.
const TICK_MS = 1000;
const FPS = 25;
const FRAMES_PER_TICK = FPS;
const START_FRAME_COUNT = 12 * FPS + 4; // 00:00:12:04
const START_FRAME_NUMBER = 241; // displayed as 0241

const pad = (value, width = 2) => String(value).padStart(width, '0');

function makeSnapshot(tickCount) {
  const frameCount = START_FRAME_COUNT + tickCount * FRAMES_PER_TICK;
  const seconds = Math.floor(frameCount / FPS);
  return Object.freeze({
    timecode: [
      pad(Math.floor(seconds / 3600)),
      pad(Math.floor(seconds / 60) % 60),
      pad(seconds % 60),
      pad(frameCount % FPS),
    ].join(':'),
    frame: pad(START_FRAME_NUMBER + tickCount * FRAMES_PER_TICK, 4),
  });
}

// Reused as the reduced-motion snapshot and as the server-render snapshot, so
// every consumer sees the same object until a real tick replaces it.
const INITIAL_SNAPSHOT = makeSnapshot(0);

const reduceMotionQuery = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
  ? window.matchMedia('(prefers-reduced-motion: reduce)')
  : null;

const listeners = new Set();
let tickCount = 0;
let snapshot = INITIAL_SNAPSHOT;
let intervalId = null;

const prefersReducedMotion = () => Boolean(reduceMotionQuery?.matches);

function publishTick() {
  tickCount += 1;
  snapshot = makeSnapshot(tickCount);
  for (const listener of listeners) {
    listener();
  }
}

function startClock() {
  if (intervalId === null && !prefersReducedMotion()) {
    intervalId = setInterval(publishTick, TICK_MS);
  }
}

function stopClock() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

// Handles a preference change while the app is open, not just the initial state.
function handleMotionPreferenceChange() {
  if (listeners.size === 0) return;
  if (prefersReducedMotion()) {
    stopClock();
  } else {
    startClock();
  }
  // The preference change alters getSnapshot()'s result, so wake subscribers.
  // Without this, useSyncExternalStore keeps a stale advanced timecode when
  // reduced motion is enabled mid-session instead of the frozen initial one.
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener) {
  listeners.add(listener);
  if (listeners.size === 1) {
    reduceMotionQuery?.addEventListener('change', handleMotionPreferenceChange);
    startClock();
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      reduceMotionQuery?.removeEventListener('change', handleMotionPreferenceChange);
      stopClock();
    }
  };
}

function getSnapshot() {
  return prefersReducedMotion() ? INITIAL_SNAPSHOT : snapshot;
}

function getServerSnapshot() {
  return INITIAL_SNAPSHOT;
}

export function useCinematicClock() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
