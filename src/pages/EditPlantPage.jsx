import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from '@/components/ui/use-toast';
import { getPlantById, updatePlant } from '@/services/plantService'; // Import new functions
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Leaf } from "lucide-react";

const EditPlantPage = ({ setTitle }) => {
  const { id } = useParams(); // Get the plant ID from the URL
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [plantingDate, setPlantingDate] = useState();
  const [transplantDate, setTransplantDate] = useState();
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (setTitle) {
      setTitle('Edit Plant');
    }
    
    // Fetch the plant's data when the page loads
    const fetchPlantData = async () => {
      if (!id) {
        toast({ title: "Error", description: "No plant ID provided.", variant: "destructive" });
        navigate('/');
        return;
      }
      
      try {
        const plant = await getPlantById(id);
        if (plant) {
          setName(plant.name);
          setType(plant.type);
          setImageUrl(plant.image || '');
          if (plant.plantingDate) {
            setPlantingDate(new Date(plant.plantingDate));
          }
          if (plant.transplantDate) {
            setTransplantDate(new Date(plant.transplantDate));
          }
        } else {
          toast({ title: "Error", description: "Plant not found.", variant: "destructive" });
          navigate('/');
        }
      } catch (err) {
        toast({ title: "Error", description: "Could not fetch plant data.", variant: "destructive" });
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchPlantData();
  }, [setTitle, id, navigate, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedPlantData = {
        name, type, plantingDate, transplantDate, image: imageUrl,
      };

      const updatedPlant = await updatePlant(id, updatedPlantData);

      if (updatedPlant) {
        toast({
          title: "Plant Updated!",
          description: `${name} has been updated.`,
        });
        navigate('/'); // Go back to the dashboard
      } else {
        throw new Error('Failed to update plant');
      }

    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Could not update the plant. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <p>Loading plant data...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto p-4 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Edit Plant</CardTitle>
          <CardDescription>Update the details for your plant.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Plant Name */}
              <div className="space-y-2">
                <Label htmlFor="plantName">Plant Name</Label>
                <Input id="plantName" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              {/* Plant Type */}
              <div className="space-y-2">
                <Label htmlFor="plantType">Plant Type</Label>
                <Select onValueChange={setType} value={type}>
                  <SelectTrigger id="plantType"><SelectValue placeholder="Select plant type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lettuce">Lettuce</SelectItem>
                    <SelectItem value="Tomato">Tomato</SelectItem>
                    <SelectItem value="Strawberry">Strawberry</SelectItem>
                    <SelectItem value="Herb">Herb</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Planting Date */}
              <div className="space-y-2">
                <Label htmlFor="plantingDate">Planting Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !plantingDate && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {plantingDate ? format(plantingDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={plantingDate} onSelect={setPlantingDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Est. Transplant Date */}
              <div className="space-y-2">
                <Label htmlFor="transplantDate">Est. Transplant Date (Optional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !transplantDate && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {transplantDate ? format(transplantDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={transplantDate} onSelect={setTransplantDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Plant Photo */}
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Plant Photo (URL)</Label>
              <Input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://... (paste an image link)" />
            </div>

            {/* Photo Preview */}
            <div className="space-y-2">
              <Label>Photo Preview</Label>
              <div className="w-full h-48 flex items-center justify-center rounded-md border border-dashed bg-muted">
                {imageUrl ? (
                  <img src={imageUrl} alt="Plant preview" className="h-full w-full object-cover rounded-md"/>
                ) : (
                  <Leaf className="h-16 w-16 text-muted-foreground" />
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Saving Changes...' : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EditPlantPage;