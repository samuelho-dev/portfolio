import { motion } from 'framer-motion';

export default function NameSvg() {
  return (
    <motion.h1
      className="display-xl text-cream tracking-tight"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <span>SAMUEL</span>
      <span className="ml-[0.25em]">HO</span>
    </motion.h1>
  );
}
