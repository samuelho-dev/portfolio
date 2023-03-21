import React, { useState, useRef } from 'react';
import data from '../../util/resume.json';
import { RiFileDownloadLine } from 'react-icons/ri';
import { TbArrowBadgeRight } from 'react-icons/tb';
import { gsap } from 'gsap';
import Link from 'next/link';

function WorkHistory() {
  const experience = data.workExperience;
  const [detail, setDetail] = useState<object>(data.workExperience[0]);
  const containerRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  const handleDetails = (e, entry) => {
    e.preventDefault();
    setDetail(entry);
  };

  const handleUnderlineHover = (e) => {
    gsap.to(e.target, { borderBottomWidth: '100%' });
  };

  const handleUnderlineLeave = (e) => {
    gsap.to(e.target, { borderBottomWidth: '0%' });
  };

  return (
    <section className="flex h-1/2 max-w-5xl items-center justify-center py-24">
      <div className="mx-8 flex rounded-xl bg-customWhite">
        <div
          ref={containerRef}
          className="flex w-1/2 flex-col gap-6 rounded-xl bg-customOrange p-6"
        >
          <div className="flex items-center justify-between">
            <h1>Previously..</h1>
            <Link
              href={'/Resume_SamuelHo.pdf'}
              download
              className="cursor-pointer"
            >
              <RiFileDownloadLine className="h-8 w-6" color="white" />
            </Link>
          </div>
          {experience.map((entry, i) => (
            <h2
              key={i}
              onClick={(e) => {
                handleDetails(e, entry);
              }}
              className="flex justify-between rounded-xl bg-customOrange p-6 outline-dotted hover:outline-double"
            >
              {entry.employer}
            </h2>
          ))}
        </div>
        <div ref={detailRef} className="w-1/2 p-6">
          <div className="flex items-start justify-between">
            <div className="flex flex-wrap gap-1">
              <h5>{detail.title}</h5>
              <div
                className="flex cursor-pointer gap-1 text-customBlue"
                onMouseEnter={handleUnderlineHover}
                onMouseLeave={handleUnderlineLeave}
              >
                <h5>@</h5>
                <h5 className="border-b-2 border-transparent transition duration-300 hover:border-customBlue">
                  {detail.employer}
                </h5>
              </div>
            </div>
            <div>
              <p>{detail.location}</p>
              <sub className="tracking-wide">{detail.dates}</sub>
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            {detail.responsibilities.map((el, i) => (
              <p key={i} className="flex items-start">
                <span className="h-4 w-4 py-2 text-slate-700">
                  <TbArrowBadgeRight />
                </span>
                <span className="text-slate-700">{el}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkHistory;
