import { Libertinus_Sans } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
async function getPosts() {
  const res = await fetch(`http://localhost:3000/api/posts`, {
    cache: "no-store",
  });
  return res.json();
}
const LibreSans = Libertinus_Sans({
    subsets : ['latin'],
    weight : ['700']
})
export default async function PostPage(){
    const data = await getPosts();

    return(
        <div className='flex flex-col justify-center flex-1 items-center'>
        
            <h1 className={`${LibreSans.className} text-4xl p-5`}>Posts</h1>
            <div className='flex gap-22 items-center h-full w-full justify-center '>
               {data.posts?.length === 0 ? (
                <div className={`text-4xl font-semibold`}>No posts found</div>
               ) : (
                data.post?.map((post:any)=>(
                     <Link key={post.id} href={`/posts/${post.id}`}>
                    <div  className='bg-gray-300 w-[400px] rounded-md p-4 h-[400px] gap-12  '>
                        <Image width={400} height={200} src={post.image} alt={post.title} />
                        <div>{post.title}</div>
                        <div>{post.author?.name}</div>
                    </div>
                    </Link>
                ))
                )}
            </div>
        </div>
    )
}