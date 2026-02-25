export const metadata = {
  title: 'Lumiere Studio — Portfolio / Personal',
  description: 'A cinematic portfolio and personal experience with WebGL accents.',
};

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
