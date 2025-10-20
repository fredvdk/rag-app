import 'cheerio';
import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';


const webSiteLoader = async (url: string): Promise<string> => {
  //const pTagSelector = 'p, div, li, span'; // Select text within <p>, <div>, <li>, and <span> tags
  const loader = new CheerioWebBaseLoader(url);
  const docs = await loader.load();
  console.assert(docs.length === 1);
  console.assert(docs[0].pageContent.length > 100);
  console.log(`Using <p> tags as text chunks from the website ${url}`);
  console.log(`Total characters from website: ${docs[0].pageContent.length}`);
  return docs[0].pageContent;
};

const chunkText = async (text: string, chunkSize = 1000, overlap = 200): Promise<string[]> => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize, 
    chunkOverlap: overlap,
  });
  const all_splits = await splitter.splitText(text);
  console.log(`Split blog post into ${all_splits.length} sub-documents.`);
  return all_splits;
}



function cosineSimilarity(a: number[], b: number[]) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
}

export { webSiteLoader, chunkText, cosineSimilarity };
