export type DocStatus = "processing" | "ready" | "failed" | "uploaded";

export type UploadStatus = {
  documentId: string;
  status: DocStatus;
  progress?: number; // 0..1
  preview?: { chunkId: string; text: string; page?: number }[];
};

export type SourceChunk = {
  chunkId: string;
  docId: string;
  docTitle: string;
  page?: number;
  text: string;
  score?: number;
};

export type ChatResponse = {
  answer: string;
  sources: SourceChunk[];
  debug?: { mysqlHits?: number; pineconeHits?: number; reRanked?: number };
};
