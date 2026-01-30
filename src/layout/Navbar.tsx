import { motion, useScroll, useSpring } from 'framer-motion';
import Routes from '../../types/types';
import SomethingWeird from '@/components/SomethingWeird';
import Link from 'next/link';
import NavProgressBar from '@/components/animation/NavProgressBar';
import usePageRefs from 'util/pageRef';
import { useEffect, useRef } from 'react';

interface NavbarProps {
  handleRoute: Routes['handleRoute'];
  pageRef: React.RefObject<HTMLDivElement | null>;
  frontpageRef: React.RefObject<HTMLDivElement | null>;
  aboutRef: React.RefObject<HTMLDivElement | null>;
  workRef: React.RefObject<HTMLDivElement | null>;
  contactRef: React.RefObject<HTMLDivElement | null>;
  beatRef: React.RefObject<HTMLDivElement | null>;
}

function Navbar({
  handleRoute,
  pageRef,
  frontpageRef,
  aboutRef,
  workRef,
  contactRef,
  beatRef,
}: NavbarProps) {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        const windowHeight = window.innerHeight;
        const totalScrollHeight = scrollHeight - windowHeight;
        const scrollRatio = scrollTop / totalScrollHeight;
        navRef.current.scrollLeft =
          scrollRatio *
          (navRef.current.scrollWidth - navRef.current.clientWidth);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 z-50 flex h-fit w-full gap-5 overflow-x-scroll bg-custom-black p-2 lg:h-full lg:w-1/6 lg:flex-col lg:gap-4 lg:overflow-x-auto lg:bg-opacity-10"
    >
      <div className="flex items-center gap-2 lg:flex-col lg:items-start lg:py-16">
        <Link href="/">
          <h3 className="font-extrabold text-custom-white">WELCOME!</h3>
          <p className="whitespace-nowrap font-semibold tracking-tight text-custom-white">
            Take a look around.
          </p>
        </Link>
        <SomethingWeird />
      </div>

      <ul className="flex h-fit w-full justify-between gap-4 lg:flex-col">
        <li className="w-full min-w-[10rem] max-w-[15rem]">
          <Link
            href="/#about"
            className="relative flex h-16 w-full flex-col justify-between rounded-lg bg-custom-red px-2"
          >
            <NavProgressBar itemRef={aboutRef} />
            <p className="text-sm">01</p>
            <h3 className="whitespace-nowrap font-semibold">ABOUT ME</h3>
          </Link>
        </li>
        <li className="w-full min-w-[10rem] max-w-[15rem]">
          <Link
            href="/#work"
            className="relative flex h-16 w-full flex-col justify-between rounded-lg bg-custom-royal-blue px-2"
          >
            <NavProgressBar itemRef={workRef} />
            <p className="text-sm">02</p>
            <h3 className="whitespace-nowrap font-semibold">WORK</h3>
          </Link>
        </li>
        <li className="w-full min-w-[10rem] max-w-[15rem]">
          <Link
            href="/#contact"
            className="relative flex h-16 w-full flex-col justify-between rounded-lg bg-custom-blue px-2"
          >
            <NavProgressBar itemRef={contactRef} />
            <p className="text-sm">03</p>
            <h3 className="whitespace-nowrap font-semibold">CONTACT</h3>
          </Link>
        </li>
        <li className="w-full min-w-[10rem] max-w-[15rem]">
          <Link
            href="/#beat"
            className="relative flex h-16 w-full flex-col justify-between rounded-lg bg-custom-purple px-2"
          >
            <NavProgressBar itemRef={beatRef} />
            <p className="text-sm">04</p>
            <h3 className="whitespace-nowrap font-semibold">MAKE A BEAT</h3>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
