import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import * as S from './styles';

export function TaskModal({ isOpen, onClose, onSave, contractors, defaultContractorId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pointsReward, setPointsReward] = useState(10);
  const [contractorId, setContractorId] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setDescription('');
      setPointsReward(10);
      setContractorId(defaultContractorId || (contractors[0]?.id || ''));
    }
  }, [isOpen, defaultContractorId, contractors]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      title,
      description,
      points_reward: Number(pointsReward),
      contractor_id: Number(contractorId),
    });
  };

  return (
    <S.Overlay>
      <S.ModalCard>
        <S.Header>
          <h2>Nova Tarefa / Recompensa</h2>
          <button type="button" onClick={onClose}><X size={20} /></button>
        </S.Header>

        <S.Form onSubmit={handleSubmit}>
          <S.FormGroup>
            <label>Terceirizado Responsável</label>
            <select 
              value={contractorId} 
              onChange={(e) => setContractorId(e.target.value)}
              required
            >
              <option value="" disabled>Selecione um colaborador</option>
              {contractors.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.role})
                </option>
              ))}
            </select>
          </S.FormGroup>

          <S.FormGroup>
            <label>Título da Tarefa</label>
            <input 
              type="text" 
              required 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Ex: Entrega do Layout Figma"
            />
          </S.FormGroup>

          <S.FormGroup>
            <label>Descrição</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Detalhes sobre a entrega esperada..."
            />
          </S.FormGroup>

          <S.FormGroup>
            <label>Pontos de Recompensa</label>
            <input 
              type="number" 
              min="1" 
              required 
              value={pointsReward} 
              onChange={(e) => setPointsReward(e.target.value)} 
            />
          </S.FormGroup>

          <S.ButtonGroup>
            <S.Button type="button" className="cancel" onClick={onClose}>Cancelar</S.Button>
            <S.Button type="submit" className="save">Criar Tarefa</S.Button>
          </S.ButtonGroup>
        </S.Form>
      </S.ModalCard>
    </S.Overlay>
  );
}

export default TaskModal;