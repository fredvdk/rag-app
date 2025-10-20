import { ChatMsg } from "../actions/actions";

interface HistoryProps {
    history: ChatMsg[];
}

const History = ({ history }: HistoryProps) => {
    return (
        <div className="mt-6 w-full max-w-2xl mx-auto">
            <div className="space-y-3">
                {history.map((item, index) => (
                    <div
                        key={index}
                        className={`flex ${item.role === "user" ? "justify-end" : "justify-start"
                            }`}
                    >
                        <div
                            className={`px-4 py-2 rounded-2xl max-w-[75%] shadow-sm ${item.role === "user"
                                    ? "bg-blue-500 text-white rounded-br-none"
                                    : "bg-gray-200 text-gray-900 rounded-bl-none"
                                }`}
                        >
                            {item.content}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default History;
