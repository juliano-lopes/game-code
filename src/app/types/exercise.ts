import { FirebaseDocument } from "./firebase-document";

export interface Exercise extends FirebaseDocument {
  moduleId: string;
  number: number;
  statement: string;
  instructions: string;
  type?: 'sort' | 'multiple-choice'; // Add type
  questions?: MultipleChoiceQuestion[]; // Add questions
}

export interface MultipleChoiceQuestion {
  question: string;
  answers: string[];
  answer: number;
  explain: string;
}
