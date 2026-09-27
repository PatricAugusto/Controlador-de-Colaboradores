import { Trophy, Pencil, Trash2, ListTodo, Plus } from 'lucide-react';
import { TaskItem } from '../TaskItem';
import * as S from './styles';

export function ContractorCard({ 
  contractor, 
  rank, 
  tasks, 
  onEdit, 
  onDelete, 
  onCreateTask, 
  onCompleteTask 
}) {
  return (
    <S.Card>
      <div>
        <S.CardHeader>
          <S.Badge>RANK #{rank}</S.Badge>
          <S.Actions>
            <button className="edit" onClick={() => onEdit(contractor)} title="Editar">
              <Pencil size={15} />
            </button>
            <button className="delete" onClick={() => onDelete(contractor.id)} title="Excluir">
              <Trash2 size={15} />
            </button>
          </S.Actions>
        </S.CardHeader>

        <h3 style={{ marginTop: '1rem', fontSize: '1.2rem', fontWeight: 600 }}>
          {contractor.name}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.2rem' }}>
          {contractor.role}
        </p>

        <S.PointsTag>
          <Trophy size={18} />
          {contractor.points}{' '}
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 400 }}>
            PTS
          </span>
        </S.PointsTag>

        <S.TaskSection>
          <S.TaskHeader>
            <h4><ListTodo size={13} /> Pendentes</h4>
            <S.SmallAddBtn onClick={() => onCreateTask(contractor)}>
              <Plus size={13} /> Criar
            </S.SmallAddBtn>
          </S.TaskHeader>

          {tasks.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontStyle: 'italic' }}>
              Nenhuma tarefa pendente.
            </p>
          ) : (
            tasks.map((task) => (
              <TaskItem 
                key={task.id} 
                task={task} 
                onComplete={onCompleteTask} 
              />
            ))
          )}
        </S.TaskSection>
      </div>
    </S.Card>
  );
}