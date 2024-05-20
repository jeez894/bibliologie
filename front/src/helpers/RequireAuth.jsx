import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/UserSlice";
import { Navigate, useParams } from "react-router-dom";

const RequireAuth = ({ child: Child, auth, admin, superAdmin, adultRequired, ...rest }) => {
    const params = useParams();
    const user = useSelector(selectUser);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        console.log("Current user state in RequireAuth:", user);
        if (!user.isLogged) {
            if (auth) {
                setRedirect(true);
                console.log("Redirecting to login because user is not logged in");
            }
        } else {
            // Admin or SuperAdmin access required and user is neither
            if (admin && !(user.infos.role === "admin" || user.infos.role === "superAdmin")) {
                setRedirect(true);
                console.log("Redirecting to home because user is not authorized as admin or super admin");
            } 
            // Only SuperAdmin access required and user is not a SuperAdmin
            else if (superAdmin && user.infos.role !== "superAdmin") {
                setRedirect(true);
                console.log("Redirecting to home because user is not authorized as super admin");
            }
            else if (adultRequired && !user.infos.adult) {
                setRedirect(true);
                console.log("Redirecting to home because user does not have adult access");
            }
        }
    }, [user, auth, admin, superAdmin, adultRequired]);

    if (redirect) {
        const redirectTo = auth ? "/login" : "/";
        return <Navigate to={redirectTo} />;
    }

    return <Child {...rest} params={params} />;
};

export default RequireAuth;
