import getUser from "@/lib/getUser"
import getUserPosts from "@/lib/getUserPosts"
import { Suspense } from "react";
import UserPosts from "./components/UserPosts";
import type { Metadata } from "next";
// import { notFound } from "next/navigation";
import getAllUsers from "@/lib/getAllUsers";
import NotFound from "./components/not-found";

type Params = {
    params: {
        userId: string
    }
}

export async function generateMetadata({
    params: { userId },
  }: Params): Promise<Metadata> {
    const userData: Promise<User> = getUser(userId);
    const user: User = await userData;
  
    return {
      title: user.name,
      description: `This is the page of ${user.name}`,
    };
  }

export default async function UserPage({ params: { userId } }: Params) {
    const userData: Promise<User> = getUser(userId);
    const userPostsData: Promise<Post[]> = getUserPosts(userId);

    //const [user, userPosts] = await Promise.all([userData, userPostsData]);

    const user = await userData;

    if(!user.name) return NotFound();
    // if(!user.name) return notFound();

    if(!user.name) {
        return {
            title: "User not found"
        };
    }


    return (
        <>
            <h2>{user.name}</h2>
            <br />
            <Suspense fallback={<h2>Loading...</h2>}>
                <UserPosts promise={userPostsData} />
            </Suspense>
        </>
    )
}

export async function generateStaticParams() {
    const usersData: Promise<User[]> = getAllUsers()
    const users = await usersData;

    return users.map(user => (
        { userId: user.id.toString() }
    ))
}

/*
The generateStaticParams function is part of ISR. It is an asynchronous function that runs at build time to generate static paths for the pages. In this case, it fetches all users and maps them to an array of { userId } objects. This array of user IDs is used to generate static paths for the UserPage component.

Explanation:
Build Time:

At build time, the generateStaticParams function generates an array of user IDs to be statically generated as pages.
The getStaticPaths function uses the generated paths, and the corresponding getStaticProps function fetches the data for each user page.
Runtime:

When a user accesses a page, the server serves the statically generated HTML.
In the background, the server also regenerates the page with new data based on the ISR configuration (revalidate) and caches it for subsequent requests.
User Experience:

Users get a fast initial page load with statically generated content.
Subsequent users or requests benefit from the cached HTML, while the background regeneration ensures data freshness.
*/

/*
This is the individual user page. It has a function generateMetadata to provide metadata for the page. It fetches user data and user posts using getUser and getUserPosts functions, respectively. The page then renders the user's name and a UserPosts component wrapped in Suspense for handling asynchronous loading.
*/