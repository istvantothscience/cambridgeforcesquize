import { motion } from 'motion/react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { QuizResult } from '../types';
import { RotateCcw, Home, Trophy, AlertCircle } from 'lucide-react';

interface ResultsScreenProps {
  result: QuizResult;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

export default function ResultsScreen({ result, onPlayAgain, onBackToMenu }: ResultsScreenProps) {
  const percentage = result.mode === 'LIGHTNING' 
    ? Math.min(100, Math.round((result.score / result.total) * 100)) // Score is points, total is max points approx
    : Math.round((result.score / result.total) * 100);

  let message = "";
  let color = "";

  if (percentage <= 40) {
    message = "Keep practising!";
    color = "text-amber-500";
  } else if (percentage <= 70) {
    message = "Good work!";
    color = "text-blue-500";
  } else if (percentage <= 90) {
    message = "Great job!";
    color = "text-emerald-500";
  } else {
    message = "Forces expert!";
    color = "text-purple-500";
  }

  // Adjust display for pairwise vs ordinary
  const isLightning = result.mode === 'LIGHTNING';
  const showDetailScore = result.mode !== 'PAIR';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-4xl mx-auto py-8"
    >
      <div className="text-center mb-12">
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="inline-block p-6 rounded-full bg-slate-50 mb-6 shadow-xl"
        >
          <Trophy size={80} className={color} />
        </motion.div>
        <h1 className={`text-5xl md:text-6xl font-black mb-4 ${color}`}>
          {message}
        </h1>
        
        {isLightning ? (
          <p className="text-3xl text-slate-600 font-bold">
            Total Score: <span className="text-amber-500">{result.score} pts</span>
          </p>
        ) : (
          <p className="text-3xl text-slate-600 font-bold">
            You got <span className={color}>{result.score}</span> out of {result.total}
            {showDetailScore && ` (${percentage}%)`}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
        <Button size="lg" onClick={onPlayAgain} className="w-full sm:w-auto text-xl py-6 px-10">
          <RotateCcw className="mr-2" /> Play Again
        </Button>
        <Button size="lg" variant="outline" onClick={onBackToMenu} className="w-full sm:w-auto text-xl py-6 px-10">
          <Home className="mr-2" /> Back to Menu
        </Button>
      </div>

      {result.mistakes && result.mistakes.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center mb-6 text-slate-700">
            <AlertCircle size={28} className="mr-3 text-red-500"/>
            <h2 className="text-3xl font-bold">Review Mistakes</h2>
          </div>
          
          <div className="space-y-4">
            {result.mistakes.map((mistake, idx) => (
              <Card key={idx} className="bg-red-50/50 border-l-8 border-l-red-400 p-6 md:p-6 text-left">
                <h3 className="text-xl font-bold text-slate-800 mb-4">{mistake.question}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white p-4 rounded-xl border border-red-100">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">You Answered</p>
                    <p className="text-lg text-red-600 font-medium">{mistake.studentAnswer}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-emerald-100">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Correct Answer</p>
                    <p className="text-lg text-emerald-600 font-medium">{mistake.correctAnswer}</p>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl text-blue-800">
                  <p><strong>Explanation:</strong> {mistake.explanation}</p>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
