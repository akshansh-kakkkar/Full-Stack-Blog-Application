import { Prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(request : Request) {
    await new Promise(resolve => setTimeout(resolve,1000))
    const url = new URL(request.url)
    const search = url.searchParams.get('search') || "";
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || "10");
    const skip = (page - 1) * limit;
    
    if(authorId){
        const parsedAuthorId = parseInt(authorId);
        if(!isNaN(parsedAuthorId)){
            filteredPosts = filteredPosts.filter(posts => posts.authorId === parsedAuthorId)
        }
    }

    if(search){
        const searchTerm= search.toLowerCase();
        filteredPosts = filteredPosts.filter(post =>
            post.title.toLowerCase().includes(searchTerm) ||
            post.content.toLowerCase().includes(searchTerm)
        )
    }
    const postWithDetails = filteredPosts.map(post =>({
        ...post, author : users.find(u => u.id === post.authorId),
        commentCount : comment.filter(comment => comment.postId === post.id).length,
        excerpt : post.content.substring(0,150)+ '---',
    }))
    const sortedPosts = postWithDetails.sort((a,b)=>{
        let aValue, bValue;
        switch(sortBy){
            case 'title' :
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
            break;
            case 'author' : 
            aValue = a.author?.name?.toLocaleLowerCase() || '';
            bValue = b.author?.name?.toLocaleLowerCase() || '';
            break;
            case 'commentCount' :
                aValue = a.commentCount;
                bValue = b.commentCount;
                break;
            default:
                aValue = new Date(a.createdAt).getTime();
                bValue = new Date(b.createdAt).getTime();
        }
        if(order === 'asc'){
            return aValue > bValue ? 1 : -1;
        }
        else{
            return aValue < bValue  ? 1 : -1;
        }
    })
    const startIndex = (page -1)*limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = sortedPosts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(sortedPosts.length/limit);
    const hasNextPages = page < totalPages;
    const hasPrevPages = page > 1
    return NextResponse.json({post : paginatedPosts, pagenation : {
        currentPage : page, totalPages, totalPosts: sortedPosts.length, hasNextPages, hasPrevPages,limit 
    },
filters : {
    authorId,
    search,
    sortBy, 
    order
}})
}

export async function POST(request : Request) {
    try{
        const body = await request.json();
        if(!body.title || !body.content || !body.authorId){
            return NextResponse.json({error : "error", },{status :400})
        }
        const author = users.find(u=> u.id === body.authorId);
        if(!author){
            return NextResponse.json({
                error : "error"
            }, {status : 400})
        }
        const newPost = {
            id : Math.max(...post.map(p => p.id))+1,
            title:body.title,
            content:body.content,
            authorId:body.authorId,
            createdAt : new Date().toISOString(),
            updatedAt : new Date().toISOString(),
            image : body.content
        }
        post.push(newPost);
        return NextResponse.json({newPost}, {status:201})
        const postWithAuthor = { 
            ...newPost,
            author: author,
        }
        return NextResponse.json(postWithAuthor, {status:201})
    }
    catch(error){
       return NextResponse.json({error : "Something went wrong"}, {status : 400})
    }
}