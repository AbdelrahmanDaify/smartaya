export interface TopicItem {
  heading: string;
  subpoints: string[];
  notes?: string;
}

export interface DefinitionItem {
  term: string;
  definition: string;
}

export interface OrganizedNotes {
  title: string;
  overview: string;
  topics: TopicItem[];
  definitions: DefinitionItem[];
  keyTakeaways: string[];
  structuredMarkdown: string;
}

export interface StudySummary {
  coreIdea: string;
  mainPoints: string[];
  essentialDefinitions: DefinitionItem[];
  quickReviewBullets: string[];
  examAlerts: string[];
}

export interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TrueFalseQuestion {
  id: string;
  statement: string;
  isTrue: boolean;
  explanation: string;
}

export interface ShortAnswerQuestion {
  id: string;
  question: string;
  modelAnswer: string;
  keyCriteria: string[];
}

export interface QuestionBank {
  multipleChoice: MCQQuestion[];
  trueFalse: TrueFalseQuestion[];
  shortAnswer: ShortAnswerQuestion[];
  requestedCount?: number | 'auto';
  actualCount?: number;
  noteIfNotReached?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ProcessedStudyDocument {
  id: string;
  fileName: string;
  fileSize?: string;
  filePreview?: string;
  mimeType: string;
  extractedText: string;
  organized?: OrganizedNotes;
  summary?: StudySummary;
  questions?: QuestionBank;
  createdAt: string;
}
