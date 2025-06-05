"use client";

import { db } from "@/lib/firebase";
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";


export default function Dashboard() {
    const loading = useAuth();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [posts, setPosts] = useState<{ id: string; title: string }[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const snapshot = await getDocs(collection(db, "blogs"));
            const blogs = snapshot.docs.map((doc) => ({
                id: doc.id,
                title: doc.data().title,
            }));
            setPosts(blogs);
        };
        fetchPosts();
    }, []);

    const submitPost = async () => {
        if (!title || !content) return;
        await addDoc(collection(db, "blogs"), {
            title,
            content,
            createdAt: new Date(),
        });
        window.location.reload(); // quick refresh after publishing
    };

    const deletePost = async (id: string) => {
        const confirm = window.confirm("Delete this post?");
        if (!confirm) return;
        await deleteDoc(doc(db, "blogs", id));
        setPosts((prev) => prev.filter((post) => post.id !== id));
    };

    if (loading) return <p className="p-4">Checking admin access...</p>;

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">New Blog Post</h1>
            <input
                className="border p-2 w-full mb-2"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className="border p-2 w-full h-60 mb-2"
                placeholder="Markdown Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={submitPost}
            >
                Publish
            </button>

            <hr className="my-8" />

            <h2 className="text-xl font-semibold mb-4">Your Blog Posts</h2>
            {posts.length === 0 && <p>No posts yet.</p>}
            <ul className="space-y-2">
                {posts.map((post) => (
                    <li
                        key={post.id}
                        className="border p-2 flex justify-between items-center"
                    >
                        <span>{post.title}</span>
                        <button
                            className="text-red-600 hover:underline"
                            onClick={() => deletePost(post.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
