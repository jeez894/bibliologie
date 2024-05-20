import React, { useState, useEffect } from 'react';
import { productAPI } from '../../api/ProductAPI';
import ProductEditModal from '../modal/ProductEditModal';
import ProductCreateModal from '../modal/ProductCreateModal';
import { useCsrfToken } from '../../helpers/UseCsrfToken';
import { toast } from 'react-toastify';
import ConfirmActionToast from '../modal/ConfirmActionToast';




const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchParams, setSearchParams] = useState({
        titre: '',
        productID: '',
    });
    const csrfToken = useCsrfToken();

    const handleOpenEditModal = (product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const fetchProducts = (params) => {

        setLoading(true);
        productAPI.searchProducts(params)
            .then(response => {
                setProducts(response || []);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                console.error('Erreur lors de la récupération des produits:', error);
            });
    };

    const handleUpdateProduct = (productID, updates) => {
        productAPI.updateProduct(productID, updates, csrfToken)
            .then(() => {
                setIsEditModalOpen(false);
                fetchProducts(searchParams); 
                toast.success('Produit modifié avec succès!');
            })
            .catch(console.error);
            toast.error('Erreur lors de la modification du produit. Veuillez réessayer.');
    };

    const handleCreateProduct = (newProduct, csrfToken) => {
        productAPI.createProduct(newProduct, csrfToken)
            .then(() => {
                setIsCreateModalOpen(false);
                fetchProducts(searchParams);
                toast.success('Produit créé avec succès!');
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout du produit:', error);
                toast.error('Erreur lors de la création du produit. Veuillez réessayer.');
            });
    };
    
    const handleDeleteProduct = (productID) => {
        const confirmAction = () => {
            productAPI.deleteProduct(productID, csrfToken)
                .then(() => {
                    fetchProducts(searchParams); // Rafraîchir la liste des produits
                    toast.success('Produit supprimé avec succès!');
                })
                .catch(error => {
                    console.error('Erreur lors de la suppression du produit:', error);
                    toast.error('Erreur lors de la suppression. Veuillez réessayer.');
                });
            toast.dismiss(); // Ferme tous les toasts ouverts
        };
    
        toast(<ConfirmActionToast
                message="Attention : cette action est définitive. Confirmer ?"
                onConfirm={confirmAction}
              />, {
                position: "top-center",
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                closeButton: false
            });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchPerformed(true);

        fetchProducts(searchParams);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSearchParams(prevParams => ({
            ...prevParams,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <>
            <h2>Gestion des produits</h2>
            <button onClick={() => setIsCreateModalOpen(true)}>Créer un nouveau produit</button>
            <form onSubmit={handleSearch}>
                <label htmlFor="titre" className="visually-hidden">Titre du produit</label>
                <input 
                    type="text" 
                    name="titre" 
                    id="titre"
                    placeholder="Titre du produit" 
                    value={searchParams.titre} 
                    onChange={handleChange} 
                />

                <label htmlFor="productID" className="visually-hidden">ID du produit</label>
                <input 
                    type="text" 
                    name="productID" 
                    id="productID"
                    placeholder="ID du produit" 
                    value={searchParams.productID} 
                    onChange={handleChange} 
                />

                <button type="submit">Rechercher</button>
            </form>
            {loading ? <p>Chargement...</p> : searchPerformed && (
                <table>
                    <thead>
                        <tr>
                            <th>ID Produit</th>
                            <th>Nom</th>
                            <th>Prix</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.productID}>
                                <td data-label="ID Produit">{product.productID}</td>
                                <td data-label="Nom">{product.titre}</td>
                                <td data-label="Prix">{product.price}</td>
                                <td data-label="Stock">{product.stock}</td>
                                <td data-label="Actions">
                                    <button onClick={() => handleOpenEditModal(product)}>Modifier</button>
                                    <button onClick={() => handleDeleteProduct(product.productID)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {isCreateModalOpen && (
                <ProductCreateModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSave={handleCreateProduct}
                    csrfToken={csrfToken}
                />
            )}
            {isEditModalOpen && (
                <ProductEditModal
                    show={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    product={selectedProduct}
                    onSave={handleUpdateProduct}
                    csrfToken={csrfToken}
                />
            )}
            {!loading && searchPerformed && products.length === 0 && <p>Aucun résultat trouvé.</p>}
        </>
    );
};

export default ProductManagement;
