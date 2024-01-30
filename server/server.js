const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;
// You should put your own API key here
const OPENAI_API_KEY = '';

app.use(cors());
app.use(bodyParser.json());
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
const aiModel = 'gpt-3.5-turbo';

app.post('/api/convert', async (req, res) => {
    try {
        const hexCode = req.body.hexCode;
        if (!isValidHex(hexCode)) {
            // 406 Not Acceptable
            // just learned it from the ongoing web course
            // not sure if it is a correct usage
            return res.status(406).json({ error: 'Invalid hex code format' });
        }

        const completion = await openai.chat.completions.create({
            model: aiModel,
            // I only need the name of the color
            max_tokens: 7,
            messages: [{
                role: 'user',
                content: `Convert ${hexCode} to an English color name. Answer the color name only. At most 5 words.`
            }]
        });

        const aiResponse = completion.choices[0].message.content;
        res.json({ response: aiResponse });
        console.log(aiResponse);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

function isValidHex(hexCode) {
    // #rrggbb 
    return /^#([0-9A-F]{6})/i.test(hexCode);
}

app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`)
})