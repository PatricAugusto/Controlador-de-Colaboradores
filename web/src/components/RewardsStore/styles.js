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
  }
`;

export const SelectorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  label {
    font-size: 0.85rem;
    color: #a1a1aa;
  }

  select {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #ffffff;
    padding: 0.5rem 0.85rem;
    border-radius: 8px;
    font-size: 0.85rem;
    outline: none;
    cursor: pointer;

    option {
      background: #121214;
      color: #ffffff;
    }
  }
`;

export const BalanceCard = styled.div`
  background: rgba(18, 18, 20, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .info {
    display: flex;
    align-items: center;
    gap: 1rem;

    .avatar-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
    }

    h3 {
      font-size: 1.1rem;
      color: #ffffff;
      margin: 0;
    }

    p {
      font-size: 0.8rem;
      color: #a1a1aa;
      margin: 0.2rem 0 0;
    }
  }

  .points-badge {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    span {
      font-size: 0.75rem;
      color: #a1a1aa;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    strong {
      font-size: 1.75rem;
      font-weight: 700;
      color: #f59e0b;
    }
  }
`;

export const StoreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
`;

export const RewardCard = styled.div`
  background: rgba(26, 26, 30, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .icon-box {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: rgba(245, 158, 11, 0.1);
      color: #f59e0b;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .cost {
      font-size: 0.85rem;
      font-weight: 700;
      color: #f59e0b;
      background: rgba(245, 158, 11, 0.1);
      padding: 0.25rem 0.6rem;
      border-radius: 6px;
    }
  }

  .card-body {
    h4 {
      font-size: 0.95rem;
      font-weight: 600;
      color: #ffffff;
      margin: 0 0 0.4rem;
    }

    p {
      font-size: 0.8rem;
      color: #a1a1aa;
      margin: 0;
      line-height: 1.4;
    }
  }

  button {
    width: 100%;
    padding: 0.65rem;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.2s ease;

    background: ${(props) => (props.$canAfford ? '#ffffff' : 'rgba(255, 255, 255, 0.05)')};
    color: ${(props) => (props.$canAfford ? '#000000' : '#52525b')};
    cursor: ${(props) => (props.$canAfford ? 'pointer' : 'not-allowed')};

    &:hover {
      background: ${(props) => (props.$canAfford ? '#e4e4e7' : 'rgba(255, 255, 255, 0.05)')};
    }
  }
`;