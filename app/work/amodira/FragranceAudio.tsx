'use client';

import Image from 'next/image';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import local from './amodira.module.css';
import type { Fragrance } from './amodira-content';
import { FragranceLikeButton } from './FragranceLikes';

type Track = { name: string; slug: string };
type Status = 'idle' | 'loading' | 'playing' | 'paused' | 'ended' | 'error';
type Playback = {
  track: Track | null;
  status: Status;
  currentTime: number;
  duration: number;
  toggle: (track: Track) => void;
};

const AudioContext = createContext<Playback | null>(null);

function usePlayback() {
  const context = useContext(AudioContext);
  if (!context) throw new Error('Fragrance playback needs FragranceAudioProvider.');
  return context;
}

function timeLabel(seconds: number) {
  const value = Math.max(0, Math.floor(seconds || 0));
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, '0')}`;
}

export function FragranceAudioProvider({ children }: { children: ReactNode }) {
  const audio = useRef<HTMLAudioElement>(null);
  const selected = useRef<string | null>(null);
  const wantsPlayback = useRef(false);
  const request = useRef(0);
  const [track, setTrack] = useState<Track | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const element = audio.current;
    return () => {
      request.current += 1;
      wantsPlayback.current = false;
      element?.pause();
      element?.removeAttribute('src');
      element?.load();
    };
  }, []);

  async function toggle(next: Track) {
    const element = audio.current;
    if (!element) return;
    const operation = ++request.current;

    if (selected.current === next.slug && wantsPlayback.current) {
      wantsPlayback.current = false;
      element.pause();
      setStatus('paused');
      return;
    }

    if (selected.current !== next.slug || element.error) {
      element.pause();
      selected.current = next.slug;
      setTrack(next);
      setCurrentTime(0);
      setDuration(0);
      element.src = `/work/amodira/audio/${next.slug}.mp3`;
      element.load();
    } else if (element.ended) {
      element.currentTime = 0;
      setCurrentTime(0);
    }

    wantsPlayback.current = true;
    setStatus('loading');
    try {
      // Invoked in the click handler so playback also works on mobile browsers.
      await element.play();
      if (operation === request.current && wantsPlayback.current) setStatus('playing');
    } catch {
      // Switching or pausing can reject an earlier play promise; ignore stale requests.
      if (operation !== request.current) return;
      wantsPlayback.current = false;
      setStatus('error');
    }
  }

  const announcement = track && status === 'error'
    ? `Couldn’t play ${track.name}. Select play to try again.`
    : track && status === 'playing' ? `Playing ${track.name}.`
    : track && status === 'paused' ? `${track.name} paused.`
    : track && status === 'ended' ? `${track.name} finished.` : '';

  return (
    <AudioContext.Provider value={{ track, status, currentTime, duration, toggle }}>
      {children}
      <audio ref={audio} preload="none"
        onLoadedMetadata={(event) => { const value = event.currentTarget.duration; setDuration(Number.isFinite(value) ? value : 0); }}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlaying={() => { if (wantsPlayback.current) setStatus('playing'); else audio.current?.pause(); }}
        onPause={(event) => {
          // A queued pause from a track switch must not override the new playback.
          if (!event.currentTarget.paused) return;
          request.current += 1;
          wantsPlayback.current = false;
          setStatus((previous) => previous === 'playing' || previous === 'loading' ? 'paused' : previous);
        }}
        onWaiting={() => { if (wantsPlayback.current) setStatus('loading'); }}
        onEnded={() => { wantsPlayback.current = false; setStatus('ended'); }}
        onError={() => { if (selected.current && audio.current?.error) { wantsPlayback.current = false; setStatus('error'); } }} />
      <span className="sr-only" role="status" aria-live="polite">{announcement}</span>
    </AudioContext.Provider>
  );
}

function PlaybackIcon({ active }: { active: boolean }) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    {active ? <path d="M6 4h4v16H6zM14 4h4v16h-4z" /> : <path d="M8 4.5v15L20 12z" />}
  </svg>;
}

function PlaybackButton({ track, inline = false }: { track: Track; inline?: boolean }) {
  const playback = usePlayback();
  const selected = playback.track?.slug === track.slug;
  const active = selected && (playback.status === 'playing' || playback.status === 'loading');
  const loading = selected && playback.status === 'loading';
  const error = selected && playback.status === 'error';
  const label = loading ? `Cancel loading ${track.name} soundtrack` : `${active ? 'Pause' : error ? 'Retry' : 'Play'} ${track.name} soundtrack`;

  return <button type="button" className={`${local.playButton} ${inline ? local.inlinePlayButton : local.cardPlayButton}`}
    aria-label={label} aria-busy={loading || undefined} data-playing={active || undefined}
    onClick={() => playback.toggle(track)}>
    <PlaybackIcon active={active} />
    {inline && <span>{loading ? 'Loading…' : `${active ? 'Pause' : error ? 'Retry' : 'Play'} ${track.name}`}</span>}
  </button>;
}

function PlaybackStatus({ slug }: { slug: string }) {
  const { track, status, currentTime, duration } = usePlayback();
  if (track?.slug !== slug || status === 'idle') return null;
  if (status === 'loading') return <>Loading…</>;
  if (status === 'error') return <>Couldn’t load audio. Try again.</>;
  if (status === 'ended') return <>Play again</>;
  return <>{status === 'paused' ? 'Paused · ' : ''}{timeLabel(currentTime)} / {timeLabel(duration)}</>;
}

export function FragranceTrackCard({ track }: { track: Fragrance }) {
  const playback = usePlayback();
  const [notesOpen, setNotesOpen] = useState(false);
  const card = useRef<HTMLLIElement>(null);
  const notesToggle = useRef<HTMLButtonElement>(null);
  const notesId = `fragrance-notes-${track.slug}`;
  const selected = playback.track?.slug === track.slug;
  const progress = selected && playback.duration > 0 ? Math.min(1, playback.currentTime / playback.duration) : 0;

  useEffect(() => {
    if (!notesOpen) return;
    function dismiss(event: PointerEvent) {
      if (!card.current?.contains(event.target as Node)) setNotesOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        if (document.activeElement?.closest(`#${notesId}`)) notesToggle.current?.focus();
        setNotesOpen(false);
      }
    }
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', escape);
    };
  }, [notesOpen, notesId]);

  return <li ref={card} className={local.fragranceCard}
    onPointerEnter={(event) => {
      if (event.pointerType === 'mouse' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) setNotesOpen(true);
    }}
    onPointerLeave={(event) => { if (event.pointerType === 'mouse') setNotesOpen(false); }}
    onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setNotesOpen(false); }}>
    <div className={local.fragranceArtwork} data-active={selected || undefined} data-notes-open={notesOpen || undefined}>
      <div className={local.fragranceMedia}>
        <button ref={notesToggle} type="button" className={local.notesToggle}
          aria-label={`${notesOpen ? 'Hide' : 'View'} ${track.name} scent notes`} aria-expanded={notesOpen} aria-controls={notesId}
          onClick={() => setNotesOpen((open) => !open)} />
        <Image src={`/work/amodira/fragrances/${track.slug}.webp`} alt={`${track.name} perfume with its illustrated packaging.`}
          width={640} height={640} sizes="(max-width: 600px) 44vw, (max-width: 900px) 28vw, 260px" />
        <div id={notesId} className={local.notesPanel} aria-hidden={!notesOpen} onClick={() => setNotesOpen(false)}>
          <dl className={local.notesList} tabIndex={notesOpen ? 0 : -1} aria-label={`${track.name} scent notes`}>
            {([['top', 'Top notes'], ['middle', 'Middle notes'], ['base', 'Base notes']] as const).map(([key, label]) => <div key={key}>
              <dt>{label}</dt>
              <dd>{track.notes[key].join(' · ')}</dd>
            </div>)}
          </dl>
        </div>
        <div className={local.trackProgress} aria-hidden="true"><div style={{ transform: `scaleX(${progress})` }} /></div>
      </div>
      <FragranceLikeButton slug={track.slug} name={track.name} />
      <PlaybackButton track={track} />
    </div>
    <span className={local.fragranceName}>{track.name}</span>
    <p className={local.trackStatus}><PlaybackStatus slug={track.slug} /></p>
  </li>;
}

export function FragranceTrackPlayer({ track }: { track: Track }) {
  return <div className={local.inlinePlayer}>
    <PlaybackButton track={track} inline />
    <p className={local.trackStatus}><PlaybackStatus slug={track.slug} /></p>
  </div>;
}
