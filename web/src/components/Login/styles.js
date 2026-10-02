import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #09090b;
  padding: 1.5rem;
`;

export const LoginBox = styled.div`
  width: 100%;
  max-width: 420px;
  background: rgba(18, 18, 20, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  .logo-box {
    width: 52px;
    height: 52px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 1.4rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
  }

  p {
    font-size: 0.85rem;
    color: #a1a1aa;
    margin-top: 0.4rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  label {
    font-size: 0.8rem;
    color: #a1a1aa;
    font-weight: 500;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;

    svg {
      position: absolute;
      left: 14px;
      color: #71717a;
    }

    input {
      width: 100%;
      padding: 0.75rem 0.85rem 0.75rem 2.6rem;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      color: #ffffff;
      font-size: 0.9rem;
      outline: none;
      transition: border-color 0.2s ease;

      &:focus {
        border-color: rgba(255, 255, 255, 0.3);
      }
    }
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.85rem;
  background: #ffffff;
  color: #000000;
  border: none;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  transition: background 0.2s ease;

  &:hover {
    background: #e4e4e7;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ErrorAlert = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #f87171;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.8rem;
  text-align: center;
`;