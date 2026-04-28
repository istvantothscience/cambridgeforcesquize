export const FORCE_TYPES = [
  "Gravity",
  "Normal force",
  "Friction",
  "Air resistance",
  "Water resistance",
  "Upthrust",
  "Push",
  "Pull"
] as const;

export type ForceType = typeof FORCE_TYPES[number];

export interface MCQQuestion {
  id: string;
  question: string;
  correctAnswer: ForceType;
  options: ForceType[];
  explanation: string;
}

export interface SortingItem {
  id: string;
  text: string;
  correctCategory: ForceType;
}

export interface PairCard {
  id: string;
  force: ForceType;
  hint: string;
}

export type GameMode = "START" | "MENU" | "MCQ" | "SORTING" | "PAIR" | "LIGHTNING" | "RESULTS";

export interface QuizResult {
  score: number;
  total: number;
  mode: GameMode;
  mistakes: { question: string; studentAnswer: string; correctAnswer: string; explanation: string }[];
}
