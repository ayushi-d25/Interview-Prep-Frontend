import type { InterviewHistoryItem, Role } from "@/types";

export const ROLES: Role[] = [
  "Frontend Developer",
  "React Developer",
  "Full Stack Developer",
  "Backend Developer",
  "Node.js Developer",
];

export const mockQuestionBank: Record<Role, string[]> = {
  "Frontend Developer": [
    "Explain the difference between var, let, and const.",
    "How does the browser render a web page?",
    "What is the CSS box model?",
    "Explain event delegation in JavaScript.",
    "What is the difference between debouncing and throttling?",
    "How do you optimize a web page for performance?",
  ],
  "React Developer": [
    "Explain React Hooks and the rules around them.",
    "What is the virtual DOM and why does React use it?",
    "Describe how useEffect's dependency array works.",
    "When would you use useMemo vs useCallback?",
    "How does React reconciliation decide what to re-render?",
    "Explain controlled vs uncontrolled components.",
  ],
  "Full Stack Developer": [
    "Walk through the request lifecycle from browser to database.",
    "How would you design a URL shortener?",
    "Explain how you'd implement authentication end-to-end.",
    "What is the difference between SQL and NoSQL? When use each?",
    "How would you scale a Node.js app to 1M requests/day?",
    "Explain CORS and how you'd debug a CORS failure.",
  ],
  "Backend Developer": [
    "Explain ACID properties in databases.",
    "What is the difference between REST and GraphQL?",
    "How does database indexing work?",
    "Explain pessimistic vs optimistic locking.",
    "How would you design a rate limiter?",
    "What are common message-queue patterns?",
  ],
  "Node.js Developer": [
    "Explain the Node.js event loop.",
    "What is the difference between process.nextTick and setImmediate?",
    "How does clustering in Node.js work?",
    "Explain streams and when you'd use them.",
    "How do you handle uncaught exceptions in Node?",
    "What are worker threads and when would you use them?",
  ],
};

export const mockHistory: InterviewHistoryItem[] = [
  { id: "h1", date: "2026-06-12", role: "React Developer", difficulty: "Medium", score: 8, status: "Completed" },
  { id: "h2", date: "2026-06-08", role: "Frontend Developer", difficulty: "Easy", score: 9, status: "Completed" },
  { id: "h3", date: "2026-06-02", role: "Full Stack Developer", difficulty: "Hard", score: 6, status: "Completed" },
  { id: "h4", date: "2026-05-28", role: "Node.js Developer", difficulty: "Medium", score: 7, status: "Completed" },
  { id: "h5", date: "2026-05-20", role: "Backend Developer", difficulty: "Hard", score: 5, status: "Abandoned" },
  { id: "h6", date: "2026-05-14", role: "React Developer", difficulty: "Easy", score: 9, status: "Completed" },
];
