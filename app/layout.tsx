import './globals.css';

export const metadata = {
  title: 'Demo Rendering Methods - Next.js',
  description: 'Demonstrasi CSR, SSR, dan SSG menggunakan Next.js App Router',
};

export default function RootLayout({  children}: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}