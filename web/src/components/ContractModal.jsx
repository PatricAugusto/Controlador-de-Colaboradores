import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { X } from 'lucide-react';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalCard = styled.div`
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  width: 100%;
  max-width: 480px;
  padding: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    font-size: 1.25rem;
    color: #f8fafc;
  }

  button {
    background: transparent;
    color: #94a3b8;
    &:hover { color: #f8fafc; }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.875rem;
    color: #cbd5e1;
  }

  input {
    background: #0f172a;
    border: 1px solid #334155;
    border-radius: 6px;
    padding: 0.75rem;
    color: #f8fafc;
    font-size: 0.95rem;
    outline: none;

    &:focus {
      border-color: #38bdf8;
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
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s;

  &.cancel {
    background: transparent;
    color: #94a3b8;
    border: 1px solid #334155;
    &:hover { background: #334155; color: #fff; }
  }

  &.save {
    background: #0284c7;
    color: #fff;
    &:hover { background: #0369a1; }
  }
`;

export function ContractorModal({ isOpen, onClose, onSave, contractorToEdit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
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