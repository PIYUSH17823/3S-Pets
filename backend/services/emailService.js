const nodemailer = require('nodemailer');

// For development/demo, we can use a test account or environment variables
// In production, the client will provide their SMTP (Gmail/Outlook/Zoho) details
const transporter = nodemailer.createTransport({
    service: 'gmail', // Standard choice, can be changed
    auth: {
        user: process.env.EMAIL_USER || 'your-client-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

const sendEnquiryEmail = async (enquiryData) => {
    const { fullName, petInfo, email, phone, message } = enquiryData;

    const mailOptions = {
        from: `"3S PETS Website" <${process.env.EMAIL_USER}>`,
        to: process.env.CLIENT_EMAIL || 'client-destination@gmail.com', // Where the client receives leads
        subject: `🐾 New Enquiry: ${fullName} (${petInfo})`,
        replyTo: email, // This allows the client to just hit "Reply" in their email app!
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
                <h2 style="color: #E63946;">New 3S PETS Lead</h2>
                <p><strong>Customer Name:</strong> ${fullName}</p>
                <p><strong>Pet Info:</strong> ${petInfo}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>WhatsApp:</strong> ${phone || 'Not provided'}</p>
                <hr style="border: 0; border-top: 1px solid #eee;">
                <p><strong>Message:</strong></p>
                <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
                <br>
                <p style="font-size: 12px; color: #888;">This inquiry was sent from the 3S PETS website Contact Form.</p>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return true;
    } catch (error) {
        console.error('Nodemailer Error:', error);
        // We still return true or a custom status because the DB save was successful
        return false;
    }
};

const sendBroadcastEmail = async (toEmail, subject, content) => {
    const mailOptions = {
        from: `"3S PETS" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: subject,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 20px; overflow: hidden;">
                <div style="background: #1D1D1F; padding: 40px; text-align: center;">
                    <h1 style="color: #E63946; margin: 0; font-size: 28px; letter-spacing: -1px;">3S PETS.</h1>
                    <p style="color: #888; font-size: 10px; margin-top: 10px; text-transform: uppercase; letter-spacing: 2px;">Happy Pets, Happy Home</p>
                </div>
                <div style="padding: 40px; line-height: 1.6; color: #4A4A4A;">
                    <h2 style="color: #1D1D1F; margin-top: 0;">Hey there, human pal! 🐾</h2>
                    <p>${content.replace(/\n/g, '<br>')}</p>
                    <div style="margin-top: 40px; padding-top: 20px; border-t: 1px solid #eee; text-align: center;">
                        <a href="${process.env.WEBSITE_URL || '#'}" style="background: #E63946; color: white; padding: 15px 30px; text-decoration: none; border-radius: 12px; font-weight: bold; display: inline-block;">Visit Our Shop</a>
                    </div>
                </div>
                <div style="background: #f9f9f9; padding: 20px; text-align: center; font-size: 10px; color: #aaa;">
                    <p>© 2026 3S PETS | Pune, India</p>
                    <p>You received this because you are part of the 3S Community or have raised an enquiry.</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error(`Failed broadcast to ${toEmail}:`, error);
        return false;
    }
};

module.exports = {
    sendEnquiryEmail,
    sendBroadcastEmail
};
