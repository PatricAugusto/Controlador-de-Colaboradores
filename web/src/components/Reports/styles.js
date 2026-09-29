import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 1rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #ffffff;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 0.75rem;

  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    color: #ffffff;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
    }

    &.primary {
      background: #ffffff;
      color: #000000;
      border: none;

      &:hover {
        background: #e4e4e7;
      }
    }
  }
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
`;

export const MetricCard = styled.div`
  background: rgba(18, 18, 20, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  .icon-box {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
  }

  .content {
    span {
      font-size: 0.75rem;
      color: #a1a1aa;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    h3 {
      font-size: 1.4rem;
      font-weight: 700;
      color: #ffffff;
      margin: 0.2rem 0 0;
    }
  }
`;

export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 1.5rem;
`;

export const ChartSection = styled.div`
  background: rgba(18, 18, 20, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.5rem;

  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 1.25rem;
  }
`;

export const Section = styled.div`
  background: rgba(18, 18, 20, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.5rem;

  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 1.25rem;
  }
`;

export const PerformanceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  th, td {
    padding: 0.85rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    font-size: 0.85rem;
  }

  th {
    color: #a1a1aa;
    font-weight: 500;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
  }

  td {
    color: #ffffff;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover td {
    background: rgba(255, 255, 255, 0.02);
  }
`;