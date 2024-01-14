import type { Metadata } from "next";
import getAllUsers from "@/lib/getAllUsers";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Users'
}

export default async function UsersPage() {
    const usersData: Promise<User[]> = getAllUsers()

    const users = await usersData

    console.log('Hello');

    const content = (
        <section>
            <h2>
                <Link href="/">Back to Home</Link>
            </h2>
            <br />
            {users.map(user => {
                return (
                    <>
                        <p key={user.id}>
                            <Link href={`/users/${user.id}`}>{user.name}</Link>
                        </p>
                        <br />
                    </>
                )
            })}
        </section>
    )

    return content;
}

/*
This is the users' page. It defines a metadata object for the page title. The page fetches all users using the getAllUsers function, and then it renders a list of users with links to their individual pages. The Link component is used to navigate back to the home page or to individual user pages.
*/

