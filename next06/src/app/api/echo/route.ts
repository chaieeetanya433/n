import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    //const name = searchParams.get('name')
    //const instrument = searchParams.get('instrument')

    const obj = Object.fromEntries(searchParams.entries())

//   return NextResponse.json({name, instrument});
  return NextResponse.json(obj);
}

/*
Explanation:

Import Statements:

import { NextResponse } from "next/server";: Importing the NextResponse object from the Next.js Server Functions API. This object allows you to construct various HTTP responses.
Route Handler Function:

export async function GET(request: Request) {: Defining an asynchronous function named GET to handle HTTP GET requests. This function receives a Request object as its parameter.
Extracting Query Parameters:

const { searchParams } = new URL(request.url);: Creating a URL object from the request's URL and extracting the searchParams property. This allows you to easily access and manipulate query parameters.
Object from URLSearchParams:

const obj = Object.fromEntries(searchParams.entries());: Converting the URL's search parameters into a plain JavaScript object. Each query parameter becomes a key-value pair in the resulting object.
JSON Response:

return NextResponse.json(obj);: Constructing a JSON response using the NextResponse.json method. The extracted query parameters are included in the response body.
Overall, this code handles incoming GET requests, extracts query parameters from the request URL, converts them into a JavaScript object, and responds with a JSON object containing the extracted parameters. This type of route handling is often used f
*/

/*
Static route handling refers to the process of defining and handling routes where the content is pre-determined and does not change dynamically during runtime. In the context of Next.js or similar frameworks, static routes are associated with pre-rendered pages that don't require server-side processing for each request. These pages are generated at build time and remain the same until the next build.

Key characteristics of static route handling:

Pre-rendering: Static routes are pre-rendered during the build process, resulting in HTML pages that can be served directly to users without additional server-side processing.

Build-Time Data Fetching: Data needed for these static routes is typically fetched at build time, and the generated pages include the data directly.

Performance: Static routes offer excellent performance since the content is readily available and can be served quickly without the need for server-side rendering on each request.
*/