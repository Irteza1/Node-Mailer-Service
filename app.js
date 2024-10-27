require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port =process.env.PORT || 3200 ; // You can change this to any port you prefer

// Middleware to parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Create a route to handle sending emails
app.get('/', async (req, res) => {
  res.status(200).json({ message: 'server working' });

})
app.post('/send-email', async (req, res) => {
  try {
    const { from, subject, text } = req.body;
    const email = process.env.EMAIL_USER
    const password = process.env.EMAIL_PASSWORD

    // Create a transporter object using Gmail SMTP
    const transporter = nodemailer.createTransport({
        service: "gmail",
        debug:true,
      auth: {
        user: email, // Replace with your Gmail address
        pass: password  , // Replace with your Gmail password (consider using an app-specific password)
      },
    });

    // Email data
    const mailOptions = {
      from,
      to: 'mirchi.fi@gmail.com',
      subject,
      text,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while sending the email' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
