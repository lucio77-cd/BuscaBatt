// src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import Login from "./paginas/auth/Login";
import Cadastro from "./paginas/auth/Cadastro";
import { RotaProtegida } from "./componentes/layout/RotaProtegida";
import Home from "./paginas/cliente/Home";
import DashboardLoja from "./paginas/loja/DashboardLoja";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/cadastro", element: <Cadastro /> },
  {
    path: "/",
    element: (
      <RotaProtegida rolesPermitidos={["cliente"]}>
        <Home />
      </RotaProtegida>
    ),
  },
  {
    path: "/loja",
    element: (
      <RotaProtegida rolesPermitidos={["loja"]}>
        <DashboardLoja />
      </RotaProtegida>
    ),
  },
]);
