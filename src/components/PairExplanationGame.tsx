import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { QuizResult } from '../types';
import { PAIR_CARDS } from '../data';
import { ArrowLeft, Eye, EyeOff, Users, ThumbsUp, ThumbsDown } from 'lucide-react';

interface PairExplanationGameProps {
  onFinish: (result: QuizResult) => void;
  onBack: () => void;
}

export default function PairExplanationGame({ onFinish, onBack }: PairExplanationGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const cards = PAIR_CARDS;
  const currentCard = cards[currentIndex];

  const handleResult = (success: boolean) => {
    if (success) setScore(score + 1);
    
    setTimeout(() => {
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setShowHint(false);
        setShowAnswer(false);
      } else {
        // In Pair game, we don't track detailed mistakes the same way since it's self-reported
        onFinish({
          score: score + (success ? 1 : 0),
          total: cards.length,
          mode: 'PAIR',
          mistakes: []
        });
      }
    }, 500);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col h-full justify-center">
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ArrowLeft size={24} />
        </Button>
        <div className="flex items-center text-slate-500 font-bold space-x-2">
          <Users size={20} />
          <span>Explain to Partner</span>
        </div>
        <div className="text-lg font-bold text-slate-500">
          Card {currentIndex + 1} of {cards.length}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentCard.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <Card className="text-center py-16 px-8 relative overflow-hidden border-4 border-emerald-100 mb-8 min-h-[400px] flex flex-col justify-center">
            
            <p className="text-slate-500 font-medium uppercase tracking-widest text-sm mb-6">
              Explain this to your partner without using the word:
            </p>
            
            <h2 className="text-6xl font-black text-emerald-600 mb-8 pb-4">
              {currentCard.force}
            </h2>

            {showHint && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 mt-4"
              >
                <p className="text-lg text-emerald-800 font-medium">
                  <span className="font-bold mr-2 text-emerald-600">Hint:</span>
                  {currentCard.hint}
                </p>
              </motion.div>
            )}

            {!showHint && (
              <div className="mt-4">
                <Button 
                  variant="ghost" 
                  className="text-emerald-600 hover:bg-emerald-50"
                  onClick={() => setShowHint(true)}
                >
                  <Eye className="mr-2" size={20} />
                  Show Hint
                </Button>
              </div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="space-y-4">
        {!showAnswer ? (
          <Button 
            size="lg" 
            className="w-full py-6 text-2xl" 
            onClick={() => setShowAnswer(true)}
          >
            Ready to check answer?
          </Button>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col space-y-4"
          >
            <p className="text-center text-xl font-bold text-slate-600">Did your partner guess: <span className="text-emerald-600">{currentCard.force}</span>?</p>
            <div className="flex space-x-4">
              <Button 
                variant="success" 
                size="lg" 
                className="w-full py-6 text-xl"
                onClick={() => handleResult(true)}
              >
                <ThumbsUp className="mr-2" /> Correct
              </Button>
              <Button 
                variant="danger" 
                size="lg" 
                className="w-full py-6 text-xl"
                onClick={() => handleResult(false)}
              >
                <ThumbsDown className="mr-2" /> Not yet
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
