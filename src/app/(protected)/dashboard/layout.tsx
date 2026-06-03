import AppDrawer from "./components/AppDrawer";
import SideBar from "./components/Sidebar";

export default function ({ children }: { children: React.ReactNode }) {
    return (

        <div className="flex md:py-8 bg-[#F7F9FB] flex-1">
            <SideBar />
            <AppDrawer />
            <main className=" md:ml-[280px] min-h-screen w-full">
                {children}
            </main>

        </div>
    )
}