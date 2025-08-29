// src/components/SacredUploadDropzone.tsx
import React, { useState } from "react";
import { useDropzone } from 'react-dropzone';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

export default function SacredUploadDropzone({ onUpload }: { onUpload?: (f: File) => void }) {
  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      onUpload?.(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'application/pdf': ['.pdf'], 'text/plain': ['.txt'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']} });

  return (
    <div 
      {...getRootProps()}
      className={`p-12 border-2 border-dashed rounded-xl text-center cursor-pointer transition-colors
      ${isDragActive ? 'border-sacred-primary bg-sacred-primary/10' : 'border-sacred-secondary/50 bg-white'}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center text-sacred-text/70">
          <CloudArrowUpIcon className="w-16 h-16 mb-4 text-sacred-secondary" />
          <p className="text-lg font-semibold">Drag & Drop Files Here</p>
          <p>or Click to Upload</p>
      </div>
    </div>
  );
}