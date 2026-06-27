"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, IndianRupee } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CostCalculator() {
  const [area, setArea] = useState(0);
  const [plantsPerSqft, setPlantsPerSqft] = useState(1);
  const [costPerPlant, setCostPerPlant] = useState(200);

  const totalPlants = area * plantsPerSqft;
  const totalCost = totalPlants * costPerPlant;

  return (
    <div className="max-w-md mx-auto p-8 rounded-3xl bg-white dark:bg-dark-100 border border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gold-100 dark:bg-gold-900/30 flex items-center justify-center">
          <Calculator className="w-6 h-6 text-gold-700 dark:text-gold-400" />
        </div>
        <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">Garden Cost Calculator</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Garden Area (sq.ft)</label>
          <Input type="number" value={area || ""} onChange={(e) => setArea(Number(e.target.value))} placeholder="Enter area" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Plants per sq.ft</label>
          <Input type="number" value={plantsPerSqft} onChange={(e) => setPlantsPerSqft(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cost per Plant (₹)</label>
          <Input type="number" value={costPerPlant} onChange={(e) => setCostPerPlant(Number(e.target.value))} />
        </div>
      </div>

      {area > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-forest-50 to-forest-100 dark:from-forest-900/50 dark:to-forest-800/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Total Plants Needed</span>
            <span className="text-lg font-bold text-forest-700 dark:text-forest-400">{totalPlants}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Estimated Cost</span>
            <span className="text-2xl font-bold text-forest-700 dark:text-forest-400 flex items-center gap-1">
              <IndianRupee className="w-5 h-5" />{totalCost.toLocaleString("en-IN")}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
