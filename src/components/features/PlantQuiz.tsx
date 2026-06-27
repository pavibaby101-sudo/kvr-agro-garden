"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const questions = [
  { id: 1, question: "How much sunlight does your space get?", options: ["Low Light", "Medium Indirect", "Bright Indirect", "Full Sun"] },
  { id: 2, question: "How often can you water your plants?", options: ["Rarely (every 2-3 weeks)", "Weekly", "Twice a week", "Daily"] },
  { id: 3, question: "What is your experience level?", options: ["Beginner", "Some Experience", "Intermediate", "Expert"] },
  { id: 4, question: "Where will the plant be placed?", options: ["Bedroom", "Living Room", "Office", "Garden"] },
  { id: 5, question: "What size plant are you looking for?", options: ["Small (desktop)", "Medium (floor)", "Large (statement)", "Very Large"] },
];

const recommendations = [
  { name: "Snake Plant", match: "95%", description: "Perfect for beginners! Thrives in low light and needs very little water." },
  { name: "Peace Lily", match: "88%", description: "Elegant and forgiving. Does well in medium light with weekly watering." },
  { name: "Monstera", match: "82%", description: "A statement plant that loves bright indirect light and moderate care." },
];

export default function PlantQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-gradient-to-br from-forest-50 to-forest-100 dark:from-forest-900/50 dark:to-forest-800/50 border border-forest-200 dark:border-forest-700">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-forest-700 flex items-center justify-center">
          <Leaf className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">Plant Recommendation Quiz</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Find your perfect plant match</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Question {step + 1} of {questions.length}</span>
                <span>{Math.round(((step + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="h-2 rounded-full bg-white dark:bg-dark overflow-hidden">
                <motion.div className="h-full bg-forest-600 rounded-full" initial={{ width: 0 }} animate={{ width: `${((step + 1) / questions.length) * 100}%` }} transition={{ duration: 0.5 }} />
              </div>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{questions[step].question}</h4>
            <div className="space-y-3">
              {questions[step].options.map((option) => (
                <motion.button key={option} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(option)}
                  className="w-full p-4 rounded-2xl bg-white dark:bg-dark-100 border border-gray-200 dark:border-gray-700 text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-forest-500 hover:text-forest-700 dark:hover:text-forest-400 transition-all shadow-sm">
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="text-center mb-6">
              <Leaf className="w-12 h-12 text-forest-600 mx-auto mb-3" />
              <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white">Your Perfect Plant Match!</h4>
              <p className="text-sm text-gray-500">Based on your answers, we recommend:</p>
            </div>
            <div className="space-y-4 mb-6">
              {recommendations.map((rec, i) => (
                <motion.div key={rec.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-2xl bg-white dark:bg-dark-100 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold text-gray-900 dark:text-white">{rec.name}</h5>
                    <span className="text-sm font-bold text-forest-700 dark:text-forest-400">{rec.match}</span>
                  </div>
                  <p className="text-sm text-gray-500">{rec.description}</p>
                </motion.div>
              ))}
            </div>
            <Button onClick={reset} variant="outline" className="w-full">
              <RotateCcw className="mr-2 h-4 w-4" /> Retake Quiz
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
