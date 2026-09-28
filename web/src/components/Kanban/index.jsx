import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Circle, Clock, CheckCircle2, User, GripVertical } from 'lucide-react';
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

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // Se soltar fora de uma coluna válida ou na mesma posição, ignora
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const taskId = Number(draggableId) || draggableId;
    const newStatus = destination.droppableId;

    // Dispara a atualização de status (se for 'COMPLETED', aciona a bonificação)
    onUpdateTaskStatus(taskId, newStatus);
  };

  return (
    <S.Container>
      <S.Header>
        <h2>Quadro Kanban de Entregas</h2>
      </S.Header>

      <DragDropContext onDragEnd={handleDragEnd}>
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

                <Droppable droppableId={col.id}>
                  {(provided, snapshot) => (
                    <S.TaskList
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      $isDraggingOver={snapshot.isDraggingOver}
                    >
                      {columnTasks.map((task, index) => (
                        <Draggable
                          key={String(task.id)}
                          draggableId={String(task.id)}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <S.TaskCard
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              $isDragging={snapshot.isDragging}
                            >
                              <div className="card-top">
                                <h4>{task.title}</h4>
                                <GripVertical size={14} className="drag-handle" />
                              </div>

                              {task.description && <p>{task.description}</p>}

                              <div className="card-footer">
                                <div className="assignee">
                                  <User size={13} />
                                  {getContractorName(task.contractor_id)}
                                </div>
                                <span className="reward">+{task.points_reward} PTS</span>
                              </div>
                            </S.TaskCard>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </S.TaskList>
                  )}
                </Droppable>
              </S.Column>
            );
          })}
        </S.BoardGrid>
      </DragDropContext>
    </S.Container>
  );
}

export default Kanban;