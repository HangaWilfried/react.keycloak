import { useAuth } from "@/context/session";
import { useEffect, useState, Fragment } from "react"

type User = {
    id: number;
    username: string;
    createdAt: string;
}

const getCachedUsers = (): User[] => {
    const data = localStorage.getItem("users");
    if (data) {
        return JSON.parse(data);
    }
    return [];
}

const saveUsers = (users: User[]) => {
    localStorage.setItem("users", JSON.stringify(users));
}


export default function Home() {
    const { isAdmin } = useAuth();
    const [users, setUsers] = useState<User[]>(() => getCachedUsers());
    const [isCreationMode, setIsCreationMode] = useState<boolean>(false);

    const [username, setUsername] = useState<string>("");

    const createUser = () => {
        const user = {
            id: users.length + 1,
            createdAt: new Date().toISOString(),
            username
        }
        setUsers((previous) => [...previous, user]);
        setIsCreationMode(false);
        setUsername("");
    };

    const editUser = (user: User) => {
        setUsers(
            (users) => users.map(
                thisUser => {
                    if (thisUser.id === user.id) {
                        return user;
                    }
                    return thisUser
                })
        )
    }

    const deleteUser = (userId: number) => {
        setUsers((users) => users.filter(user => user.id !== userId))
    }

    useEffect(() => {
        saveUsers(users);
    }, [users])


    return (
        <section>
            {
                isCreationMode ?
                    <form className="flex flex-col gap-2 border rounded-lg bg-white p-4 m-auto w-[500px]">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="username">Username</label>
                            <TextInput name="username" value={username} handleChange={setUsername} />
                        </div>
                        <button className="text-indigo-500" onClick={createUser}>Ajouter</button>
                    </form> :
                    <Fragment>
                        <div className="flex justify-between items-center mb-5">
                            <h1 className="text-lg font-bold">Users</h1>
                            {isAdmin() && <button className="text-indigo-500" onClick={() => setIsCreationMode(true)}>+Add user</button>}
                        </div>
                        <table className="w-full table table-auto">
                            <thead>
                                <tr>
                                    <th className="text-left p-2 font-medium text-sm border">Ref</th>
                                    <th className="text-left p-2 font-medium text-sm border">Username</th>
                                    <th className="text-left p-2 font-medium text-sm border">Date de creation</th>
                                    {isAdmin() && <th className="text-left p-2 font-medium text-sm border">Actions possibles</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => <UserRowTable user={user} onDelete={deleteUser} onEdit={editUser} key={user.id} />)}
                            </tbody>
                        </table>
                    </Fragment>
            }
        </section>
    )
}


type RowProps = {
    user: User;
    onEdit: (user: User) => void;
    onDelete: (id: number) => void;
}

function UserRowTable({ user, onDelete, onEdit }: RowProps) {
    const { isAdmin } = useAuth();

    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const [update, setUpdate] = useState<User>(user);

    const handleDelete = () => {
        setIsDeleting(true);
        const timeout = setTimeout(() => {
            clearTimeout(timeout);
            onDelete(user.id);
        }, 2000);
    }

    const handleCancel = () => {
        setIsEditMode(false);
        setUpdate(user);
    }

    const handleEdit = () => {
        setIsEditMode(false);
        onEdit(update);
    }

    return (
        <tr className="my-2">
            <td className="text-left p-2 font-medium text-sm border">{user.id}</td>
            <td className="text-left p-2 font-medium text-sm border">{isEditMode ? <TextInput value={update.username} handleChange={username => setUpdate(old => ({
                ...old,
                username
            }))} /> : user.username}</td>
            <td className="text-left p-2 font-medium text-sm border">{user.createdAt}</td>
            {isAdmin() &&
                <td className="text-left p-2 font-medium text-sm border">
                    {
                        isEditMode ?
                            <span className="flex gap-2 items-center">
                                <button onClick={handleCancel} className="text-slate-800">Annuler</button>
                                <button onClick={handleEdit} className="text-indigo-500">Enregistrer</button>
                            </span>
                            : isDeleting ?
                                <span>suppression...</span>
                                :
                                <span className="flex gap-2 items-center">
                                    <button onClick={() => setIsEditMode(true)} className="text-blue-500">Edit</button>
                                    <button onClick={handleDelete} className="text-red-500">Delete</button>
                                </span>
                    }
                </td>
            }
        </tr>
    )
}


type TextInputProps = {
    value: string;
    name?: string;
    handleChange: (value: string) => void;
};

function TextInput({ name, value, handleChange }: TextInputProps) {
    return (
        <input
            type="text"
            name={name}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            className="rounded-lg h-8 p-2 border border-slate-300 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
    )

}