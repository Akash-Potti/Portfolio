import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

export default async function Blog() {
    const snapshot = await getDocs(collection(db, "blogs"));
    const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as {
        id: string;
        title: string;
    }[];

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Blog Posts</h1>
            {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`} className="block mb-2 text-blue-600">
                    {post.title}
                </Link>
            ))}
        </div>
    );
}
