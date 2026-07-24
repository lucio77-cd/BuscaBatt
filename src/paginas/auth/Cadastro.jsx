import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";
import { cadastrar } from "../../firebase/auth";
import { criarUsuario } from "../../servicos/usuarioService";
import "./Auth.css";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState("cliente");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navegar = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      const credencial = await cadastrar(email, senha);
      await criarUsuario(credencial.user.uid, { email, role });
      navegar(role === "loja" ? "/loja" : "/painel");
    } catch {
      setErro("Não foi possível criar a conta. Verifique os dados.");
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
        <h2>A bateria certa. Perto de você.</h2>
        <p>Crie sua conta como cliente pra trocar sua bateria, ou como loja pra vender.</p>
      </div>

      <div className="pagina-auth__conteudo">
        <form className="cartao cartao-auth" onSubmit={handleSubmit}>
          <div className="cartao-auth__logo">
            <Zap color="#FFC107" /> BuscaBat
          </div>
          <h1>Criar conta</h1>
          <p className="cartao-auth__subtitulo">Leva menos de um minuto.</p>

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
              id="senha" type="password" className="input" placeholder="Mínimo 6 caracteres"
              value={senha} onChange={(e) => setSenha(e.target.value)} required
            />
          </div>
          <div className="campo">
            <label htmlFor="role">Você é</label>
            <select id="role" className="input" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="cliente">Cliente — quero trocar minha bateria</option>
              <option value="loja">Loja/oficina — quero vender baterias</option>
            </select>
          </div>

          {erro && <p className="erro-form">{erro}</p>}

          <button type="submit" className="btn btn--primario btn--largo" disabled={carregando}>
            {carregando ? "Criando conta..." : "Cadastrar"}
          </button>

          <p className="cartao-auth__rodape">
            Já tem conta? <Link to="/login">Entrar</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
