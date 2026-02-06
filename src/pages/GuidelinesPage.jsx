import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Droplets, Zap, Sun, Thermometer, Leaf, Clock, Sprout, GitBranch } from 'lucide-react';
import { motion } from 'framer-motion';

const guidelines = {
  "Fruiting Plants": {
    Tomato: {
      germination: {
        medium: "Rockwool cubes (1-inch) or peat plugs provide excellent aeration and moisture retention.",
        time: "5-10 days",
        temp: "21-27°C (70-80°F)",
        steps: [
          { title: "Prepare Medium", description: "Presoak your Rockwool or peat plugs in pH-adjusted water (pH 5.5-6.0) for about an hour. This step is crucial as Rockwool's native pH is too high for seedlings." },
          { title: "Sow Seeds", description: "Place 2-3 seeds in the hole of each plug. Do not plant too deep; about 1/4 inch (0.5 cm) is sufficient. A deeper placement can exhaust the seed's energy reserves before it reaches the light." },
          { title: "Create a Humid Microclimate", description: "Place the plugs in a tray with a humidity dome. Keep the medium consistently moist but not waterlogged to prevent fungal growth ('damping off'). Aim for 80% humidity." },
          { title: "Introduce Nutrients", description: "Once the first set of 'true leaves' (the second set of leaves that appear) emerge, it's time to introduce a quarter-strength hydroponic nutrient solution. The initial leaves, or cotyledons, provide the seed's stored energy." }
        ]
      },
      conditions: [
        { icon: <Sun className="h-5 w-5 text-yellow-400" />, label: "Sunlight", value: "14-18 hours of direct light" },
        { icon: <Thermometer className="h-5 w-5 text-red-500" />, label: "Temperature", value: "20-25°C (68-77°F)" },
        { icon: <span className="font-bold inline-block w-5 text-center text-green-600">pH</span>, label: "pH Range", value: "5.8-6.3" },
        { icon: <Zap className="h-5 w-5 text-blue-500" />, label: "EC Range", value: "2.0-3.5 mS/cm" },
      ],
      irrigation: (
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>System Suitability:</strong> Drip systems, Deep Water Culture (DWC), and Ebb and Flow are all highly effective for tomatoes.</li>
          <li><strong>Watering Schedule:</strong> In a drip system, a 30-minute cycle every 2-3 hours during the light period is a good starting point. For Ebb and Flow, flood the grow bed for 15-20 minutes every 3-4 hours to ensure thorough saturation and subsequent aeration.</li>
          <li><strong>Key Considerations:</strong> The water demand of a tomato plant skyrockets during the fruiting stage due to high transpiration rates from leaves and fruit development. Monitor the growing medium and adjust irrigation frequency to prevent wilting, but ensure the root zone dries slightly between cycles to promote oxygen uptake and prevent root diseases.</li>
        </ul>
      ),
      fertilizer: (
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Vegetative Stage:</strong> During early growth, a balanced nutrient ratio with sufficient nitrogen is key. The potassium to nitrogen (K:N) ratio should be around 1.4:1 to foster strong vegetative structures.</li>
          <li><strong>Fruiting Stage:</strong> As flowering and fruiting begin, the plant's demand for potassium increases significantly. Adjust your nutrient formula to a higher K:N ratio of about 1.8:1. Potassium is vital for fruit quality, size, and shelf life.</li>
          <li><strong>Essential Micronutrients:</strong> Blossom End Rot, a common physiological disorder in tomatoes, is directly linked to a localized calcium deficiency in the fruit. Ensure your nutrient solution contains adequate calcium (typically 250-500 ppm) and that environmental factors like humidity are controlled to allow for proper calcium transpiration to the fruit.</li>
        </ul>
      )
    },
    Strawberry: {
        germination: {
          medium: "Use a sterile, fine-particle seed-starting mix or peat moss. Strawberry seeds are tiny and can struggle in coarse mediums.",
          time: "7-21 days",
          temp: "18-24°C (65-75°F)",
          steps: [
            { title: "Cold Stratification (Crucial Step)", description: "This process mimics winter conditions and is essential for breaking the seed's dormancy. Place seeds in a moist paper towel inside a sealed bag and refrigerate at around 4°C (40°F) for 3-4 weeks." },
            { title: "Sow on the Surface", description: "After stratification, sprinkle the seeds directly onto the surface of your moist growing medium. Do not cover them with soil, as strawberry seeds require light to germinate." },
            { title: "Maintain High Humidity", description: "Cover your seed tray with a clear plastic lid or plastic wrap to maintain high humidity. Use a spray bottle to keep the surface consistently moist." },
            { title: "Patience and Transplant", description: "Germination can be slow and erratic. Once seedlings have developed 3-4 true leaves and a sturdy root system, they are ready to be carefully moved into your hydroponic system." }
          ]
        },
        conditions: [
          { icon: <Sun className="h-5 w-5 text-yellow-400" />, label: "Sunlight", value: "14-16 hours of light" },
          { icon: <Thermometer className="h-5 w-5 text-red-500" />, label: "Temperature", value: "18-25°C (64-77°F)" },
          { icon: <span className="font-bold inline-block w-5 text-center text-green-600">pH</span>, label: "pH Range", value: "5.5-6.5" },
          { icon: <Zap className="h-5 w-5 text-blue-500" />, label: "EC Range", value: "1.4-2.2 mS/cm" },
        ],
        irrigation: (
            <ul className="list-disc pl-5 space-y-2">
                <li><strong>System Suitability:</strong> Nutrient Film Technique (NFT) and drip systems are highly recommended because they keep the plant's crown (the base of the plant) dry, which is critical for preventing crown rot.</li>
                <li><strong>Watering Schedule:</strong> In a drip system, provide short, frequent watering cycles (e.g., 5-10 minutes, 4-6 times per day). This keeps the root zone consistently moist without becoming waterlogged.</li>
                <li><strong>Key Considerations:</strong> Strawberry roots are fine and highly susceptible to fungal diseases in overly saturated conditions. Excellent drainage and root zone aeration are non-negotiable for a healthy crop.</li>
            </ul>
        ),
        fertilizer: (
            <ul className="list-disc pl-5 space-y-2">
                <li><strong>Vegetative Stage:</strong> In the initial phase, a balanced "grow" formula will support the development of a healthy plant structure and robust root system.</li>
                <li><strong>Fruiting Stage:</strong> The moment you see the first flowers, switch to a "bloom" formula. This formula should be significantly higher in potassium and phosphorus, which are the primary drivers for flower production and berry development, directly impacting yield and sweetness.</li>
                <li><strong>Solution Management:</strong> Strawberries are highly sensitive to pH fluctuations, which can lock out essential nutrients. It is best practice to monitor and adjust the pH of your nutrient solution daily to keep it within the tight optimal range.</li>
            </ul>
        )
      },
  },
  "Leafy Greens": {
    Lettuce: {
      germination: {
          medium: "Starter plugs like Rockwool or Oasis cubes are perfect, providing a stable, sterile environment.",
          time: "2-7 days",
          temp: "18-21°C (65-70°F)",
          steps: [
            { title: "Shallow Sowing for Light", description: "Lettuce seeds are photodormant, meaning they require light to germinate. Sow them on the surface of the medium or with just a very light dusting of vermiculite on top." },
            { title: "Consistent Moisture", description: "Use a spray bottle to keep the plugs consistently moist. Avoid over-saturating, which can lead to seed rot. A humidity dome helps maintain the ideal moisture level." },
            { title: "Avoid High Temperatures", description: "Temperatures above 23°C (75°F) can induce thermal dormancy in lettuce seeds, preventing them from sprouting. Keep the germination environment cool." },
            { title: "Ready for System", description: "Once seedlings have developed 2-3 true leaves and roots are visible emerging from the plug, they are robust enough for transplanting into your main hydroponic system." }
          ]
        },
      conditions: [
        { icon: <Sun className="h-5 w-5 text-yellow-400" />, label: "Sunlight", value: "14-16 hours (can be less intense)" },
        { icon: <Thermometer className="h-5 w-5 text-red-500" />, label: "Temperature", value: "15-20°C (59-68°F)" },
        { icon: <span className="font-bold inline-block w-5 text-center text-green-600">pH</span>, label: "pH Range", value: "6.0-7.0" },
        { icon: <Zap className="h-5 w-5 text-blue-500" />, label: "EC Range", value: "1.2-1.8 mS/cm" },
      ],
      irrigation: (
          <ul className="list-disc pl-5 space-y-2">
              <li><strong>System Suitability:</strong> Nutrient Film Technique (NFT) is the commercial standard for lettuce due to its efficiency. Raft systems (DWC) are also excellent for both commercial and hobby growers.</li>
              <li><strong>Watering Schedule:</strong> In NFT, a continuous, shallow stream of nutrient solution should flow over the roots 24/7. The flow rate should be gentle to avoid damaging delicate root hairs.</li>
              <li><strong>Key Considerations:</strong> The primary goal is to provide constant access to water and nutrients without depriving the roots of oxygen. If the roots dry out even for a short period, it can trigger bolting, where the plant flowers prematurely and the leaves become bitter.</li>
          </ul>
      ),
      fertilizer: (
          <ul className="list-disc pl-5 space-y-2">
              <li><strong>Nutrient Profile:</strong> Lettuce is grown for its leaves, so a high-nitrogen "grow" formula is essential to promote vigorous vegetative growth.</li>
              <li><strong>EC Management:</strong> Lettuce is highly susceptible to "tip burn," a condition where the edges of the leaves turn brown and necrotic. This is often caused by calcium deficiency linked to an overly high EC. It's crucial to maintain the EC in the lower end of the recommended range.</li>
              <li><strong>Solution Changes:</strong> To maintain nutrient stability and prevent the buildup of unwanted salts, it's best to completely replace the nutrient solution every 1 to 2 weeks.</li>
          </ul>
      )
    },
    Cabbage: {
        germination: {
            medium: "Rockwool or coco coir plugs offer good structure for the developing root system.",
            time: "4-7 days",
            temp: "18-24°C (65-75°F)",
            steps: [
              { title: "Planting Depth", description: "Sow seeds about 1/4 to 1/2 inch deep. Unlike lettuce, cabbage seeds do not require light for germination and benefit from being covered." },
              { title: "Maintain Cool Temperatures", description: "Cabbage is a cool-weather crop. Keeping the germination temperature from getting too high is key for a high success rate." },
              { title: "Extended Seedling Stage", description: "Cabbage seedlings develop slower than lettuce. They require a longer period, about 4-6 weeks, in the nursery to develop a strong enough root system and several sets of true leaves before they are ready for transplanting." },
              { title: "Hardening Off", description: "If you plan to move the cabbage into an outdoor hydroponic system, you must 'harden them off' by gradually exposing them to outdoor conditions (sun, wind) over a week to prevent transplant shock." }
            ]
          },
        conditions: [
            { icon: <Sun className="h-5 w-5 text-yellow-400" />, label: "Sunlight", value: "12-16 hours of light" },
            { icon: <Thermometer className="h-5 w-5 text-red-500" />, label: "Temperature", value: "15-24°C (59-75°F)" },
            { icon: <span className="font-bold inline-block w-5 text-center text-green-600">pH</span>, label: "pH Range", value: "6.2-6.6" },
            { icon: <Zap className="h-5 w-5 text-blue-500" />, label: "EC Range", value: "2.5-3.0 mS/cm" },
        ],
        irrigation: (
            <ul className="list-disc pl-5 space-y-2">
                <li><strong>System Suitability:</strong> Due to its large size and weight, Ebb and Flow or DWC systems with ample spacing are the best choices. NFT channels are generally too small.</li>
                <li><strong>Watering Schedule:</strong> In an Ebb and Flow system, a 20-minute flooding cycle every 2-3 hours during the day provides the necessary water while allowing for crucial root aeration.</li>
                <li><strong>Key Considerations:</strong> The large leaves of a cabbage plant lead to a high rate of transpiration, meaning it consumes a significant amount of water. Check your reservoir levels daily, especially as the head begins to form.</li>
            </ul>
        ),
        fertilizer: (
            <ul className="list-disc pl-5 space-y-2">
                <li><strong>Nutrient Profile:</strong> Cabbage is a very heavy feeder and requires a well-balanced, robust nutrient solution to support its large biomass.</li>
                <li><strong>EC Management:</strong> Maintain a consistently high EC level throughout the growth cycle. A drop in nutrient concentration can stunt head development. As the heads form, increasing calcium nitrate can support denser growth.</li>
                <li><strong>Essential Micronutrients:</strong> To prevent common disorders like internal tip burn and hollow stems, ensure your nutrient formula contains sufficient amounts of calcium and boron.</li>
            </ul>
        )
      },
  },
  "Herbs": {
    Basil: {
        germination: {
          medium: "Starter plugs or coco coir are excellent choices.",
          time: "3-10 days",
          temp: "21-27°C (70-80°F)",
          steps: [
            { title: "Provide Warmth", description: "Basil germinates best in warm conditions. Using a seedling heat mat can significantly speed up the process and improve germination rates." },
            { title: "Sow Shallowly", description: "Plant the seeds about 1/4 inch deep and cover lightly. Keep the medium consistently moist but not saturated." },
            { title: "Immediate Light Source", description: "As soon as seedlings sprout, provide them with a light source (14-16 hours/day) to prevent them from becoming 'leggy' and weak as they stretch for light." },
            { title: "Ensure Airflow", description: "Basil seedlings are susceptible to 'damping off'. Once they have emerged, remove the humidity dome and ensure there is gentle air circulation to keep the stems dry." }
          ]
        },
        conditions: [
          { icon: <Sun className="h-5 w-5 text-yellow-400" />, label: "Sunlight", value: "14-16 hours of light" },
          { icon: <Thermometer className="h-5 w-5 text-red-500" />, label: "Temperature", value: "20-30°C (68-86°F)" },
          { icon: <span className="font-bold inline-block w-5 text-center text-green-600">pH</span>, label: "pH Range", value: "5.5-6.5" },
          { icon: <Zap className="h-5 w-5 text-blue-500" />, label: "EC Range", value: "1.0-1.6 mS/cm" },
        ],
        irrigation: (
            <ul className="list-disc pl-5 space-y-2">
                <li><strong>System Suitability:</strong> Basil is highly adaptable and thrives in nearly any hydroponic setup, including simple Kratky containers, DWC, and Ebb and Flow systems.</li>
                <li><strong>Watering Schedule:</strong> In an Ebb and Flow system, a 15-minute flooding cycle every 3-4 hours is ample. In DWC, ensure vigorous aeration with an air stone, as basil roots need a lot of oxygen.</li>
                <li><strong>Key Considerations:</strong> Watch for signs of oxygen deprivation, such as slimy, brown roots. This indicates a need for better aeration or that the system is not draining properly.</li>
            </ul>
        ),
        fertilizer: (
            <ul className="list-disc pl-5 space-y-2">
                <li><strong>Nutrient Profile:</strong> A standard, balanced "grow" nutrient solution is perfect for basil's needs. It does not require complex, stage-specific formulas.</li>
                <li><strong>EC Management:</strong> It's best to keep the EC on the lower end of the recommended range. A nutrient solution that is too concentrated can negatively impact the flavor, sometimes making it bitter or mint-like.</li>
                <li><strong>Pruning and Nutrient Uptake:</strong> Regularly harvesting the top sets of leaves encourages the plant to grow bushier. This pruning stimulates the plant, increasing its uptake of water and nutrients, leading to faster overall growth.</li>
            </ul>
        )
      },
  },
};

