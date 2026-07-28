import { useState } from 'react';
import { useInstallPrompt } from '../../hooks/useInstallPrompt';

export function InstallBanner() {
  const { canInstall, isIOS, installed, promptInstall } = useInstallPrompt();
  const [dismissed, setDismissed] = useState(false);

  if (installed || dismissed || (!canInstall && !isIOS)) return null;

  return (
    <div style={{ background: '#0d0c0c', color: '#fff', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ flex: 1, fontSize: 12.5, lineHeight: 1.4 }}>
        {canInstall ? (
          <>
            <strong style={{ fontFamily: 'var(--font-heading)', fontWeight: 800 }}>Get the PSI app</strong> — one-tap access to scheduling, quotes, and your account.
          </>
        ) : (
          <>
            <strong style={{ fontFamily: 'var(--font-heading)', fontWeight: 800 }}>Get the PSI app</strong> — tap Share <span aria-hidden>⬆</span> then "Add to Home Screen."
          </>
        )}
      </span>
      {canInstall && (
        <button className="btn btn-primary" style={{ fontSize: 12, padding: '6px 12px', flex: 'none' }} onClick={promptInstall}>
          Install
        </button>
      )}
      <button
        aria-label="Dismiss"
        onClick={() => setDismissed(true)}
        style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,.6)', cursor: 'pointer', fontSize: 16, padding: 4, flex: 'none', lineHeight: 1 }}
      >
        ×
      </button>
    </div>
  );
}
