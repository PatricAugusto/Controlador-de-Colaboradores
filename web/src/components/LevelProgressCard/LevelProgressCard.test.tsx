import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LevelProgressCard } from './LevelProgressCard/LevelProgressCard';

describe('LevelProgressCard Component', () => {
  it('deve renderizar o nome do usuário quando fornecido via props', () => {
    render(<LevelProgressCard totalPoints={150} userName="Patric Augusto" />);

    expect(screen.getByText('Patric Augusto')).toBeInTheDocument();
  });

  it('deve calcular e exibir o nível Inicial (Iniciante) para 0 pontos', () => {
    render(<LevelProgressCard totalPoints={0} />);

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Nível 1 • Iniciante');
    expect(screen.getByText('0 pts acumulados')).toBeInTheDocument();
    expect(screen.getByText('100 pts')).toBeInTheDocument(); // Faltam 100 para o próximo
  });

  it('deve identificar corretamente o nível Bronze', () => {
    render(<LevelProgressCard totalPoints={200} />);

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Nível 2 • Bronze');
    expect(screen.getByText('200 pts acumulados')).toBeInTheDocument();
    expect(screen.getByText('100 pts')).toBeInTheDocument(); // 300 - 200 = 100 para Prata
  });

  it('deve identificar corretamente o nível Prata', () => {
    render(<LevelProgressCard totalPoints={450} />);

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Nível 3 • Prata');
    expect(screen.getByText('450 pts acumulados')).toBeInTheDocument();
    expect(screen.getByText('150 pts')).toBeInTheDocument(); // 600 - 450 = 150 para Ouro
  });

  it('deve identificar corretamente o nível Ouro', () => {
    render(<LevelProgressCard totalPoints={750} />);

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Nível 4 • Ouro');
    expect(screen.getByText('750 pts acumulados')).toBeInTheDocument();
  });

  it('deve identificar o nível limite Diamante (Máximo) e exibir mensagem correspondente', () => {
    render(<LevelProgressCard totalPoints={1600} />);

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Nível 6 • Diamante');
    expect(screen.getByText('1.600 pts acumulados')).toBeInTheDocument();
    expect(screen.getByText('Nível Máximo Alcançado!')).toBeInTheDocument();
  });

  it('deve formatar corretamente a pontuação com separadores numéricos em PT-BR', () => {
    render(<LevelProgressCard totalPoints={1250} />);

    expect(screen.getByText('1.250 pts acumulados')).toBeInTheDocument();
  });
});