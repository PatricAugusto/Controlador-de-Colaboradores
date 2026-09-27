import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  margin-top: 1rem;
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
`;

export const MetricCard = styled.div`
  background: rgba(18, 18, 20, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.08));
  border-radius: 14px;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    span {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-secondary, #a1a1aa);
    }

    h3 {
      font-size: 1.75rem;
      font-weight: 700;
      color: #ffffff;
      margin: 0;
    }
  }

  .icon-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #ffffff;
  }
`;

export const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1.5fr 1fr;
  }
`;

export const Panel = styled.div`
  background: rgba(18, 18, 20, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.08));
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  h2 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #ffffff;
    letter-spacing: -0.01em;
    margin: 0;
  }
`;

export const ContractorProgressList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const ContractorProgressItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .name-role {
      display: flex;
      flex-direction: column;

      strong {
        color: #ffffff;
        font-size: 0.925rem;
      }

      span {
        font-size: 0.75rem;
        color: #a1a1aa;
      }
    }

    .stats {
      font-size: 0.8rem;
      font-family: monospace;
      color: #a1a1aa;
    }
  }

  .track {
    height: 8px;
    width: 100%;
    background: rgba(39, 39, 42, 0.8);
    border-radius: 9999px;
    overflow: hidden;

    .bar {
      height: 100%;
      background: #ffffff;
      border-radius: 9999px;
      transition: width 0.4s ease;
    }
  }
`;

export const TaskStatusOverview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StatusRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 10px;

  .label {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.875rem;
    color: #e4e4e7;
  }

  .badge {
    font-size: 0.85rem;
    font-weight: 600;
    font-family: monospace;
    padding: 0.2rem 0.6rem;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.06);
    color: #ffffff;
  }
`;