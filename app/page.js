import { Suspense } from 'react';
import HomeExperience from './components/HomeExperience';

export default function HomePage() {
  return (
    <Suspense fallback={<div className="page-shell loading-state">Loading experience…</div>}>
      <HomeExperience />
    </Suspense>
  );
}
