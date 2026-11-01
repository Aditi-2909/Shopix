const sendEmail = async (to, subject, text) => {
  const otp = text.match(/\d{6}/)?.[0] || text;

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sender: { name: "Shopix", email: "replyaditi01@gmail.com" },
      to: [{ email: to }],
      subject: subject,
      htmlContent: `<div style="background:#0a0a0a;color:#fff;padding:40px;border-radius:24px;text-align:center"><h1>SHOPIX</h1><div style="background:#fff;color:#000;font-size:32px;font-weight:900;letter-spacing:8px;padding:16px;border-radius:12px;margin:20px 0">${otp}</div></div>`
    })
  });

  const data = await response.json();
  console.log("Brevo response:", data);
  if (!response.ok) throw new Error(JSON.stringify(data));
  return true;
}

module.exports = sendEmail;