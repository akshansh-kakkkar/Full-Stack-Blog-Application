import Image from "next/image";
import { notFound } from "next/navigation";
async function getPost(id:string) {
    const res = await fetch(
        `http://localhost:3000/api/posts/${id}`,
        {
            cache : "no-store"
        }
        
    )
    if(!res.ok){
        notFound() 
    }
    return res.json();
}

export default async function SinglePost({params}:{params: Promise<{id : string}>}){
    const {id} = await params;
    const post = await getPost(id);
    return(
        <div key={post.id}>
            <div>
                {post.coverImage && post.coverImage.length > 0 && (<Image width={500} height={400} src={Array.isArray(post.coverImage) ? post.coverImage[0] : post.coverImage} alt={post.title || "post image"} />)}
            </div>
            <h1>{post.title}</h1>

        <div>
                <div>{post.author?.name}</div>
                <div>{post.content}</div>
                {post.postTags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.postTags.map((pt: { tag: { id: number; name: string } }) => (
                      <span key={pt.tag.id} className="bg-[#00687A] text-white px-2 py-1 rounded-lg text-sm">
                        #{pt.tag.name}
                      </span>
                    ))}
                  </div>
                )}
                <div>{post.comment.map((comments : any)=>(
                    <div key={comments.id}>
                        {comments.content}
                    </div>
                ))}</div>
            </div>
        </div>
    )
}