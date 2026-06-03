import AppDrawer from "./components/AppDrawer";
import SideBar from "./components/SideBar";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex md:py-22 bg-[#F7F9FB] flex-1">
            <SideBar />
            <AppDrawer />
            <main className="flex-1  p-8 md:ml-[280px] w-full">
                {children}
            </main>
        </div>
    )
}