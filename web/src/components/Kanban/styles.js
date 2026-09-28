import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  margin-top: 1rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #ffffff;
    letter-spacing: -0.02em;
  }
`;

export const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  align-items: start;
`;

export const Column = styled.div`
  background: rgba(18, 18, 20, 0.5);
  backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.08));
  border-radius: 16px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 520px;
`;

export const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  .title-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: #ffffff;
  }

  .count {
    background: rgba(255, 255, 255, 0.08);
    color: #a1a1aa;
    font-size: 0.75rem;
    font-family: monospace;
    padding: 0.2rem 0.6rem;
    border-radius: 9999px;
  }
`;

export const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  flex: 1;
  border-radius: 10px;
  padding: 0.25rem;
  background: ${(props) =>
    props.$isDraggingOver ? 'rgba(255, 255, 255, 0.02)' : 'transparent'};
  transition: background-color 0.2s ease;
`;

export const TaskCard = styled.div`
  background: rgba(26, 26, 30, 0.9);
  border: 1px solid
    ${(props) => (props.$isDragging ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.06)')};
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  cursor: grab;
  user-select: none;
  box-shadow: ${(props) =>
    props.$isDragging ? '0 10px 30px rgba(0, 0, 0, 0.5)' : 'none'};
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:active {
    cursor: grabbing;
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h4 {
      font-size: 0.9rem;
      font-weight: 600;
      color: #ffffff;
      margin: 0;
    }

    .drag-handle {
      color: #52525b;
    }
  }

  p {
    font-size: 0.8rem;
    color: #a1a1aa;
    margin: 0;
    line-height: 1.4;
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.5rem;
    border-top: 1px dashed rgba(255, 255, 255, 0.06);

    .assignee {
      font-size: 0.75rem;
      color: #d4d4d8;
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }

    .reward {
      font-size: 0.75rem;
      font-weight: 700;
      color: #f59e0b;
      background: rgba(245, 158, 11, 0.1);
      padding: 0.2rem 0.5rem;
      border-radius: 6px;
    }
  }
`;