import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import ReactMarkdown from "react-markdown";

export const dynamic = "force-dynamic";
export default async function Post({ params }: { params: { id: string } }) {
    const docRef = doc(db, "blogs", params.id);
    const docSnap = await getDoc(docRef);
    const post = docSnap.data();

    if (!post) return <p className="p-4">Post not found</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
            <div className="prose">
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
        </div>
    );
}
