import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'controlador_terceirizados',
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
});

// Teste de conexão imediato
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ ERRO AO CONECTAR NO POSTGRESQL:', err.message);
  } else {
    console.log('⚡ Conectado ao banco PostgreSQL com sucesso!');
    release();
  }
});