import { motion } from 'framer-motion';
import { Student } from '@/types/student';
import { StatusBadge } from './StatusBadge';
import { ScoreControls } from './ScoreControls';

interface StudentRowProps {
  student: Student;
  index: number;
  onUpdateScore: (id: string, newScore: number) => void;
}

export const StudentRow = ({ student, index, onUpdateScore }: StudentRowProps) => {
  const handleIncrement = () => {
    if (student.score < 100) {
      onUpdateScore(student.id, student.score + 1);
    }
  };

  const handleDecrement = () => {
    if (student.score > 0) {
      onUpdateScore(student.id, student.score - 1);
    }
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3, 
        delay: index * 0.05,
        ease: 'easeOut' 
      }}
      className="border-b border-[#E5E5E5] last:border-b-0 transition-all duration-200 ease-out hover:bg-gray-50 hover:shadow-sm hover:-translate-y-0.5"
    >
      <td className="py-4 px-6 text-lg font-medium text-[#1A1A1A]">
        {student.name}
      </td>
      <td className="py-4 px-6 font-mono-numeric text-sm text-gray-600">
        {student.studentId}
      </td>
      <td className="py-4 px-6">
        <span className="font-mono-numeric text-2xl font-semibold text-[#1A1A1A]">
          {student.score}
        </span>
      </td>
      <td className="py-4 px-6">
        <StatusBadge score={student.score} />
      </td>
      <td className="py-4 px-6">
        <ScoreControls
          score={student.score}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
      </td>
    </motion.tr>
  );
};
