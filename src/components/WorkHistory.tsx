import { useState } from 'react';
import data from '../../util/resume.json';
import { RiFileDownloadLine } from 'react-icons/ri';
import Link from 'next/link';
import type { Experience } from '../../types/types';
import { motion, AnimatePresence } from 'framer-motion';

function WorkHistory() {
  const experience = data.workExperience;
  const [detail, setDetail] = useState<Experience>(data.workExperience[0]);

  const handleDetails = (entry: Experience) => {
    setDetail(entry);
  };

  // Calculate max responsibilities to set minimum height
  const maxResponsibilities = Math.max(
    ...experience.map((e) => e.responsibilities.length)
  );

  return (
    <section className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-cream">Experience</h3>
        <Link
          href="/Resume_SamuelHo.docx"
          aria-label="Download Resume"
          download
          className="flex items-center gap-2 text-text-muted transition-colors hover:text-cream"
        >
          <RiFileDownloadLine className="h-5 w-5" />
          <span className="caption">Resume</span>
        </Link>
      </div>

      {/* Grid layout: stacked on mobile, side-by-side on tablet+ */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr] md:gap-10 lg:grid-cols-[280px_1fr] lg:gap-12">
        {/* Company List - sidebar on tablet+ */}
        <div className="flex flex-col gap-2">
          {experience.map((entry, i) => (
            <button
              key={i}
              onClick={() => handleDetails(entry)}
              className={`group flex items-center gap-4 border-l-2 px-4 py-3 text-left transition-colors duration-200 ${
                detail.employer === entry.employer
                  ? 'border-accent-primary bg-base-light'
                  : 'border-border hover:border-text-muted hover:bg-base-light'
              }`}
            >
              <span
                className={`text-sm transition-colors duration-200 ${
                  detail.employer === entry.employer
                    ? 'text-accent-primary'
                    : 'text-text-muted group-hover:text-cream'
                }`}
              >
                0{i + 1}
              </span>
              <span
                className={`transition-colors duration-200 ${
                  detail.employer === entry.employer
                    ? 'text-cream'
                    : 'text-text-muted group-hover:text-cream'
                }`}
              >
                {entry.employer}
              </span>
            </button>
          ))}
        </div>

        {/* Details panel - fixed min height to prevent layout shift */}
        <div
          className="relative"
          style={{ minHeight: `${Math.max(maxResponsibilities * 2.5 + 6, 20)}rem` }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={detail.employer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-4"
            >
              {/* Job header */}
              <div className="flex flex-col gap-2 border-b border-border pb-4">
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="text-cream">{detail.title}</h3>
                  <span className="text-text-muted">@</span>
                  <a
                    href={detail.employer_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-accent-primary"
                  >
                    {detail.employer}
                  </a>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="caption text-text-muted">{detail.location}</span>
                  <span className="caption text-text-muted">{detail.dates}</span>
                </div>
              </div>

              {/* Responsibilities list */}
              <ul className="flex flex-col gap-3">
                {detail.responsibilities.map((el, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 bg-accent-primary" />
                    <span className="text-text-muted">{el}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default WorkHistory;
