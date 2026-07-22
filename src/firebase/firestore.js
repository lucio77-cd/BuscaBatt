// src/firebase/firestore.js
import { initializeFirestore, persistentLocalCache } from "firebase/firestore";
import { app } from "./config";

// Persistência offline: leituras repetidas (ex: reabrir o app) vêm do
// cache local e NÃO contam como leitura no Firestore — economia direta
// no plano gratuito.
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache(),
});
