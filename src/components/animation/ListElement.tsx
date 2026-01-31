import React from 'react';
import { motion } from 'framer-motion';

interface ListElementProps {
  children: React.ReactNode;
  style?: string;
}

export default function ListElement({ children, style = '' }: ListElementProps) {
  return (
    <motion.li
      className={style}
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.li>
  );
}
