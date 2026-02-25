'use client';

import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import WebGLBackdrop from './WebGLBackdrop';

const CONTENT = {
  portfolio: {
    badge: 'Portfolio Mode',
    title: 'Digital products with cinematic feel',
    subtitle:
      'I design and build immersive products that combine performance, storytelling, and bold interaction design.',
    cards: [
      { label: 'Featured Work', value: '12 Launches across SaaS & AI' },
      { label: 'Specialty', value: 'Next.js, Design Systems, Realtime UIs' },
      { label: 'Results', value: '42% avg conversion uplift' },
    ],
  },
  personal: {
    badge: 'Personal Mode',
    title: 'Builder, traveler, and relentless creative',
    subtitle:
      'Outside client work, I explore visual art, mountain trails, and tiny experiments that become future products.',
    cards: [
      { label: 'Current Quest', value: '100 days of WebGL micro-scenes' },
      { label: 'Favorite Ritual', value: 'Sunrise coffee + analog sketching' },
      { label: 'Weekend Habit', value: 'Film photography & journal writing' },
    ],
  },
};

export default function HomeExperience() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isPersonal = searchParams.get('personal') === 'true';
  const mode = isPersonal ? 'personal' : 'portfolio';
  const content = CONTENT[mode];

  const href = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (isPersonal) {
      params.delete('personal');
    } else {
      params.set('personal', 'true');
    }
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  }, [searchParams, isPersonal, pathname]);

  const handleToggle = () => {
    router.push(href, { scroll: false });
  };

  return (
    <main className={`page-shell ${mode}`}>
      <WebGLBackdrop mode={isPersonal} />
      <section className="glass-panel">
        <div className="mode-row">
          <span className="pill">{content.badge}</span>
          <button
            className={`toggle ${isPersonal ? 'active' : ''}`}
            onClick={handleToggle}
            aria-label="Toggle between portfolio and personal mode"
          >
            <span>Portfolio</span>
            <div className="knob" />
            <span>Personal</span>
          </button>
        </div>

        <div key={mode} className="content-swap">
          <h1>{content.title}</h1>
          <p>{content.subtitle}</p>
          <div className="card-grid">
            {content.cards.map((item) => (
              <article key={item.label} className="info-card">
                <h2>{item.label}</h2>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
