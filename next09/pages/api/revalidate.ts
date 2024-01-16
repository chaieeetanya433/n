// https://<your-site.com>/api/revalidate?secret=<token>
// http://localhost:3000/api/revalidate?path=/&secret=Chaieeespeakswell

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Check if the provided secret token is valid
    if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    /*
    It checks if the provided secret token in the query parameters (secret) matches the expected secret token stored in the environment variable (process.env.MY_SECRET_TOKEN). If the tokens don't match, it returns a 401 Unauthorized response with a JSON object containing an error message.
    */

    // Extract the path from the query parameters
    const path = req.query.path as string;

    // Trigger revalidation for the specified path
    await res.revalidate(path);

    /*
    It uses the revalidate method of the NextApiResponse object to trigger revalidation for the specified path. This is part of Next.js's incremental static regeneration (ISR) feature, which allows you to update specific pages at runtime.
    */

    // Return a JSON response indicating that revalidation was successful
    return res.json({ revalidated: true });
}
