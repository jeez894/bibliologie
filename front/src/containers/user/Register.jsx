import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { createUser } from "../../api/UserAPI";
import { useCsrfToken } from '../../helpers/UseCsrfToken';

const Register = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [isAdult, setIsAdult] = useState(false);
    const [showAdultContentPopup, setShowAdultContentPopup] = useState(false);
    const [responseToAdultContent, setResponseToAdultContent] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(null);
    const csrfToken = useCsrfToken();

    useEffect(() => {
        
        const currentDate = new Date();
        const userDateOfBirth = new Date(dateOfBirth);
        const age = currentDate.getFullYear() - userDateOfBirth.getFullYear();

        setIsAdult(age >= 18);
    }, [dateOfBirth]);

    const onSubmitForm = (e) => {
        e.preventDefault();
        setError(null);

        const currentDate = new Date();
        const birthDate = new Date(dateOfBirth);
        
        if (birthDate > currentDate) {
            setError("Le voyage dans le temp n'est pas reconnus légalement, vous ne pouvez pas vous inscrire si vous venez du futur, veuillez nous excuser pour la gêne occasionnée");
            return;
        }

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }        

        if (password.length < 8 || !password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,}$/)) {
            setError("Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre, et un caractère spécial.");
            return;
        }

        if (isAdult) {
            
            setShowAdultContentPopup(true);
        } else {
            
            sendRegistrationRequest(false);
        }
    };

    const sendRegistrationRequest = (adultResponse) => {
        const data = {
            email: email,
            status: "utilisateur",
            password: password,
            date_of_birth: dateOfBirth,
            adult: adultResponse === "oui" ? 1 : 0, 
        };

        createUser(data, csrfToken)
            .then((res) => {
                if (res.status === '201') {
                    setRedirect(true);
                } else {
                    setError(res.msg);
                }
            })
            .catch((err) => {
                // Afficher l'erreur dans le UI
                setError(err.error || "Une erreur inconnue est survenue");
            });
    };

    const handleAdultContentResponse = (response) => {
        setResponseToAdultContent(response);
        sendRegistrationRequest(response);
    };

    if (redirect) {
        return <Navigate to="/login" />;
    }
    return (
        <section className="container">
            <h2>S'enregistrer</h2>
            {error !== null && <p>{error}</p>}
            <form className="checkout-form" onSubmit={onSubmitForm}>
                <input type="hidden" name="_csrf" value={csrfToken}/>
    
                <label htmlFor="userEmail" className="visually-hidden">Votre mail</label>
                <input
                    id="userEmail"
                    type="email"
                    placeholder="Votre mail"
                    onChange={(e) => {
                        setEmail(e.currentTarget.value);
                    }}
                />
    
                <label htmlFor="userPassword" className="visually-hidden">Votre mot de passe</label>
                <input
                    id="userPassword"
                    type="password"
                    placeholder="Votre mot de passe"
                    onChange={(e) => {
                        setPassword(e.currentTarget.value);
                    }}
                />
    
                <label htmlFor="confirmPassword" className="visually-hidden">Confirmez votre mot de passe</label>
                <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirmez votre mot de passe"
                    onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                />
    
                <label htmlFor="dateOfBirth" className="visually-hidden">Votre date de naissance</label>
                <input
                    id="dateOfBirth"
                    type="date"
                    placeholder="Votre date de naissance"
                    onChange={(e) => {
                        setDateOfBirth(e.currentTarget.value);
                    }}
                />
    
                <input type="submit" name="Enregistrer" value="S'enregistrer" />
            </form>
    
            {showAdultContentPopup && (
                <div>
                    <p>Voulez-vous avoir accès au contenu pour adulte?</p>
                    <button onClick={() => handleAdultContentResponse("oui")}>Oui</button>
                    <button onClick={() => handleAdultContentResponse("non")}>Non</button>
                </div>
            )}
        </section>
    );
    
};

export default Register;
