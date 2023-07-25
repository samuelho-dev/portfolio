import React from 'react';
import data from '../../util/resume.json';
import { TbBrandNextjs, TbBrandTailwind } from 'react-icons/tb';
import { FaNodeJs, FaReact, FaAws } from 'react-icons/fa';
import { FiLink } from 'react-icons/fi';
import {
  SiBackblaze,
  SiFirebase,
  SiFastapi,
  SiMysql,
  SiOpenai,
  SiPython,
  SiReact,
  SiTrpc,
  SiTypescript,
} from 'react-icons/si';
import { TbBrandTwilio } from 'react-icons/tb';
import { RxDiscordLogo } from 'react-icons/rx';
import { SiPrisma } from 'react-icons/si';
import { SiPostgresql } from 'react-icons/si';
import { SiReactquery } from 'react-icons/si';
import { SiJavascript } from 'react-icons/si';
import { SiSequelize } from 'react-icons/si';
import { BsFiletypeMdx, BsGithub } from 'react-icons/bs';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { SlPaypal } from 'react-icons/sl';
import Image from 'next/image';

interface IconMap {
  [key: string]: React.ReactElement;
}

function Projects() {
  const featuredProjects = data.featuredProjects;
  const otherProjects = data.otherProjects;
  const iconmap: IconMap = {
    'React Native': <FaReact color="white" />,
    'React Query': <SiReactquery color="white" />,
    Typescript: <SiTypescript color="white" />,
    Firebase: <SiFirebase color="white" />,
    Prisma: <SiPrisma color="white" />,
    PostgreSQL: <SiPostgresql color="white" />,
    Javascript: <SiJavascript color="white" />,
    Sequelize: <SiSequelize color="white" />,
    'Open AI': <SiOpenai color="white" />,
    'Fast API': <SiFastapi color="white" />,
    Python: <SiPython color="white" />,
    React: <SiReact color="white" />,
    Plus: <HiOutlinePlusCircle color="white" />,
    AWS: <FaAws color="white" />,
    Node: <FaNodeJs color="white" />,
    NextJS: <TbBrandNextjs color="white" />,
    Tailwind: <TbBrandTailwind color="white" />,
    MDX: <BsFiletypeMdx color="white" />,
    TRPC: <SiTrpc color="white" />,
    Backblaze: <SiBackblaze color="white" />,
    MySQL: <SiMysql color="white" />,
    Paypal: <SlPaypal color="white" />,
    Twilio: <TbBrandTwilio color="white" />,
    DiscordJs: <RxDiscordLogo color="white" />,
  };
  return (
    <section className="flex w-full flex-col items-center gap-40">
      <div className="flex w-full flex-col items-center">
        <h2 className="w-full font-bold text-customWhite">Projects</h2>
        <ul className="flex max-w-6xl flex-col items-center gap-10">
          {featuredProjects.map((project, i) => (
            <li
              key={i}
              className={`flex w-fit flex-col gap-4 md:flex-row md:p-6 ${
                i % 2 !== 0 && 'md:flex-row-reverse'
              }`}
            >
              <div
                className={`z-0 w-fit bg-customWhite hover:bg-none ${
                  i % 2 !== 0 && 'md:ml-[-10%]'
                }`}
              >
                <div className="tileShadow mix-blend-darken grayscale filter hover:filter-none">
                  <Image
                    src={project.image}
                    alt={project.name}
                    height={500}
                    width={500}
                    className="object-scale-down"
                    loading="lazy"
                  />
                </div>
              </div>
              <div
                className={`z-10 flex w-full flex-col justify-center md:w-1/2 ${
                  i % 2 === 0 && 'md:ml-[-10%]'
                }`}
              >
                <div
                  className={`flex items-center gap-2 ${
                    i % 2 === 0 && 'justify-end'
                  }`}
                >
                  <a
                    href={project.source}
                    className="cursor-pointer"
                    target="_blank"
                  >
                    <h1 className=" font-bold text-customWhite hover:text-opacity-80">
                      {project.name}
                    </h1>
                  </a>
                  <a href={project.source} target="_blank">
                    <FiLink className="text-customGreen" />
                  </a>
                </div>

                <p
                  className={`flex text-customWhite opacity-60 ${
                    i % 2 === 0 && 'justify-end '
                  }`}
                >
                  {project.role}
                </p>
                <div className="bg-customGreen bg-opacity-80 p-2">
                  <p
                    className={`text-customWhite ${
                      i % 2 === 0 && 'text-right'
                    }`}
                  >
                    {project.description}
                  </p>
                </div>

                <div
                  className={`flex flex-wrap gap-2 md:flex-nowrap md:gap-4 ${
                    i % 2 === 0 && 'justify-end'
                  } `}
                >
                  {project.technologies.map((tech, k) => (
                    <div key={k} className={`flex items-center gap-2 pt-4`}>
                      <div>{iconmap[tech]}</div>
                      <sub className=" text-customWhite md:whitespace-nowrap">
                        {tech}
                      </sub>
                    </div>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex w-full flex-col items-center gap-2">
        <h5 className="w-full font-bold text-customWhite">Other Projects</h5>
        <div className="max-w-6xl">
          {otherProjects.map((project, i) => (
            <a
              key={i}
              href={project.source}
              target="_blank"
              className="flex w-full"
            >
              <div className="tileShadow m-2 flex w-full cursor-pointer flex-col justify-between bg-customOrange p-2">
                <div className="flex items-center gap-2">
                  <div>{iconmap.Plus}</div>
                  <h5 className="w-fit border-b-2 border-transparent  transition duration-300 hover:border-customBlack">
                    {project.name}
                  </h5>
                </div>
                <p>{project.description}</p>
                <div className="flex flex-wrap gap-4">
                  {project.technologies.map((tech, j) => (
                    <div key={j} className={`flex items-center gap-2 pt-4`}>
                      <div>{iconmap[tech]}</div>
                      <sub className="text-customWhite">{tech}</sub>
                    </div>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
