import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './database/index.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// --- ROTAS DE TERCEIRIZADOS ---
app.get('/contractors', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contractors ORDER BY points DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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
app.get('/tasks', async (req, res) => {
  const { contractor_id } = req.query;
  try {
    let query = 'SELECT * FROM tasks ORDER BY created_at DESC';
    let params = [];

    if (contractor_id) {
      query = 'SELECT * FROM tasks WHERE contractor_id = $1 ORDER BY created_at DESC';
      params = [contractor_id];
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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

// Atualização Genérica de Status (PENDING, IN_PROGRESS, etc.)
app.patch('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await pool.query(
      'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- ROTAS DA LOJA DE RECOMPENSAS ---

// Listar produtos da loja
app.get('/rewards', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM rewards ORDER BY points_cost ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Resgatar uma recompensa
app.post('/rewards/redeem', async (req, res) => {
  const { contractor_id, reward_id } = req.body;

  try {
    const [contractorRes, rewardRes] = await Promise.all([
      pool.query('SELECT * FROM contractors WHERE id = $1', [contractor_id]),
      pool.query('SELECT * FROM rewards WHERE id = $1', [reward_id])
    ]);

    const contractor = contractorRes.rows[0];
    const reward = rewardRes.rows[0];

    if (!contractor) return res.status(404).json({ error: 'Colaborador não encontrado' });
    if (!reward) return res.status(404).json({ error: 'Recompensa não encontrada' });

    if (contractor.points < reward.points_cost) {
      return res.status(400).json({ error: 'Saldo de pontos insuficiente para este resgate' });
    }

    // 1. Deducao dos pontos do colaborador
    const updatedContractor = await pool.query(
      'UPDATE contractors SET points = points - $1 WHERE id = $2 RETURNING *',
      [reward.points_cost, contractor_id]
    );

    // 2. Registro do histórico de resgate
    await pool.query(
      'INSERT INTO redemptions (contractor_id, reward_id, points_spent) VALUES ($1, $2, $3)',
      [contractor_id, reward_id, reward.points_cost]
    );

    res.json({
      message: 'Resgate efetuado com sucesso!',
      contractor: updatedContractor.rows[0]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Conclusão com Recompensa Automática de Pontos
app.patch('/tasks/:id/complete', async (req, res) => {
  const { id } = req.params;
  try {
    const taskResult = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    const task = taskResult.rows[0];

    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
    if (task.status === 'COMPLETED') return res.status(400).json({ error: 'Tarefa já concluída' });

    await pool.query('UPDATE tasks SET status = $1 WHERE id = $2', ['COMPLETED', id]);

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

export default app;