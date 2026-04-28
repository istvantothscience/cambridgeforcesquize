import { useState } from 'react';
import { GameMode, QuizResult } from './types';
import StartScreen from './components/StartScreen';
import ModeSelectionMenu from './components/ModeSelectionMenu';
import MultipleChoiceQuiz from './components/MultipleChoiceQuiz';
import SortingGame from './components/SortingGame';
import PairExplanationGame from './components/PairExplanationGame';
import LightningRound from './components/LightningRound';
import ResultsScreen from './components/ResultsScreen';

export default function App() {
  const [currentMode, setCurrentMode] = useState<GameMode>('START');
  const [lastResult, setLastResult] = useState<QuizResult | null>(null);

  const handleFinish = (result: QuizResult) => {
    setLastResult(result);
    setCurrentMode('RESULTS');
  };

  const renderScreen = () => {
    switch (currentMode) {
      case 'START':
        return <StartScreen onStart={() => setCurrentMode('MENU')} />;
      case 'MENU':
        return <ModeSelectionMenu onSelectMode={setCurrentMode} />;
      case 'MCQ':
        return <MultipleChoiceQuiz onFinish={handleFinish} onBack={() => setCurrentMode('MENU')} />;
      case 'SORTING':
        return <SortingGame onFinish={handleFinish} onBack={() => setCurrentMode('MENU')} />;
      case 'PAIR':
        return <PairExplanationGame onFinish={handleFinish} onBack={() => setCurrentMode('MENU')} />;
      case 'LIGHTNING':
        return <LightningRound onFinish={handleFinish} onBack={() => setCurrentMode('MENU')} />;
      case 'RESULTS':
        return (
          <ResultsScreen 
            result={lastResult!} 
            onPlayAgain={() => setCurrentMode(lastResult?.mode || 'MENU')}
            onBackToMenu={() => setCurrentMode('MENU')} 
          />
        );
      default:
        return <StartScreen onStart={() => setCurrentMode('MENU')} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-200">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 min-h-screen flex flex-col justify-center">
        {renderScreen()}
      </div>
    </div>
  );
}

