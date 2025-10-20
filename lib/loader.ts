import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Document } from 'langchain/document';
import { addToDatabase } from './database';
import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';

const loadWebsite = async (url: string) => {
  const loader = new CheerioWebBaseLoader(url);
  const docs = await loader.load();
  console.log(`Loaded ${docs.length} documents from website ${url}.`);
  const chunks = await chunkDocs(docs, 1000, 200);
  await addToDatabase(chunks);
  return;
};

const loadPDF = async (filePath: string) => {
  const loader = new PDFLoader(filePath, { splitPages: true });
  const docs = await loader.load();
  console.log(`Loaded ${docs.length} documents from PDF.`);
  const chunks = await chunkDocs(docs, 1000, 200);
  await addToDatabase(chunks);
  return;
};

const chunkDocs = async (
  docs: Document[],
  chunkSize = 1000,
  overlap = 200
): Promise<Document[]> => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize,
    chunkOverlap: overlap,
  });
  const all_splits = await splitter.splitDocuments(docs);
  console.log(`Split documents into ${all_splits.length} sub-documents.`);
  return all_splits;
};



export { loadWebsite, loadPDF };
