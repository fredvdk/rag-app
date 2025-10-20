
import { getSources } from "../actions/actions";

const Sources = async () => {
    const sources = await getSources();

    return (
        <>
            <hr className="my-2 w-full border-dotted mt-4" />
            <div className="text-sm text-left">Sources:</div>
            <div className="mb-6 text-sm text-gray-600">
                <ul className="list-disc list-inside">
                    {sources.map((source, index) => (
                        <li key={index} className="mb-1">
                            {source}
                        </li>
                    ))}
                </ul>
            </div>
            
        </>
    );
}

export default Sources;