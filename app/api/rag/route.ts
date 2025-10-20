import { NextResponse } from 'next/server';
import { getAnswer } from '@/app/actions/actions';

export async function POST(req: Request) {
  try {
    const { question, history = [] } = await req.json();

    if (!question) {
      return NextResponse.json(
        { error: 'Missing question in request body' },
        { status: 400 }
      );
    }

    const { answer, sources } = await getAnswer(question, history);
  


    return NextResponse.json({
      answer,
      sources: sources.map((doc) => ({
        source: doc.metadata?.source ?? 'unknown',
        preview: (doc.pageContent ?? '').slice(0, 200) + '...',
      })),
    });
  } catch (err) {
    console.error('Error in POST /api/ask:', err);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
