'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HomeLink from '@/components/HomeTransition';
import { useProjectBack, useProjectOrigin } from '@/components/work/ProjectNavigation';
import { econicTitle } from '../econic/econic-content';
import styles from './checkout.module.css';

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'design', label: 'Design' },
  { id: 'impact', label: 'Impact' },
] as const;

export function EconicMention({ label = 'Econic 25', description = 'Previewing sale prices for VIRGIO’s anniversary campaign.' }: { label?: string; description?: string }) {
  const [open, setOpen] = useState(false);
  const hovered = useRef(false);
  const trigger = useRef<HTMLAnchorElement>(null);
  const preview = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    function dismiss(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      if (preview.current?.contains(document.activeElement)) trigger.current?.focus();
      setOpen(false);
    }
    window.addEventListener('keydown', dismiss);
    return () => window.removeEventListener('keydown', dismiss);
  }, [open]);

  return (
    <span className={styles.projectMention}
      onPointerEnter={(event) => { if (event.pointerType === 'mouse') { hovered.current = true; setOpen(true); } }}
      onPointerLeave={(event) => { hovered.current = false; if (!event.currentTarget.contains(document.activeElement)) setOpen(false); }}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={(event) => { if (!hovered.current && !event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
      <Link ref={trigger} href="/work/econic" className={styles.mentionLink}>
        {label}<svg className={styles.mentionIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg>
      </Link>
      {open && <span ref={preview} className={styles.projectPreview}>
        <Link href="/work/econic" className={styles.previewCard} aria-label={`Read ${econicTitle}`}>
          <Image src="/work/econic/thumb.jpg" alt="" width={1056} height={660} sizes="300px" />
          <span className={styles.previewCopy}>
            <span className={styles.previewTitle}>{econicTitle}</span>
            <span className={styles.previewDescription}>{description}</span>
            <span className={styles.previewAction}>Read case study <span aria-hidden>→</span></span>
          </span>
        </Link>
      </span>}
    </span>
  );
}

export function CheckoutHeader({ sections = SECTIONS }: { sections?: readonly { id: string; label: string }[] }) {
  const backHref = useProjectOrigin();
  const onBack = useProjectBack();
  const [active, setActive] = useState(sections[0]?.id ?? 'overview');

  const pendingSection = useRef<string | null>(null);
  const settleTimer = useRef(0);

  useEffect(() => {
    const targets = sections.map(({ id }) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    let frame = 0;
    const update = () => {
      frame = 0;
      if (pendingSection.current) return;
      let current = targets[0]?.id;
      for (const target of targets) {
        if (target.getBoundingClientRect().top <= 112) current = target.id;
      }
      // A short closing section may never reach the top threshold.
      if (targets.length && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        current = targets[targets.length - 1].id;
      }
      if (current) setActive(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const settle = () => {
      pendingSection.current = null;
      window.clearTimeout(settleTimer.current);
      onScroll();
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scrollend', settle);
    window.addEventListener('wheel', settle, { passive: true });
    window.addEventListener('touchstart', settle, { passive: true });
    window.addEventListener('keydown', settle);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scrollend', settle);
      window.removeEventListener('wheel', settle);
      window.removeEventListener('touchstart', settle);
      window.removeEventListener('keydown', settle);
    };
  }, [sections]);

  function goToSection(event: MouseEvent<HTMLAnchorElement>, id: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const section = document.getElementById(id);
    if (!section) return;
    event.preventDefault();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    history.replaceState(history.state, '', `#${id}`);
    pendingSection.current = id;
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => { pendingSection.current = null; }, 1200);
    section.scrollIntoView({ behavior: reduce || event.detail === 0 ? 'instant' : 'smooth', block: 'start' });
    section.focus({ preventScroll: true });
    setActive(id);
  }

  return (
    <>
      <a className={styles.skipLink} href="#case-study">Skip to case study</a>
      <header className={styles.header}>
        <HomeLink href={backHref} onClick={onBack} className={styles.back}><span aria-hidden>←</span> {backHref === '/' ? 'Home' : 'Work'}</HomeLink>
        <nav className={styles.headerLinks} aria-label="Main navigation">
          <HomeLink href="/">Home</HomeLink>
          <a href="mailto:sameerkapildesigns@gmail.com">Contact</a>
        </nav>
      </header>
      <nav className={styles.sectionNav} aria-label="Case study sections">
        {sections.map(({ id, label }) => (
          <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}
            onClick={(event) => goToSection(event, id)}>{label}</a>
        ))}
      </nav>
    </>
  );
}

type ScreenshotProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  label: string;
  phone?: boolean;
  priority?: boolean;
  unoptimized?: boolean;
  annotations?: { number: number; x: number; y: number }[];
};

export function Screenshot({ src, alt, width, height, label, phone = false, priority = false, unoptimized = false, annotations = [] }: ScreenshotProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  function show() {
    dialog.current?.showModal();
    setOpen(true);
  }

  return (
    <>
      <button ref={trigger} type="button" className={`${styles.imageButton} ${annotations.length ? styles.annotatedImage : ''}`} onClick={show}
        aria-label={`Enlarge ${label.toLowerCase()}`} aria-haspopup="dialog">
        <Image src={src} alt={alt} width={width} height={height} priority={priority} unoptimized={unoptimized}
          className={phone ? styles.phoneImage : styles.desktopImage}
          sizes={phone ? '(max-width: 600px) 80vw, (max-width: 900px) 40vw, 320px' : '(max-width: 900px) 85vw, 1000px'} />
        {annotations.map(({ number, x, y }) => <span key={number} className={styles.annotationPin}
          style={{ left: `${x}%`, top: `${y}%` }} aria-hidden="true">{number}</span>)}
      </button>
      <dialog ref={dialog} className={styles.lightbox} aria-label={label}
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}
        onClose={() => { setOpen(false); trigger.current?.focus({ preventScroll: true }); }}>
        <div className={styles.lightboxHeader}>
          <span>{label}</span>
          <button type="button" className={styles.close} autoFocus onClick={() => dialog.current?.close()}>Close <span aria-hidden>×</span></button>
        </div>
        {open && <Image src={src} alt={alt} width={width} height={height} loading="eager" unoptimized={unoptimized}
          className={`${styles.expandedImage} ${phone ? styles.expandedPhone : ''}`}
          sizes={phone ? '(max-width: 600px) 95vw, 480px' : '100vw'} />}
      </dialog>
    </>
  );
}
