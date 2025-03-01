import { Timestamp } from "@firebase/firestore";
import { FirebaseDocument } from "./firebase-document";

export interface Resolution extends FirebaseDocument {
    userId: string;
    exerciseId: string;
    moduleId: string;
    completedAt: Timestamp;
}
