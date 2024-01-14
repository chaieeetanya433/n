export default async function getUserPosts(userId: string) {
    // const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, {cache: 'no-store'});
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, {next: {revalidate: 60}});

    if(!res.ok) throw new Error('failed to fetch user');

    return res.json();
}

/*

In the fetch function, the cache parameter is used to specify the cache mode for the request. The cache mode determines how the browser handles caching for the request. In your code snippet, the cache parameter is set to 'force-cache'.

Here's what it means:

cache: 'force-cache': This value instructs the browser to make a request to the server, and if the request is successful, the response is stored in the cache. Subsequent requests for the same resource will be fulfilled from the cache without making a new request to the server. If the resource is not in the cache or the server request fails, it will throw an error.
By using 'force-cache', you are explicitly instructing the browser to prioritize caching and reuse the cached response if available, even if it might be stale. This can be useful in scenarios where you want to ensure that the browser always tries to use a cached version of the resource.

It's important to note that caching strategies depend on your specific use case and the requirements of your application. 'force-cache' might be suitable in some cases, but it's not always the best choice depending on factors like how frequently the data changes and whether you can tolerate using potentially stale data.

If you need more fine-grained control over caching behavior, you might consider exploring other cache modes such as 'no-store', 'reload', or 'no-cache', depending on your specific requirements. Each cache mode has its own behavior, and choosing the right one depends on the nature of your application and the data being fetched.

'no-store':

Behavior: The 'no-store' cache mode indicates that the browser should not store the response in its cache. Every request for the resource will result in a network request, and the response won't be cached.
Use Case: This is useful when you want to ensure that the data is always fetched from the server and not served from the cache. It's commonly used for sensitive or dynamic data that should not be cached locally.

'reload':

Behavior: The 'reload' cache mode forces the browser to make a new request to the server for the resource, ignoring the cache. If the resource is in the cache, it will be validated with the server using conditional requests like If-None-Match or If-Modified-Since.
Use Case: This can be useful when you want to ensure that the browser checks with the server for the latest version of the resource, but still allows for conditional caching.

'no-cache':

Behavior: The 'no-cache' cache mode indicates that the browser can use a cached response, but it must first check with the server to ensure that the resource is still valid (not stale). If the resource is unchanged on the server, the server may respond with a 304 Not Modified status, and the browser can use the cached version.
Use Case: This is useful when you want to take advantage of caching but still want the server to validate the freshness of the cached resource. It helps in scenarios where you don't want to serve stale data.

*/

/*
revalidate Option:
The revalidate option specifies the number of seconds after which the page should be revalidated (regenerated).
In the example, revalidate: 60 means that the page will be revalidated and regenerated at most every 60 seconds. This is useful for pages that can have their data updated over time, but don't need to be regenerated on every request.
*/