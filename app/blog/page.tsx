import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

export const dynamic = "force-dynamic"; // 🛑 No caching — always fetch fresh data

export default async function Blog() {
    const snapshot = await getDocs(collection(db, "blogs"));
    const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as { title: string })
    }));

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Blog Posts</h1>
            {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`} className="block mb-2 text-blue-600 hover:underline">
                    {post.title}
                </Link>
            ))}
        </div>
    );
}
