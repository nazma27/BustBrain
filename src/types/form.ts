export interface FormData {
  id: string;
  title: string;
  description: string;
  headerImage: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: string;
  type: 'categorize' | 'cloze' | 'comprehension';
  title: string;
  description: string;
  image: string;
  required: boolean;
  points: number;
  
  // Categorize specific
  categories?: string[];
  items?: string[];
  answers?: { [itemId: string]: string };
  
  // Cloze specific
  text?: string;
  blanks?: string[];
  
  // Comprehension specific
  passage?: string;
  questions?: ComprehensionQuestion[];
}

export interface ComprehensionQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface FormResponse {
  id: string;
  formId: string;
  answers: { [questionId: string]: any };
  submittedAt: string;
}