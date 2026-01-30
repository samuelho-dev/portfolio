import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ListElementProps {
  style: string;
  children: any;
}

function ListElement({ style, children }: ListElementProps) {
  const listRef = useRef(null);
  const isInView = useInView(listRef);
  const headerVariants = {
    offscreen: {
      x: 5,
      opacity: 0.8,
    },
    onscreen: {
      x: 0,
      opacity: 1,
      transition: {
        ease: 'easeInOut' as const,
        duration: 0.5,
      },
    },
  };

  return (
    <motion.li
      ref={listRef}
      variants={headerVariants}
      initial="offscreen"
      className={style}
      animate={isInView ? 'onscreen' : 'offscreen'}
    >
      {children}
    </motion.li>
  );
}

export default ListElement;
