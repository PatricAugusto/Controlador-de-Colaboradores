import request from 'supertest';
import app from './app.js';
import { pool } from './database/index.js';

describe('API de Terceirizados e Gamificação', () => {
  // Limpeza do banco de teste ou encerramento da conexão ao finalizar
  afterAll(async () => {
    await pool.end();
  });

  let createdContractorId;
  let createdTaskId;

  test('Deve criar um novo terceirizado (POST /contractors)', async () => {
    const response = await request(app)
      .post('/contractors')
      .send({
        name: 'Dev Teste',
        email: `teste.${Date.now()}@exemplo.com`,
        role: 'Desenvolvedor Frontend'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.points).toBe(0);
    createdContractorId = response.body.id;
  });

  test('Deve criar uma tarefa para o terceirizado (POST /tasks)', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({
        title: 'Corrigir Bug na Home',
        description: 'Ajustar alinhamento no CSS',
        points_reward: 50,
        contractor_id: createdContractorId
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.points_reward).toBe(50);
    expect(response.body.status).toBe('PENDING');
    createdTaskId = response.body.id;
  });

  test('Deve concluir a tarefa e creditar os pontos ao terceirizado (PATCH /tasks/:id/complete)', async () => {
    const response = await request(app)
      .patch(`/tasks/${createdTaskId}/complete`);

    expect(response.statusCode).toBe(200);
    expect(response.body.contractor.points).toBe(50);
  });
});