import { api, mockDelay } from "./api";
import { mockHistory, mockQuestionBank } from "@/data/mockData";
import type {
  EvaluateInterviewPayload,
  EvaluationResult,
  GenerateInterviewPayload,
  InterviewHistoryItem,
  InterviewQuestion,
} from "@/types";

const USE_MOCK = false;

/**
 * Fetch interview history for the authenticated user from the API.
 * Uses Bearer token from localStorage.
 */
export const getInterviewHistory = async (): Promise<InterviewHistoryItem[]> => {
  try {
    console.log("[getInterviewHistory] Fetching interview history from API...");
    const response = await api.get<InterviewHistoryItem[]>("/interviews/history");
    console.log("[getInterviewHistory] API response received:", response.data);

    // Validate response is an array
    if (!Array.isArray(response.data)) {
      console.error("[getInterviewHistory] API response is not an array:", response.data);
      throw new Error("Invalid API response format");
    }

    console.log(`[getInterviewHistory] Successfully fetched ${response.data.length} interviews`);
    return response.data;
  } catch (error) {
    console.error("[getInterviewHistory] Error fetching interview history:", error);
    throw error;
  }
};

/**
 * Fetch interview details by ID from the API.
 * Uses Bearer token from localStorage.
 */
export const getInterviewDetails = async (id: string): Promise<any> => {
  try {
    console.log(`[getInterviewDetails] Fetching details for interview ${id}...`);
    const response = await api.get(`/interviews/${id}`);
    console.log(`[getInterviewDetails] API response received for interview ${id}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`[getInterviewDetails] Error fetching interview ${id}:`, error);
    throw error;
  }
};

export const interviewService = {
  // POST /api/interview/generate
  async generate(
    payload: GenerateInterviewPayload,
  ): Promise<{ questions: InterviewQuestion[] }> {
    if (!USE_MOCK) {
      const { data } = await api.post("/interview/generate", payload);
      return data;
    }
    const pool = mockQuestionBank[payload.role] ?? mockQuestionBank["Frontend Developer"];
    const count = payload.count ?? 5;
    const questions = pool.slice(0, count).map((q, i) => ({ id: i + 1, question: q }));
    return mockDelay({ questions });
  },

  // POST /api/interview/evaluate
  async evaluate(payload: EvaluateInterviewPayload): Promise<EvaluationResult> {
    if (!USE_MOCK) {
      const { data } = await api.post("/interview/evaluate", payload);
      return data;
    }
    const answered = payload.answers.filter((a) => a.answer.trim().length > 20).length;
    const ratio = answered / Math.max(payload.answers.length, 1);
    const score = Math.max(3, Math.min(10, Math.round(5 + ratio * 5)));
    return mockDelay({
      score,
      strengths: [
        "Clear, structured communication",
        `Solid grasp of ${payload.role.toLowerCase()} fundamentals`,
        "Good use of real-world examples",
      ],
      weaknesses: [
        "Performance optimization could go deeper",
        "Edge-case handling needs more rigor",
      ],
      suggestions: [
        "Practice systems design at a higher level",
        "Study memoization and rendering optimization",
        "Build one larger end-to-end project portfolio piece",
      ],
    });
  },

  // GET /api/interviews/history
  async history(): Promise<InterviewHistoryItem[]> {
    if (!USE_MOCK) {
      return getInterviewHistory();
    }
    return mockDelay(mockHistory);
  },

  // GET /api/interviews/:id
  async getDetails(id: string): Promise<any> {
    return getInterviewDetails(id);
  }
};
