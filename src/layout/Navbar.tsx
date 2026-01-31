import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MagneticElement from '@/components/MagneticElement';

interface NavbarProps {
  aboutRef: React.RefObject<HTMLDivElement | null>;
  workRef: React.RefObject<HTMLDivElement | null>;
  contactRef: React.RefObject<HTMLDivElement | null>;
  beatRef: React.RefObject<HTMLDivElement | null>;
}

const navItems = [
  { id: 'about', label: 'ABOUT', number: '01' },
  { id: 'work', label: 'WORK', number: '02' },
  { id: 'contact', label: 'CONTACT', number: '03' },
  { id: 'beat', label: 'BEATS', number: '04' },
];

function Navbar({ aboutRef, workRef, contactRef, beatRef }: NavbarProps) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const refs = [
      { id: 'about', ref: aboutRef },
      { id: 'work', ref: workRef },
      { id: 'contact', ref: contactRef },
      { id: 'beat', ref: beatRef },
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const item of refs) {
        if (item.ref.current) {
          const { offsetTop, offsetHeight } = item.ref.current;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [aboutRef, workRef, contactRef, beatRef]);

  return (
    <>
      {/* Desktop Navigation - Minimal Vertical Strip */}
      <nav className="fixed left-0 top-0 z-50 hidden h-full w-16 flex-col items-center justify-between border-r border-border bg-base py-8 lg:flex xl:w-20">
        {/* Logo */}
        <MagneticElement className="cursor-pointer" strength={0.4}>
          <Link href="/" className="block transition-opacity hover:opacity-80">
            <Image
              src="/favicon.ico"
              alt="Samuel Ho"
              width={36}
              height={36}
              className="h-9 w-9 xl:h-10 xl:w-10"
              priority
            />
          </Link>
        </MagneticElement>

        {/* Vertical Navigation */}
        <ul className="flex flex-col items-center gap-8">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                href={`/#${item.id}`}
                className="group relative flex flex-col items-center"
              >
                {/* Active indicator line */}
                <span
                  className={`absolute -left-4 h-full w-[2px] transition-all duration-300 xl:-left-6 ${
                    activeSection === item.id
                      ? 'bg-accent-primary'
                      : 'bg-transparent'
                  }`}
                />
                {/* Number */}
                <span
                  className={`text-xs transition-colors duration-300 ${
                    activeSection === item.id
                      ? 'text-accent-primary'
                      : 'text-text-muted group-hover:text-cream'
                  }`}
                >
                  {item.number}
                </span>
                {/* Vertical label */}
                <span
                  className={`vertical-text mt-2 text-xs font-medium tracking-widest transition-colors duration-300 ${
                    activeSection === item.id
                      ? 'text-cream'
                      : 'text-text-muted group-hover:text-cream'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Bottom spacer */}
        <div className="h-8" />
      </nav>

      {/* Mobile Navigation - Bottom Pill */}
      <nav className="nav-pill fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full px-2 py-2 lg:hidden">
        {/* Logo */}
        <Link
          href="/"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border"
        >
          <Image
            src="/favicon.ico"
            alt="Samuel Ho"
            width={24}
            height={24}
            className="h-6 w-6"
          />
        </Link>

        {/* Divider */}
        <div className="mx-2 h-6 w-px bg-border" />

        {/* Navigation items */}
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={`/#${item.id}`}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
              activeSection === item.id
                ? 'bg-accent-primary text-cream'
                : 'text-text-muted hover:text-cream'
            }`}
          >
            <span className="text-xs font-semibold">{item.number}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}

export default Navbar;
