import React, { useState } from 'react';
import styled from 'styled-components';
import { X, Award } from 'lucide-react';

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
    display: flex;
    align-items: center;
    gap: 0.5rem;
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

  input, textarea, select {
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

  textarea {
    resize: vertical;
    min-height: 80px;
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
    background: #10b981;
    color: #fff;
    &:hover { background: #059669; }
  }
`;

export function TaskModal({ isOpen, onClose, onSave, contractors, defaultContractorId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pointsReward, setPointsReward] = useState(10);
  const [contractorId, setContractorId] = useState(defaultContractorId || '');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      title,
      description,
      points_reward: Number(pointsReward),
      contractor_id: Number(contractorId || defaultContractorId)
    });
    setTitle('');
    setDescription('');
    setPointsReward(10);
  };

  return (
    <Overlay>
      <ModalCard>
        <Header>
          <h2><Award size={20} color="#f59e0b" /> Nova Tarefa Gamificada</h2>
          <button type="button" onClick={onClose}><X size={20} /></button>
        </Header>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label>Atribuir ao Colaborador</label>
            <select 
              value={contractorId || defaultContractorId} 
              onChange={(e) => setContractorId(e.target.value)}
              required
            >
              <option value="">Selecione um terceirizado...</option>
              {contractors.map((c) => (
                <option key={c.id} value={c.id}>{c.name} ({c.role})</option>
              ))}
            </select>
          </FormGroup>

          <FormGroup>
            <label>Título da Tarefa</label>
            <input 
              type="text" 
              required 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Ex: Implementar testes de integração"
            />
          </FormGroup>

          <FormGroup>
            <label>Descrição</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Detalhes sobre o que precisa ser entregue..."
            />
          </FormGroup>

          <FormGroup>
            <label>Recompensa em Pontos (PTS)</label>
            <input 
              type="number" 
              min="5" 
              max="500" 
              required 
              value={pointsReward} 
              onChange={(e) => setPointsReward(e.target.value)} 
            />
          </FormGroup>

          <ButtonGroup>
            <Button type="button" className="cancel" onClick={onClose}>Cancelar</Button>
            <Button type="submit" className="save">Criar Tarefa</Button>
          </ButtonGroup>
        </Form>
      </ModalCard>
    </Overlay>
  );
}