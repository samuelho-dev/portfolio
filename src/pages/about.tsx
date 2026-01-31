import Image from 'next/image';
import Link from 'next/link';
import {
  SiTypescript,
  SiPostgresql,
  SiNextdotjs,
  SiReact,
  SiPython,
} from 'react-icons/si';
import { FaAws, FaNodeJs } from 'react-icons/fa';
import { TbBrandMongodb } from 'react-icons/tb';

const skills = [
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Node.js', icon: FaNodeJs },
  { name: 'Python', icon: SiPython },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'MongoDB', icon: TbBrandMongodb },
  { name: 'AWS', icon: FaAws },
];

function About() {
  return (
    <div>
      {/* Grid layout: stacked on mobile, side-by-side on tablet+ */}
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[280px_1fr] md:gap-12 lg:grid-cols-[320px_1fr] lg:gap-16">
        {/* Image column */}
        <div className="mx-auto w-[280px] md:mx-0 md:w-full">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="https://res.cloudinary.com/ddhal4lbv/image/upload/v1679961213/Portfolio/525F8B4C-5303-4E2E-B816-A605BB0455A7_1_105_c_ordpsi.jpg"
              fill
              sizes="(max-width: 768px) 280px, 320px"
              alt="Samuel Ho"
              className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
              loading="lazy"
            />
          </div>
        </div>

        {/* Content column */}
        <div className="flex flex-col">
          <p className="mb-6 text-text-primary">
            Hey! My name is Samuel and I am a software engineer passionate about
            creating impactful products and solving business problems.
          </p>

          <p className="mb-6 text-text-muted">
            I graduated from UC Santa Barbara in 2018 with a B.A. in Economics.
            My previous roles were in corporate lending and FP&A. Having worked in
            cross-functional and quantitative roles, and having a passion for the
            arts, I find that I draw from many disciplines.
          </p>

          <p className="mb-8 text-text-muted">
            On my free time, I dabble in music production and animation.
          </p>

          {/* Links */}
          <div className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-2">
            <a
              href="https://github.com/samuelho-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-cream"
            >
              GitHub
            </a>
            <span className="text-border">|</span>
            <Link
              href="/Resume_SamuelHo.docx"
              download
              className="link-underline text-cream"
            >
              Resume
            </Link>
            <span className="text-border">|</span>
            <a href="mailto:samuelho343@gmail.com" className="link-underline text-cream">
              samuelho343@gmail.com
            </a>
          </div>

          {/* Skills */}
          <div>
            <h5 className="mb-4 text-text-muted">TECHNOLOGIES</h5>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center gap-2 border border-border px-3 py-2 transition-colors duration-200 hover:border-cream"
                >
                  <skill.icon className="h-4 w-4 text-text-muted" />
                  <span className="text-sm text-cream">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
