import { supabase } from "@/app/_lib/supabase";

async function handleUploadJson(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;

      const { data: insertedData, error } = await supabase
        .from("Invoices") // Replace with your table name
        .insert(data);

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json({ data: insertedData });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handleUploadJson;
