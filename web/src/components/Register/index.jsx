import { useState } from 'react';
import { UserPlus, Mail, Lock, User, Briefcase, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import * as S from '../Login/styles';

export function Register({ onSwitchToLogin }) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role_title: '',
    role: 'CONTRACTOR',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(formData);
    } catch (err) {
      setError(err.response?.data?.error || 'Falha ao realizar cadastro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <S.LoginBox>
        <S.Header>
          <div className="logo-box">
            <UserPlus size={26} />
          </div>
          <h1>Criar Nova Conta</h1>
          <p>Preencha os dados para se cadastrar na plataforma</p>
        </S.Header>

        {error && <S.ErrorAlert>{error}</S.ErrorAlert>}

        <S.Form onSubmit={handleSubmit}>
          <S.FormGroup>
            <label>Nome Completo</label>
            <div className="input-wrapper">
              <User size={18} />
              <input
                type="text"
                placeholder="Ex: João Silva"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
          </S.FormGroup>

          <S.FormGroup>
            <label>E-mail Corporativo</label>
            <div className="input-wrapper">
              <Mail size={18} />
              <input
                type="email"
                placeholder="seu.email@empresa.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </S.FormGroup>

          <S.FormGroup>
            <label>Cargo / Especialidade</label>
            <div className="input-wrapper">
              <Briefcase size={18} />
              <input
                type="text"
                placeholder="Ex: Dev Fullstack React / Node"
                value={formData.role_title}
                onChange={(e) => setFormData({ ...formData, role_title: e.target.value })}
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
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </S.FormGroup>

          <S.SubmitButton type="submit" disabled={loading}>
            <UserPlus size={18} />
            {loading ? 'Cadastrando...' : 'Finalizar Cadastro'}
          </S.SubmitButton>

          <S.SubmitButton
            type="button"
            onClick={onSwitchToLogin}
            style={{ background: 'transparent', color: '#a1a1aa', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <ArrowLeft size={16} /> Voltar para o Login
          </S.SubmitButton>
        </S.Form>
      </S.LoginBox>
    </S.Container>
  );
}

export default Register;