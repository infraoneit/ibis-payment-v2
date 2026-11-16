'use client';

import { useEffect, useState } from 'react';
import { Icon } from './Icons';

type Theme = 'light' | 'dark';

const THEME_COLOR: Record<Theme, string> = { light: '#ddd1bb', dark: '#0f0d0b' };

/** Hell/Dunkel-Umschalter. Standard ist immer Hell, die Systemeinstellung wird nicht übernommen.
 *  Nur wer auf den Knopf drückt, kommt in den Darkmode; die Wahl wird im Browser gespeichert (kein Cookie). */
export function ThemeToggle({ className = 'icon-btn' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('light');
  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
  }, []);
  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[next]);
    try {
      localStorage.setItem('theme', next);
    } catch {}
    setTheme(next);
  };
  const isDark = theme === 'dark';
  return (
    <button type="button" className={className} onClick={toggle} aria-label={isDark ? 'Helles Design einschalten' : 'Dunkles Design einschalten'} title={isDark ? 'Hell' : 'Dunkel'}>
      {isDark ? <Icon.sun /> : <Icon.moon />}
    </button>
  );
}

/** Setzt data-theme vor dem ersten Rendern, damit es nicht flackert: Dunkel nur, wenn es vorher per Knopf gewählt wurde. */
export const THEME_INIT_SCRIPT = `(function(){var d=document.documentElement;try{if(localStorage.getItem('theme')==='dark'){d.setAttribute('data-theme','dark');var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content','#0f0d0b');return;}}catch(e){}d.setAttribute('data-theme','light');})();`;
