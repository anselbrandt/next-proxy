import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

async function proxyRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch("http://localhost:3000/api", {
      method: req.method,
      body: req.method !== "GET" && req.method !== "HEAD" ? req : undefined,
    });
    res.statusCode = response.status;
    const json = await response.json();
    res.json(json);
  } catch (err) {
    const error: any = err;
    res.status(500).send(error.message);
  }
}

export default proxyRoute;
