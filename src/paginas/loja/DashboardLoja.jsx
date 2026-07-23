import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../firebase/auth";

export default function DashboardLoja() {
  const { usuario } = useAuth();

  return (
    <div>
      <h1>Painel da loja — {usuario?.email}</h1>
      <p>Em construção.</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
