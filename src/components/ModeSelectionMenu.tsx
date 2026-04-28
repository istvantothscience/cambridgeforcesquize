import { motion } from 'motion/react';
import { Card } from './ui/Card';
import { GameMode } from '../types';
import { CheckSquare, Grid2X2, Users, Zap } from 'lucide-react';

interface ModeSelectionMenuProps {
  onSelectMode: (mode: GameMode) => void;
}

export default function ModeSelectionMenu({ onSelectMode }: ModeSelectionMenuProps) {
  const modes = [
    {
      id: 'MCQ' as GameMode,
      title: 'Multiple Choice',
      description: 'Find the correct force for each situation.',
      icon: <CheckSquare size={40} className="text-blue-500 mb-4" />,
      color: 'hover:border-blue-300 hover:shadow-blue-200/50',
    },
    {
      id: 'SORTING' as GameMode,
      title: 'Sorting Game',
      description: 'Sort everyday actions into the right force categories.',
      icon: <Grid2X2 size={40} className="text-purple-500 mb-4" />,
      color: 'hover:border-purple-300 hover:shadow-purple-200/50',
    },
    {
      id: 'PAIR' as GameMode,
      title: 'Explain It!',
      description: 'Pair game: describe the force without saying its name.',
      icon: <Users size={40} className="text-green-500 mb-4" />,
      color: 'hover:border-green-300 hover:shadow-green-200/50',
    },
    {
      id: 'LIGHTNING' as GameMode,
      title: 'Lightning Round',
      description: 'Fast-paced quiz against the clock.',
      icon: <Zap size={40} className="text-amber-500 mb-4" />,
      color: 'hover:border-amber-300 hover:shadow-amber-200/50',
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Choose Your Experiment</h2>
        <p className="text-xl text-slate-500">Pick a game mode to test your forces knowledge.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modes.map((mode) => (
          <motion.div key={mode.id} whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }}>
            <Card 
              className={`cursor-pointer h-full transition-all duration-300 ${mode.color} border-4 border-transparent bg-white group`}
              onClick={() => onSelectMode(mode.id)}
            >
              <div className="flex flex-col items-center text-center p-4">
                <div className="p-4 rounded-full bg-slate-50 group-hover:scale-110 transition-transform duration-300">
                  {mode.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-700 mb-2">{mode.title}</h3>
                <p className="text-slate-500">{mode.description}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
