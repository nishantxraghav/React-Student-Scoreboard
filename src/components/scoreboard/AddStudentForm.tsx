import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Student } from '@/types/student';

interface AddStudentFormProps {
  onAdd: (student: Omit<Student, 'id'>) => void;
  onCancel: () => void;
}

export const AddStudentForm = ({ onAdd, onCancel }: AddStudentFormProps) => {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [score, setScore] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    }
    if (!score.trim()) {
      newErrors.score = 'Score is required';
    } else {
      const scoreNum = parseInt(score);
      if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
        newErrors.score = 'Score must be between 0 and 100';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onAdd({
        name: name.trim(),
        studentId: studentId.trim(),
        score: parseInt(score),
      });
      setName('');
      setStudentId('');
      setScore('');
      setErrors({});
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-50 border border-[#E5E5E5] rounded-lg p-6 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#1A1A1A]">Add New Student</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Input
              placeholder="Student Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-xs text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className={errors.studentId ? 'border-red-500' : ''}
            />
            {errors.studentId && (
              <p className="text-xs text-red-600 mt-1">{errors.studentId}</p>
            )}
          </div>

          <div>
            <Input
              type="number"
              placeholder="Score (0-100)"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              min="0"
              max="100"
              className={errors.score ? 'border-red-500' : ''}
            />
            {errors.score && (
              <p className="text-xs text-red-600 mt-1">{errors.score}</p>
            )}
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-[#0066FF] hover:bg-[#0052CC] text-white"
          >
            Add Student
          </Button>
        </div>
      </form>
    </motion.div>
  );
};
