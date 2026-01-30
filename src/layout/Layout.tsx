import Navbar from '@/layout/Navbar';
import Footer from './Footer';
import Routes from '../../types/types';
import React from 'react';

interface LayoutProps {
  children: any;
  handleRoute: Routes['handleRoute'];
  pageRef: React.RefObject<HTMLDivElement | null>;
  frontpageRef: React.RefObject<HTMLDivElement | null>;
  aboutRef: React.RefObject<HTMLDivElement | null>;
  workRef: React.RefObject<HTMLDivElement | null>;
  contactRef: React.RefObject<HTMLDivElement | null>;
  beatRef: React.RefObject<HTMLDivElement | null>;
}

export default function Layout({
  children,
  handleRoute,
  pageRef,
  frontpageRef,
  aboutRef,
  workRef,
  contactRef,
  beatRef,
}: LayoutProps) {
  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex flex-col justify-between pb-5 lg:flex-row">
        <div className="w-full xl:w-1/6">
          <Navbar
            handleRoute={handleRoute}
            pageRef={pageRef}
            frontpageRef={frontpageRef}
            workRef={workRef}
            aboutRef={aboutRef}
            contactRef={contactRef}
            beatRef={beatRef}
          />
        </div>
        <main className="h-full xl:w-5/6">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
