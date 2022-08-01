const express = require('express');
const axios = require('axios');
const app = express();

const apiKey = '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';
app.use(express.json());
app.use(express.static('public'));

app.post('/gpt3_proxy', async (req, res) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/engines/davinci-codex/completions',
            req.body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error calling GPT-3 API:', error);
        res.status(500).json({ error: 'An error occurred while generating text.' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));