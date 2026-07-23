// src/paginas/cliente/Home.jsx
import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../firebase/auth";

export default function Home() {
  const { usuario } = useAuth();

  return (
    <div>
      <h1>Olá, {usuario?.email}</h1>
      <p>Área do cliente — em construção.</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
