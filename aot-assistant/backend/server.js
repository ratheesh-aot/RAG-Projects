import dotenv from 'dotenv';
import express from 'express';
import { RAGApplicationBuilder, Ollama, YoutubeSearchLoader, SitemapLoader, CohereEmbeddings  } from '@llm-tools/embedjs';
import { LanceDb } from '@llm-tools/embedjs/vectorDb/lance';
import path from 'path';
import cors from 'cors';
import { LmdbCache } from '@llm-tools/embedjs/cache/lmdb';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3000;

let ragApplication;

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());


// Initialize the RAG application
async function initializeRagApplication() {
  ragApplication = await new RAGApplicationBuilder()
    .setCache(new LmdbCache({ path: path.resolve('./cache') }))
    .setEmbeddingModel(new CohereEmbeddings ())
    .setModel(new Ollama({
        modelName: "llama3",
        baseUrl: process.env.OLLAMA_API_URL
    }))
    .setVectorDb(new LanceDb({ path: path.resolve('/db') }))
    .addLoader(new SitemapLoader({ url: 'https://www.aot-technologies.com/sitemap_index.xml' }))
    .build();
}

// Endpoint to query the LLM
app.post('/query', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }
    const prompt = 'Answer the question. Avoid starting with `According to the context,`. Give answer as a human. \n'

    const response = await ragApplication.query(prompt + query);
    res.json({ response });
  } catch (error) {
    console.error('Error querying the LLM:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

// Start the server and initialize the RAG application
app.listen(port, async () => {
  await initializeRagApplication();
  console.log(`Server is running on http://localhost:${port}`);
});
