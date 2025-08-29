import React, { useRef, useState } from "react";
import { uploadDocument, getUploadStatus } from "../lib/api";
import { UploadStatus } from "../types";
import SacredUploadDropzone from "../components/SacredUploadDropzone";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus | null>(null);
  const [uploading, setUploading] = useState(false);
  const pollRef = useRef<number | null>(null);

  async function handleUpload() {
    if (!file) return;
    setUploading(true);
    try {
      const r = await uploadDocument(file, file.name);
      pollStatus(r.documentId);
    } catch (err) {
      alert("Upload error");
      setUploading(false);
    }
  }

  async function pollStatus(documentId: string) {
    const poll = async () => {
      try {
        const s = await getUploadStatus(documentId);
        setStatus(s);
        if (s.status === "processing") {
          pollRef.current = window.setTimeout(poll, 1200);
        } else {
          setUploading(false);
          if (pollRef.current) window.clearTimeout(pollRef.current);
        }
      } catch (e) {
        setUploading(false);
      }
    };
    poll();
  }

  return (
    <div className="p-6 bg-theme-bg h-full">
      <h2 className="text-2xl font-bold text-theme-text mb-6">Upload Document</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <SacredUploadDropzone onUpload={(f) => { setFile(f); setStatus(null); }} />

          {file && !status && (
             <div className="mt-4 p-4 rounded-lg glass-card">
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-theme-muted">Ready to upload</p>
             </div>
          )}

          <div className="mt-6">
            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="px-6 py-3 btn-primary rounded-lg shadow-md hover:bg-theme-primary/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {uploading ? "Uploading..." : "Upload & Extract"}
            </button>
          </div>

          {status && (
            // Status and Preview section styled...
            <div className="mt-6 p-4 rounded-lg glass-card">
               {/* ... same content as before, but it will inherit better styles now */}
            </div>
            )}
            </div>
    
            <aside className="glass-card p-6">
              <h4 className="text-lg font-semibold text-theme-text">Metadata</h4>
              <div className="mt-4 flex flex-col gap-4">
                <div>
                    <label className="text-sm font-medium text-theme-muted">Title (optional)</label>
                    <input className="mt-1 w-full border-theme-border rounded-md px-3 py-2 bg-theme-bg focus:ring-sky-200 focus:border-sky-200" />
                </div>
                 <div>
                    <label className="text-sm font-medium text-theme-muted">Tags</label>
                    <input className="mt-1 w-full border-theme-border rounded-md px-3 py-2 bg-theme-bg focus:ring-sky-200 focus:border-sky-200" placeholder="flights, hotels..." />
                </div>
                <button className="mt-4 w-full px-4 py-2.5 bg-theme-secondary text-white font-semibold rounded-lg hover:bg-theme-secondary/90">Approve & Index</button>
              </div>
            </aside>
          </div>
        </div>
  );
}