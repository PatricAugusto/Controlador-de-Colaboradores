import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool as db } from '../database/index.js';
import { authenticateToken, authorizeRoles } from '../middlewares/auth.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'seu_secret_jwt_aqui';

/* ===================================================
   1. ROTAS PÚBLICAS (AUTENTICAÇÃO)
   =================================================== */

// POST /login - Autentica usuário e retorna JWT + dados do perfil
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
  }

  try {
    const result = await db.query('SELECT * FROM contractors WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ error: 'E-mail ou senha inválidos.' });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(400).json({ error: 'E-mail ou senha inválidos.' });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        role_title: user.role_title,
        points: user.points,
        avatar_url: user.avatar_url,
      },
    });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ error: 'Erro interno ao realizar login.' });
  }
});


/* ===================================================
   MIDDLEWARE DE PROTEÇÃO GLOBAL
   Todas as rotas abaixo requerem Header:
   Authorization: Bearer <TOKEN_JWT>
   =================================================== */
router.use(authenticateToken);


/* ===================================================
   2. ROTAS DE TERCEIRIZADOS (CONTRACTORS)
   =================================================== */

// GET /contractors - Listagem com Filtro e Pesquisa Avançada
router.get('/contractors', async (req, res) => {
  const { search, role_title } = req.query;

  try {
    let query = `
      SELECT id, name, email, role, role_title, points, avatar_url 
      FROM contractors 
      WHERE 1=1
    `;
    const values = [];

    // Filtro por Nome ou E-mail
    if (search) {
      values.push(`%${search}%`);
      query += ` AND (name ILIKE $${values.length} OR email ILIKE $${values.length})`;
    }

    // Filtro por Cargo/Especialidade
    if (role_title) {
      values.push(role_title);
      query += ` AND role_title = $${values.length}`;
    }

    query += ' ORDER BY points DESC';

    const result = await db.query(query, values);
    return res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar terceirizados:', error);
    return res.status(500).json({ error: 'Erro ao buscar terceirizados.' });
  }
});

// POST /contractors - Apenas ADMIN cria novos terceirizados
router.post('/contractors', authorizeRoles('ADMIN'), async (req, res) => {
  const { name, email, password, role_title, role = 'CONTRACTOR', avatar_url } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios.' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const result = await db.query(
      `INSERT INTO contractors (name, email, password_hash, role_title, role, avatar_url)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, name, email, role, role_title, avatar_url`,
      [name, email, password_hash, role_title, role, avatar_url]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao cadastrar terceirizado:', error);
    if (error.code === '23505') {
      return res.status(400).json({ error: 'E-mail já cadastrado.' });
    }
    return res.status(500).json({ error: 'Erro ao cadastrar terceirizado.' });
  }
});

// PUT /contractors/:id - Apenas ADMIN edita terceirizados
router.put('/contractors/:id', authorizeRoles('ADMIN'), async (req, res) => {
  const { id } = req.params;
  const { name, email, role_title, role, avatar_url } = req.body;

  try {
    const result = await db.query(
      `UPDATE contractors 
       SET name = $1, email = $2, role_title = $3, role = $4, avatar_url = $5
       WHERE id = $6
       RETURNING id, name, email, role, role_title, avatar_url`,
      [name, email, role_title, role, avatar_url, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Terceirizado não encontrado.' });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar terceirizado:', error);
    return res.status(500).json({ error: 'Erro ao atualizar terceirizado.' });
  }
});

// DELETE /contractors/:id - Apenas ADMIN remove terceirizados
router.delete('/contractors/:id', authorizeRoles('ADMIN'), async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM contractors WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Terceirizado não encontrado.' });
    }

    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar terceirizado:', error);
    return res.status(500).json({ error: 'Erro ao deletar terceirizado.' });
  }
});


/* ===================================================
   3. ROTAS DE TAREFAS (TASKS)
   =================================================== */

// GET /tasks - Filtros e Controle de Acesso por Papel (RBAC)
router.get('/tasks', async (req, res) => {
  const { search, status, contractor_id } = req.query;

  try {
    let query = 'SELECT * FROM tasks WHERE 1=1';
    const values = [];

    // Se for CONTRACTOR, restringe busca apenas para suas próprias tarefas
    if (req.user.role === 'CONTRACTOR') {
      values.push(req.user.id);
      query += ` AND contractor_id = $${values.length}`;
    } else if (contractor_id) {
      values.push(contractor_id);
      query += ` AND contractor_id = $${values.length}`;
    }

    // Pesquisa textual por título ou descrição
    if (search) {
      values.push(`%${search}%`);
      query += ` AND (title ILIKE $${values.length} OR description ILIKE $${values.length})`;
    }

    // Filtro por status
    if (status) {
      values.push(status);
      query += ` AND status = $${values.length}`;
    }

    query += ' ORDER BY created_at DESC';

    const result = await db.query(query, values);
    return res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    return res.status(500).json({ error: 'Erro ao buscar tarefas.' });
  }
});

