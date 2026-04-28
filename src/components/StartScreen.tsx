import { motion } from 'motion/react';
import { Button } from './ui/Button';
import { Beaker, FlaskConical, Atom } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center space-y-12 py-12"
    >
      <div className="relative">
        <motion.div 
          animate={{ y: [0, -10, 0] }} 
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute -top-12 -left-16 text-blue-400 opacity-60"
        >
          <Beaker size={64} />
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 10, 0], rotate: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-8 -right-16 text-purple-400 opacity-60"
        >
          <FlaskConical size={72} />
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tight text-slate-800 drop-shadow-sm mb-4">
          School <span className="text-blue-500">Lab</span>
        </h1>
        <div className="flex items-center justify-center space-x-3 mb-8">
          <Atom className="text-purple-500" size={32} />
          <h2 className="text-3xl md:text-4xl font-bold text-slate-600">
            Forces Quiz
          </h2>
          <Atom className="text-purple-500" size={32} />
        </div>
      </div>

      <p className="text-xl md:text-2xl text-slate-500 max-w-lg mx-auto font-medium leading-relaxed">
        Ready to test your knowledge about gravity, friction, and other forces?
      </p>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button size="lg" onClick={onStart} className="text-2xl px-12 py-6 rounded-3xl shadow-xl shadow-blue-300/50">
          Start Exploring
        </Button>
      </motion.div>
    </motion.div>
  );
}
