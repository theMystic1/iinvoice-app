"use client";
// func to upload json to supabase
import { useState } from "react";
import { supabase } from "./_lib/supabase";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const jsonData = JSON.parse(event.target.result);

      const { data, error } = await supabase
        .from("Invoices") // Replace with your table name
        .insert(jsonData);

      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("Data successfully uploaded!");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <h1>Upload JSON File</h1>
      <input type="file" accept=".json" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>
    </div>
  );
}
