import { loadWebsite } from "@/lib/loader";

const POST = async (req: Request) => {
    const { url } = await req.json();
    if (!url) {
        return new Response('No URL provided', { status: 400 });
    }
    // Process the URL (e.g., fetch content, save to database, etc.)
     await loadWebsite(url);
    return new Response('URL added successfully to the database', { status: 200 }); 
}

export { POST };