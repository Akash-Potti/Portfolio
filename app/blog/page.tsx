"use client";

import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Post {
    id: string;
    title: string;
    previewImage?: string;
}

export const dynamic = "force-dynamic";

export default function Blog() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            const snapshot = await getDocs(collection(db, "blogs"));
            const postsData = snapshot.docs.map((doc) => ({
                ...(doc.data() as Omit<Post, "id">),
                id: doc.id,
            }));
            setPosts(postsData);
            setLoading(false);
        }
        fetchPosts();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="min-h-screen flex flex-col items-center p-6 sm:p-8 lg:p-12"
        >
            <div className="w-full max-w-4xl">
                <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">Blog Posts</h1>
                {loading ? (
                    <p className="text-center text-gray-500">Loading posts...</p>
                ) : posts.length === 0 ? (
                    <p className="text-center text-gray-500">No blog posts found.</p>
                ) : (
                    <ul className="flex flex-col gap-6">
                        {posts.map(({ id, title, previewImage }) => (
                            <li key={id}>
                                <Link
                                    href={`/blog/${id}`}
                                    className="flex items-center gap-4 p-3 rounded-md hover:bg-blue-50 hover:shadow-md transition-transform transform hover:scale-105"
                                >
                                    {previewImage ? (
                                        <img
                                            src={previewImage}
                                            alt={`${title} preview`}
                                            className="w-24 h-16 object-cover rounded-md flex-shrink-0"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-24 h-16 bg-gray-200 rounded-md flex-shrink-0 flex items-center justify-center text-gray-400 text-sm">
                                            No Image
                                        </div>
                                    )}
                                    <span className="text-lg sm:text-xl font-medium text-blue-600">
                                        {title}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </motion.div>
    );
}
