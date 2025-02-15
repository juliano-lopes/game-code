import { FirebaseDocument } from "./firebase-document";

export interface Module extends FirebaseDocument {
  number: number;
  name: string;
  description: string;
}