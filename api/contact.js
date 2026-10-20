import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  // Permite requisições apenas via método POST
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { nome, email, mensagem } = request.body;

    // Validação simples dos campos
    if (!nome || !email || !mensagem) {
      return response.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    // Insere os dados na tabela contatos criada no Neon
    await sql`
      INSERT INTO contatos (nome, email, mensagem)
      VALUES (${nome}, ${email}, ${mensagem});
    `;

    return response.status(200).json({ success: true, message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar no banco:', error);
    return response.status(500).json({ error: 'Erro interno ao salvar mensagem' });
  }
}
