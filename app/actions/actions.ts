'use server';

import { createClient } from '@supabase/supabase-js';
import { OpenAIEmbeddings } from '@langchain/openai';
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import OpenAI from 'openai';

import 'dotenv/config';

const getSources = async (): Promise<string[]> => {
  const client = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY! // only safe on server
  );

  const { data, error } = await client.from('documents').select('metadata');

  if (error) {
    console.error('Error retrieving sources:', error);
    return [];
  }

  const uniqueSources = Array.from(
    new Set(data?.map((item) => item.metadata?.source).filter(Boolean))
  );

  return uniqueSources;
};

interface AnswerResponse {
  answer: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sources: any[];
}

export interface ChatMsg {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const getAnswer = async (question: string, history: ChatMsg[]): Promise<AnswerResponse> => {
  // Supabase client (server-side only!)
  const client = createClient(
    process.env.SUPABASE_URL!,
     process.env.SUPABASE_ANON_KEY! // only safe on server
  );

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // 1. Embed the question
  const embeddings = new OpenAIEmbeddings({
    model: 'text-embedding-3-small',
  });

  // 2. Query Supabase vector store (top 3 matches)
  const vectorStore = new SupabaseVectorStore(embeddings, {
    client: client,
    tableName: 'documents',
    queryName: 'match_documents',
  });

  const results = await vectorStore.similaritySearch(question, 3); // top 3 docs

  // 3. Merge contexts
    const context = results
      .map(
        (doc, i) =>
          `Source ${i + 1} (${doc.metadata?.source || 'unknown'}):\n${
            doc.pageContent
          }`
      )
      .join('\n\n');
  
    const messages: ChatMsg[] = [
      { role: 'system', content: 'Gedraag je als een behulpzame assistent, geef zoveel mogelijk informatie en context' },
      { role: 'user', content: 'Gedraag je als iemand werkzaam in het onderwijs met vragen over de pensioenregeling in het Vlaams onderwijs' },
      ...history,
      {
        role: 'user',
        content: `Gebruik de volgende context voor je antwoord op de vraag:\n\nContext:${context}\n\nVraag: ${question}`,
      },
    ];  

    // 4. Send context + question to GPT
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
    });

    return ({"answer" : completion.choices[0].message.content, "sources": results})

}



export { getSources, getAnswer };
