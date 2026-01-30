import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIsLarge } from 'util/mediaQuery';

interface NavProgressBarProps {
  itemRef: React.RefObject<HTMLDivElement | null>;
}
function NavProgressBar({ itemRef }: NavProgressBarProps) {
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const isLarge = useIsLarge();
  useEffect(() => {
    const handleScroll = () => {
      if (itemRef.current) {
        const rect = itemRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const scrolledPast = rect.top <= -rect.height;
        const endInView = rect.bottom <= windowHeight;
        const progress =
          (windowHeight - rect.top) / (windowHeight + rect.height);

        setScrollProgress(
          scrolledPast || endInView ? 1 : Math.max(0, progress),
        );
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [itemRef]);

  return (
    <motion.div
      animate={
        isLarge
          ? { height: `${Math.round(scrollProgress * 100)}%` }
          : { width: `${Math.round(scrollProgress * 100)}%` }
      }
      className={`absolute top-1/2 z-50 -ml-2 flex max-h-2 w-2 rounded-r-lg bg-custom-black lg:top-0 lg:right-5 lg:max-h-full lg:rounded-b-lg lg:rounded-tr-none xl:h-full`}
    >
      <motion.div
        className={`relative -ml-2 h-2 w-2 rounded-lg bg-white lg:ml-0 lg:-mt-2`}
        animate={
          isLarge
            ? { top: `${Math.round(scrollProgress * 100)}%` }
            : { left: `${Math.round(scrollProgress * 100)}%` }
        }
        role="progressbar"
      />
    </motion.div>
  );
}

export default NavProgressBar;
