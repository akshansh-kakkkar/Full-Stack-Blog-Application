import { signIn } from "@/lib/auth-client";

export default function LoginButton(){
    return (
        <button onClick={()=> signIn.social({provider:"google",callbackURL:'/'})}>Continue With Google</button>
    )
}