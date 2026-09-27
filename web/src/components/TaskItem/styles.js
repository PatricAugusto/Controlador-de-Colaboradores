import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg-elevated);
  padding: 0.625rem 0.875rem;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  border: 1px solid transparent;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: var(--border-color);
  }

  .task-info {
    p {
      font-size: 0.875rem;
      color: var(--text-primary);
      font-weight: 500;
    }

    span {
      font-size: 0.75rem;
      color: var(--accent-amber);
      font-weight: 600;
    }
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--accent-emerald);
    padding: 0.375rem 0.625rem;
    border-radius: 4px;
    background-color: rgba(16, 185, 129, 0.1);

    &:hover {
      background-color: var(--accent-emerald);
      color: #ffffff;
    }
  }
`;