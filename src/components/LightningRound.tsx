import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { MCQQuestion, QuizResult } from '../types';
import { LIGHTNING_QUESTIONS } from '../data';
import { ArrowLeft, Clock, Zap } from 'lucide-react';

interface LightningRoundProps {
  onFinish: (result: QuizResult) => void;
  onBack: () => void;
}

export default function LightningRound({ onFinish, onBack }: LightningRoundProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10); // 10 seconds per question
  const [isActive, setIsActive] = useState(true);
  const [mistakes, setMistakes] = useState<QuizResult['mistakes']>([]);

  const questions = LIGHTNING_QUESTIONS.slice(0, 5); // Just 5 questions for lightning round to keep it fast
  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    let interval: number;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      // Time up
      handleOptionClick(null); // passing null as answer for timeout
    }
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, timeLeft]);

  const handleOptionClick = (option: string | null) => {
    setIsActive(false);

    const isCorrect = option === currentQuestion.correctAnswer;
    
    // Extra points based on time left if correct
    if (isCorrect) {
      setScore(score + 10 + timeLeft); // Base 10 points + 1 point per remaining second
    } else {
      setMistakes([...mistakes, {
        question: currentQuestion.question,
        studentAnswer: option || "Timeout",
        correctAnswer: currentQuestion.correctAnswer,
        explanation: currentQuestion.explanation
      }]);
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setTimeLeft(10);
        setIsActive(true);
      } else {
        onFinish({
          score: score + (isCorrect ? 10 + timeLeft : 0),
          total: questions.length * 20, // Max points roughly 20 per q (10 base + 10 time)
          mode: 'LIGHTNING',
          mistakes: isCorrect ? mistakes : [...mistakes, {
            question: currentQuestion.question,
            studentAnswer: option || "Timeout",
            correctAnswer: currentQuestion.correctAnswer,
            explanation: currentQuestion.explanation
          }]
        });
      }
    }, 1000);
  };

  if (!currentQuestion) return null;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col h-full relative">
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ArrowLeft size={24} />
        </Button>
        <div className="flex items-center text-amber-500 font-black text-3xl">
          <Zap size={32} className="mr-2" />
          {score} PTS
        </div>
      </div>

      <div className="absolute top-0 right-0 p-4 -mt-16 sm:-mt-8 opacity-20 pointer-events-none">
        <Zap size={200} className="text-amber-500" />
      </div>

      <div className="flex justify-center mb-6">
        <div className={`flex items-center text-4xl font-black ${timeLeft <= 3 ? 'text-red-500 animate-pulse' : 'text-slate-700'}`}>
          <Clock className="mr-3" size={40} />
          {timeLeft}
        </div>
      </div>

      <div className="mb-4 bg-slate-200 rounded-full h-4 overflow-hidden shadow-inner">
        <motion.div 
          className="h-full bg-gradient-to-r from-amber-400 to-orange-500" 
          initial={{ width: '100%' }}
          animate={{ width: `${(timeLeft / 10) * 100}%` }}
          transition={{ ease: "linear", duration: 1 }}
        />
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="space-y-6"
          >
            <Card className="text-center py-12 border-4 border-amber-200 shadow-amber-100">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-snug">
                {currentQuestion.question}
              </h2>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.options.map((option) => (
                <Button
                  key={option}
                  variant="outline"
                  className="p-8 text-xl md:text-2xl h-auto border-4 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-700 active:scale-95"
                  onClick={() => handleOptionClick(option)}
                  disabled={!isActive}
                >
                  {option}
                </Button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
