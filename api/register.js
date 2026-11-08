import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  // Configura CORS caso necessário
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { nome_completo, universidade, curso, email, senha } = req.body || {};

    if (!nome_completo || !universidade || !curso || !email || !senha) {
      return res.status(400).json({ message: 'Preencha todos os campos.' });
    }

    const salt = await bcrypt.genSalt(10);
    const senha_hash = await bcrypt.hash(senha, salt);

    await sql`
      INSERT INTO estudantes (nome_completo, universidade, curso, email, senha_hash)
      VALUES (${nome_completo}, ${universidade}, ${curso}, ${email}, ${senha_hash})
    `;

    return.status(201).json({ message: 'Conta criada com sucesso!' });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ message: 'Este e-mail já está cadastrado.' });
    }
    return res.status(500).json({ message: 'Erro ao criar conta', error: error.message });
  }
}
