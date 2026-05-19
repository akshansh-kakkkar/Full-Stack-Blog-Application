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
                {post.image && (<Image width={500} height={400} src={post.image } alt={post.title || "post image"} />)}
            </div>
            <h1>{post.title}</h1>

            <div>
                <div>{post.author?.name}</div>
                <div>{post.content}</div>
                <div>{post.comment.map((comments : any)=>(
                    <div key={comments.id}>
                        {comments.content}
                    </div>
                ))}</div>
            </div>
        </div>
    )
}