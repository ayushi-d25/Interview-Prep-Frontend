export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedAt?: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export type Role =
  | "Frontend Developer"
  | "React Developer"
  | "Full Stack Developer"
  | "Backend Developer"
  | "Node.js Developer";

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface InterviewQuestion {
  id: number;
  question: string;
}

export interface GenerateInterviewPayload {
  role: Role;
  difficulty: Difficulty;
  count?: number;
}

export interface EvaluateInterviewPayload {
  role: Role;
  difficulty: Difficulty;
  answers: { questionId: number; question: string; answer: string }[];
}

export interface EvaluationResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

export interface InterviewHistoryItem {
  id: string;
  _id?: string;
  date: string;
  completedAt?: string;
  role: Role;
  difficulty: Difficulty;
  score: number;
  status: "Completed" | "In Progress" | "Abandoned";
  strengths?: string[];
  weaknesses?: string[];
}

export interface ProfileStats {
  totalInterviews: number;
  averageScore: number;
  completed: number;
  bestRole: string;
}
