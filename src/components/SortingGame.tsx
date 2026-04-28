import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { QuizResult, SortingItem, FORCE_TYPES } from '../types';
import { SORTING_ITEMS } from '../data';
import { ArrowLeft, Check, HelpCircle } from 'lucide-react';

interface SortingGameProps {
  onFinish: (result: QuizResult) => void;
  onBack: () => void;
}

export default function SortingGame({ onFinish, onBack }: SortingGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState<QuizResult['mistakes']>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);

  const items = SORTING_ITEMS;
  const currentItem = items[currentIndex];

  const handleSort = (category: string) => {
    if (showFeedback) return;

    const isCorrect = category === currentItem.correctCategory;
    setLastAnswerCorrect(isCorrect);
    setShowFeedback(true);

    if (isCorrect) {
      setScore(score + 1);
    } else {
      setMistakes([...mistakes, {
        question: `Sort: ${currentItem.text}`,
        studentAnswer: category,
        correctAnswer: currentItem.correctCategory,
        explanation: `${currentItem.text} is an example of ${currentItem.correctCategory}.`
      }]);
    }

    setTimeout(() => {
      setShowFeedback(false);
      if (currentIndex < items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onFinish({
          score: score + (isCorrect ? 1 : 0),
          total: items.length,
          mode: 'SORTING',
          mistakes: isCorrect ? mistakes : [...mistakes, {
            question: `Sort: ${currentItem.text}`,
            studentAnswer: category,
            correctAnswer: currentItem.correctCategory,
            explanation: `${currentItem.text} is an example of ${currentItem.correctCategory}.`
          }]
        });
      }
    }, 1500); // Show feedback for 1.5 seconds
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ArrowLeft size={24} />
        </Button>
        <div className="text-lg font-bold text-slate-500">
          Item {currentIndex + 1} of {items.length}
        </div>
        <div className="px-4 py-2 bg-purple-100 text-purple-700 rounded-xl font-bold">
          Score: {score}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center mb-12">
        <AnimatePresence mode="wait">
          {!showFeedback ? (
            <motion.div
              key={currentItem.id}
              initial={{ scale: 0.8, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              className="w-full max-w-md"
            >
              <Card className="text-center py-12 border-4 border-purple-200 bg-white cursor-help">
                <HelpCircle className="mx-auto mb-4 text-purple-300" size={48} />
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
                  {currentItem.text}
                </h2>
                <p className="text-slate-500 mt-4 font-medium uppercase tracking-widest text-sm">Which force is this?</p>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="feedback"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-md"
            >
              <Card className={`text-center py-12 border-4 ${lastAnswerCorrect ? 'border-green-400 bg-green-50' : 'border-amber-400 bg-amber-50'}`}>
                {lastAnswerCorrect ? (
                  <>
                    <Check className="mx-auto mb-4 text-green-500" size={64} />
                    <h2 className="text-4xl font-black text-green-700 mb-2">Correct!</h2>
                  </>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold text-amber-700 mb-2">Not quite!</h2>
                    <p className="text-xl text-amber-800 font-medium">It's <strong>{currentItem.correctCategory}</strong></p>
                  </>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-auto">
        {FORCE_TYPES.map((force) => (
          <Button
            key={force}
            variant="outline"
            className="h-20 text-sm md:text-base font-bold whitespace-normal border-2 hover:border-purple-400 hover:bg-purple-50 active:bg-purple-100"
            onClick={() => handleSort(force)}
            disabled={showFeedback}
          >
            {force}
          </Button>
        ))}
      </div>
    </div>
  );
}
