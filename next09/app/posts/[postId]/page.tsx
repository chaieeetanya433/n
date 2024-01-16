import getFormattedDate from "@/lib/getFormattedDate"
import { getPostData, getSortedPostsData } from "@/lib/posts"
import Link from "next/link"
import { notFound } from "next/navigation"


export function generateStaticParams() {
    const posts = getSortedPostsData()

    return posts.map((post) => ({
        postId: post.id
    }))
}

/*
Purpose:
This function generates an array of objects, where each object represents a set of static parameters for a specific blog post.
The static parameters include only the postId for each post.
*/

export function generateMetadata({ params }: { params: { postId: string } }) {

    const posts = getSortedPostsData()
    const { postId } = params

    const post = posts.find(post => post.id === postId)

    if (!post) {
        return {
            title: 'Post Not Found'
        }
    }

    return {
        title: post.title,
    }
}

/*
Purpose:
This function generates metadata for a specific blog post based on the provided postId.
It fetches all the sorted posts and looks for a post with the specified postId.
If the post is not found, it returns metadata indicating that the post is not found.
If the post is found, it returns metadata with the post's title.
*/

export default async function Post({ params }: { params: { postId: string } }) {

    const posts = getSortedPostsData()
    const { postId } = params

    if (!posts.find(post => post.id === postId)) notFound()

    const { title, date, contentHtml } = await getPostData(postId)

    const pubDate = getFormattedDate(date)

    return (
        <main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
            <h1 className="text-3xl mt-4 mb-0">{title}</h1>
            <p className="mt-0">
                {pubDate}
            </p>
            <article>
                <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
                <p>
                    <Link href="/">← Back to home</Link>
                </p>
            </article>
        </main>
    )
}

/*
Purpose:
This component represents a dynamic blog post page.
It first checks if the requested postId exists in the list of sorted posts. If not, it uses notFound() from next/navigation to indicate that the post is not found.
If the post exists, it fetches the post data (including title, date, and HTML content) using getPostData.
It then renders the post's title, formatted date, and the HTML content using the dangerouslySetInnerHTML prop to insert raw HTML. This is common when rendering content from Markdown.
It also includes a link to go back to the home page.
*/

/*
Overall Flow:
Static Generation:

The generateStaticParams function provides a list of postId values that will be statically generated at build time.
Dynamic Rendering:

When a user navigates to a specific post, the Post component dynamically fetches and renders the content based on the requested postId.
Metadata Generation:

The generateMetadata function is used for generating metadata related to each post, including the title.

*/