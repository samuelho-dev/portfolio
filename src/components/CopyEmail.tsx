import { useState } from 'react';

export default function CopyEmail() {
  const email = 'samuelho343@gmail.com';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Failed to copy email');
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="group relative text-2xl text-cream transition-colors hover:text-accent-primary md:text-3xl"
    >
      {/* Container with fixed height to prevent layout shift */}
      <span className="relative block">
        <span
          className={`transition-opacity duration-200 ${copied ? 'opacity-0' : 'opacity-100'}`}
        >
          {email}
        </span>
        <span
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
            copied ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Copied!
        </span>
      </span>
      {/* Fixed height helper text */}
      <span className="caption mt-2 block h-5 text-text-muted transition-colors group-hover:text-cream">
        <span className={`transition-opacity duration-200 ${copied ? 'opacity-0' : 'opacity-100'}`}>
          Click to copy
        </span>
      </span>
    </button>
  );
}
