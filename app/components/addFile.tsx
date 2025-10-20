"use client";

import { useState } from "react";

const AddFile = () => {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    
    const uploadFile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        const result = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });
        if (result.ok) {
            setMessage("File uploaded successfully!");
            setFile(null);
        } else {
            setMessage("File upload failed.");
        }
    };

    return (
        <form className="mb-6" onSubmit={uploadFile}>
            <p className="text-green-500 self-center">{message}</p>
            <div className="mb-4 flex flex-row space-x-2">
                <input
                    type="file"
                    id="source-file"
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 w-30"
                    
                >   
                    Upload
                </button>
            </div>
        </form>
    );
}
export default AddFile;