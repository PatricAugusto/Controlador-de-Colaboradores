import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

export const FilterGroup = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.05);
  padding: 4px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);

  button {
    padding: 0.4rem 0.85rem;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 500;
    color: #a1a1aa;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;

    &.active {
      background: rgba(255, 255, 255, 0.12);
      color: #ffffff;
    }
  }
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

export const CardSection = styled.div`
  background: rgba(18, 18, 20, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.25rem;

  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const LeaderboardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const LeaderboardItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);

  .rank-badge {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    font-weight: 700;
    margin-right: 0.75rem;

    &.rank-1 { background: #f59e0b; color: #000; }
    &.rank-2 { background: #94a3b8; color: #000; }
    &.rank-3 { background: #b45309; color: #fff; }
    &.rank-other { background: rgba(255, 255, 255, 0.08); color: #a1a1aa; }
  }

  .user-info {
    display: flex;
    align-items: center;

    strong {
      color: #ffffff;
      font-size: 0.9rem;
      display: block;
    }

    span {
      color: #a1a1aa;
      font-size: 0.75rem;
    }
  }

  .points-badge {
    font-size: 0.9rem;
    font-weight: 700;
    color: #f59e0b;
    background: rgba(245, 158, 11, 0.1);
    padding: 0.3rem 0.65rem;
    border-radius: 8px;
  }
`;

export const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
`;

export const AchievementCard = styled.div`
  padding: 1rem;
  border-radius: 12px;
  background: ${(props) => (props.$unlocked ? 'rgba(245, 158, 11, 0.05)' : 'rgba(255, 255, 255, 0.02)')};
  border: 1px solid ${(props) => (props.$unlocked ? 'rgba(245, 158, 11, 0.3)' : 'rgba(255, 255, 255, 0.05)')};
  opacity: ${(props) => (props.$unlocked ? 1 : 0.4)};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;

  .icon-wrapper {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: ${(props) => (props.$unlocked ? '#f59e0b' : 'rgba(255, 255, 255, 0.1)')};
    color: ${(props) => (props.$unlocked ? '#000000' : '#ffffff')};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h4 {
    font-size: 0.85rem;
    color: #ffffff;
    margin: 0;
  }

  p {
    font-size: 0.75rem;
    color: #a1a1aa;
    margin: 0;
  }
`;

export const FeedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 15px;
    width: 2px;
    background: rgba(255, 255, 255, 0.05);
  }
`;

export const FeedItem = styled.div`
  display: flex;
  gap: 1rem;
  position: relative;
  z-index: 1;

  .feed-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #121214;
    border: 2px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 0.75rem;
    flex-shrink: 0;
  }

  .feed-content {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    padding: 0.75rem;
    flex: 1;

    p {
      margin: 0;
      font-size: 0.8rem;
      color: #ffffff;

      strong {
        color: #f59e0b;
      }
    }

    time {
      display: block;
      margin-top: 0.25rem;
      font-size: 0.7rem;
      color: #71717a;
    }
  }
`;