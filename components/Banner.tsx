'use client'; // This must be a Client Component to use usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Banner() {
  const pathname = usePathname();

  // Helper function to determine if a link is active
  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { name: 'The Tracker', href: '/' },
    { name: 'Learn More', href: '/learn-more' },
    { name: 'Nominate', href: '/nominate' },
  ];

  return (
    <section className="w-full bg-slate-900 text-white border-b border-slate-800 shadow-lg">
      <div className="max-w-5xl mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          
          {/* Title & Description */}
          <div className="max-w-2xl">
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <h1 className="text-4xl font-bold tracking-tight mb-3">
                Corporate YouTube Tracker
              </h1>
            </Link>
            <p className="text-slate-400 text-lg leading-relaxed">
              Monitoring private equity acquisitions and corporate ownership in the creator economy.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm font-medium">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg transition-all border text-center ${
                  isActive(link.href)
                    ? 'bg-blue-600 border-blue-500 text-white shadow-inner' 
                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}