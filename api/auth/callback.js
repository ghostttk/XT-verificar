export default async function handler(req, res) {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('Código não encontrado');
  }

  // Parâmetros para obter o access_token do Discord
  const params = new URLSearchParams();
  params.append('client_id', '1351391324884172821'); // Seu Client ID
  params.append('client_secret', 'xBWOR-RMOvkWAOG1h3gTenstL-pGFt0n'); // Substitua pelo seu Client Secret
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', 'https://xtsystemverificar.vercel.app'); // Redireciona para a página de verificação

  // Requisição para obter o access_token
  const response = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    body: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  const data = await response.json();

  if (!data.access_token) {
    return res.status(400).send('Erro ao obter token');
  }

  // Requisição para obter os dados do usuário
  const userResponse = await fetch('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${data.access_token}`
    }
  });

  const userData = await userResponse.json();

  console.log('Usuário autenticado:', userData);

  // Redirecionar para o site final após a verificação
  return res.redirect('https://xtsystemshop.vercel.app'); // Redireciona para o seu site final
}
