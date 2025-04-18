document.getElementById('webhookForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const webhookUrl = document.getElementById('webhookUrl').value;
  const message = document.getElementById('message').value;

  if (!webhookUrl || !message) {
    alert('Webhook URLとメッセージを入力してください！');
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message }),
    });

    if (response.ok) {
      alert('メッセージが送信されました！');
    } else {
      alert('エラーが発生しました。URLを確認してください。');
    }
  } catch (error) {
    console.error('送信エラー:', error);
    alert('送信に失敗しました。');
  }
});
