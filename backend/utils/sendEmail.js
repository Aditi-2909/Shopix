const sendEmail = async (to, subject, text) => {
  const otp = text.match(/\d{6}/)?.[0] || text;
  
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Shopix <onboarding@resend.dev>',
      to: [to],
      subject: subject,
      html: `
        <div style="font-family:sans-serif; background:#0a0a0a; color:#fff; padding:40px; border-radius:24px; text-align:center">
          <h1 style="font-weight:900; letter-spacing:-2px; margin:0">SHOPIX</h1>
          <p style="color:#888;">${subject}</p>
          <div style="background:#fff; color:#000; font-size:36px; font-weight:900; letter-spacing:8px; padding:18px; border-radius:16px; margin:25px 0">${otp}</div>
          <p style="color:#666; font-size:12px">Valid for 5 minutes</p>
        </div>
      `
    })
  });

  const data = await response.json();
  console.log("Resend response:", data);
  
  if (!response.ok) throw new Error(JSON.stringify(data));
  
  return true;
}

module.exports = sendEmail;