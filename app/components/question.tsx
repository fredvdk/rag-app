"use client";

import { useState } from "react";
import History from "./history";
import { ChatMsg } from "../actions/actions";

const Question = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [history, setHistory] = useState<ChatMsg[]>([]);

  const ask = async () => {
    setQuestion("Thinking...");
    const response = await fetch('/api/rag', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, history }),
    });

    const data = await response.json();
    setAnswer(data.answer);
    setHistory([...history, { role: 'user', content: question }, { role: 'assistant', content: data.answer }]);
    setQuestion("");
  }

  return (
    <>
      {history.length > 0 && (
        <History history={history} />
      )}
      <div className="flex flex-row w-full mt-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          ask();
        }
          }}
          placeholder="Stel je vraag..."
          className="border p-2 w-full rounded"
        />
        <button
          onClick={ask}
          className="bg-blue-600 text-white px-4 mx-2 rounded"
        >
          Ask
        </button>
      </div>
    </>);
};

export default Question;