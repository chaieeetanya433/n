import Image from "next/image"

export default function MyProfilePic() {
    return (
        <section className="w-full mx-auto">
            <Image
                className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
                src="/images/png.jpg"
                width={200}
                height={200}
                alt="Chaitanya Agarkar"
                priority={true}
            />
        </section>
    )
}

/*
Imports the Image component from Next.js.
Defines the MyProfilePic component, rendering an image with specific styles.
*/