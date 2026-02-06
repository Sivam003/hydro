import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { getPlants, deletePlant } from '@/services/plantService'; // Import deletePlant
import PlantCard from '@/components/PlantCard';
import QuickActions from '@/components/QuickActions';
import SystemStatus from '@/components/SystemStatus';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast"; // Import useToast

const Dashboard = ({ setTitle }) => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast(); // Initialize toast

  useEffect(() => {
    if (setTitle) {
      setTitle('Dashboard');
    }
    fetchPlants();
  }, [setTitle]);

  // This function fetches the plants
  const fetchPlants = async () => {
    try {
      setLoading(true);
      const userPlants = await getPlants();
      setPlants(userPlants || []);
    } catch (error) {
      console.error("Failed to fetch plants:", error);
      setPlants([]);
    } finally {
      setLoading(false);
    }
  };

  // --- THIS IS THE NEW DELETE FUNCTION ---
  const handleDeletePlant = async (id) => {
    try {
      await deletePlant(id);
      
      // Update the state to remove the plant instantly
      setPlants((currentPlants) => currentPlants.filter(plant => plant._id !== id));
      
      toast({
        title: "Plant Deleted",
        description: "The plant has been successfully removed.",
      });
    } catch (err) {
      console.error("Error deleting plant:", err);
      toast({
        title: "Error",
        description: "Could not delete the plant. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      className="container mx-auto p-4 md:p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SystemStatus />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <QuickActions />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>My Plants</CardTitle>
          <Button onClick={() => navigate('/add-plant')}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Plant
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading your plants...</p>
          ) : plants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {plants.map((plant) => (
                // Pass the delete function as a prop
                <PlantCard 
                  key={plant._id} 
                  plant={plant} 
                  onDelete={handleDeletePlant} // <-- ADD THIS PROP
                />
              ))}
            </div>
          ) : (
            <p>You haven't added any plants yet. Click "Add Plant" to get started.</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Dashboard;