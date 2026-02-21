import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Student, SortColumn, SortDirection } from '@/types/student';
import { StudentTable } from './StudentTable';
import { ScoreCard } from './ScoreCard';
import { AddStudentForm } from './AddStudentForm';

// Initial student data
const initialStudents: Student[] = [
  { id: '1', name: 'Emma Johnson', studentId: 'ST2024001', score: 85 },
  { id: '2', name: 'Liam Smith', studentId: 'ST2024002', score: 72 },
  { id: '3', name: 'Olivia Brown', studentId: 'ST2024003', score: 91 },
  { id: '4', name: 'Noah Davis', studentId: 'ST2024004', score: 58 },
  { id: '5', name: 'Ava Wilson', studentId: 'ST2024005', score: 78 },
  { id: '6', name: 'Ethan Martinez', studentId: 'ST2024006', score: 94 },
  { id: '7', name: 'Sophia Garcia', studentId: 'ST2024007', score: 67 },
  { id: '8', name: 'Mason Rodriguez', studentId: 'ST2024008', score: 82 },
];

export const Scoreboard = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [sortColumn, setSortColumn] = useState<SortColumn>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedStudents = useMemo(() => {
    return [...students].sort((a, b) => {
      let comparison = 0;

      if (sortColumn === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortColumn === 'score') {
        comparison = a.score - b.score;
      } else if (sortColumn === 'status') {
        const aPass = a.score >= 60 ? 1 : 0;
        const bPass = b.score >= 60 ? 1 : 0;
        comparison = aPass - bPass;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [students, sortColumn, sortDirection]);

  const handleUpdateScore = (id: string, newScore: number) => {
    setStudents(students.map(s => 
      s.id === id ? { ...s, score: newScore } : s
    ));
  };

  const handleAddStudent = (studentData: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...studentData,
      id: Date.now().toString(),
    };
    setStudents([...students, newStudent]);
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] noise-texture">
      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <header className="mb-12 h-[33vh] flex flex-col justify-center">
          <div className="space-y-4">
            <h1 className="text-7xl font-bold text-[#1A1A1A] tracking-tight" style={{ fontWeight: 700 }}>
              React Student Scoreboard
            </h1>
            <div className="flex items-center gap-6 text-sm text-gray-600 font-mono-numeric">
              <span>Spring 2024</span>
              <span className="w-px h-4 bg-gray-300" />
              <span>{students.length} Students</span>
              <span className="w-px h-4 bg-gray-300" />
              <span>
                Avg: {students.length > 0 
                  ? Math.round(students.reduce((a, b) => a + b.score, 0) / students.length)
                  : 0}
              </span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Student Table */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Student Form */}
            {showAddForm && (
              <AddStudentForm
                onAdd={handleAddStudent}
                onCancel={() => setShowAddForm(false)}
              />
            )}

            {/* Add Student Button */}
            {!showAddForm && (
              <div className="flex justify-end">
                <Button
                  onClick={() => setShowAddForm(true)}
                  className="bg-[#0066FF] hover:bg-[#0052CC] text-white shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              </div>
            )}

            <div className="bg-white rounded-lg p-12 shadow-sm">
              <StudentTable
                students={sortedStudents}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={handleSort}
                onUpdateScore={handleUpdateScore}
              />
            </div>
          </div>

          {/* Score Card */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <ScoreCard students={students} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
