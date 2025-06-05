"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

export const dynamic = "force-dynamic";

interface PostData {
    title: string;
    content: string;
    previewImage?: string;
}

interface Props {
    params: { id: string };
}

export default function Post({ params }: Props) {
    const [post, setPost] = useState<PostData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPost() {
            const docRef = doc(db, "blogs", params.id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setPost(docSnap.data() as PostData);
            } else {
                setPost(null);
            }
            setLoading(false);
        }
        fetchPost();
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <p className="text-gray-500 text-lg">Loading post...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <p className="text-red-500 text-lg">Post not found</p>
            </div>
        );
    }

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="min-h-screen p-6 sm:p-8 lg:p-12 flex justify-center"
        >
            <div className="max-w-4xl w-full">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">{post.title}</h1>

                {post.previewImage && (
                    <img
                        src={post.previewImage}
                        alt={`${post.title} preview`}
                        className="w-full max-h-72 object-cover rounded-md mb-8 mx-auto"
                        loading="lazy"
                    />
                )}

                <div className="prose max-w-full">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
            </div>
        </motion.article>
    );
}
