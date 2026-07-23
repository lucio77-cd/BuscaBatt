import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastrar } from "../../firebase/auth";
import { criarUsuario } from "../../servicos/usuarioService";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState("cliente");
  const [erro, setErro] = useState("");
  const navegar = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    try {
      const credencial = await cadastrar(email, senha);
      await criarUsuario(credencial.user.uid, { email, role });
      navegar("/");
    } catch {
      setErro("Não foi possível criar a conta. Verifique os dados.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Criar conta</h1>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="cliente">Sou cliente</option>
        <option value="loja">Sou loja</option>
      </select>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <button type="submit">Cadastrar</button>
    </form>
  );
}
