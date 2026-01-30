import React, { useState, useRef } from 'react';
import data from '../../util/resume.json';
import { RiFileDownloadLine } from 'react-icons/ri';
import Link from 'next/link';
import { Experience } from '../../types/types';
import ListElement from './animation/ListElement';
import { TbArrowBadgeRight } from 'react-icons/tb';

function WorkHistory() {
  const experience = data.workExperience;
  const [detail, setDetail] = useState<Experience>(data.workExperience[0]);
  const containerRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const handleDetails = (
    e: React.MouseEvent<HTMLHeadingElement, MouseEvent>,
    entry: Experience,
  ) => {
    e.preventDefault();
    setDetail(entry);
  };

  return (
    <section className="flex flex-col justify-center gap-4 py-16">
      <h2 className="font-bold text-custom-white">Work History</h2>
      <div className="tileShadow flex flex-col rounded-xl bg-custom-white outline outline-1 xl:flex-row">
        <div
          ref={containerRef}
          className="flex w-full flex-col gap-6 rounded-xl bg-custom-royal-blue p-4 py-10 xl:w-1/2"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold">Previously..</h2>
            <Link
              href={'/Resume_SamuelHo.docx'}
              aria-label="Resume"
              download
              className="cursor-pointer"
            >
              <RiFileDownloadLine
                className="h-8 w-6 hover:fill-zinc-800"
                color="white"
              />
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {experience.map((entry, i) => (
              <h2
                key={i}
                onClick={(e) => {
                  handleDetails(e, entry);
                }}
                className={`tileShadow flex cursor-pointer justify-between rounded-xl p-2 text-xl outline-dotted hover:outline-double xl:p-6 xl:text-2xl ${
                  detail.employer === entry.employer
                    ? 'bg-custom-black outline-double'
                    : 'bg-custom-royal-blue'
                }`}
              >
                {entry.employer}
              </h2>
            ))}
          </div>
        </div>
        <div
          ref={detailRef}
          className="flex h-full flex-col gap-4 p-4 xl:w-1/2"
        >
          <div className="flex flex-col items-start justify-between gap-4 rounded-lg bg-black bg-opacity-10 p-2 md:flex-row md:items-center">
            <div className="flex flex-wrap items-center gap-1 md:flex-nowrap">
              <h2 className="whitespace-nowrap font-semibold text-custom-black">
                {detail.title}
              </h2>
              <div className="flex cursor-pointer items-center gap-1">
                <h3 className="text-custom-royal-blue opacity-90">@</h3>
                <a href={detail.employer_url} target="_blank">
                  <h3 className="border-b-2 border-transparent font-semibold text-custom-royal-blue opacity-90 transition duration-300 hover:border-custom-royal-blue md:whitespace-nowrap">
                    {detail.employer}
                  </h3>
                </a>
              </div>
            </div>
            <div className="flex w-full items-end justify-between md:flex-col">
              <p className="font-bold text-custom-black">{detail.location}</p>
              <p className="whitespace-nowrap text-xs font-bold tracking-wide text-custom-black">
                {detail.dates}
              </p>
            </div>
          </div>
          <ul className="flex flex-col gap-4">
            {detail.responsibilities.map((el, i) => (
              <ListElement key={i} style="flex items-start justify-start gap-2">
                <span className="h-4 w-4 bg-custom-royal-blue text-custom-white">
                  <TbArrowBadgeRight />
                </span>
                <span className="font-mono text-custom-black">{el}</span>
              </ListElement>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default WorkHistory;
