export const EXPLORATION_KEY = 'portfolio-exploration-v1';
export const FEEDBACK_COOLDOWN_KEY = 'portfolio-feedback-until-v1';
export const OPEN_FEEDBACK_EVENT = 'portfolio:open-feedback';
export const VISIT_TIMEOUT = 30 * 60_000;

export type Exploration = {
  id: string;
  lastActive: number;
  activeMs: number;
  pages: Record<string, number>;
  sections: string[];
  invited: boolean;
  sent: boolean;
};

export function newExploration(now: number): Exploration {
  return { id: crypto.randomUUID(), lastActive: now, activeMs: 0, pages: {}, sections: [], invited: false, sent: false };
}

export function readExploration(): Exploration {
  try {
    const value = JSON.parse(sessionStorage.getItem(EXPLORATION_KEY) || 'null');
    if (value && typeof value.id === 'string' && Date.now() - value.lastActive < VISIT_TIMEOUT
      && Number.isFinite(value.activeMs) && value.pages && Array.isArray(value.sections)
      && typeof value.invited === 'boolean' && typeof value.sent === 'boolean') return value;
  } catch { /* Private browsing can disable storage; the current page still works. */ }
  return newExploration(Date.now());
}

export function saveExploration(value: Exploration) {
  try { sessionStorage.setItem(EXPLORATION_KEY, JSON.stringify(value)); } catch { /* Keep the in-memory visit. */ }
}

export function hasExplored(value: Exploration) {
  const projects = Object.entries(value.pages).filter(([path, ms]) => path.startsWith('/work/') && ms >= 20_000);
  return value.activeMs >= 120_000 && (value.sections.length >= 4 || projects.length >= 2);
}

export function isCoolingDown() {
  try { return Number(localStorage.getItem(FEEDBACK_COOLDOWN_KEY)) > Date.now(); } catch { return false; }
}

export function coolDown(days: number) {
  try { localStorage.setItem(FEEDBACK_COOLDOWN_KEY, String(Date.now() + days * 86_400_000)); } catch { /* Visit suppression still applies. */ }
}
