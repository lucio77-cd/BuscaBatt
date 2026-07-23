import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app } from "./config";

export const auth = getAuth(app);

export function login(email, senha) {
  return signInWithEmailAndPassword(auth, email, senha);
}

export function logout() {
  return signOut(auth);
}

export function cadastrar(email, senha) {
  return createUserWithEmailAndPassword(auth, email, senha);
}
