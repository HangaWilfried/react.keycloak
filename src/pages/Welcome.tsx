import { useAuth } from "@/context/session";

export default function welcome() {
    const { keycloak } = useAuth();

    return (<div>Welcome {JSON.stringify(keycloak)} you're now logged in!</div>);
}