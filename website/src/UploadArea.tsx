import React, { useRef, useState } from "react";
import { uploadImage } from "./utils";

interface UploadAreaProps {
  onUpload: (files: File) => void;
}

export default function UploadArea({ onUpload }: UploadAreaProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    onUpload(files[0]);
  };

  const handleUploadClick = () => {
    if (fileInputRef.current && "click" in fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    onUpload(files[0]);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleUploadClick}
      style={{
        border: isDragging ? "2px dashed #007BFF" : "2px dashed #ccc",
        borderRadius: "16px",
        padding: "20px",
        transition: "border-color 0.3s",
        backgroundColor: isDragging ? "#f7faff" : "white",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <img src={uploadImage} alt="upload" />
      <p style={{ marginTop: "20px" }}>
        {isDragging ? "Release the files to upload" : "Drag files here or click to select"}
      </p>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{display: "none"}}
        onChange={handleFileChange}
      />
    </div>
  );
};
