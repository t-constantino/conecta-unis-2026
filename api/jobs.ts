import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const {
    action,
    empresa_id,
    titulo,
    area,
    tipo,
    modalidade,
    localizacao,
    salario_min,
    salario_max,
    formato_entrevista,
    descricao,
    requisitos,
    nivel,
    vagas_disponiveis,
    prazo_inscricao,
    habilidades,
    beneficios,
    universidade_alvo,
    challenge_prompt,
    feedback_message
  } = req.body;

  try {
    if (action === 'create_job') {
      if (!titulo || !salario_min || !salario_max) {
        return res.status(400).json({ error: 'Preencha os campos obrigatórios.' });
      }

      const query = `
        INSERT INTO vagas (
          empresa_id, titulo, area, tipo, modalidade, localizacao, 
          salario_min, salario_max, formato_entrevista, descricao, 
          requisitos, nivel, vagas_disponiveis, prazo_inscricao, 
          habilidades, beneficios, universidade_alvo, challenge_prompt, 
          feedback_message, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, 'ativa')
        RETURNING *;
      `;

      const values = [
        empresa_id, titulo, area, tipo, modalidade, localizacao,
        salario_min, salario_max, formato_entrevista, descricao,
        requisitos, nivel, vagas_disponiveis, prazo_inscricao || null,
        habilidades, beneficios, universidade_alvo || null, challenge_prompt,
        feedback_message
      ];

      const result = await pool.query(query, values);

      return res.status(201).json({ success: true, vaga: result.rows[0] });
    }

    return res.status(400).json({ error: 'Ação inválida.' });
  } catch (err: any) {
    console.error('Erro na API de vagas:', err);
    return res.status(500).json({ error: 'Erro interno no servidor ao publicar vaga.' });
  }
}
