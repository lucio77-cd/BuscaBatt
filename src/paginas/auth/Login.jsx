import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";
import { login } from "../../firebase/auth";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navegar = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      await login(email, senha);
      navegar("/painel");
    } catch {
      setErro("E-mail ou senha inválidos.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="pagina-auth">
      <div className="pagina-auth__marca">
        <div className="cartao-auth__logo" style={{ color: "white" }}>
          <Zap color="#FFC107" /> BuscaBat
        </div>
        <h2>Bem-vindo de volta.</h2>
        <p>Entre pra acompanhar seus agendamentos ou gerenciar seus pedidos.</p>
      </div>

      <div className="pagina-auth__conteudo">
        <form className="cartao cartao-auth" onSubmit={handleSubmit}>
          <div className="cartao-auth__logo">
            <Zap color="#FFC107" /> BuscaBat
          </div>
          <h1>Entrar</h1>
          <p className="cartao-auth__subtitulo">Acesse sua conta para continuar.</p>

          <div className="campo">
            <label htmlFor="email">E-mail</label>
            <input
              id="email" type="email" className="input" placeholder="seu@email.com"
              value={email} onChange={(e) => setEmail(e.target.value)} required
            />
          </div>
          <div className="campo">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha" type="password" className="input" placeholder="••••••••"
              value={senha} onChange={(e) => setSenha(e.target.value)} required
            />
          </div>

          {erro && <p className="erro-form">{erro}</p>}

          <button type="submit" className="btn btn--primario btn--largo" disabled={carregando}>
            {carregando ? "Entrando..." : "Entrar"}
          </button>

          <p className="cartao-auth__rodape">
            Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
