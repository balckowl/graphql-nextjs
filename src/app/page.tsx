
import { GetPostsDocument, GetPostsQuery, useGetPostsQuery } from "@/generated/graphql";
import { query } from "@/lib/server-client";

export default async function Page() {

  //clientでの取得
  // const { data, error, loading } = useGetPostsQuery();
  // if(loading) return <p>loading...</p>

  const { data } = await query<GetPostsQuery>({ query: GetPostsDocument })

  return (
    <div>
      {data?.getPosts.map((post) => (
        <div key={post.id} className="border p-4 mb-4">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
