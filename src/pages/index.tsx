import type React from "react";
import { useEffect, useState } from "react";
import About from "./about";
import CopyEmail from "@/components/CopyEmail";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/animation/Header";
import dynamic from "next/dynamic";
import { BsGithub } from "react-icons/bs";
import { FiLinkedin } from "react-icons/fi";

interface HomeProps {
  pageRef: React.RefObject<HTMLDivElement | null>;
  frontpageRef: React.RefObject<HTMLDivElement | null>;
  aboutRef: React.RefObject<HTMLDivElement | null>;
  workRef: React.RefObject<HTMLDivElement | null>;
  contactRef: React.RefObject<HTMLDivElement | null>;
  beatRef: React.RefObject<HTMLDivElement | null>;
}

const BeatmakerDynamic = dynamic(() => import("@/components/StepSequencer"), {
  loading: () => (
    <div className="flex h-[400px] w-full max-w-lg items-center justify-center border border-border">
      <span className="caption text-text-muted">Loading beatmaker...</span>
    </div>
  ),
  ssr: false,
});

const WorkDynamic = dynamic(() => import("./work"), {
  loading: () => (
    <div className="min-h-[400px]">
      <span className="caption text-text-muted">Loading...</span>
    </div>
  ),
});

const NameSvgDynamic = dynamic(() => import("@/components/NameSvg"), {
  loading: () => (
    <div className="display-xl">
      <span className="text-cream opacity-0">SAMUEL </span>
      <span className="text-accent-primary opacity-0">HO</span>
    </div>
  ),
  ssr: false,
});

const roles = ["SOFTWARE ENGINEER", "CREATIVE", "ANALYST"];

function Home({
  pageRef,
  frontpageRef,
  aboutRef,
  workRef,
  contactRef,
  beatRef,
}: HomeProps) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={pageRef} className="flex w-full flex-col">
      {/* Hero Section */}
      <section
        id="home"
        ref={frontpageRef}
        className="flex min-h-screen w-full flex-col justify-center px-6 md:px-12 lg:px-20"
      >
        <div className="mx-auto w-full max-w-5xl">
          {/* Rotating subtitle */}
          <div className="mb-4 h-6 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="caption block text-accent-primary"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Main name */}
          <NameSvgDynamic />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 max-w-md text-text-muted"
          >
            Data, Design, and Technology
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-16"
          >
            <span className="caption text-text-muted">Scroll to explore</span>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <Header
        id="about"
        itemRef={aboutRef}
        style="relative w-full px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32"
      >
        {/* Background section number */}
        <span className="section-number -left-4 top-16 lg:left-8">01</span>

        <div className="relative z-10 mx-auto max-w-5xl">
          <h5 className="mb-2 text-accent-primary">ABOUT</h5>
          <h2 className="mb-12 max-w-xl">
            Passionate about design and technology
          </h2>
          <About />
        </div>
      </Header>

      {/* Work Section */}
      <Header
        id="work"
        itemRef={workRef}
        style="relative w-full px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32"
      >
        {/* Background section number */}
        <span className="section-number -right-4 top-16 lg:right-8">02</span>

        <div className="relative z-10 mx-auto max-w-5xl">
          <h5 className="mb-2 text-accent-primary">WORK</h5>
          <h2 className="mb-12 max-w-xl">A glimpse of what I&apos;ve done</h2>
          <WorkDynamic />
        </div>
      </Header>

      {/* Contact Section */}
      <Header
        id="contact"
        itemRef={contactRef}
        style="relative w-full px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32"
      >
        {/* Background section number */}
        <span className="section-number left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          03
        </span>

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
          <h5 className="mb-2 text-accent-primary">CONTACT</h5>
          <h2 className="mb-8">Let&apos;s work together</h2>

          <div className="mb-8">
            <CopyEmail />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="https://github.com/samuelho-dev"
              aria-label="github"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-text-muted transition-colors hover:text-cream"
            >
              <span className="flex items-center gap-2">
                <BsGithub className="h-5 w-5" />
                GitHub
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/samuelho7/"
              aria-label="linkedin"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-text-muted transition-colors hover:text-cream"
            >
              <span className="flex items-center gap-2">
                <FiLinkedin className="h-5 w-5" />
                LinkedIn
              </span>
            </a>
          </div>
        </div>
      </Header>

      {/* Beat Section */}
      <Header
        id="beat"
        itemRef={beatRef}
        style="relative w-full px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32"
      >
        {/* Background section number */}
        <span className="section-number left-1/2 top-16 -translate-x-1/2 lg:left-8 lg:translate-x-0">
          04
        </span>

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
          <h5 className="mb-2 text-accent-primary">CREATIVE</h5>
          <h2 className="mb-4">Make a beat</h2>
          <p className="mb-10 max-w-md text-text-muted">
            A little interactive drum machine. Click the grid to create your
            pattern.
          </p>
          <BeatmakerDynamic />
        </div>
      </Header>
    </div>
  );
}

export default Home;
