import { motion } from 'framer-motion';
import { Student } from '@/types/student';

interface ScoreCardProps {
  students: Student[];
}

export const ScoreCard = ({ students }: ScoreCardProps) => {
  const scores = students.map(s => s.score);
  const highest = Math.max(...scores, 0);
  const lowest = Math.min(...scores, 0);
  const average = scores.length > 0 
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) 
    : 0;
  const passRate = students.length > 0
    ? Math.round((students.filter(s => s.score >= 60).length / students.length) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-white rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.12)] p-8 space-y-6"
    >
      <h3 className="text-sm uppercase tracking-[2px] text-gray-500 font-light">
        Class Statistics
      </h3>

      <div className="space-y-4">
        <StatItem label="Highest Score" value={highest} />
        <StatItem label="Lowest Score" value={lowest} />
        <StatItem label="Average Score" value={average} />
        <StatItem label="Pass Rate" value={passRate} unit="%" />
      </div>
    </motion.div>
  );
};

interface StatItemProps {
  label: string;
  value: number;
  unit?: string;
}

const StatItem = ({ label, value, unit = '' }: StatItemProps) => (
  <div className="flex items-baseline justify-between border-b border-gray-100 pb-3 last:border-b-0">
    <span className="text-sm text-gray-600">{label}</span>
    <span className="font-mono-numeric text-3xl font-bold text-[#1A1A1A]">
      {value}{unit}
    </span>
  </div>
);
