import { FORCE_TYPES, MCQQuestion, PairCard, SortingItem } from "./types";

// Helper function to shuffle options, ensuring the correct answer is included
const generateOptions = (correct: string, count: number = 4): string[] => {
  const others = FORCE_TYPES.filter(f => f !== correct);
  const shuffledOthers = others.sort(() => 0.5 - Math.random()).slice(0, count - 1);
  return [correct, ...shuffledOthers].sort(() => 0.5 - Math.random());
};

export const MCQ_QUESTIONS: MCQQuestion[] = [
  {
    id: "q1",
    question: "A football starts moving after being kicked.",
    correctAnswer: "Push",
    options: generateOptions("Push"),
    explanation: "A kick is a push away from the foot."
  },
  {
    id: "q2",
    question: "An apple falls from a tree.",
    correctAnswer: "Gravity",
    options: generateOptions("Gravity"),
    explanation: "Gravity pulls objects down towards Earth."
  },
  {
    id: "q3",
    question: "A book stays on a table because the table pushes up.",
    correctAnswer: "Normal force",
    options: generateOptions("Normal force"),
    explanation: "Normal force is the upward support force from a surface."
  },
  {
    id: "q4",
    question: "A box is harder to push on carpet than on a smooth floor.",
    correctAnswer: "Friction",
    options: generateOptions("Friction"),
    explanation: "Friction slows movement when surfaces rub together."
  },
  {
    id: "q5",
    question: "A parachute slows a skydiver.",
    correctAnswer: "Air resistance",
    options: generateOptions("Air resistance"),
    explanation: "Air resistance slows objects moving through air."
  },
  {
    id: "q6",
    question: "A dolphin moves easily through water because of its streamlined shape.",
    correctAnswer: "Water resistance",
    options: generateOptions("Water resistance"),
    explanation: "Water resistance is a friction-like force from water that slows movement, but the dolphin's shape reduces it."
  },
  {
    id: "q7",
    question: "A rubber duck floats in water.",
    correctAnswer: "Upthrust",
    options: generateOptions("Upthrust"),
    explanation: "Upthrust is the upward force from water that helps objects float."
  },
  {
    id: "q8",
    question: "A bicycle stops when the brakes are used.",
    correctAnswer: "Friction",
    options: generateOptions("Friction"),
    explanation: "Friction between the brake pads and the wheel resists movement."
  },
  {
    id: "q9",
    question: "A flat sheet of paper falls more slowly than a crumpled paper ball.",
    correctAnswer: "Air resistance",
    options: generateOptions("Air resistance"),
    explanation: "The flat sheet catches more air, increasing air resistance."
  },
  {
    id: "q10",
    question: "Opening a door by grabbing the handle and bringing it towards you.",
    correctAnswer: "Pull",
    options: generateOptions("Pull"),
    explanation: "A pull is a force that moves something closer."
  }
];

export const SORTING_ITEMS: SortingItem[] = [
  { id: "s1", text: "A book resting on a table", correctCategory: "Normal force" },
  { id: "s2", text: "A car tyre gripping the road", correctCategory: "Friction" },
  { id: "s3", text: "A swimmer moving through water", correctCategory: "Water resistance" },
  { id: "s4", text: "A parachute opening", correctCategory: "Air resistance" },
  { id: "s5", text: "A rubber duck floating", correctCategory: "Upthrust" },
  { id: "s6", text: "A drawer being opened", correctCategory: "Pull" },
  { id: "s7", text: "A football being kicked", correctCategory: "Push" },
  { id: "s8", text: "A stone falling down", correctCategory: "Gravity" },
  { id: "s9", text: "Slowing down on a slide with rough trousers", correctCategory: "Friction" },
  { id: "s10", text: "Throwing an apple high in the air", correctCategory: "Push" }
];

export const PAIR_CARDS: PairCard[] = [
  { id: "p1", force: "Gravity", hint: "It pulls things down towards Earth." },
  { id: "p2", force: "Friction", hint: "It happens when two surfaces rub together and slows things down." },
  { id: "p3", force: "Air resistance", hint: "It slows falling objects, like a feather or a parachute." },
  { id: "p4", force: "Water resistance", hint: "It makes it harder to walk or swim quickly in a pool." },
  { id: "p5", force: "Upthrust", hint: "It pushes boats and rubber ducks upward so they don't sink." },
  { id: "p6", force: "Normal force", hint: "It is the support force from a solid surface, like a chair holding you up." },
  { id: "p7", force: "Push", hint: "You do this to a shopping cart to make it move forward." },
  { id: "p8", force: "Pull", hint: "You do this to a rope in a game of tug-of-war." }
];

// Reusing MCQ questions for the Lightning round but we can have a larger bank later
export const LIGHTNING_QUESTIONS: MCQQuestion[] = [...MCQ_QUESTIONS].sort(() => 0.5 - Math.random());