const PlantGuideline = ({ plant }) => (
    <motion.div
      key={plant.name}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 mt-6"
    >
      {/* Germination Section */}
      <Card>
          <CardHeader>
              <CardTitle className="flex items-center text-xl"><Sprout className="mr-3 h-6 w-6 text-green-500" /> Germination Phase</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 space-y-3">
                  <p><strong>Recommended Medium:</strong> {plant.germination.medium}</p>
                  <p><strong>Time to Sprout:</strong> {plant.germination.time}</p>
                  <p><strong>Ideal Temperature:</strong> {plant.germination.temp}</p>
              </div>
              <div className="md:col-span-2">
                  <ol className="relative border-l border-primary/50">
                      {plant.germination.steps.map((step, index) => (
                          <li key={index} className="mb-6 ml-6">
                              <span className="absolute flex items-center justify-center w-6 h-6 bg-primary/20 rounded-full -left-3 ring-4 ring-background">
                                  <Leaf className="w-3 h-3 text-primary"/>
                              </span>
                              <h3 className="font-semibold">{step.title}</h3>
                              <p className="text-sm text-muted-foreground">{step.description}</p>
                          </li>
                      ))}
                  </ol>
              </div>
          </CardContent>
      </Card>

      {/* Main Growth Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ideal Conditions */}
          <Card className="lg:col-span-1">
              <CardHeader><CardTitle className="flex items-center text-xl"><GitBranch className="mr-3 h-6 w-6 text-blue-500" />Growing Conditions</CardTitle></CardHeader>
              <CardContent className="space-y-4">
              {plant.conditions.map(condition => (
                  <div key={condition.label} className="flex items-center text-base">
                      {condition.icon}
                      <strong className="w-24 ml-2">{condition.label}:</strong> 
                      <span>{condition.value}</span>
                  </div>
              ))}
              </CardContent>
          </Card>
          {/* Irrigation and Fertilizer */}
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader><CardTitle className="flex items-center text-xl"><Clock className="mr-3 h-6 w-6 text-red-500" />Irrigation Strategy</CardTitle></CardHeader>
                  <CardContent>{plant.irrigation}</CardContent>
              </Card>
              <Card>
                  <CardHeader><CardTitle className="flex items-center text-xl"><Zap className="mr-3 h-6 w-6 text-yellow-500" />Nutrient Management</CardTitle></CardHeader>
                  <CardContent>{plant.fertilizer}</CardContent>
              </Card>
          </div>
      </div>
    </motion.div>
  );
  
const GuidelinesPage = () => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6"
    >
      <Card className="bg-muted/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Hydroponic Growing Guidelines</CardTitle>
          <CardDescription className="text-lg">Your seed-to-harvest roadmap for healthy, thriving plants.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="Fruiting Plants" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              {Object.keys(guidelines).map(category => (
                <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(guidelines).map(([category, plants]) => (
              <TabsContent key={category} value={category}>
                <Tabs defaultValue={Object.keys(plants)[0]} className="w-full">
                  <TabsList>
                    {Object.keys(plants).map(plantName => (
                      <TabsTrigger key={plantName} value={plantName}>{plantName}</TabsTrigger>
                    ))}
                  </TabsList>
                  {Object.entries(plants).map(([plantName, plantData]) => (
                    <TabsContent key={plantName} value={plantName}>
                      <PlantGuideline plant={{name: plantName, ...plantData}} />
                    </TabsContent>
                  ))}
                </Tabs>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GuidelinesPage;