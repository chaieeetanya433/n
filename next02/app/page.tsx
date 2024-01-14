import { Inter } from 'next/font/google'
// import styles from './page.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
        <h1>Home page</h1>
        <p>
          <Link href="/users">users</Link>
        </p>
    </main>
  )
}

/*
This is the main page of your application. It imports the Inter font and a Link component from Next.js. The Link component is used to navigate to the /users page. The Home component renders a basic page with a heading and a link to the users' page. 
*/