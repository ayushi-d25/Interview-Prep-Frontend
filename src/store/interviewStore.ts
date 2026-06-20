import { create } from "zustand";
import type {
  Difficulty,
  EvaluationResult,
  InterviewQuestion,
  Role,
} from "@/types";

interface InterviewState {
  role: Role | null;
  difficulty: Difficulty | null;
  questions: InterviewQuestion[];
  answers: Record<number, string>;
  currentIndex: number;
  result: EvaluationResult | null;
  setSetup: (role: Role, difficulty: Difficulty) => void;
  setQuestions: (q: InterviewQuestion[]) => void;
  setAnswer: (id: number, answer: string) => void;
  setIndex: (i: number) => void;
  setResult: (r: EvaluationResult) => void;
  reset: () => void;
}

export const useInterviewStore = create<InterviewState>((set) => ({
  role: null,
  difficulty: null,
  questions: [],
  answers: {},
  currentIndex: 0,
  result: null,
  setSetup: (role, difficulty) => set({ role, difficulty }),
  setQuestions: (questions) => set({ questions, currentIndex: 0, answers: {} }),
  setAnswer: (id, answer) =>
    set((s) => ({ answers: { ...s.answers, [id]: answer } })),
  setIndex: (i) => set({ currentIndex: i }),
  setResult: (result) => set({ result }),
  reset: () =>
    set({
      role: null,
      difficulty: null,
      questions: [],
      answers: {},
      currentIndex: 0,
      result: null,
    }),
}));
