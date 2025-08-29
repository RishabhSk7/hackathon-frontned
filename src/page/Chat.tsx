import React, { useState } from "react";
import ChatMessage from "../components/ChatMessage";
import { queryChat } from "../lib/api";
import { ChatResponse, SourceChunk } from "../types";
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'; // Example icon

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string; sources?: SourceChunk[] }[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [inspector, setInspector] = useState<SourceChunk | null>(null);


  async function sendQuery() {
    if (!q.trim()) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setQ("");
    setLoading(true);

    // Show ephemeral pipeline message
    setMessages((m) => [...m, { role: "assistant", text: "Running hybrid retrieval… (semantic + keyword search)" }]);

    try {
      const res: ChatResponse = await queryChat(q);
      // remove last ephemeral and append real answer
      setMessages((m) => {
        const withoutEphemeral = m.slice(0, -1);
        return [...withoutEphemeral, { role: "assistant", text: res.answer, sources: res.sources }];
      });
    } catch (err) {
      setMessages((m) => {
        const withoutEphemeral = m.slice(0, -1);
        return [...withoutEphemeral, { role: "assistant", text: "Error fetching answer. Try again." }];
      });
    } finally {
      setLoading(false);
    }
  }

  function openSource(s: SourceChunk) {
    setInspector(s);
  }

  return (
    <div className="flex flex-col h-full bg-theme-bg">
      <div className="flex-1 overflow-y-auto space-y-6 px-6 py-8">
        {messages.length === 0 && (
          <div className="text-center text-theme-muted">Let's plan your next adventure!</div>
        )}
        <div className="flex flex-col gap-4">
          {messages.map((m, i) => (
            <ChatMessage key={i} role={m.role} text={m.text} sources={m.sources} onSourceClick={openSource} />
          ))}
        </div>
      </div>

      <div className="border-t border-theme-border p-4 bg-white/50">
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ask me about your next adventure..."
            className="w-full px-5 py-3 bg-theme-bg rounded-full focus:outline-none focus:ring-2 focus:ring-sky-200 text-theme-text"
            onKeyDown={(e) => { if (e.key === "Enter" && !loading) sendQuery(); }}
          />
          <button 
            onClick={sendQuery} 
            className="p-3 btn-primary rounded-full disabled:opacity-50" 
            disabled={loading || !q.trim()}
          >
            <PaperAirplaneIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Source Inspector styling can also be updated if needed */}
    </div>
  );
}
