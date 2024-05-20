import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { loginUser } from "../../api/UserAPI";
import { useDispatch } from "react-redux";
import { connectUser } from "../../slices/UserSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { AdultStatusContext } from '../../context/AdultStatusContext';
import { useCsrfToken } from '../../helpers/UseCsrfToken';


const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(null);
    const { verifyAdultStatus } = useContext(AdultStatusContext);
    const csrfToken = useCsrfToken();



    const togglePasswordVisibility = () => {
        setIsPasswordShown(!isPasswordShown);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        setError(null);
    
        const data = {
            email: email,
            password: password
        };
    
        loginUser(data, csrfToken)
            .then(res => {
                window.localStorage.setItem('b4y-token', res.token);
                let newUser = res.user;
                newUser.token = res.token;
                dispatch(connectUser(newUser));
                verifyAdultStatus(res.token);
                setRedirect(true);
            })
            .catch(err => {
                setError(err.error);
            });
    };
    

    if (redirect) {
        return <Navigate to="/" />;
    }
    return (
        <>
            <section className="container">
                <h2>Se connecter</h2>
                {error !== null && <p>{error}</p>}
                <form className="checkout-form" onSubmit={onSubmitForm}>
                    <input type="hidden" name="_csrf" value={csrfToken}/>
                    
                    <label htmlFor="userEmail" className="visually-hidden">Votre mail</label>
                    <input
                        id="userEmail"
                        type="email"
                        placeholder="Votre mail"
                        onChange={(e) => setEmail(e.currentTarget.value)}
                    />
    
                    <div className="password-container">
                        <label htmlFor="userPassword" className="visually-hidden">Votre mot de passe</label>
                        <input
                            id="userPassword"
                            type={isPasswordShown ? "text" : "password"}
                            placeholder="Votre mot de passe"
                            onChange={(e) => setPassword(e.currentTarget.value)}
                        />
                        <button onClick={togglePasswordVisibility} type="button" className="password-toggle">
                            <FontAwesomeIcon icon={isPasswordShown ? faEyeSlash : faEye} />
                        </button>
                    </div>
    
                    <input type="submit" value="Se connecter" />
                </form>
            </section>
        </>
    );
    
};

export default Login;
