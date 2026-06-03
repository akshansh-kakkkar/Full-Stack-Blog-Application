"use client"
import { usePathname } from "next/navigation"
import Loading from "../pageTransition";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({
    children
} : {
    children : React.ReactNode
}){
    const pathName = usePathname();
    const isAuthpage = pathName === "/auth"
    const profile = pathName === "/profile" || "/profile/edit"
    return(
        <div className="flex-1 flex flex-col">
            {!isAuthpage && <Navbar />}
            <Loading>
                {children}
            </Loading>
            {!isAuthpage &&  !profile && <Footer />}
        </div>
    )
}