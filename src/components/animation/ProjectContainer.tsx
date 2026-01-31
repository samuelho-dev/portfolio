import React from 'react';
import { motion } from 'framer-motion';

interface ProjectContainerProps {
  children: React.ReactNode;
  style?: string;
  bool?: boolean;
}

export default function ProjectContainer({
  children,
  style = '',
  bool = false,
}: ProjectContainerProps) {
  return (
    <motion.div
      className={style}
      initial={{ opacity: 0, x: bool ? 30 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
