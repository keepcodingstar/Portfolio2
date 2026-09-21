'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { usePathname } from 'next/navigation';
import { coolDown, hasExplored, isCoolingDown, newExploration, OPEN_FEEDBACK_EVENT, readExploration, saveExploration, VISIT_TIMEOUT, type Exploration } from './exploration';
import styles from './feedback.module.css';

export default function FeedbackPrompt() {
  const pathname = usePathname();
  const visit = useRef<Exploration | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const sending = useRef(false);
  const flowPreview = useRef(false);
  const [invitation, setInvitation] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [visitorName, setVisitorName] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  function currentVisit() {
    if (!visit.current || Date.now() - visit.current.lastActive >= VISIT_TIMEOUT) visit.current = readExploration();
    return visit.current;
  }

  function dismissInvitation() {
    setInvitation(false);
    if (flowPreview.current) return;
    const value = currentVisit();
    value.invited = true;
    saveExploration(value);
    coolDown(7);
  }

  function showForm() {
    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dismissInvitation();
    setStatus(flowPreview.current ? 'idle' : currentVisit().sent ? 'sent' : sending.current ? 'sending' : 'idle');
    setError('');
    dialog.current?.showModal();
    setOpen(true);
  }

  useEffect(() => {
    const show = () => showForm();
    window.addEventListener(OPEN_FEEDBACK_EVENT, show);
    return () => window.removeEventListener(OPEN_FEEDBACK_EVENT, show);
    // The event reads the current visit and DOM through refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  useEffect(() => {
    if (open && status === 'sent') dialog.current?.querySelector<HTMLElement>('#feedback-title')?.focus();
  }, [open, status]);

  useEffect(() => {
    setInvitation(false);
    flowPreview.current = false;
    visit.current ??= readExploration();
    // Local previews never submit feedback or change the visit's sent state.
    if (process.env.NODE_ENV === 'development') {
      const preview = new URLSearchParams(window.location.search).get('feedback');
      if (preview === 'flow') {
        flowPreview.current = true;
        dialog.current?.close();
        setOpen(false);
        setStatus('idle');
        setError('');
        setMessage('');
        setVisitorName('');
        setInvitation(true);
        return;
      }
      if (preview === 'preview') { setInvitation(true); return; }
      if (preview === 'write') {
        setStatus('idle');
        setError('');
        dialog.current?.showModal();
        setOpen(true);
        return;
      }
      if (preview === 'thanks') {
        setStatus('sent');
        dialog.current?.showModal();
        setOpen(true);
        return;
      }
    }
    let lastTick = Date.now();
    let lastInteraction = lastTick;
    let lastScroll = lastTick;
    const dwell = new Map<Element, number>();
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else { visible.delete(entry.target); dwell.delete(entry.target); }
      }
    }, { threshold: 0.5 });
    // Observe headings so nested section wrappers cannot count the same view twice.
    document.querySelectorAll('main h1, main h2, .zone h1, .zone h2').forEach(el => observer.observe(el));

    const interact = (event: Event) => {
      const now = Date.now();
      if (event.type === 'scroll') lastScroll = now;
      if (visit.current && now - visit.current.lastActive >= VISIT_TIMEOUT) visit.current = newExploration(now);
      lastInteraction = now;
      if (visit.current) visit.current.lastActive = now;
    };
    const persist = () => { if (visit.current) saveExploration(visit.current); lastTick = Date.now(); };
    const events = ['scroll', 'pointerdown', 'keydown'] as const;
    events.forEach(event => window.addEventListener(event, interact, { passive: true }));
    document.addEventListener('visibilitychange', persist);
    window.addEventListener('pagehide', persist);

    const interval = window.setInterval(() => {
      const now = Date.now();
      const elapsed = Math.min(now - lastTick, 2500);
      lastTick = now;
      const value = visit.current!;
      const blocked = document.body.classList.contains('preloading') || document.documentElement.dataset.checkoutTransition
        || document.querySelector('dialog[open], [aria-modal="true"]');
      if (document.visibilityState !== 'visible' || now - lastInteraction > 45_000 || blocked) return;
      value.activeMs += elapsed;
      value.pages[pathname] = (value.pages[pathname] || 0) + elapsed;
      for (const el of visible) {
        const time = (dwell.get(el) || 0) + elapsed;
        dwell.set(el, time);
        const key = `${pathname}#${el.id || el.textContent?.trim().slice(0, 100)}`;
        if (time >= 3000 && !value.sections.includes(key)) value.sections.push(key);
      }
      saveExploration(value);
      const editing = document.activeElement?.matches('input, textarea, select, [contenteditable="true"]');
      const listening = Array.from(document.querySelectorAll('audio')).some(audio => !audio.paused);
      if (!value.invited && !value.sent && !isCoolingDown() && hasExplored(value)
        && !editing && !listening && now - lastScroll > 4000 && now - lastInteraction > 2000) {
        value.invited = true;
        saveExploration(value);
        setInvitation(true);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
      observer.disconnect();
      events.forEach(event => window.removeEventListener(event, interact));
      document.removeEventListener('visibilitychange', persist);
      window.removeEventListener('pagehide', persist);
      persist();
    };
  }, [pathname]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current || status === 'sent') return;
    if (!message.trim()) { setError('A few words are all it takes.'); setStatus('error'); return; }
    if (flowPreview.current) {
      setMessage('');
      setVisitorName('');
      setStatus('sent');
      return;
    }
    const value = currentVisit();
    sending.current = true;
    setStatus('sending');
    setError('');
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Feedback-Session': value.id },
        body: JSON.stringify({ message: message.trim(), name: visitorName.trim() || undefined, page: pathname, website: new FormData(event.currentTarget).get('website') }),
        signal: AbortSignal.timeout(12_000),
      });
      if (!response.ok) throw new Error('Could not save feedback.');
      value.sent = true;
      value.invited = true;
      saveExploration(value);
      coolDown(30);
      setMessage('');
      setVisitorName('');
      setStatus('sent');
    } catch {
      setError('Your note is still here. Please try sending it again.');
      setStatus('error');
    } finally { sending.current = false; }
  }

  return <>
    <div className="sr-only" role="status">{invitation ? 'Thanks for exploring. You can leave Sameer a note using the feedback invitation.' : ''}</div>
    {invitation && <aside className={styles.invitation} aria-labelledby="feedback-invitation-title">
      <button type="button" className={styles.close} onClick={dismissInvitation} aria-label="Dismiss feedback invitation"><CloseIcon /></button>
      <h2 id="feedback-invitation-title">A little feedback?</h2>
      <p>Thanks for exploring my work. I’d love to hear what stayed with you, or what I could make clearer.</p>
      <div className={styles.actions}>
        <button type="button" className={styles.primary} onClick={showForm} aria-haspopup="dialog">Leave me a note</button>
        <button type="button" className={styles.secondary} onClick={dismissInvitation}>Maybe later</button>
      </div>
    </aside>}
    <dialog ref={dialog} className={styles.dialog} data-sent={status === 'sent' || undefined} aria-labelledby="feedback-title" aria-describedby="feedback-description"
      onClose={() => { setOpen(false); if (opener.current?.isConnected) opener.current.focus({ preventScroll: true }); }}>
      <button type="button" className={styles.close} onClick={() => dialog.current?.close()} aria-label="Close feedback"><CloseIcon /></button>
      {status === 'sent' ? <div className={styles.thanks} role="status">
        <ReceivedNote />
        <span className={styles.receiptLabel}>Note received</span>
        <h2 id="feedback-title" tabIndex={-1}>Thanks for the note.</h2>
        <p id="feedback-description">There’s a little of me in everything here. Your note means more than you know.</p>
        <button type="button" className={styles.primary} onClick={() => dialog.current?.close()}>Back to exploring</button>
      </div> : <form onSubmit={submit} data-clarity-mask="true">
        <span className={styles.eyebrow}>A note for Sameer</span>
        <h2 id="feedback-title">What’s on your mind?</h2>
        <p id="feedback-description">Something you loved, something that felt unclear, or just a thought. I’m all ears.</p>
        <label className="sr-only" htmlFor="visitor-feedback">Your feedback</label>
        <textarea id="visitor-feedback" name="message" value={message} maxLength={2000} required rows={5}
          placeholder="I was thinking…" aria-describedby={error ? 'feedback-error' : 'feedback-privacy'} aria-invalid={status === 'error' || undefined}
          onChange={event => { setMessage(event.target.value); if (status === 'error') { setStatus('idle'); setError(''); } }} />
        <label className="sr-only" htmlFor="visitor-name">Who’s this note from? (optional)</label>
        <input id="visitor-name" className={styles.nameInput} name="name" type="text" autoComplete="nickname"
          placeholder="Who’s this note from? (optional)" value={visitorName} maxLength={80} onChange={event => setVisitorName(event.target.value)} />
        <div className={styles.honeypot} aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <p id="feedback-privacy" className={styles.privacy}>Just between us. You’re welcome to stay anonymous.</p>
        {error && <p id="feedback-error" className={styles.error} role="alert">{error}</p>}
        <button type="submit" className={styles.primary} disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send note'}</button>
      </form>}
    </dialog>
  </>;
}

function CloseIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>;
}

function ReceivedNote() {
  return <svg className={styles.receivedNote} width="112" height="96" viewBox="0 0 112 96" fill="none" aria-hidden="true" focusable="false">
    <ellipse cx="56" cy="88" rx="35" ry="3" fill="#345b78" opacity=".07" />
    <path d="M16 40 51 15a9 9 0 0 1 10 0l35 25v34a7 7 0 0 1-7 7H23a7 7 0 0 1-7-7V40Z" fill="#dcebf7" stroke="#9bb9ce" strokeWidth="1.5" strokeLinejoin="round" />
    <g className={styles.notePaper}>
      <rect x="29" y="9" width="54" height="62" rx="5" fill="#fbfdff" stroke="#b8cede" strokeWidth="1.5" />
      <path d="M39 24h20M39 32h34M39 40h27" stroke="#a1b9ca" strokeWidth="2" strokeLinecap="round" />
    </g>
    <path d="m16 40 35 24a9 9 0 0 0 10 0l35-24v34a7 7 0 0 1-7 7H23a7 7 0 0 1-7-7V40Z" fill="#eaf3fa" stroke="#9bb9ce" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="m18 78 25-20m51 20L69 58" stroke="#b8cede" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="56" cy="64" r="12" fill="#345b78" stroke="#f4faff" strokeWidth="3" />
    <path d="m51.5 64 3 3 6-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}
