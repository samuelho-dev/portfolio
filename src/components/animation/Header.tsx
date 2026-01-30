import React from 'react';
import { motion, useInView } from 'framer-motion';

interface HeaderProps {
  id: string;
  itemRef: React.RefObject<HTMLDivElement | null>;
  style: string;
  children: any;
}

function Header({ id, itemRef, style, children }: HeaderProps) {
  const isInView = useInView(itemRef);
  const headerVariants = {
    offscreen: {
      y: 20,
      opacity: 0,
    },
    onscreen: {
      y: -10,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        bounce: 0.2,
        duration: 1,
      },
    },
  };
  return (
    <motion.div
      id={id}
      ref={itemRef}
      variants={headerVariants}
      initial="offscreen"
      animate={isInView ? 'onscreen' : 'offscreen'}
      viewport={{ once: true, amount: 0.8 }}
      className={style}
    >
      {children}
    </motion.div>
  );
}

export default Header;
