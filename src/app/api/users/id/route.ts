import { NextResponse } from "next/server";
import { Prisma } from "@/lib/prisma";
import { error } from "console";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const userId = parseInt(params.id);
    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user Id" }, { status: 400 });
    }
    const user = await Prisma.user.findUnique({
      where : {
        id : userId
      },
      include : {
        posts : {
          include : {
            comments : true,
            likes : true
          }
        },
        comments : {
          include : {
            post : true
          }
        },
        likes : {
          include : {
            post : true
          }
        },
      }
    })
    if(!user){
      return NextResponse.json({
        error : "User not found",

      }, 

    {
      status : 404
    })
  }
    const userDetails = {
      ...user,
      stats : {
        totalPosts : user.posts.length,
        totalComments : user.posts.reduce((acc,post)=> acc + post.comments.length, 0),
        totalLikes : user.likes.length
      },
    }
    return NextResponse.json(userDetails)
    
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 },
    );
  }

}

export async function PUT(request:Request, {params} : {params : {id : string}}) {
  try{  
  const userId = parseInt(params.id);
    if(isNaN(userId)){
        return NextResponse.json({error : "Invalid User Id"}, {status : 400})
    }
   const body = await request.json();
   const updatedUser = await Prisma.user.update({
    where : {
      id : userId
    },
    data : {
      ...body
    }
   })
   return NextResponse.json(updatedUser)
  }
  catch(error){
    return NextResponse.json({
      error : "Something Went Wrong"
      
    }, {status : 500})
  }
};

export async function DELETE(request : Request, {params} : {params : {id : string}}){
  try{
    const userId  = parseInt(
      params.id
    );
    if(isNaN(userId)){
      return NextResponse.json({
        error: "Invalid user id"
      },
    {
      status : 400
    })
    }
    await Prisma.user.delete({
      where : {
        id : userId
      },

    })
    return NextResponse.json({
      message  : "User Deleted Successfully"
    })
  }
  catch(error){
    return NextResponse.json(
      {error : "Something Went Wrong"},
      {status : 500}
    )
  }
}

