import React, { useRef, useState } from "react";

interface UploadAreaProps {
  onUpload: (files: string) => void;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const uploadImg = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5NiIgaGVpZ2h0PSI5NiIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZyBmaWxsPSJub25lIiBzdHJva2U9IiM1ZTVlNWUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyIj48cGF0aCBzdHJva2UtZGFzaGFycmF5PSIyIDQiIHN0cm9rZS1kYXNob2Zmc2V0PSI2IiBkPSJNMTIgMjFjLTQuOTcgMCAtOSAtNC4wMyAtOSAtOWMwIC00Ljk3IDQuMDMgLTkgOSAtOSI+PGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ic3Ryb2tlLWRhc2hvZmZzZXQiIGR1cj0iMC42cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIHZhbHVlcz0iNjswIi8+PC9wYXRoPjxwYXRoIHN0cm9rZS1kYXNoYXJyYXk9IjMyIiBzdHJva2UtZGFzaG9mZnNldD0iMzIiIGQ9Ik0xMiAzYzQuOTcgMCA5IDQuMDMgOSA5YzAgNC45NyAtNC4wMyA5IC05IDkiPjxhbmltYXRlIGZpbGw9ImZyZWV6ZSIgYXR0cmlidXRlTmFtZT0ic3Ryb2tlLWRhc2hvZmZzZXQiIGJlZ2luPSIwLjFzIiBkdXI9IjAuNHMiIHZhbHVlcz0iMzI7MCIvPjwvcGF0aD48cGF0aCBzdHJva2UtZGFzaGFycmF5PSIxMCIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjEwIiBkPSJNMTIgMTZ2LTcuNSI+PGFuaW1hdGUgZmlsbD0iZnJlZXplIiBhdHRyaWJ1dGVOYW1lPSJzdHJva2UtZGFzaG9mZnNldCIgYmVnaW49IjAuNXMiIGR1cj0iMC4ycyIgdmFsdWVzPSIxMDswIi8+PC9wYXRoPjxwYXRoIHN0cm9rZS1kYXNoYXJyYXk9IjYiIHN0cm9rZS1kYXNob2Zmc2V0PSI2IiBkPSJNMTIgOC41bDMuNSAzLjVNMTIgOC41bC0zLjUgMy41Ij48YW5pbWF0ZSBmaWxsPSJmcmVlemUiIGF0dHJpYnV0ZU5hbWU9InN0cm9rZS1kYXNob2Zmc2V0IiBiZWdpbj0iMC43cyIgZHVyPSIwLjJzIiB2YWx1ZXM9IjY7MCIvPjwvcGF0aD48L2c+PC9zdmc+"

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

    const file = files[0];
    onUpload(URL.createObjectURL(file));
  };

  const handleUploadClick = () => {
    if (fileInputRef.current && "click" in fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    onUpload(URL.createObjectURL(files[0]));
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
      <img src={uploadImg} alt="upload" />
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

export default UploadArea;
