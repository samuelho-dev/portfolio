import { BsGithub } from 'react-icons/bs';
import { FiLinkedin } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="border-t border-border lg:pl-16 xl:pl-20">
      <div className="flex items-center justify-between px-6 py-4">
        <span className="caption text-text-muted">Thanks for visiting</span>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/samuelho-dev"
            aria-label="github"
            className="text-text-muted transition-colors hover:text-cream"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsGithub className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/samuelho7/"
            aria-label="linkedin"
            className="text-text-muted transition-colors hover:text-cream"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiLinkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
