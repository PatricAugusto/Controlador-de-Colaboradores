import { useState } from 'react';
import { ShieldCheck, Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import * as S from './styles';

export function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.error || 'Falha ao autenticar. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <S.LoginBox>
        <S.Header>
          <div className="logo-box">
            <ShieldCheck size={26} />
          </div>
          <h1>Controlador Terceirizados</h1>
          <p>Entre com suas credenciais para acessar a plataforma</p>
        </S.Header>

        {error && <S.ErrorAlert>{error}</S.ErrorAlert>}

        <S.Form onSubmit={handleSubmit}>
          <S.FormGroup>
            <label>E-mail Corporativo</label>
            <div className="input-wrapper">
              <Mail size={18} />
              <input
                type="email"
                placeholder="seu.email@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </S.FormGroup>

          <S.FormGroup>
            <label>Senha</label>
            <div className="input-wrapper">
              <Lock size={18} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </S.FormGroup>

          <S.SubmitButton type="submit" disabled={loading}>
            <LogIn size={18} />
            {loading ? 'Acessando...' : 'Entrar na Conta'}
          </S.SubmitButton>
        </S.Form>
      </S.LoginBox>
    </S.Container>
  );
}

export default Login;