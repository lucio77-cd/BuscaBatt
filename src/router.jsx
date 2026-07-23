// src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import Login from "./paginas/auth/Login";
import Cadastro from "./paginas/auth/Cadastro";

// Por enquanto só rotas públicas — as protegidas (cliente/loja/dono)
// entram na Parte 5, junto com o RotaProtegida.jsx
export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/cadastro", element: <Cadastro /> },
]);
