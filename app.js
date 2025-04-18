// ミニタブ予告を閉じる関数
function closeUpdateNotice() {
  const notice = document.getElementById('updateNotice');
  if (notice) {
    notice.style.display = 'none';
  }
}

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
  const clientId = '1362708781246578698';
  const redirectUri = encodeURIComponent('https://aerser.github.io/Fnjack/'); // ログイン後に戻るURL
  const scope = 'identify';
  const authUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}`;
  window.location.href = authUrl;
}
