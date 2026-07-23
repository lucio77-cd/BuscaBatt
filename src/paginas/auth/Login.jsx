// src/paginas/auth/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navegar = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    try {
      await login(email, senha);
      navegar("/");
    } catch {
      setErro("E-mail ou senha inválidos.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Entrar</h1>
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
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <button type="submit">Entrar</button>
    </form>
  );
}
