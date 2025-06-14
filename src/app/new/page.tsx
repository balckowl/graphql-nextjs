"use client";
import { useAddPostMutation } from "@/generated/graphql";
import { useState } from "react";

export default function Home() {
  const [addPost] = useAddPostMutation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAdd = async () => {
    if (!title.trim() || !content.trim()) return;
    await addPost({ variables: { input: { title: title.trim(), content: content.trim() } } });
    setTitle("");
    setContent("");
  };

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Blog</h1>

      <section className="mb-8 border p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-2">New Post</h2>
        <input
          className="w-full border px-2 py-1 mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border px-2 py-1 h-32 mb-2"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleAdd} className="border px-4 py-1">
          Publish
        </button>
      </section>
    </main>
  );
}
