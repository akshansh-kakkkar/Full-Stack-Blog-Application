export interface Post {
    id : number;
    title : string;
    content : string;
    authorId : number;
    author?: User;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    id: number;
    name: string;
    email:string;
    posts?:string[];
}

export interface Comment {
    id : number;
    content:string;
    postId:number;
    authorId:number;
    createdAt:string;
}