// POST /tasks - Apenas ADMIN cria tarefas
router.post('/tasks', authorizeRoles('ADMIN'), async (req, res) => {
  const { title, description, points_reward, contractor_id, due_date } = req.body;

  if (!title || !contractor_id) {
    return res.status(400).json({ error: 'Título e ID do responsável são obrigatórios.' });
  }

  try {
    const result = await db.query(
      `INSERT INTO tasks (title, description, points_reward, contractor_id, due_date, status)
       VALUES ($1, $2, $3, $4, $5, 'PENDING')
       RETURNING *`,
      [title, description, points_reward || 10, contractor_id, due_date]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    return res.status(500).json({ error: 'Erro ao criar tarefa.' });
  }
});

// PATCH /tasks/:id - Atualiza status da tarefa (ADMIN ou responsável)
router.patch('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const taskResult = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
    if (taskResult.rows.length === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    const task = taskResult.rows[0];

    // Se for CONTRACTOR, valida se a tarefa lhe pertence
    if (req.user.role === 'CONTRACTOR' && task.contractor_id !== req.user.id) {
      return res.status(403).json({ error: 'Você não tem permissão para alterar esta tarefa.' });
    }

    const updatedResult = await db.query(
      'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    return res.json(updatedResult.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    return res.status(500).json({ error: 'Erro ao atualizar tarefa.' });
  }
});

// PATCH /tasks/:id/complete - Conclui e atribui pontos de recompensa atomicamente
router.patch('/tasks/:id/complete', async (req, res) => {
  const { id } = req.params;

  try {
    const taskResult = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
    if (taskResult.rows.length === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    const task = taskResult.rows[0];

    if (task.status === 'COMPLETED') {
      return res.status(400).json({ error: 'Esta tarefa já foi concluída.' });
    }

    if (req.user.role === 'CONTRACTOR' && task.contractor_id !== req.user.id) {
      return res.status(403).json({ error: 'Você não tem permissão para concluir esta tarefa.' });
    }

    // Transação para alterar status, adicionar pontos e registrar no feed de atividades
    await db.query('BEGIN');

    await db.query("UPDATE tasks SET status = 'COMPLETED' WHERE id = $1", [id]);

    const contractorResult = await db.query(
      'UPDATE contractors SET points = points + $1 WHERE id = $2 RETURNING *',
      [task.points_reward || 10, task.contractor_id]
    );

    await db.query(
      `INSERT INTO activity_feed (contractor_id, type, title, description)
       VALUES ($1, 'TASK_COMPLETED', $2, $3)`,
      [task.contractor_id, 'Tarefa Concluída', `Concluiu a tarefa: ${task.title}`]
    );

    await db.query('COMMIT');

    return res.json({
      message: 'Tarefa concluída e pontos creditados!',
      contractor: contractorResult.rows[0],
    });
  } catch (error) {
    await db.query('ROLLBACK');
    console.error('Erro ao concluir tarefa:', error);
    return res.status(500).json({ error: 'Erro ao concluir tarefa.' });
  }
});


/* ===================================================
   4. ROTAS DA LOJA DE RECOMPENSAS (REWARDS)
   =================================================== */

// GET /rewards - Lista os itens disponíveis
router.get('/rewards', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM rewards ORDER BY points_cost ASC');
    return res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar recompensas:', error);
    return res.status(500).json({ error: 'Erro ao buscar recompensas.' });
  }
});

// POST /rewards/redeem - Resgata uma recompensa e debita o saldo
router.post('/rewards/redeem', async (req, res) => {
  const { reward_id } = req.body;
  const contractor_id = req.user.role === 'CONTRACTOR' ? req.user.id : req.body.contractor_id;

  if (!reward_id || !contractor_id) {
    return res.status(400).json({ error: 'Recompensa e Terceirizado são obrigatórios.' });
  }

  try {
    const [contractorRes, rewardRes] = await Promise.all([
      db.query('SELECT points FROM contractors WHERE id = $1', [contractor_id]),
      db.query('SELECT * FROM rewards WHERE id = $1', [reward_id]),
    ]);

    if (contractorRes.rows.length === 0) return res.status(404).json({ error: 'Terceirizado não encontrado.' });
    if (rewardRes.rows.length === 0) return res.status(404).json({ error: 'Recompensa não encontrada.' });

    const currentPoints = contractorRes.rows[0].points;
    const reward = rewardRes.rows[0];

    if (currentPoints < reward.points_cost) {
      return res.status(400).json({ error: 'Saldo de pontos insuficiente para este resgate.' });
    }

    await db.query('BEGIN');

    const updatedContractor = await db.query(
      'UPDATE contractors SET points = points - $1 WHERE id = $2 RETURNING *',
      [reward.points_cost, contractor_id]
    );

    await db.query(
      'INSERT INTO redemptions (contractor_id, reward_id, points_spent) VALUES ($1, $2, $3)',
      [contractor_id, reward_id, reward.points_cost]
    );

    await db.query(
      `INSERT INTO activity_feed (contractor_id, type, title, description)
       VALUES ($1, 'REWARD_REDEEMED', $2, $3)`,
      [contractor_id, 'Resgate efetuado', `Resgatou o prêmio: ${reward.title}`]
    );

    await db.query('COMMIT');

    return res.json({
      message: 'Resgate efetuado com sucesso!',
      contractor: updatedContractor.rows[0],
    });
  } catch (error) {
    await db.query('ROLLBACK');
    console.error('Erro ao resgatar recompensa:', error);
    return res.status(500).json({ error: 'Erro ao processar o resgate.' });
  }
});


/* ===================================================
   5. ROTAS DE HISTÓRICO & FEED (ACTIVITY FEED)
   =================================================== */

// GET /activities - Traz a linha do tempo recente
router.get('/activities', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT f.id, f.type, f.title, f.description, f.created_at, c.name as author
      FROM activity_feed f
      JOIN contractors c ON c.id = f.contractor_id
      ORDER BY f.created_at DESC
      LIMIT 30
    `);
    return res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar feed de atividades:', error);
    return res.status(500).json({ error: 'Erro ao buscar atividades.' });
  }
});

export default router;