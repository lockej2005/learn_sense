const express = require('express');
const openai = require('openai');

const app = express();
const port = 3001;

// Set up OpenAI API
const openaiApi = new openai.OpenAIApi(process.env.OPENAI_KEY);

// Endpoint to handle fine-tuned model requests
app.post('/api/fine-tuned-model', async (req, res) => {
  try {
    const { prompt } = req.body;

    // Make a request to the fine-tuned model
    const response = await openaiApi.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
    });

    // Extract the generated text from the response
    const generatedText = response.choices[0].text.trim();

    res.json({ result: generatedText });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
