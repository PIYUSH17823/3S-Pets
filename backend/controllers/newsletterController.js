const fs = require('fs');
const path = require('path');

const NEWSLETTER_FILE = path.join(__dirname, '../data/subscribers.json');

exports.subscribe = (req, res) => {
    try {
        const { email } = req.body;

        if (!email || !email.includes('@')) {
            return res.status(400).json({ error: 'Please provide a valid email address.' });
        }

        let subscribers = [];
        if (fs.existsSync(NEWSLETTER_FILE)) {
            const data = fs.readFileSync(NEWSLETTER_FILE);
            subscribers = JSON.parse(data);
        }

        // Check if already subscribed
        const lowerEmail = email.toLowerCase();
        if (subscribers.find(s => s.email.toLowerCase() === lowerEmail)) {
            return res.status(200).json({ message: 'Welcome back! You are already part of the community. 🐾' });
        }

        const newSubscriber = {
            email: lowerEmail,
            source: 'community',
            subscribedAt: new Date().toISOString()
        };

        subscribers.push(newSubscriber);
        fs.writeFileSync(NEWSLETTER_FILE, JSON.stringify(subscribers, null, 2));

        res.status(201).json({
            message: 'Welcome to the pack! You are now part of the 3S Community. 🐾',
            id: newSubscriber.id
        });
    } catch (error) {
        console.error("Newsletter Subscription Error:", error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};
