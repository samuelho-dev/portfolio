import Navbar from '@/layout/Navbar';
import Footer from './Footer';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  aboutRef: React.RefObject<HTMLDivElement | null>;
  workRef: React.RefObject<HTMLDivElement | null>;
  contactRef: React.RefObject<HTMLDivElement | null>;
  beatRef: React.RefObject<HTMLDivElement | null>;
}

export default function Layout({
  children,
  aboutRef,
  workRef,
  contactRef,
  beatRef,
}: LayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar
        aboutRef={aboutRef}
        workRef={workRef}
        contactRef={contactRef}
        beatRef={beatRef}
      />

      {/* Main content with left padding for desktop nav */}
      <main className="flex-1 pb-24 lg:pb-0 lg:pl-16 xl:pl-20">{children}</main>

      <Footer />
    </div>
  );
}
