import styled from 'styled-components';

export const Container = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  background: rgba(13, 15, 18, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--glass-border, rgba(255, 255, 255, 0.08));
  padding: 0.85rem 1.5rem;
`;

export const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  .logo-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #ffffff;
  }

  span {
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #ffffff;
    
    strong {
      color: var(--text-secondary, #9ca3af);
      font-weight: 400;
      margin-left: 0.35rem;
    }
  }
`;

export const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  list-style: none;
`;

export const NavItem = styled.li`
  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.55rem 1rem;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 500;
    color: ${(props) => (props.$active ? '#ffffff' : 'var(--text-secondary, #a1a1aa)')};
    background: ${(props) => (props.$active ? 'rgba(255, 255, 255, 0.08)' : 'transparent')};
    border: 1px solid ${(props) => (props.$active ? 'rgba(255, 255, 255, 0.15)' : 'transparent')};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.05);
    }
  }
`;