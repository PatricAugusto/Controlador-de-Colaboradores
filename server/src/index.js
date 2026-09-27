import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import app from './app.js';
import { pool } from './database/index.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- ROTAS DE TERCEIRIZADOS ---

// 1. Listar Terceirizados (com Ranking de Pontos)
app.get('/contractors', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contractors ORDER BY points DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Criar Terceirizado
app.post('/contractors', async (req, res) => {
  const { name, email, role } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO contractors (name, email, role) VALUES ($1, $2, $3) RETURNING *',
      [name, email, role]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 3. Atualizar Terceirizado
app.put('/contractors/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  try {
    const result = await pool.query(
      'UPDATE contractors SET name = $1, email = $2, role = $3 WHERE id = $4 RETURNING *',
      [name, email, role, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. Deletar Terceirizado
app.delete('/contractors/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM contractors WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- ROTAS DE TAREFAS & GAMIFICAÇÃO ---

// Criar Tarefa para um Terceirizado
app.post('/tasks', async (req, res) => {
  const { title, description, points_reward, contractor_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, points_reward, contractor_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, points_reward || 10, contractor_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Concluir Tarefa (Soma os pontos no perfil do Terceirizado)
app.patch('/tasks/:id/complete', async (req, res) => {
  const { id } = req.params;
  
  try {
    // 1. Buscar a tarefa
    const taskResult = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    const task = taskResult.rows[0];

    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
    if (task.status === 'COMPLETED') return res.status(400).json({ error: 'Tarefa já concluída' });

    // 2. Atualizar status da tarefa
    await pool.query('UPDATE tasks SET status = $1 WHERE id = $2', ['COMPLETED', id]);

    // 3. Somar a pontuação ao Terceirizado (Mecanismo de Gamificação)
    const contractorResult = await pool.query(
      'UPDATE contractors SET points = points + $1 WHERE id = $2 RETURNING *',
      [task.points_reward, task.contractor_id]
    );

    res.json({
      message: 'Tarefa concluída e pontos creditados!',
      contractor: contractorResult.rows[0]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));