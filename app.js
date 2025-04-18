// タブの切り替え
function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.style.display = 'none';
  });
  document.getElementById(tabId).style.display = 'block';
}

// 背景色を変更
function changeBackgroundColor() {
  const color = document.getElementById('bgColor').value;
  document.body.style.backgroundColor = color;
}

// Discordログイン (OAuth2)
async function loginWithDiscord() {
  const clientId = 'YOUR_DISCORD_CLIENT_ID';
  const redirectUri = encodeURIComponent(window.location.origin); // ログイン後に戻るURL
  const scope = 'identify';
  const authUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}`;
  window.location.href = authUrl;
}

// Discordプロフィール表示
async function fetchDiscordProfile(token) {
  const response = await fetch('https://discord.com/api/v10/users/@me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const profile = await response.json();
  document.getElementById('avatar').src = profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` : '';
  document.getElementById('username').textContent = `こんにちは、${profile.username}#${profile.discriminator}!`;
  document.getElementById('profile').style.display = 'block';
  document.getElementById('loginButton').style.display = 'none';
}

// ページロード時にトークンを確認
window.onload = () => {
  const hash = window.location.hash;
  if (hash.includes('access_token')) {
    const token = new URLSearchParams(hash.substring(1)).get('access_token');
    fetchDiscordProfile(token);
  }
};

// Webhook登録
document.getElementById('webhookForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const webhookUrl = document.getElementById('webhookUrl').value;

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: 'Webhookが正常に登録されました！' }),
    });

    if (response.ok) {
      document.getElementById('webhookStatus').textContent = 'Webhookが登録されました！';
    } else {
      document.getElementById('webhookStatus').textContent = '登録に失敗しました。URLを確認してください。';
    }
  } catch (error) {
    console.error('エラー:', error);
    document.getElementById('webhookStatus').textContent = 'エラーが発生しました。';
  }
});
