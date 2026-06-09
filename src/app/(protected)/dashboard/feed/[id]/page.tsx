"use client";
import { Loader2 } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

const jetbrains = JetBrains_Mono({
  subsets : ['latin']
})
export default function () {
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<any>(null);
  useEffect(() => {
    const getSinglePost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) {
          toast.error(
            "something went wrong while fetching the post please refresh this is not my fault",
          );
        }
        const data = await res.json();
        setPost(data.post);
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      getSinglePost();
    }
  }, [id]);
  return (
    <>
      {loading || !post ? (
        <div className="flex justify-center items-center text-center h-[85vh]">
          <Loader2 size={48} className="text-[#00687A] animate-spin " />
        </div>
      ) : (
        <div className="mt-12 mx-22">
          <div>
            {post.readingTime}
          </div>
          <div className={`${jetbrains.className} text-gray-500 text-xs`}>
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
            })}
          </div>
        </div>
      )}
    </>
  );
}
