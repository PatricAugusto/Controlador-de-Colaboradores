import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { X } from 'lucide-react';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalCard = styled.div`
  background: rgba(18, 18, 20, 0.85);
  border: 1px solid var(--glass-border-focus);
  border-radius: 18px;
  width: 100%;
  max-width: 480px;
  padding: 2rem;
  box-shadow: var(--shadow-deep), 0 0 40px rgba(255, 255, 255, 0.03);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.75rem;

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: #ffffff;
  }

  button {
    background: transparent;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    transition: color 0.2s;
    &:hover { color: #ffffff; }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-secondary);
  }

  input {
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid var(--glass-border);
    border-radius: 8px;
    padding: 0.8rem 1rem;
    color: #ffffff;
    font-size: 0.95rem;
    outline: none;
    transition: all 0.2s ease;

    &:focus {
      border-color: #ffffff;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.7rem 1.4rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &.cancel {
    background: transparent;
    color: var(--text-secondary);
    border: 1px solid var(--glass-border);
    &:hover { background: rgba(255, 255, 255, 0.05); color: #ffffff; }
  }

  &.save {
    background: #ffffff;
    color: #000000;
    border: none;
    font-weight: 600;
    &:hover { background: #e2e8f0; }
  }
`;

export function ContractorModal({ isOpen, onClose, onSave, contractorToEdit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    if (contractorToEdit) {
      setName(contractorToEdit.name || '');
      setEmail(contractorToEdit.email || '');
      setRole(contractorToEdit.role || '');
    } else {
      setName('');
      setEmail('');
      setRole('');
    }
  }, [contractorToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, email, role });
  };

  return (
    <Overlay>
      <ModalCard>
        <Header>
          <h2>{contractorToEdit ? 'Editar Terceirizado' : 'Novo Terceirizado'}</h2>
          <button type="button" onClick={onClose}><X size={20} /></button>
        </Header>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label>Nome Completo</label>
            <input 
              type="text" 
              required 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Ex: João Silva"
            />
          </FormGroup>

          <FormGroup>
            <label>E-mail</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="exemplo@empresa.com"
            />
          </FormGroup>

          <FormGroup>
            <label>Cargo / Especialidade</label>
            <input 
              type="text" 
              required 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              placeholder="Ex: Desenvolvedor React Senior"
            />
          </FormGroup>

          <ButtonGroup>
            <Button type="button" className="cancel" onClick={onClose}>Cancelar</Button>
            <Button type="submit" className="save">Salvar</Button>
          </ButtonGroup>
        </Form>
      </ModalCard>
    </Overlay>
  );
}

export default ContractorModal;