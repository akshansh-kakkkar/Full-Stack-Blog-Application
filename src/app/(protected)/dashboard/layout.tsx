import AppDrawer from "./components/AppDrawer";
import SideBar from "./components/Sidebar";

export default function ({ children }: { children: React.ReactNode }) {
    return (

        <div className="flex md:py-22 bg-[#F7F9FB] min-h-screen">
            <SideBar />
            <AppDrawer />
            <main className="flex-1 p-8 md:ml-[280px] w-full">
                {children}
            </main>
        </div>
    )
}