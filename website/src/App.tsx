import { useState } from "react";

export default function UploadPage() {
  const [preview, setPreview] = useState<string | undefined>(undefined);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
    sendBlobDirectly(URL.createObjectURL(file))
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <input type="file" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Preview" style={{ maxWidth: "200px" }} />}
    </div>
  );
}

async function sendBlobDirectly(blobUrl: string) {
  // 获取 Blob 数据
  const response = await fetch(blobUrl);
  const blob = await response.blob();

  // 转换为 ArrayBuffer 并发送到后端
  const formData = new FormData();
  formData.append("file", blob, "uploaded_image.png");

  const uploadResponse = await fetch("https://contribution-days-backend.onrender.com/api/upload", {
    method: "POST",
    body: formData,
  });

  const result = await uploadResponse.json();
  console.log(result);
}
