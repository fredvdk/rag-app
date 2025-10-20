"use client";

import { useRouter } from "next/navigation";

const NavigateButton = ({ text, href }: { text: string; href: string }) => {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push(href)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 w-25"
        >
            {text}
        </button>
    );
}

export default NavigateButton
