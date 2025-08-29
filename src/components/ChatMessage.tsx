// src/components/ChatMessage.tsx
import React from "react";
import { SourceChunk } from "../types";

export function SourceChip({ chunk, onClick }: { chunk: SourceChunk; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-xs px-2.5 py-1 rounded-full bg-sacred-dark/10 hover:bg-sacred-dark/20 text-sacred-dark font-medium inline-flex items-center gap-2 transition-colors"
    >
      📄 {chunk.docTitle} • p.{chunk.page ?? "?"}
    </button>
  );
}

export default function ChatMessage({
  role,
  text,
  sources,
  onSourceClick
}: {
  role: "assistant" | "user";
  text: string;
  sources?: SourceChunk[];
  onSourceClick?: (s: SourceChunk) => void;
}) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="bg-sacred-secondary/90 text-black rounded-xl rounded-br-none px-5 py-3 max-w-[70%] whitespace-pre-wrap shadow-md">
          {text}
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-start">
      <div className="bg-sacred-light text-sacred-text rounded-xl rounded-bl-none p-4 max-w-[75%] shadow-sm">
        <div className="whitespace-pre-wrap text-sm">{text}</div>

        {sources && sources.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2 border-t border-sacred-dark/10 pt-3">
            {sources.map((s) => (
              <SourceChip key={s.chunkId} chunk={s} onClick={() => onSourceClick?.(s)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}