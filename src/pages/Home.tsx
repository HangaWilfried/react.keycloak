import { useAuth } from "@/context/session";

function Home() {
    const { keycloak, authenticated } = useAuth();

    if(authenticated) {
        const user = {
            id: keycloak.idTokenParsed?.sub as string,
            lastName: keycloak.idTokenParsed?.family_name,
            firstName: keycloak.idTokenParsed?.given_name,
            email: keycloak.idTokenParsed?.email,
        };

        return (<div>Welcome <span className="font-bold">{user.lastName +" "+user.firstName}</span> you're now logged in!</div>);
    }
    
    return (
        <div>You're not logged</div>
    )
}

export default Home;