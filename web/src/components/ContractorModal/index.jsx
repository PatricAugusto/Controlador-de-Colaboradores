import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import * as S from './styles';

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
    <S.Overlay>
      <S.ModalCard>
        <S.Header>
          <h2>{contractorToEdit ? 'Editar Terceirizado' : 'Novo Terceirizado'}</h2>
          <button type="button" onClick={onClose}><X size={20} /></button>
        </S.Header>

        <S.Form onSubmit={handleSubmit}>
          <S.FormGroup>
            <label>Nome Completo</label>
            <input 
              type="text" 
              required 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Ex: João Silva"
            />
          </S.FormGroup>

          <S.FormGroup>
            <label>E-mail</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="exemplo@empresa.com"
            />
          </S.FormGroup>

          <S.FormGroup>
            <label>Cargo / Especialidade</label>
            <input 
              type="text" 
              required 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              placeholder="Ex: Desenvolvedor React Senior"
            />
          </S.FormGroup>

          <S.ButtonGroup>
            <S.Button type="button" className="cancel" onClick={onClose}>Cancelar</S.Button>
            <S.Button type="submit" className="save">Salvar</S.Button>
          </S.ButtonGroup>
        </S.Form>
      </S.ModalCard>
    </S.Overlay>
  );
}

export default ContractorModal;