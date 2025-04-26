export default async function handler(req, res) {
  const code = req.query.code;

  if (!code) {
    console.log("Código não encontrado.");
    return res.status(400).send('Sem código');
  }

  const params = new URLSearchParams();
  params.append('client_id', '1351391324884172821'); // Seu Client ID
  params.append('client_secret', 'SEU_CLIENT_SECRET'); // Substitua pelo seu Client Secret
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', 'https://xtsystemverificar.vercel.app'); // URI de verificação

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
    console.log("Erro ao obter access token:", data);
    return res.status(400).send('Erro no login');
  }

  // Requisição para obter dados do usuário no Discord
  const userResponse = await fetch('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${data.access_token}`
    }
  });

  const userData = await userResponse.json();
  console.log("Usuário autenticado:", userData);

  // Agora, após a autenticação bem-sucedida, redirecionamos para o site final
  return res.redirect('https://xtsystemshop.vercel.app'); // Redirecionamento para o site final
}

