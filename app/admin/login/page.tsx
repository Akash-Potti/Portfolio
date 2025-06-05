"use client";

import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/admin/dashboard");
        } catch (err: any) {
            setError("Invalid credentials");
        }
    };
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl mb-4">Admin Login</h1>
            <input
                className="border mb-2 p-2"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="border mb-2 p-2"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-blue-500 text-white px-4 py-2" onClick={login}>
                Login
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
}