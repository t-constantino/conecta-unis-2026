import { Pool } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { action, email, senha, tipo, nome_completo, universidade, curso, nome_fantasia, cnpj } = req.body;

  try {
    // 1. LOGIN
    if (action === 'login') {
      if (email === 'talles.admin@gmail.com' && senha === 'adminsenha123') {
        return res.status(200).json({ success: true, user: { nome: 'Administrador', email, tipo: 'admin' } });
      }

      if (tipo === 'aluno') {
        const result = await pool.query('SELECT * FROM estudantes WHERE email = $1', [email]);
        if (result.rows.length > 0) {
          const user = result.rows[0];
          const senhaValida = await bcrypt.compare(senha, user.senha_hash);
          if (senhaValida) {
            return res.status(200).json({ success: true, user: { ...user, tipo: 'aluno' } });
          }
        }
      } else if (tipo === 'empresa') {
        const result = await pool.query('SELECT * FROM empresas WHERE email = $1', [email]);
        if (result.rows.length > 0) {
          const user = result.rows[0];
          const senhaValida = await bcrypt.compare(senha, user.senha_hash);
          if (senhaValida) {
            return res.status(200).json({ success: true, user: { ...user, tipo: 'empresa' } });
          }
        }
      }

      return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
    }

    // 2. CADASTRO
    if (action === 'register') {
      const salt = await bcrypt.genSalt(10);
      const senha_hash = await bcrypt.hash(senha, salt);

      if (tipo === 'aluno') {
        const check = await pool.query('SELECT id FROM estudantes WHERE email = $1', [email]);
        if (check.rows.length > 0) return res.status(400).json({ error: 'E-mail já cadastrado.' });

        const insert = await pool.query(
          'INSERT INTO estudantes (nome_completo, universidade, curso, email, senha_hash) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [nome_completo, universidade, curso, email, senha_hash]
        );
        return res.status(201).json({ success: true, user: { ...insert.rows[0], tipo: 'aluno' } });
      } 

      if (tipo === 'empresa') {
        const check = await pool.query('SELECT id FROM empresas WHERE email = $1 OR cnpj = $2', [email, cnpj]);
        if (check.rows.length > 0) return res.status(400).json({ error: 'E-mail ou CNPJ já cadastrados.' });

        const insert = await pool.query(
          'INSERT INTO empresas (nome_fantasia, cnpj, email, senha_hash) VALUES ($1, $2, $3, $4) RETURNING *',
          [nome_fantasia, cnpj, email, senha_hash]
        );
        return res.status(201).json({ success: true, user: { ...insert.rows[0], tipo: 'empresa' } });
      }
    }
  } catch (err) {
    console.error('Erro no auth:', err);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
}
