import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { nome_completo, universidade, curso, email, senha } = req.body || {};

  if (!nome_completo || !universidade || !curso || !email || !senha) {
    return res.status(400).json({ message: 'Preencha todos os campos.' });
  }

  try {
    // Inicializa a conexão corretamente usando a variável de ambiente da Vercel
    const sql = neon(process.env.DATABASE_URL);

    const salt = await bcrypt.genSalt(10);
    const senha_hash = await bcrypt.hash(senha, salt);

    await sql`
      INSERT INTO estudantes (nome_completo, universidade, curso, email, senha_hash)
      VALUES (${nome_completo}, ${universidade}, ${curso}, ${email}, ${senha_hash})
    `;

    return res.status(201).json({ message: 'Conta criada com sucesso!' });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ message: 'Este e-mail já está cadastrado.' });
    }
    return res.status(500).json({ message: 'Erro ao criar conta', error: error.message });
  }
}
