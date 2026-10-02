import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../datbase/index,js'; 

const JWT_SECRET = process.env.JWT_SECRET || 'seu_secret_jwt_aqui';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Busca usuário pelo e-mail
    const result = await db.query('SELECT * FROM contractors WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ error: 'E-mail ou senha inválidos.' });
    }

    // 2. Compara a senha informada com o hash salvo
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(400).json({ error: 'E-mail ou senha inválidos.' });
    }

    // 3. Gera o JWT
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
        role_title: user.role_title
      }
    });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ error: 'Erro interno ao realizar login.' });
  }
};