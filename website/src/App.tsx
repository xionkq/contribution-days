import React, { useState } from "react";
import UploadArea from "./UploadArea";
import { loadingImage, sendBlobDirectly } from "./utils";

export default function App() {
  const [days, setDays] = useState<number | null>(null)
  const [imgUrl, setImgUrl] = useState("")

  const onUploadHandler = async (file: File) => {
    setImgUrl(URL.createObjectURL(file))
    const res = await sendBlobDirectly(file)
    setDays(res.days)
  }

  return (
    <div style={{maxWidth: "1000px", margin: "0 auto"}}>
      <h1 style={{marginTop: "50px"}}>select your github contribution image:</h1>
      <UploadArea onUpload={onUploadHandler}/>
      {imgUrl && <img src={imgUrl} alt="Preview" style={{ width: "100%", marginTop: "50px" }} />}
      {imgUrl && <Result days={days} />}
    </div>
  );
}

function Result({ days }: { days: number | null }) {
  return (
    <h1>
      <span>Your contribution days are: </span>
      {days === null && <img src={loadingImage} alt="loading" style={{verticalAlign: "bottom", height: "43px"}}/>}
      {days !== null && <span>{days}</span>}
    </h1>
  )
}
