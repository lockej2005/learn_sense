const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const openai = require('openai');

// Set up OpenAI API
const openaiApi = new openai.OpenAIApi('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');
openaiApi.organization = 'org-vJrKrDqPI0B1YS294e4313fA';


// Function to upload a file to OpenAI
async function uploadFile(filePath) {
  const data = new FormData();
  data.append('file', fs.createReadStream(filePath));

  const response = await axios.post('https://api.openai.com/v1/files', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${openaiApi.apiKey}`,
    },
  });

  return response.data.id;
}

// Function to wait for fine-tuning to complete
async function waitForFineTuning(fileId) {
  while (true) {
    const response = await openaiApi.listFiles();
    const file = response.files.find((file) => file.id === fileId);

    if (file.status === 'ready') {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
}

// Function to start fine-tuning
async function startFineTuning(fileId) {
  const trainingConfig = {
    dataset: {
      file: fileId,
      use_partial_upload: true,
    },
    model: {
      'gpt-3.5-turbo': true,
    },
    n_iterations: 100,
    save_every: 25,
    overwrite: true,
    training_options: {
      batch_size: 4,
      learning_rate: 5e-5,
    },
  };

  const response = await openaiApi.createFineTuneTraining(trainingConfig);
  const fineTuneId = response.id;

  return fineTuneId;
}

// Function to wait for fine-tuning to complete
async function waitForFineTuningCompletion(fineTuneId) {
  while (true) {
    const response = await openaiApi.getFineTuneTraining(fineTuneId);

    if (response.status === 'succeeded') {
      return response;
    } else if (response.status === 'failed') {
      throw new Error(`Fine-tuning failed: ${response.error}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
}

// Function to run the fine-tuned model
async function runFineTunedModel(prompt) {
  const response = await openaiApi.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
  });

  const generatedText = response.choices[0].text.trim();
  return generatedText;
}

// Main function to orchestrate the fine-tuning and running of the fine-tuned model
async function main() {
  try {
    // Step 1: Upload the training data file
    const fileId = await uploadFile('C:/Users/fired/OneDrive/All/Documents/Repositories/learn_sense/src/api/dataset-lthiyugjpvpe.jsonl');
    console.log(`File uploaded successfully with ID: ${fileId}`);

    // Step 2: Wait for fine-tuning to complete
    await waitForFineTuning(fileId);
    console.log('Fine-tuning completed.');

    // Step 3: Start fine-tuning
    const fineTuneId = await startFineTuning(fileId);
    console.log(`Fine-tuning started with ID: ${fineTuneId}`);

    // Step 4: Wait for fine-tuning to complete
    const fineTuneResponse = await waitForFineTuningCompletion(fineTuneId);
    console.log('Fine-tuning succeeded.');

    // Step 5: Save the fine-tuned model
    const fineTunedModelId = fineTuneResponse.model;

    // Step 6: Run the fine-tuned model
    const prompt = 'What is the meaning of life?';
    const generatedText = await runFineTunedModel(prompt);
    console.log(`Generated text: ${generatedText}`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Run the main function
main();
