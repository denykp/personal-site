import { dbAdmin } from "../utils/firebase-admin";
import type { IncomingMessage, ServerResponse } from "http";

// Example: GET to fetch all documents, POST to add a document in 'test-collection'
export default async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === "GET") {
    try {
      const snapshot = await dbAdmin.collection("test-collection").get();
      const data = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: message }));
    }
  } else if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", async () => {
      try {
        const data = JSON.parse(body);
        const docRef = await dbAdmin.collection("test-collection").add(data);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ id: docRef.id }));
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: message }));
      }
    });
  } else {
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Method not allowed" }));
  }
};
