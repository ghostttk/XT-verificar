export default async function handler(req, res) {
  const { code } = req.query; // Recebe o código de autorização do Discord

  if (!code) {
    return res.status(400).send('Código de autorização não encontrado.');
  }

  // Parâmetros para enviar ao Discord para pegar o access_token
  const params = new URLSearchParams();
  params.append('client_id', '1351391324884172821');  // Substitua pelo seu Client ID
  params.append('client_secret', 'SEU_CLIENT_SECRET');  // Substitua pelo seu Client Secret
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', 'https://xtsystemverificar.vercel.app');  // A URL registrada no Discord Developer Portal

  // Requisição para pegar o access_token do Discord
  const response = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    body: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const data = await response.json();

  if (data.error) {
    console.log('Erro ao obter o token:', data);
    return res.status(400).send('Erro ao obter o token.');
  }

  const accessToken = data.access_token;

  // Agora vamos pegar os dados do usuário usando o access_token
  const userResponse = await fetch('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,  // Envia o access_token para pegar os dados do usuário
    },
  });

  const userData = await userResponse.json();
  console.log('Usuário autenticado:', userData);

  // Após a verificação, redireciona para o site final
  return res.redirect('https://xtsystemshop.vercel.app');  // Aqui é onde o usuário será redirecionado
}
