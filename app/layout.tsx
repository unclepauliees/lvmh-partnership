import type { Metadata } from 'next';
import { Navbar } from '@/components/chrome/navbar';
import './globals.css';
export const metadata: Metadata = { title: 'Project Rhapsody | LVMH Partnership', description: 'A proposed partnership with Symphony Space.', robots: { index: false, follow: false }, icons: { icon: '/brand/emblem-on-dark.svg' } };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="bg-paper text-ink font-didone"><Navbar />{children}</body></html>;
}
