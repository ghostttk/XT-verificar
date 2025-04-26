export default async function handler(req, res) {
  const { code } = req.query;  // Pega o código da query string

  if (!code) {
    return res.status(400).send('Código de autorização não encontrado.');
  }

  // Parâmetros para pegar o access_token
  const params = new URLSearchParams();
  params.append('client_id', '1351391324884172821');  // Seu Client ID
  params.append('client_secret', 'SEU_CLIENT_SECRET');  // Seu Client Secret
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', 'https://xtsystemverificar.vercel.app');  // A URL registrada

  // Solicita o access_token
  const response = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    body: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const data = await response.json();
  console.log('Resposta de Token:', data); // Adicionei logs para depuração

  if (data.error) {
    console.log('Erro ao obter o token:', data);
    return res.status(400).send('Erro ao obter o token.');
  }

  const accessToken = data.access_token;
  console.log('Access Token:', accessToken); // Depuração do token

  // Usar o token para pegar dados do usuário
  const userResponse = await fetch('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const userData = await userResponse.json();
  console.log('Dados do Usuário:', userData); // Depuração dos dados do usuário

  // Após a verificação, redireciona para o site final
  return res.redirect('https://xtsystemshop.vercel.app');
}
