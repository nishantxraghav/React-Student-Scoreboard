export interface Student {
  id: string;
  name: string;
  studentId: string;
  score: number;
}

export type SortColumn = 'name' | 'score' | 'status';
export type SortDirection = 'asc' | 'desc';
