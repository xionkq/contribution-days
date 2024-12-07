import { useState } from "react";
import UploadArea from "./Upload";
import { sendBlobDirectly } from "./fetch";

export default function App() {
  const [days, setDays] = useState(0)

  const onUploadHandler = async (url: string) => {
    const res = await sendBlobDirectly(url)
    setDays(res.days)
  }

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ marginTop: "100px" }}>Your contribution days are: {days}</h1>
      <UploadArea onUpload={onUploadHandler} />
    </div>
  );
}
