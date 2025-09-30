import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import { askAI } from "../../geminiTest";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await askAI(input);
      setMessages((prev) => [...prev, { sender: "ai", text: response }]);
    } catch {
      setMessages((prev) => [...prev, { sender: "ai", text: "Error fetching response." }]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Small Button */}
      {!isOpen && (
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 
                     text-white flex items-center justify-center shadow-lg hover:opacity-90"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle size={22} />
        </motion.button>
      )}

      {/* Full Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 w-[90%] md:w-[350px] h-[500px] bg-white shadow-xl 
                       rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
              <h2 className="text-sm font-semibold">AI Assistant</h2>
              <button onClick={() => setIsOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg max-w-[75%] ${
                    msg.sender === "user"
                      ? "ml-auto bg-indigo-100 text-gray-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-2 border-t flex items-center gap-2">
              <input
                type="text"
                className="flex-1  text-gray-900 placeholder-gray-400 text-sm p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
              />
              <button
                onClick={handleSend}
                className="px-3 py-1 bg-indigo-500 text-white text-sm rounded-lg hover:bg-indigo-600"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
