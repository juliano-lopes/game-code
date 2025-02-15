/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
//import corsLib from 'cors';
//import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript
//const cors = corsLib({ origin: 'https://staging-game-code-app.web.app' });
export const helloWorld3 = onRequest({ cors: true }, (request, response) => {
  //   logger.info("Hello logs!", {structuredData: true});
  //cors(request, response, () => { // Wrap your function logic with cors()
  response.status(200).send({ message: 'Olá, Mundo3!' });
  //});
});
