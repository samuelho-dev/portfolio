import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ProjectContainerProps {
  style: string;
  bool: boolean;
  children: any;
}

function ProjectContainer({ style, bool, children }: ProjectContainerProps) {
  const listRef = useRef(null);
  const isInView = useInView(listRef);
  const headerVariants = {
    offscreen: {
      x: bool ? -5 : 5,
      opacity: 0.75,
    },
    onscreen: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        bounce: 0.1,
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      ref={listRef}
      variants={headerVariants}
      initial="offscreen"
      className={style}
      animate={isInView ? 'onscreen' : 'offscreen'}
    >
      {children}
    </motion.div>
  );
}

export default ProjectContainer;
