import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'blogposts')

export function getSortedPostsData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        const blogPost: BlogPost = {
            id,
            title: matterResult.data.title,
            date: matterResult.data.date,
        }

        // Combine the data with the id
        return blogPost
    });
    // Sort posts by date
    return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1);
}

/*
1. getSortedPostsData
This function reads the Markdown files in the blogposts directory, extracts metadata using gray-matter, and returns an array of sorted blog post data.

Explanation:
Reading File Names:

fs.readdirSync(postsDirectory): Reads the names of all files in the blogposts directory.
Mapping to BlogPost Objects:

fileNames.map((fileName) => {...}): Iterates over each file and maps it to a BlogPost object.
const id = fileName.replace(/\.md$/, '');: Extracts the post ID from the file name by removing the ".md" extension.
Reading and Parsing Metadata:

const fullPath = path.join(postsDirectory, fileName);: Constructs the full path to the Markdown file.
const fileContents = fs.readFileSync(fullPath, 'utf8');: Reads the content of the Markdown file.
const matterResult = matter(fileContents);: Uses gray-matter to parse the metadata section of the Markdown file.
Building BlogPost Object:

Constructs a BlogPost object with properties such as id, title, and date based on the parsed metadata.
Sorting Posts:

return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1);: Sorts the array of BlogPost objects by date in descending order.
*/

export async function getPostData(id: string) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);

    const contentHtml = processedContent.toString();

    const blogPostWithHTML: BlogPost & { contentHtml: string } = {
        id,
        title: matterResult.data.title,
        date: matterResult.data.date,
        contentHtml,
    }

    // Combine the data with the id
    return blogPostWithHTML
}

/*
This function takes a post ID, reads the corresponding Markdown file, processes its content, and returns an object containing the post data, including HTML content.

Explanation:
Reading and Parsing Metadata:

const fullPath = path.join(postsDirectory, ${id}.md);: Constructs the full path to the Markdown file based on the provided post ID.
const fileContents = fs.readFileSync(fullPath, 'utf8');: Reads the content of the Markdown file.
const matterResult = matter(fileContents);: Uses gray-matter to parse the metadata section of the Markdown file.
Processing Markdown to HTML:

const processedContent = await remark().use(html).process(matterResult.content);: Uses remark and remark-html to convert the Markdown content to HTML.
Building BlogPost Object with HTML:

Combines the parsed metadata (id, title, date) with the processed HTML content.
Returning Result:

Returns an object of type BlogPost & { contentHtml: string }, containing post data and HTML content.
Overall Usage:
The getSortedPostsData function is typically used to fetch and display a list of blog posts, sorted by date.
The getPostData function is used to fetch detailed information about a specific blog post, including its HTML content for rendering.
*/

/*
what is Markdown content  here?

Markdown:
Markdown is a lightweight markup language with plain-text formatting syntax. It allows you to write content using a simple and easy-to-read plain text format that can be converted to HTML. Markdown is often used for creating content on the web, such as blog posts, README files, and documentation.

Role in Next.js Blog:
Writing Content:

The actual content of a blog post (text, headings, lists, links, etc.) is authored in Markdown format.

Parsing with gray-matter:

The blog post files are read using the fs (file system) module.
gray-matter is then used to parse the content of the Markdown file, separating metadata (front matter) from the actual Markdown content.
In your code, matterResult = matter(fileContents) extracts metadata and the Markdown content.
Processing to HTML:

The remark library is used to process the Markdown content and convert it to HTML.
remark().use(html).process(matterResult.content) takes the Markdown content and transforms it into HTML.
Rendering on Pages:

The resulting HTML content is then rendered on pages, allowing users to view the blog post in a stylized and formatted manner.
*/