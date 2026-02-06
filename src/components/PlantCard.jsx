import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString();
};

// We now accept an `onDelete` function as a prop
const PlantCard = ({ plant, onDelete }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/plant/${plant._id}`);
  };

  const handleEditClick = (e) => {
    e.stopPropagation(); // Stop the card click from firing
    // We can make this go to a dedicated edit page later
    navigate(`/edit-plant/${plant._id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Stop the card click from firing
    // The <AlertDialog> will handle the rest
  };

  const confirmDelete = (e) => {
    e.stopPropagation();
    onDelete(plant._id); // Call the delete function passed from the dashboard
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card 
        className="flex flex-col h-full overflow-hidden"
      >
        {/* Make the main card content clickable */}
        <div onClick={handleCardClick} className="cursor-pointer">
          <CardHeader>
            <div className="w-full h-32 rounded-md mb-4 bg-muted flex items-center justify-center overflow-hidden">
              {plant.image ? (
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Leaf className="h-12 w-12 text-muted-foreground" />
              )}
            </div>
            <CardTitle className="text-lg">{plant.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">{plant.type || 'Type not specified'}</p>
          </CardContent>
        </div>
        
        {/* Footer with buttons */}
        <CardFooter className="flex justify-between items-center">
          <div>
            <p className="text-xs text-muted-foreground">Planted on:</p>
            <p className="text-sm font-medium">{formatDate(plant.plantingDate)}</p>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" onClick={handleEditClick}>
              <Edit className="h-4 w-4" />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleDeleteClick} className="text-red-500 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete "{plant.name}" and all its data. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={confirmDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PlantCard;