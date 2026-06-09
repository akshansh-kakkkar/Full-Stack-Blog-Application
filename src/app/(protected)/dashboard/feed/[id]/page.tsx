"use client";
import { ChevronLeft, ChevronRight, Dot, Loader2 } from "lucide-react";
import { JetBrains_Mono, Libertinus_Sans, Poppins } from "next/font/google";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
});
const libretinusSans = Libertinus_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});
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
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <>
      {loading || !post ? (
        <div className="flex justify-center items-center text-center h-[85vh]">
          <Loader2 size={48} className="text-[#00687A] animate-spin " />
        </div>
      ) : (
        <div className="mt-12 mx-5 md:mx-12 lg:mx-42 flex gap-7 flex-col">
          <div className="flex items-center gap-2">
            <div
              className={`${jetbrains.className}  text-[#45464D] bg-[#E6E8EA] p-1 rounded-sm text-xs font-bold `}
            >
              {post.stats.readingTime}
            </div>
            <div>
              <Dot className="text-gray-400 " size={42} />
            </div>
            <div
              className={`${jetbrains.className} font-bold text-gray-500 text-xs`}
            >
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </div>
          </div>
          <div className="flex justify-center">
            {post.coverImage?.length > 0 && (
              <div>
                <div onClick={() => setCurrentImage((prev) => prev === 0 ? post.coverImage.length - 1 : prev - 1)}>
                  <ChevronLeft />
                </div>
                <div className="relative w-200 h-100 rounded-lg">
                  <Image
                    className="absolute object-center select-none rounded-lg"
                    fill
                    src={post.coverImage}
                    alt={post.title}
                  />
                </div>
                <div>
                  <ChevronRight onClick={() => setCurrentImage((prev) => prev === post.coverImage.length - 1 ? 0 : prev + 1)} />
                </div>
              </div>
            )}
          </div>

          <div
            className={`text-6xl px-5 font-bold ${libretinusSans.className} border-b-2 py-2`}
          >
            {post.title}
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className={`${poppins.className} [&_ul]:list-disc [&_mark]:bg-[#00687A]/80 [&_mark]:text-white [&_mark]:px-2 [&_mark]:py-1 w-full ProseMirror [&_h1]:text-4xl [&_h1]:font-semibold [&_h1]:mt-2 [&_h1]:mb-2 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-2 [&_h2]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4  [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono [&_pre]:bg-gray-900 [&_pre]:text-white [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:my-4 [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6`}
          />
        </div>
      )}
    </>
  );
}
