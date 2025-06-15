"use client";

import { useAddPostMutation } from "@/generated/graphql";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddPostInputSchema } from "@/generated/validation";
import { z } from "zod";

type AddPostInput = z.infer<ReturnType<typeof AddPostInputSchema>>;

export default function Home() {
  const [addPost] = useAddPostMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddPostInput>({ resolver: zodResolver(AddPostInputSchema()) });

  const onSubmit = async (data: AddPostInput) => {
    await addPost({ variables: { input: data } });        // GraphQL への送信:contentReference[oaicite:10]{index=10}
    reset();                                              // 送信後にフォームをリセット:contentReference[oaicite:11]{index=11}
  };

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Blog</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-8 border p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-2">New Post</h2>

        <input
          {...register("title")}
          className="w-full border px-2 py-1 mb-1"
          placeholder="Title"
        />
        {errors.title && (
          <p className="text-red-600 text-sm mb-2">{errors.title.message}</p>
        )}                                                     {/* エラー表示:contentReference[oaicite:12]{index=12} */}

        <textarea
          {...register("content")}
          className="w-full border px-2 py-1 h-32 mb-1"
          placeholder="Content"
        />
        {errors.content && (
          <p className="text-red-600 text-sm mb-2">{errors.content.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="border px-4 py-1"
        >
          {isSubmitting ? "Publishing…" : "Publish"}            {/* 通信中ステート管理:contentReference[oaicite:13]{index=13} */}
        </button>
      </form>
    </main>
  );
}
