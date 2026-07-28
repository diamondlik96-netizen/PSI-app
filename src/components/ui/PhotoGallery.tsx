import { useEffect, useState } from 'react';
import type { ProjectPhoto } from '../../data/types';
import { PlaceholderPhoto } from './PlaceholderPhoto';

export function PhotoGallery({ photos, alt }: { photos: ProjectPhoto[]; alt: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null);
      if (e.key === 'ArrowRight') setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length));
      if (e.key === 'ArrowLeft') setOpenIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openIndex, photos.length]);

  if (photos.length === 0) {
    return <PlaceholderPhoto label={`PROJECT PHOTOS —\n${alt}`} height={220} />;
  }

  const active = openIndex !== null ? photos[openIndex] : null;

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 8 }}>
        {photos.map((photo, i) => (
          <button
            key={photo.src + i}
            onClick={() => setOpenIndex(i)}
            style={{
              padding: 0,
              border: 'none',
              cursor: 'pointer',
              display: 'block',
              aspectRatio: '4 / 3',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundImage: `url('${photo.src}')`,
            }}
            className="grayscale"
            aria-label={photo.caption ?? `${alt} — photo ${i + 1}`}
          />
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpenIndex(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(13,12,12,.94)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <button
            onClick={() => setOpenIndex(null)}
            aria-label="Close"
            style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#fff', fontSize: 28, cursor: 'pointer', lineHeight: 1, padding: 8 }}
          >
            ×
          </button>

          {photos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex((openIndex! - 1 + photos.length) % photos.length);
              }}
              aria-label="Previous photo"
              style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#fff', fontSize: 36, cursor: 'pointer', padding: 12 }}
            >
              ‹
            </button>
          )}

          <img
            src={active.src}
            alt={active.caption ?? alt}
            className="grayscale"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '90vw', maxHeight: '75vh', objectFit: 'contain' }}
          />

          {photos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex((openIndex! + 1) % photos.length);
              }}
              aria-label="Next photo"
              style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#fff', fontSize: 36, cursor: 'pointer', padding: 12 }}
            >
              ›
            </button>
          )}

          <div style={{ color: '#fff', marginTop: 16, textAlign: 'center', maxWidth: 640 }}>
            {active.caption && <div style={{ fontSize: 13, opacity: 0.85 }}>{active.caption}</div>}
            {photos.length > 1 && (
              <div style={{ fontSize: 11, opacity: 0.55, marginTop: 6 }}>
                {openIndex! + 1} / {photos.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
