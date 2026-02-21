import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ScoreControlsProps {
  score: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const ScoreControls = ({ score, onIncrement, onDecrement }: ScoreControlsProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={onDecrement}
        disabled={score <= 0}
        size="sm"
        variant="outline"
        className="h-8 w-8 p-0 transition-all duration-200 ease-out hover:scale-95 active:scale-90 active:shadow-sm"
      >
        <Minus className="h-3 w-3" />
      </Button>
      <Button
        onClick={onIncrement}
        disabled={score >= 100}
        size="sm"
        variant="outline"
        className="h-8 w-8 p-0 transition-all duration-200 ease-out hover:scale-95 active:scale-90 active:shadow-sm"
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
};
