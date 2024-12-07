export async function sendBlobDirectly(blobUrl: string) {
  const response = await fetch(blobUrl);
  const blob = await response.blob();

  const formData = new FormData();
  formData.append("file", blob, "uploaded_image.png");

  const uploadResponse = await fetch("https://contribution-days-backend.onrender.com/api/upload", {
    method: "POST",
    body: formData,
  });

  return await uploadResponse.json()
}
