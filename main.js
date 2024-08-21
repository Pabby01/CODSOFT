document.addEventListener('DOMContentLoaded', function() {
  let progressBars = document.querySelectorAll('.progress .progress-bar');

  progressBars.forEach(function(progressBar) {
      let value = progressBar.getAttribute('aria-valuenow');
      progressBar.style.width = value + '%';
  });
});


document.querySelectorAll('.circular-progress').forEach(function(el) {
  let percentage = el.getAttribute('data-percentage');
  el.style.setProperty('--percentage', percentage);
});
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/send', (req, res) => {
    const { name, email, message } = req.body;

    // Set up Nodemailer transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, // Your email address
            pass: process.env.PASSWORD // Your email password or app-specific password
        }
    });

    // Email options
    let mailOptions = {
        from: email,
        to: process.env.RECEIVER_EMAIL, // Where you want to receive emails
        subject: `New message from ${name}`,
        text: message,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong> ${message}</p>`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to send message, please try again later.' });
        }
        res.status(200).json({ success: 'Message sent successfully!' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

