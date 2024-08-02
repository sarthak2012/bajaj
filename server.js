const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// POST method endpoint
app.post('/bfhl', (req, res) => {
    const { full_name, dob, email, roll_number, data } = req.body;

    if (!full_name || !dob || !email || !roll_number || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: 'Invalid input' });
    }

    const user_id = `${full_name.split(' ').join('_')}_${dob.split('/').join('')}`;

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => typeof item === 'string' && /^[a-zA-Z]$/.test(item));

    let highest_alphabet = [];
    if (alphabets.length > 0) {
        highest_alphabet.push(alphabets.reduce((max, current) => 
            current.toLowerCase() > max.toLowerCase() ? current : max));
    }

    res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_alphabet
    });
});

// GET method endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
