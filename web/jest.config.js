/** @type {import('jest').Config} */
const config = {
  // Habilita a coleta de cobertura por padrão
  collectCoverage: true,

  // Define os arquivos dos quais a cobertura deve ser coletada
  collectCoverageFrom: [
    'src/components/**/*.{ts,tsx}',
    '!src/components/**/*.styles.ts', // Exclui arquivos de estilo isolados se necessário
    '!src/**/*.d.ts',
  ],

  // Formato dos relatórios gerados
  coverageReporters: ['text', 'lcov', 'html'],

  // Definição das métricas mínimas de cobertura
  coverageThreshold: {
    // 1. Regra Global para a aplicação
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10, // Permite no máximo 10 statements não cobertos no projeto
    },

    // 2. Regra Específica para o componente LevelProgressCard
    './src/components/LevelProgressCard/LevelProgressCard.tsx': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};

module.exports = config;