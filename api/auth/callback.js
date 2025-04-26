export default async function handler(req, res) {
  const code = req.query.code;

  if (!code) return res.status(400).send('Sem código');

  const params = new URLSearchParams();
  params.append('client_id', '1351391324884172821'); // Seu Client ID do Discord
  params.append('client_secret', 'xBWOR-RMOvkWAOG1h3gTenstL-pGFt0n'); // Substitua pelo seu Client Secret
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', 'https://xtsystemverificar.vercel.app');

  const response = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    body: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  const data = await response.json();

  if (!data.access_token) return res.status(400).send('Erro no login');

  const userResponse = await fetch('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${data.access_token}`
    }
  });

  const userData = await userResponse.json();

  // Agora que pegamos os dados do usuário, redirecionamos para o site final
  res.redirect('https://xtsystemshop.vercel.app');
}
