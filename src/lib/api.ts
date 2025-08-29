import { UploadStatus, ChatResponse, SourceChunk } from "../types";

let uploads: Record<string, UploadStatus> = {};

/** simulate uploading and processing */
export async function uploadDocument(file: File, title?: string): Promise<{ documentId: string }> {
  const id = "doc_" + Math.random().toString(36).slice(2, 9);
  uploads[id] = {
    documentId: id,
    status: "processing",
    progress: 0.05,
    preview: []
  };

  // simulate async processing
  // step progression
  const steps = [0.2, 0.45, 0.75, 1];
  steps.forEach((p, idx) => {
    setTimeout(() => {
      if (!uploads[id]) return;
      uploads[id].progress = p;
      // when last step, produce preview
      if (p === 1) {
        uploads[id].status = "ready";
        uploads[id].preview = [
          { chunkId: id + "_c1", text: "This is a sample extracted chunk from page 1 of the uploaded document. It contains critical instructions about product maintenance.", page: 1 },
          { chunkId: id + "_c2", text: "Installation details: follow steps 1..5 to mount the component. Note: torque spec is 5 Nm.", page: 2 },
          { chunkId: id + "_c3", text: "Warranty and legal text. Contact support if you see E1 fault code.", page: 13 }
        ];
      }
    }, 900 + idx * 800);
  });

  return new Promise((res) => setTimeout(() => res({ documentId: id }), 600));
}

export async function getUploadStatus(documentId: string): Promise<UploadStatus> {
  // simulate network latency
  await new Promise((r) => setTimeout(r, 200));
  const s = uploads[documentId];
  if (!s) throw new Error("NotFound");
  return s;
}

/** fake query: returns a ChatResponse using a combination of docs */
export async function queryChat(query: string, persona = "Default"): Promise<ChatResponse> {
  await new Promise((r) => setTimeout(r, 700)); // simulate embed & retrieval

  const baseSources: SourceChunk[] = [
    {
      chunkId: "c_demo_1",
      docId: "demo_doc",
      docTitle: "User Manual - Model X",
      page: 12,
      text: "To repair fault code E1, first ensure power is disconnected. Remove cover, replace filter according to instructions. If the fault persists, replace the sensor.",
      score: 0.92
    },
    {
      chunkId: "c_demo_2",
      docId: "demo_doc",
      docTitle: "Maintenance Guide",
      page: 5,
      text: "E1 is commonly caused by low pressure. Check hoses for blockage. Clean the inlet filter and retry.",
      score: 0.86
    }
  ];

  const answer = `Here are the suggested steps for your query (“${query}”):\n\n1. Power down the device and disconnect from mains.\n2. Open the service cover and inspect the inlet filter — clean or replace if clogged.\n3. Check hoses and connectors for kinks or blockages.\n4. Replace the sensor if the fault persists.\n\n(Top sources shown below.)`;

  return {
    answer,
    sources: baseSources,
    debug: { mysqlHits: 2, pineconeHits: 5, reRanked: 2 }
  };
}
