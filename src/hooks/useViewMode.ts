import { useEffect, useState } from 'react';
import { isStandalone } from './displayMode';

const DESKTOP_BREAKPOINT = 900;

export type ViewMode = 'app' | 'website';

function computeMode(): ViewMode {
  if (isStandalone()) return 'app';
  return window.innerWidth < DESKTOP_BREAKPOINT ? 'app' : 'website';
}

export function useViewMode(): ViewMode {
  const [mode, setMode] = useState<ViewMode>(computeMode);

  useEffect(() => {
    const recompute = () => setMode(computeMode());
    window.addEventListener('resize', recompute);
    const standaloneQuery = window.matchMedia('(display-mode: standalone)');
    standaloneQuery.addEventListener('change', recompute);
    return () => {
      window.removeEventListener('resize', recompute);
      standaloneQuery.removeEventListener('change', recompute);
    };
  }, []);

  return mode;
}
