const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    try{
        const transporter = nodemailer.createTransport({
            service: 'gmail', // small letter
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        
        // Connection check
        await transporter.verify();
        
        const mailOptions = {
            from: `"Shopix" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html: `
              <div style="font-family:Inter,sans-serif; background:#0a0a0a; color:#fff; padding:40px; border-radius:24px; text-align:center">
                <h1 style="font-weight:900; letter-spacing:-2px; margin:0">SHOPIX</h1>
                <p style="color:#888; margin-top:10px">${subject}</p>
                <div style="background:#fff; color:#000; font-size:36px; font-weight:900; letter-spacing:8px; padding:18px; border-radius:16px; margin:25px 0">${text.match(/\d{6}/)?.[0] || text}</div>
                <p style="color:#666; font-size:12px">Valid for 5 minutes. Don't share.</p>
              </div>
            `
        };
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.messageId);
        return true;
    } catch (error) {
        console.log("REAL ERROR:", error.message);
        throw error; // eta important, nahole controller bujhte parbe na fail koreche
    }
}

module.exports = sendEmail;