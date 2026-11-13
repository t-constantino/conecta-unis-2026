import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default async function handler(req: any, res: any) {
  try {
    if (req.method === 'GET') {
      const estudantes = await pool.query('SELECT id, nome_completo, email, universidade, curso, criado_em FROM estudantes ORDER BY id DESC');
      const empresas = await pool.query('SELECT id, nome_fantasia, cnpj, email, criado_em FROM empresas ORDER BY id DESC');
      const contatos = await pool.query('SELECT id, nome, email, mensagem, criado_em FROM contatos ORDER BY id DESC');

      return res.status(200).json({
        estudantes: estudantes.rows,
        empresas: empresas.rows,
        contatos: contatos.rows,
      });
    }

    if (req.method === 'DELETE') {
      const { id, type } = req.body;
      if (type === 'estudante') {
        await pool.query('DELETE FROM estudantes WHERE id = $1', [id]);
      } else if (type === 'empresa') {
        await pool.query('DELETE FROM empresas WHERE id = $1', [id]);
      } else if (type === 'contato') {
        await pool.query('DELETE FROM contatos WHERE id = $1', [id]);
      }
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Método não permitido' });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao processar requisição do admin.' });
  }
}
