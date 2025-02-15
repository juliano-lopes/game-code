import { FirebaseDocument } from "./firebase-document";

export interface Exercise extends FirebaseDocument {
    moduleId: string;
    number: number;
    statement: string;
    instructions: string;
  }