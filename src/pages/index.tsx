import React, { useEffect, useState } from 'react';
import Routes from '../../types/types';
import About from './about';
import CopyEmail from '@/components/CopyEmail';
import { motion } from 'framer-motion';
import usePageRefs from 'util/pageRef';
import Header from '@/components/animation/Header';
import dynamic from 'next/dynamic';

interface HomeProps {
  handleRoute: Routes['handleRoute'];
  pageRef: React.RefObject<HTMLDivElement | null>;
  frontpageRef: React.RefObject<HTMLDivElement | null>;
  aboutRef: React.RefObject<HTMLDivElement | null>;
  workRef: React.RefObject<HTMLDivElement | null>;
  contactRef: React.RefObject<HTMLDivElement | null>;
  beatRef: React.RefObject<HTMLDivElement | null>;
}

const BeatmakerDynamic = dynamic(() => import('@/components/StepSequencer'), {
  loading: () => <div>Loading...</div>,
});

const WorkDynamic = dynamic(() => import('./work'), {
  loading: () => <div>Loading...</div>,
});

const NameSvgDynamic = dynamic(() => import('@/components/NameSvg'), {
  loading: () => <h1>Samuel Ho</h1>,
});

function Home({
  handleRoute,
  pageRef,
  frontpageRef,
  aboutRef,
  workRef,
  contactRef,
  beatRef,
}: HomeProps) {
  const [index, setIndex] = useState(0);
  const {} = usePageRefs();
  const [seconds, setSeconds] = useState(0);

  const headers = ['SOFTWARE ENGINEER', 'CREATIVE', 'ANALYST'];
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s >= 3) {
          setIndex((p) => (p + 1) % headers.length);
          return 0;
        } else {
          return s + 1;
        }
      });
    }, 1200);
    return () => clearInterval(interval);
  });

  return (
    <div
      ref={pageRef}
      className="flex w-full flex-col items-center justify-center"
    >
      <section
        id="home"
        ref={frontpageRef}
        className="flex min-h-screen w-full items-center justify-end "
      >
        <div className="flex h-fit w-full flex-col items-end justify-end">
          <h1 className="text-lg font-extrabold text-custom-light-pink">
            {headers[index]}
          </h1>
          <div className=" w-fit">
            <NameSvgDynamic />
          </div>

          <h5 className="w-1/2 text-right text-xl text-custom-light-pink">
            Data, Design, and Technology
          </h5>
        </div>
      </section>
      <Header
        id="about"
        itemRef={aboutRef}
        style={`-mt-20 flex h-fit w-full flex-col items-center pb-20`}
      >
        <div className="w-full rounded-lg py-10  px-5">
          <motion.div
            whileHover={{
              width: ['100%', '70%'],
              transition: {
                ease: 'easeInOut',
                duration: 1,
              },
            }}
            className="w-full rounded-lg bg-custom-red bg-opacity-90 p-2"
          >
            <h5 className="text-3xl">01</h5>
            <h1 className="underline-black p-5 text-5xl font-bold decoration-black decoration-double decoration-2">
              ABOUT ME
            </h1>
          </motion.div>
        </div>
        <div className="w-fit rounded-xl py-20">
          <About />
        </div>
      </Header>
      <Header
        id="work"
        itemRef={workRef}
        style="flex w-full flex-col items-center rounded-lg py-20"
      >
        <div className="w-full rounded-lg bg-custom-royal-blue py-10 px-5">
          <h5 className="text-3xl ">02</h5>
          <h1 className="underline-black p-10 text-5xl underline decoration-black decoration-double decoration-2">
            WORK
          </h1>
        </div>
        <WorkDynamic />
      </Header>

      <Header
        id="contact"
        itemRef={contactRef}
        style="my-10 w-full rounded-lg bg-custom-blue bg-opacity-90 p-10"
      >
        <h5 className="text-3xl">03</h5>
        <h1 className="underline-black p-10 text-5xl underline decoration-black decoration-double decoration-2">
          CONTACT
        </h1>
        <div className="flex flex-col pt-5 md:p-10">
          <div className="rounded-lg bg-custom-black bg-opacity-10 p-5">
            <CopyEmail />
          </div>
          <div className="pt-5">
            <h3>Connect with me on :</h3>
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com/samuelho-dev"
                aria-label="github"
                target="_blank"
                className="text-2xl text-custom-white underline decoration-custom-black underline-offset-4"
              >
                LinkedIn
              </a>
              <a
                href="https://www.linkedin.com/in/samuelho7/"
                aria-label="linkedin"
                target="_blank"
                className="text-2xl text-custom-white underline decoration-custom-black underline-offset-4"
              >
                Github
              </a>
            </div>
          </div>
        </div>
      </Header>

      <Header
        id="beat"
        itemRef={beatRef}
        style="flex w-full  flex-col items-center rounded-lg bg-custom-purple py-20  md:p-20"
      >
        <BeatmakerDynamic />
      </Header>
    </div>
  );
}

export default Home;
