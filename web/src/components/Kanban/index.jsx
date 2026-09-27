import { Circle, Clock, CheckCircle2, User, ArrowRight, ArrowLeft } from 'lucide-react';
import * as S from './styles';

export function Kanban({ tasks = [], contractors = [], onUpdateTaskStatus }) {
  const columns = [
    { id: 'PENDING', label: 'A Fazer', icon: Circle, color: '#a1a1aa' },
    { id: 'IN_PROGRESS', label: 'Em Andamento', icon: Clock, color: '#3b82f6' },
    { id: 'COMPLETED', label: 'Concluído', icon: CheckCircle2, color: '#10b981' },
  ];

  const getContractorName = (id) => {
    const contractor = contractors.find((c) => c.id === id);
    return contractor ? contractor.name : 'Não atribuído';
  };

  return (
    <S.Container>
      <S.Header>
        <h2>Quadro Kanban de Entregas</h2>
      </S.Header>

      <S.BoardGrid>
        {columns.map((col) => {
          const Icon = col.icon;
          const columnTasks = tasks.filter((t) => t.status === col.id);

          return (
            <S.Column key={col.id}>
              <S.ColumnHeader>
                <div className="title-group">
                  <Icon size={18} color={col.color} />
                  <span>{col.label}</span>
                </div>
                <span className="count">{columnTasks.length}</span>
              </S.ColumnHeader>

              <S.TaskList>
                {columnTasks.length === 0 ? (
                  <p style={{ color: '#52525b', fontSize: '0.8rem', fontStyle: 'italic', textAlign: 'center', marginTop: '2rem' }}>
                    Sem tarefas nesta coluna
                  </p>
                ) : (
                  columnTasks.map((task) => (
                    <S.TaskCard key={task.id}>
                      <div className="card-top">
                        <h4>{task.title}</h4>
                      </div>

                      {task.description && <p>{task.description}</p>}

                      <div className="card-footer">
                        <div className="assignee">
                          <User size={13} />
                          {getContractorName(task.contractor_id)}
                        </div>
                        <span className="reward">+{task.points_reward} PTS</span>
                      </div>

                      <S.ActionGroup>
                        {col.id === 'IN_PROGRESS' && (
                          <button onClick={() => onUpdateTaskStatus(task.id, 'PENDING')}>
                            <ArrowLeft size={12} /> Recuar
                          </button>
                        )}
                        {col.id === 'PENDING' && (
                          <button onClick={() => onUpdateTaskStatus(task.id, 'IN_PROGRESS')}>
                            Iniciar <ArrowRight size={12} />
                          </button>
                        )}
                        {col.id !== 'COMPLETED' && (
                          <button onClick={() => onUpdateTaskStatus(task.id, 'COMPLETED')}>
                            <CheckCircle2 size={12} /> Concluir
                          </button>
                        )}
                      </S.ActionGroup>
                    </S.TaskCard>
                  ))
                )}
              </S.TaskList>
            </S.Column>
          );
        })}
      </S.BoardGrid>
    </S.Container>
  );
}

export default Kanban;