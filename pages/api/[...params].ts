import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export const config = {
  api: {
    bodyParser: false,
  },
};

interface Headers {
  [key: string]: any;
}

async function proxyRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Remove Next.js API route from url
    const baseUrl = req.url!.replace("/api/", "");
    const url = new URL("https://" + baseUrl);
    const response = await fetch(url.href, {
      method: req.method,
      body: req.method !== "GET" && req.method !== "HEAD" ? req : undefined,
    });
    res.statusCode = response.status;
    if (response.redirected) {
      res.setHeader("x-redirected-url", response.url);
    }
    response.body!.pipe(res);
  } catch (err) {
    const error: any = err;
    res.status(500).send(error.message);
  }
}

export default proxyRoute;
