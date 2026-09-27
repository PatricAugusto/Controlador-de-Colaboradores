import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import App from './App';

// Mock do Axios para simular a resposta da API de backend
vi.mock('axios');

describe('Componente App (Dashboard de Gamificação)', () => {
  it('Deve renderizar o título do painel corretamente', () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<App />);
    
    expect(screen.getByText(/Painel de Terceirizados & Gamificação/i)).toBeInTheDocument();
  });

  it('Deve carregar e exibir os terceirizados com sua pontuação', async () => {
    const mockContractors = [
      { id: 1, name: 'Alice Silva', role: 'Dev Backend', points: 120 },
      { id: 2, name: 'Bob Santos', role: 'UX Designer', points: 80 },
    ];

    axios.get.mockResolvedValueOnce({ data: mockContractors });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Alice Silva')).toBeInTheDocument();
      expect(screen.getByText('120 PTS')).toBeInTheDocument();
      expect(screen.getByText('Bob Santos')).toBeInTheDocument();
      expect(screen.getByText('80 PTS')).toBeInTheDocument();
    });
  });
});