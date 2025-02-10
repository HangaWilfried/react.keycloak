import { Outlet } from "react-router";
import { useAuth } from "@/context/session"

export default function Default() {
    const { authenticated, login } = useAuth();

    return (
        <div>
            <header className="bg-gray-600 p-4 flex justify-between">
                <h1 className="text-white">K.D</h1>
                <div className="flex items-center gap-2">
                    {authenticated ? (
                        <span className="bg-red-400 p-2">Connected</span>
                    ) : (
                        <button
                            className="bg-gray-900 text-white"
                            onClick={login}
                        >
                            Login
                        </button>
                    )}
                </div>
            </header>
            <div className="p-10">
                <Outlet />
            </div>
        </div>
    )
}