import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, connectUser } from "../../slices/UserSlice";
import { updateProfil} from "../../api/UserAPI";
import { fetchUserOrders, fetchOrderDetails } from '../../api/OrderAPI';
import OrderDetailsModal from '../../components/modal/OrderDetailsModal';
import { useCsrfToken } from '../../helpers/UseCsrfToken';
import validateAndCleanData from '../../helpers/DataValidator';


const Profil = (props) => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [msg, setMsg] = useState(null);
    const [editing, setEditing] = useState(false); 
    const [email, setEmail] = useState("");
    const [orders, setOrders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrderDetails, setSelectedOrderDetails] = useState([]);
    const userAllowedFields = ['email', 'status', 'date_of_birth', 'adult'];
    const csrfToken = useCsrfToken();


    const handleViewDetails = (orderID) => {
        fetchOrderDetails(orderID)
            .then(details => {

                setSelectedOrderDetails(details);
                setIsModalOpen(true);
            })
            .catch(error => console.error("Erreur lors de la récupération des détails de commande :", error));
    };
    
    const onSubmitForm = (e) => {
        e.preventDefault();
    
        const data = { email: email };
        const cleanedData = validateAndCleanData(data, userAllowedFields);
    
        if (user.infos && user.infos.userID) {
            updateProfil(cleanedData, user.infos.userID, csrfToken)
            .then((res) => {
                console.log("Réponse de la mise à jour:", res);
    
                if (res.error) {
                    console.log("Erreur lors de la mise à jour:", res.error);
                    setMsg(res.error || "Erreur lors de la modification !");
                } else {
                    if (res.token) {
                        window.localStorage.setItem("b4y-token", res.token);
                    }
                    let newUser = {...user.infos, ...cleanedData};
                    dispatch(connectUser(newUser));
                    setMsg("Profil modifié avec succès !");
                }
            })
            .catch(err => {
                console.log("Erreur lors de la mise à jour:", err);
                setMsg(err.error || "Erreur lors de la mise à jour");
            });
        } else {
            console.log("ID utilisateur non trouvé");
        }
    };    
    
    
    useEffect(() => {
        setEmail(user.infos.email);
    }, [user]);
    
    useEffect(() => {
        if (user.infos && user.infos.userID) {
            fetchUserOrders(user.infos.userID)
                .then((ordersFetched) => {
                    setOrders(ordersFetched);
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération des commandes :", error);
                });
        }
    }, [user.infos.userID]);

    return (
        <section className="container">
            <h2>Mon profil</h2>
            {msg && <p>{msg}</p>}

            {!editing ? (
                <article>
                    <p>Email: {email}</p>
                    <button onClick={() => setEditing(true)}>Modifier</button>
                </article>
            ) : (
                <form className="b-form" onSubmit={onSubmitForm}>
                <label htmlFor="email">Email:</label>
                    <input type="hidden" name="_csrf" value={csrfToken}/>
                    <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                    <input type="submit" value="Enregistrer"/>
                    <button type="button" onClick={() => setEditing(false)}>fermer</button>
                </form>
            )}
            <section className="orders">
            <h3>Mes commandes</h3>
                {orders.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>ID commande</th>
                                <th>Date</th>
                                <th>Statut</th>
                                <th>Prix total</th>
                                <th>Détails</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.orderID}>
                                    <td>{order.orderID}</td>
                                    <td>{new Date(order.order_date).toLocaleDateString()}</td>
                                    <td>{order.order_status}</td>
                                    <td>{order.order_price}€</td>
                                    <td>
                                        <button onClick={() => handleViewDetails(order.orderID)}>Voir détails</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Vous n'avez pas encore passé de commande.</p>
                )}
        </section>
        <OrderDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                orderDetails={selectedOrderDetails}
            />
        </section>
    );
};

export default Profil;