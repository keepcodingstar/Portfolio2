'use client';

import { OPEN_FEEDBACK_EVENT } from './exploration';
import styles from './feedback.module.css';

export default function FeedbackFooter() {
  return <footer className={styles.caseFooter}>
    <button type="button" aria-haspopup="dialog" onClick={() => window.dispatchEvent(new Event(OPEN_FEEDBACK_EVENT))}>
      Leave feedback <span aria-hidden>↗</span>
    </button>
  </footer>;
}
