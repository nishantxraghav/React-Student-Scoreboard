import { ArrowUpDown } from 'lucide-react';
import { Student, SortColumn, SortDirection } from '@/types/student';
import { StudentRow } from './StudentRow';

interface StudentTableProps {
  students: Student[];
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  onSort: (column: SortColumn) => void;
  onUpdateScore: (id: string, newScore: number) => void;
}

export const StudentTable = ({
  students,
  sortColumn,
  sortDirection,
  onSort,
  onUpdateScore,
}: StudentTableProps) => {
  const ColumnHeader = ({ 
    column, 
    label 
  }: { 
    column: SortColumn; 
    label: string 
  }) => (
    <th 
      className="py-4 px-6 text-left text-xs uppercase tracking-[2px] font-light text-gray-500 cursor-pointer hover:text-gray-700 transition-colors select-none"
      onClick={() => onSort(column)}
    >
      <div className="flex items-center gap-2">
        {label}
        <ArrowUpDown 
          className={`h-3 w-3 transition-opacity ${
            sortColumn === column ? 'opacity-100' : 'opacity-30'
          }`} 
        />
      </div>
    </th>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-[#E5E5E5]">
            <tr>
              <ColumnHeader column="name" label="Student Name" />
              <th className="py-4 px-6 text-left text-xs uppercase tracking-[2px] font-light text-gray-500">
                Student ID
              </th>
              <ColumnHeader column="score" label="Score" />
              <ColumnHeader column="status" label="Status" />
              <th className="py-4 px-6 text-left text-xs uppercase tracking-[2px] font-light text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <StudentRow
                key={student.id}
                student={student}
                index={index}
                onUpdateScore={onUpdateScore}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
