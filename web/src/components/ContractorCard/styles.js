import styled from 'styled-components';

export const Card = styled.div`
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    border-color: #3f4656;
    transform: translateY(-2px);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Badge = styled.span`
  background-color: rgba(16, 185, 129, 0.1);
  color: var(--accent-emerald);
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  border: 1px solid rgba(16, 185, 129, 0.2);
  letter-spacing: 0.05em;
`;

export const Actions = styled.div`
  display: flex;
  gap: 0.5rem;

  button {
    padding: 0.375rem;
    border-radius: 6px;
    color: var(--text-secondary);

    &.edit:hover {
      color: var(--accent-blue);
      background-color: var(--bg-elevated);
    }

    &.delete:hover {
      color: var(--accent-red);
      background-color: var(--bg-elevated);
    }
  }
`;

export const PointsTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.25rem;
  padding: 0.5rem 0.875rem;
  background-color: var(--bg-elevated);
  border-radius: 8px;
  color: var(--accent-amber);
  font-weight: 700;
  font-size: 1.125rem;
`;

export const TaskSection = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px dashed var(--border-color);
`;

export const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.875rem;

  h4 {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.8125rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-secondary);
  }
`;

export const SmallAddBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: var(--accent-emerald);
  font-weight: 600;

  &:hover {
    opacity: 0.8;
  }
`;