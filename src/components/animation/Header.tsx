import React from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  id: string;
  itemRef: React.RefObject<HTMLDivElement | null>;
  style?: string;
  children: React.ReactNode;
}

export default function Header({ id, itemRef, style = '', children }: HeaderProps) {
  return (
    <motion.section
      id={id}
      ref={itemRef}
      className={style}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
}
