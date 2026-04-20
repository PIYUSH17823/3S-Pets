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

module.exports = {
    sendEnquiryEmail
};
