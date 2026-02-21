import { motion } from 'framer-motion';

interface StatusBadgeProps {
  score: number;
  threshold?: number;
}

export const StatusBadge = ({ score, threshold = 60 }: StatusBadgeProps) => {
  const isPassing = score >= threshold;

  return (
    <motion.div
      key={isPassing ? 'pass' : 'fail'}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide ${
        isPassing
          ? 'bg-green-600 text-white'
          : 'bg-red-600 text-white'
      }`}
    >
      {isPassing ? 'PASS' : 'FAIL'}
    </motion.div>
  );
};
