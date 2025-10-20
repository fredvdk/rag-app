'use server';

import { OpenAIEmbeddings } from '@langchain/openai';
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';
import { Document } from 'langchain/document';

const deleteAll = async () => {
  const client = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY! // use service role for writes
  );
  await client.from('documents').delete().neq('id', 0); // delete all rows
  console.log('Deleted all rows from supabase');
};

const addToDatabase = async (docs: Document[]) => {
  const client = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY! // use service role for writes
  );

  const embeddings = new OpenAIEmbeddings({
    model: 'text-embedding-3-small',
  });

  try {
    await SupabaseVectorStore.fromDocuments(docs, embeddings, {
      client,
      tableName: 'documents',
      queryName: 'match_documents',
    });
    console.log('Added docs to supabase');
  } catch (error) {
    console.error('Error adding documents to database:', error);
  }
};

const getSources = async (): Promise<string[]> => {
  const client = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );

  const { data, error } = await client.from('documents').select('metadata');

  if (error) {
    console.error('Error retrieving sources:', error);
    return [];
  }

  const uniqueSources = Array.from(
    new Set(data?.map((item) => item.metadata?.source).filter(Boolean))
  );

  console.log('Retrieved sources from supabase:', uniqueSources);
  return uniqueSources;
};

export { addToDatabase, deleteAll, getSources };
