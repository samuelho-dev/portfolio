import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { TbBrandMongodb, TbDeviceAudioTape } from 'react-icons/tb';
import { IoLogoNodejs } from 'react-icons/io';
import { FaAws } from 'react-icons/fa';
import {
  SiTypescript,
  SiPostgresql,
  SiNextdotjs,
  SiBlender,
  SiAdobe,
  SiReact,
  SiPython,
  SiFlask,
} from 'react-icons/si';

function About() {
  return (
    <section className="flex flex-col items-center justify-center px-2">
      <div className="flex w-full flex-col items-center justify-center gap-4 md:w-3/4 xl:flex-row">
        <div className="w-fit bg-custom-light-pink hover:bg-none">
          <div className="mix-blend-darken grayscale filter hover:filter-none">
            <Image
              src="https://res.cloudinary.com/ddhal4lbv/image/upload/v1679961213/Portfolio/525F8B4C-5303-4E2E-B816-A605BB0455A7_1_105_c_ordpsi.jpg"
              height={500}
              width={300}
              alt="profile"
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex w-full flex-col px-2 tracking-wide text-white xl:w-1/2">
          <p>
            Hey! My name is Samuel and I am a software engineer passionate about
            creating impactful products and solving business problems. I
            graduated from UC Santa Barbara in 2018 with a B.A. in Economics,
            and my previous roles were in corporate lending and FP&A. Having
            worked in cross functional and quantitative roles and also having a
            passion for the arts, I find that I draw from many diciplines. On my
            free time, I dabble music production and animation.
            <br></br>
            <br></br>
            If you would like to check out some of my projects check out my{' '}
            <a
              href="https://github.com/samuelho-dev"
              target="_blank"
              className="hover:border-customYtext-custom-yellow border-b-2 border-transparent text-custom-yellow transition duration-300"
            >
              github
            </a>
            , and if you are a recruiter click{' '}
            <Link
              href={'/Resume_SamuelHo.docx'}
              className="hover:border-customYtext-custom-yellow border-b-2 border-transparent text-custom-yellow transition duration-300"
              download={'/Resume_SamuelHo.docx'}
            >
              here
            </Link>{' '}
            for my resume and my email is{' '}
            <a
              href="#contact"
              className="hover:border-customYtext-custom-yellow border-b-2 border-transparent text-custom-yellow transition duration-300"
            >
              samuelho343@gmail.com
            </a>
            .
          </p>
          <p>Some technologies I have been working with:</p>
          <ul className="inline-grid grid-cols-3 gap-2 py-2">
            <li className="flex items-center gap-2">
              <SiNextdotjs />
              <sub>NextJS</sub>
            </li>
            <li className="flex items-center gap-2">
              <SiTypescript />
              <sub>Typescript</sub>
            </li>
            <li className="flex items-center gap-2">
              <FaAws />
              <sub>AWS</sub>
            </li>
            <li className="flex items-center gap-2">
              <SiReact />
              <sub>React</sub>
            </li>
            <li className="flex items-center gap-2">
              <IoLogoNodejs />
              <sub>Node</sub>
            </li>
            <li className="flex items-center gap-2">
              <SiPostgresql />
              <sub>PostgreSQL</sub>
            </li>
            <li className="flex items-center gap-2">
              <TbBrandMongodb />
              <sub>MongoDB</sub>
            </li>
            <li className="flex items-center gap-2">
              <SiPython />
              <sub>Python</sub>
            </li>
            <li className="flex items-center gap-2">
              <SiFlask />
              <sub>Flask</sub>
            </li>
            <li className="flex items-center gap-2">
              <TbDeviceAudioTape />
              <sub>Ableton</sub>
            </li>
            <li className="flex items-center gap-2">
              <SiBlender />
              <sub>Blender</sub>
            </li>
            <li className="flex items-center gap-2">
              <SiAdobe />
              <sub>Adobe Creative</sub>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;
