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
  min-height: 500px;
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
`;

export const TaskCard = styled.div`
  background: rgba(26, 26, 30, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    h4 {
      font-size: 0.9rem;
      font-weight: 600;
      color: #ffffff;
      margin: 0;
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

export const ActionGroup = styled.div`
  display: flex;
  gap: 0.4rem;
  margin-top: 0.25rem;

  button {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #a1a1aa;
    padding: 0.35rem 0.6rem;
    border-radius: 6px;
    font-size: 0.75rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    transition: all 0.2s ease;

    &:hover {
      background: #ffffff;
      color: #000000;
    }
  }
`;