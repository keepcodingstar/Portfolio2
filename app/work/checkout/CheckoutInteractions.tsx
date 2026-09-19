'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './checkout.module.css';

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'design', label: 'Design' },
  { id: 'impact', label: 'Impact' },
] as const;

export function EconicMention() {
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
        Econic 25<svg className={styles.mentionIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg>
      </Link>
      {open && <span ref={preview} className={styles.projectPreview}>
        <Link href="/work/econic" className={styles.previewCard} aria-label="Read the Econic 25 case study">
          <Image src="/work/econic/thumb.jpg" alt="" width={1056} height={660} sizes="300px" />
          <span className={styles.previewCopy}>
            <span className={styles.previewTitle}>Econic 25</span>
            <span className={styles.previewDescription}>Previewing sale prices for VIRGIO’s anniversary campaign.</span>
            <span className={styles.previewAction}>Read case study <span aria-hidden>→</span></span>
          </span>
        </Link>
      </span>}
    </span>
  );
}

export function CheckoutHeader() {
  const [active, setActive] = useState('overview');

  useEffect(() => {
    const sections = SECTIONS.map(({ id }) => document.getElementById(id));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(entry.target.id);
      }
    }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });
    sections.forEach((section) => { if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  function goToSection(event: MouseEvent<HTMLAnchorElement>, id: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const section = document.getElementById(id);
    if (!section) return;
    event.preventDefault();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    history.replaceState(null, '', `#${id}`);
    section.scrollIntoView({ behavior: reduce ? 'instant' : 'smooth', block: 'start' });
    section.focus({ preventScroll: true });
    setActive(id);
  }

  return (
    <>
      <a className={styles.skipLink} href="#case-study">Skip to case study</a>
      <header className={styles.header}>
        <Link href="/work" className={styles.back}><span aria-hidden>←</span> Work</Link>
        <nav className={styles.sectionNav} aria-label="Case study sections">
          {SECTIONS.map(({ id, label }) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}
              onClick={(event) => goToSection(event, id)}>{label}</a>
          ))}
        </nav>
        <nav className={styles.headerLinks} aria-label="Main navigation">
          <Link href="/">Home</Link>
          <a href="mailto:sameerkapildesigns@gmail.com">Contact</a>
        </nav>
      </header>
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
  annotations?: { number: number; x: number; y: number }[];
};

export function Screenshot({ src, alt, width, height, label, phone = false, annotations = [] }: ScreenshotProps) {
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
        <Image src={src} alt={alt} width={width} height={height}
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
        {open && <Image src={src} alt={alt} width={width} height={height} loading="eager"
          className={`${styles.expandedImage} ${phone ? styles.expandedPhone : ''}`}
          sizes={phone ? '(max-width: 600px) 95vw, 480px' : '100vw'} />}
      </dialog>
    </>
  );
}
