import React from 'react'
import { useAuth } from 'react-nhost'
import { Redirect, Route } from 'react-router';



type PrivateRouteProps = {
    component: React.FC;
    path: string;
    exact: boolean;
};

const PrivateRoute = ({ component, path, exact }: PrivateRouteProps) => {
    const { signedIn } = useAuth();

    return signedIn ?
        <Route path={path} component={component} exact={exact} /> : //Hvis bruker er logget inn kjøres denne
        <Redirect to="/login" />; //Og hvis brukeren ikke er logget inn blir han sendt til login-siden

}

export default PrivateRoute;


/* Jeg prøvde å bruke privateRoute slik at brukere som ikke er logget inn ikke fikk tilgang til andre sider enn /login, men det bugga seg 
slik at når jeg trykket på 'addtrip' så ble siden helt blank og man fikk aldri tilgang til den siden selv om man er logget inn. Hvis det er ønskelig
å forsøke dette selv kan 'import PrivateRoute' kommenteres ut i App.tsx, og så endre Route til PrivateRoute for routeren tilhørende /addtrip.

*/