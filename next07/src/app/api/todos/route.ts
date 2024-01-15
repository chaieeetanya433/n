import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";

const API_KEY: string = process.env.DATA_API_KEY as string;

export async function GET() {
    const res = await fetch(DATA_SOURCE_URL);

    const todos: Todo[] = await res.json();

    return NextResponse.json(todos);
}

/*
This route handles the HTTP GET method to fetch all todos. It sends a request to the JSONPlaceholder API to get the list of todos and returns them as JSON.
*/

export async function DELETE(request: Request) {
    const { id }: Partial<Todo> = await request.json();

    if (!id) return NextResponse.json({ "message": "Todo id required" })

    await fetch(`${DATA_SOURCE_URL}/${id}`, {
        method: 'DELETE', headers: {
            'Content-Type': 'application/json',
            'API-KEY': API_KEY
        }
    })

    return NextResponse.json({ "message": `Todo ${id} deleted`}); 
}

/*
This route handles the HTTP DELETE method to delete a todo. It expects the id of the todo to be deleted in the request payload, sends a DELETE request to JSONPlaceholder, and returns a confirmation message.
*/

export async function POST(request: Request) {
    const { userId, title }: Partial<Todo> = await request.json();

    if (!userId||!title) return NextResponse.json({ "message": "missing required data" })

    const res = await fetch(DATA_SOURCE_URL, {
        method: 'POST', headers: {
            'Content-Type': 'application/json',
            'API-KEY': API_KEY
        },
        body: JSON.stringify({
            userId, title, completed: false
        })
    })

    const newTodo: Todo = await res.json()

    return NextResponse.json(newTodo);
}

/*
This route handles the HTTP POST method to create a new todo. It expects userId and title in the request payload, sends a POST request to JSONPlaceholder, and returns the newly created todo.
*/

export async function PUT(request: Request) {
    const { userId, id, title, completed }: Todo = await request.json()

    if (!userId || !id || !title || typeof (completed) !== 'boolean') return NextResponse.json({ "message": "Missing required data" })

    const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': API_KEY
        },
        body: JSON.stringify({
            userId, title, completed
        })
    })

    const updatedTodo: Todo = await res.json()

    return NextResponse.json(updatedTodo)
}


/*
This route handles the HTTP PUT method to update a todo. It expects a complete Todo object in the request payload, sends a PUT request to JSONPlaceholder, and returns the updated todo.
*/

/*
Todo is assumed to be a type representing the structure of a todo item.
DATA_SOURCE_URL is the base URL for the JSONPlaceholder API.
API_KEY is used in headers for authorization (this is just an example, and JSONPlaceholder doesn't require an API key).
*/