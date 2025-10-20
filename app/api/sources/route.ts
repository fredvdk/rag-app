import { getSources } from '@/app/actions/actions';

const GET = async () => {
  const sources = await getSources();

  return new Response(JSON.stringify({ sources }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export { GET };
