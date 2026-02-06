import React from 'react';
import { Button } from '@/components/ui/button';
import { Droplets, Zap, ListChecks } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const QuickActions = () => {
  const { toast } = useToast();

  const handleActionClick = (action) => {
    toast({
      title: `${action} Initiated`,
      description: `The ${action.toLowerCase()} cycle has started. (This is a placeholder)`,
    });
  };

  return (
    <div className="flex items-center space-x-4">
      <Button 
        variant="outline" 
        className="flex-1" 
        onClick={() => handleActionClick('Irrigation')}
      >
        <Droplets className="mr-2 h-4 w-4" /> Start Irrigation
      </Button>
      <Button 
        variant="outline" 
        className="flex-1" 
        onClick={() => handleActionClick('Lighting')}
      >
        <Zap className="mr-2 h-4 w-4" /> Toggle Lights
      </Button>
      <Button 
        variant="outline" 
        className="flex-1" 
        onClick={() => handleActionClick('Nutrient Check')}
      >
        <ListChecks className="mr-2 h-4 w-4" /> Log Nutrients
      </Button>
    </div>
  );
};

export default QuickActions;