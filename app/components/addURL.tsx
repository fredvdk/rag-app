"use client";

import { useState } from "react";


const AddURL = () => {
    const [url, setURL] = useState("");
    const [message, setMessage] = useState<string | null>(null);

    const addURL = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();     // ✅ prevent page reload
        if (!url) return;       // avoid sending empty
        setMessage(null);

        const result = await fetch('/api/addUrl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url }),
        });
        if (result.ok) {
            setMessage("URL added successfully!");
            setURL("");
        } else {
            setMessage("Failed to add URL.");
        }
    }

    return (
        <form onSubmit={addURL} className="mb-6">
            <p className="text-green-500 self-center">{message}</p>
            <div className="mb-4 flex flex-row space-x-2">
                
                <input
                    type="text"
                    id="url"
                    placeholder="Enter source URL"
                    value={url}
                    onChange={(e) => setURL(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 w-30"
                >
                    Add
                </button>
            </div>
        </form>);
};

export default AddURL;

