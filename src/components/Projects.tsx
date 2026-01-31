import data from '../../util/resume.json';
import { FiArrowUpRight } from 'react-icons/fi';
import { BsGithub } from 'react-icons/bs';
import {
  SiTypescript,
  SiPostgresql,
  SiFirebase,
  SiFastapi,
  SiPython,
  SiReact,
  SiTrpc,
  SiFlask,
  SiPrisma,
  SiMysql,
  SiNextdotjs,
  SiOpenai,
  SiBackblaze,
  SiReactquery,
  SiJavascript,
  SiSequelize,
  SiObsidian,
  SiLinear,
} from 'react-icons/si';
import { FaAws, FaNodeJs, FaReact } from 'react-icons/fa';
import { TbBrandTailwind, TbBrandTwilio } from 'react-icons/tb';
import { BsFiletypeMdx } from 'react-icons/bs';
import { SlPaypal } from 'react-icons/sl';
import { RxDiscordLogo } from 'react-icons/rx';
import Image from 'next/image';
import type { IconType } from 'react-icons';

const iconMap: Record<string, IconType> = {
  'React Native': FaReact,
  'React Query': SiReactquery,
  Typescript: SiTypescript,
  Firebase: SiFirebase,
  Prisma: SiPrisma,
  PostgreSQL: SiPostgresql,
  Javascript: SiJavascript,
  Sequelize: SiSequelize,
  'Open AI': SiOpenai,
  'Fast API': SiFastapi,
  Flask: SiFlask,
  Python: SiPython,
  React: SiReact,
  AWS: FaAws,
  Node: FaNodeJs,
  NextJS: SiNextdotjs,
  Tailwind: TbBrandTailwind,
  MDX: BsFiletypeMdx,
  TRPC: SiTrpc,
  Backblaze: SiBackblaze,
  MySQL: SiMysql,
  Paypal: SlPaypal,
  Twilio: TbBrandTwilio,
  DiscordJs: RxDiscordLogo,
  Effect: SiTypescript,
  Kysely: SiTypescript,
  Nx: SiTypescript,
  MCP: SiTypescript,
  Obsidian: SiObsidian,
  Linear: SiLinear,
};

function Projects() {
  const featuredProjects = data.featuredProjects;
  const otherProjects = data.otherProjects;

  return (
    <section className="flex flex-col gap-16">
      {/* Featured Projects */}
      <div>
        <h3 className="mb-8 text-cream">Featured Projects</h3>
        {/* Grid: 1 col mobile, 2 col tablet+ */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {featuredProjects.map((project) => (
            <a
              key={project.name}
              href={project.source}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex flex-col overflow-hidden border border-border transition-colors duration-300 hover:border-cream ${
                project.image ? 'aspect-[4/3]' : ''
              }`}
            >
              {/* Background - either image or gradient for code projects */}
              <div className="absolute inset-0">
                {project.image ? (
                  <>
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover opacity-60 grayscale transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-base via-base/60 to-transparent" />
                  </>
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-base-light via-base to-base" />
                )}
              </div>

              {/* Content overlay */}
              <div className={`relative z-10 flex flex-col gap-3 p-5 md:gap-4 md:p-6 ${project.image ? 'mt-auto' : ''}`}>
                {/* GitHub icon for code projects without images */}
                {!project.image && (
                  <BsGithub className="mb-2 h-8 w-8 text-text-muted" />
                )}

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="caption text-accent-primary">{project.role}</span>
                    <h3 className="text-cream">{project.name}</h3>
                  </div>
                  <FiArrowUpRight className="h-5 w-5 flex-shrink-0 text-text-muted transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cream" />
                </div>

                <p className="line-clamp-2 text-sm text-text-muted">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => {
                    const Icon = iconMap[tech];
                    return (
                      <div
                        key={tech}
                        className="flex items-center gap-1 text-text-muted"
                      >
                        {Icon && <Icon className="h-3 w-3" />}
                        <span className="text-xs">{tech}</span>
                      </div>
                    );
                  })}
                  {project.technologies.length > 4 && (
                    <span className="text-xs text-text-muted">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Other Projects - only show if there are any */}
      {otherProjects.length > 0 && (
        <div>
          <h3 className="mb-8 text-cream">Other Projects</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project: { name: string; description: string; technologies: string[]; source?: string }) => (
              <a
                key={project.name}
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-4 border border-border p-5 transition-colors duration-300 hover:border-cream hover:bg-base-light md:p-6"
              >
                <div className="flex items-start justify-between">
                  <BsGithub className="h-5 w-5 text-text-muted" />
                  <FiArrowUpRight className="h-4 w-4 text-text-muted opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </div>

                <div className="flex-1">
                  <h3 className="mb-2 text-cream transition-colors duration-300 group-hover:text-accent-primary">
                    {project.name}
                  </h3>
                  <p className="line-clamp-2 text-sm text-text-muted">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string) => {
                    const Icon = iconMap[tech];
                    return (
                      <div
                        key={tech}
                        className="flex items-center gap-1 text-text-muted"
                      >
                        {Icon && <Icon className="h-3 w-3" />}
                        <span className="text-xs">{tech}</span>
                      </div>
                    );
                  })}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
