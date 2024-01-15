import { NextResponse } from "next/server"

type Feedback = {
    name?: string,
    email?: string,
    message?: string,
}

//dynamic route 
export async function POST(request: Request) {
    const data: Feedback = await request.json()
    console.log('data: ', data)

    const { name, email, message } = data

    return NextResponse.json({ name, email, message })
}

/*
Feedback Type: The Feedback type is defined to represent the structure of the feedback data that can be sent in the request body. It includes optional properties for name, email, and message.

Dynamic Route Handling: The POST function is an asynchronous function that handles HTTP POST requests to the dynamic route. In Next.js API routes, functions like POST are automatically associated with specific HTTP methods (e.g., POST, GET) based on their names.

Request Handling: The POST function uses await request.json() to parse the JSON data sent in the request body. This assumes that the incoming request has a JSON payload.

Logging Data: The extracted data (name, email, message) is logged to the console for demonstration purposes. In a real-world scenario, you might want to process or store this data.

JSON Response: The function returns a JSON response using NextResponse.json() with the extracted data. This response will be sent back to the client that made the HTTP POST request.

This dynamic route handling is part of Next.js API routes, providing a convenient way to create serverless functions for handling specific API requests. In this case, the dynamic route is designed to handle POST requests with feedback data.
*/