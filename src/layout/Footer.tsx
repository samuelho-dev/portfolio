import React from 'react';
import { BsGithub } from 'react-icons/bs';
import { FiLinkedin } from 'react-icons/fi';
function Footer() {
  return (
    <footer className="z-50 flex justify-between p-2">
      <div className="bg-custom-yellow px-1">Thanks for coming!</div>
      <div className="flex gap-2">
        <a
          href="https://github.com/samuelho-dev"
          aria-label="github"
          className=" cursor-pointer items-center gap-2"
          target="_blank"
        >
          <BsGithub className="h-6 w-6 rounded-full text-custom-yellow" />
        </a>
        <a
          href="https://www.linkedin.com/in/samuelho7/"
          aria-label="linkedin"
          className=" cursor-pointer items-center gap-2"
          target="_blank"
        >
          <FiLinkedin className="h-6 w-8 rounded-full text-custom-yellow" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
