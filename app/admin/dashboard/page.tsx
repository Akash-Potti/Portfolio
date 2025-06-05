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

interface Post {
    id: string;
    title: string;
    previewImage?: string;
}

export default function Dashboard() {
    const loading = useAuth();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const snapshot = await getDocs(collection(db, "blogs"));
            const blogs = snapshot.docs.map((doc) => {
                const data = doc.data() as Post;
                return {
                    id: doc.id,
                    title: data.title,
                    previewImage: data.previewImage || "",
                };
            });
            setPosts(blogs);
        };
        fetchPosts();
    }, []);

    const submitPost = async () => {
        if (!title || !content) return;
        const docRef = await addDoc(collection(db, "blogs"), {
            title,
            content,
            previewImage: previewImage || null,
            createdAt: new Date(),
        });
        // Optimistic UI update without reload
        setPosts((prev) => [
            { id: docRef.id, title, previewImage },
            ...prev,
        ]);
        setTitle("");
        setContent("");
        setPreviewImage("");
    };

    const deletePost = async (id: string) => {
        const confirmDelete = window.confirm("Delete this post?");
        if (!confirmDelete) return;
        await deleteDoc(doc(db, "blogs", id));
        setPosts((prev) => prev.filter((post) => post.id !== id));
    };

    if (loading) return <p className="p-4 text-center">Checking admin access...</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">New Blog Post</h1>
            <input
                type="text"
                className="border p-3 w-full mb-4 rounded-md"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className="border p-3 w-full h-48 mb-4 rounded-md resize-none"
                placeholder="Markdown Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <input
                type="text"
                className="border p-3 w-full mb-4 rounded-md"
                placeholder="Preview Image URL (Imgur or any image URL)"
                value={previewImage}
                onChange={(e) => setPreviewImage(e.target.value)}
            />
            <button
                className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold w-full hover:bg-green-700 transition"
                onClick={submitPost}
            >
                Publish
            </button>

            <hr className="my-10" />

            <h2 className="text-2xl font-semibold mb-6 text-center">Your Blog Posts</h2>
            {posts.length === 0 ? (
                <p className="text-center text-gray-500">No posts yet.</p>
            ) : (
                <ul className="space-y-4">
                    {posts.map(({ id, title, previewImage }) => (
                        <li
                            key={id}
                            className="border rounded-md p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
                        >
                            {previewImage ? (
                                <img
                                    src={previewImage}
                                    alt={`${title} preview`}
                                    className="w-20 h-14 object-cover rounded-md flex-shrink-0"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="w-20 h-14 bg-gray-200 rounded-md flex-shrink-0 flex items-center justify-center text-gray-400 text-sm">
                                    No Image
                                </div>
                            )}
                            <span className="flex-1 font-medium">{title}</span>
                            <button
                                className="text-red-600 hover:underline font-semibold"
                                onClick={() => deletePost(id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
