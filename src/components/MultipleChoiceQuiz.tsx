import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { MCQQuestion, QuizResult } from '../types';
import { MCQ_QUESTIONS } from '../data';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';

interface MultipleChoiceQuizProps {
  onFinish: (result: QuizResult) => void;
  onBack: () => void;
}

export default function MultipleChoiceQuiz({ onFinish, onBack }: MultipleChoiceQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [mistakes, setMistakes] = useState<QuizResult['mistakes']>([]);

  const questions = MCQ_QUESTIONS;
  const currentQuestion = questions[currentIndex];

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;
    
    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    } else {
      setMistakes([...mistakes, {
        question: currentQuestion.question,
        studentAnswer: option,
        correctAnswer: currentQuestion.correctAnswer,
        explanation: currentQuestion.explanation
      }]);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      onFinish({
        score: score + (selectedOption === currentQuestion.correctAnswer ? 1 : 0),
        total: questions.length,
        mode: 'MCQ',
        mistakes: selectedOption === currentQuestion.correctAnswer ? mistakes : [...mistakes, {
          question: currentQuestion.question,
          studentAnswer: selectedOption!,
          correctAnswer: currentQuestion.correctAnswer,
          explanation: currentQuestion.explanation
        }]
      });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ArrowLeft size={24} />
        </Button>
        <div className="text-lg font-bold text-slate-500">
          Question {currentIndex + 1} of {questions.length}
        </div>
        <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-bold">
          Score: {score}
        </div>
      </div>

      <div className="mb-4 bg-slate-200 rounded-full h-3 overflow-hidden">
        <motion.div 
          className="bg-blue-500 h-full" 
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + (isAnswered ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <Card className="text-center py-10">
            <h2 className="text-3xl font-bold text-slate-800 leading-relaxed">
              {currentQuestion.question}
            </h2>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOption === option;
              const isCorrect = option === currentQuestion.correctAnswer;
              
              let buttonVariant: 'outline' | 'success' | 'danger' = 'outline';
              if (isAnswered) {
                if (isCorrect) buttonVariant = 'success';
                else if (isSelected) buttonVariant = 'danger';
              }

              return (
                <Button
                  key={option}
                  variant={buttonVariant}
                  className={`p-6 text-xl h-auto justify-start border-4 ${isSelected && !isAnswered ? 'border-blue-400 bg-blue-50' : ''}`}
                  onClick={() => handleOptionClick(option)}
                  disabled={isAnswered}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{option}</span>
                    {isAnswered && isCorrect && <CheckCircle2 className="text-white ml-2" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="text-white ml-2" />}
                  </div>
                </Button>
              );
            })}
          </div>

          {isAnswered && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-2xl ${selectedOption === currentQuestion.correctAnswer ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}
            >
              <h3 className="text-xl font-bold mb-2 flex items-center">
                {selectedOption === currentQuestion.correctAnswer ? (
                  <>🎉 Great job! That's correct.</>
                ) : (
                  <>Not quite! The correct answer is {currentQuestion.correctAnswer}.</>
                )}
              </h3>
              <p className="text-lg opacity-90">{currentQuestion.explanation}</p>
            </motion.div>
          )}

          {isAnswered && (
            <div className="flex justify-end mt-8">
              <Button size="lg" onClick={handleNext}>
                {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
