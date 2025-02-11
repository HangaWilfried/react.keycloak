import { Outlet } from "react-router";
import { useAuth } from "@/context/session"

export default function Default() {
    const { authenticated, login, getUserInfo, logout } = useAuth();
    let decision = <div>You're not logged</div>;
    if (authenticated) {
        const user = getUserInfo();

        decision = <div>Welcome <span className="font-bold">{user.lastName + " " + user.firstName}</span></div>;
    }

    return (
        <div>
            <header className="bg-slate-200 shadow items-center p-3 flex justify-between">
                <h1 className="text-gray-900 text-lg font-bold">KD</h1>
                <div className="flex items-center gap-2">
                    <span className="p-2 rounded-md flex gap-4 items-center bg-black text-white">
                        <span>{decision}</span>
                        <button
                            className="text-black py-1 px-4 rounded-lg bg-white"
                            onClick={authenticated ? logout : login}
                        >
                            { authenticated ? "Logout" : "Login" }
                        </button>
                    </span>
                </div>
            </header>
            <div className="p-10">
                <Outlet />
            </div>
        </div>
    )
}