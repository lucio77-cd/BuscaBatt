import { Zap, LayoutDashboard, Package, ClipboardList, Star, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../firebase/auth";
import "./DashboardLoja.css";

export default function DashboardLoja() {
  const { usuario } = useAuth();

  return (
    <div className="app-loja">
      {/* Sidebar — visível a partir de notebook (900px+) */}
      <aside className="app-loja__sidebar">
        <div className="app-loja__logo"><Zap color="#FFC107" size={20} /> BuscaBat</div>
        <nav className="app-loja__nav">
          <a href="#"><LayoutDashboard size={18} /> Painel</a>
          <a href="#"><Package size={18} /> Catálogo</a>
          <a href="#"><ClipboardList size={18} /> Pedidos</a>
          <a href="#"><Star size={18} /> Avaliações</a>
          <button onClick={logout}><LogOut size={18} /> Sair</button>
        </nav>
      </aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Topo — visível só no mobile */}
        <header className="app-loja__topo-mobile">
          <div className="app-loja__logo"><Zap color="#FFC107" size={20} /> BuscaBat</div>
          <button className="btn btn--fantasma" onClick={logout}>
            <LogOut size={18} /> Sair
          </button>
        </header>

        <main className="app-loja__conteudo">
          <h1>Painel da loja</h1>
          <p style={{ color: "#666", marginTop: "0.3rem" }}>{usuario?.email}</p>

          <div className="app-loja__grid">
            <div className="cartao app-loja__stat">
              <strong>0</strong>
              <span>Pedidos hoje</span>
            </div>
            <div className="cartao app-loja__stat">
              <strong>0</strong>
              <span>Baterias no catálogo</span>
            </div>
            <div className="cartao app-loja__stat">
              <strong>—</strong>
              <span>Avaliação média</span>
            </div>
            <div className="cartao app-loja__stat">
              <strong>R$ 0</strong>
              <span>Faturamento do mês</span>
            </div>
          </div>

          <div className="cartao" style={{ marginTop: "1.5rem" }}>
            <h3>Catálogo de baterias</h3>
            <p style={{ color: "#666", fontSize: "0.9rem", margin: "0.4rem 0 1rem" }}>
              Em breve: cadastre baterias, preços e estoque aqui.
            </p>
            <button className="btn btn--primario" disabled>Em construção</button>
          </div>
        </main>
      </div>
    </div>
  );
}
