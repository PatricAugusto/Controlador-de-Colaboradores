import { CheckCircle2 } from 'lucide-react';
import * as S from './styles';

export function TaskItem({ task, onComplete }) {
  return (
    <S.Container>
      <div className="task-info">
        <p>{task.title}</p>
        <span>+{task.points_reward} PTS</span>
      </div>
      <button onClick={() => onComplete(task.id)}>
        <CheckCircle2 size={13} /> Concluir
      </button>
    </S.Container>
  );
}