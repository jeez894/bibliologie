
import React, { useState, useEffect } from 'react';

const ProductCreateModal = ({ isOpen, onClose, onSave, csrfToken }) => {
    const [newProduct, setNewProduct] = useState({
        titre: '',
        price: '',
        stock: '',
        info: '',
        sous_titre: '',
        resume: '',
        description: '',
        product_reference: '',
        supplier_reference: '',
        image: '',
        auteur: '',
        tags: '',
        nombre_de_pages: '',
        parution: '',
    });

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(newProduct, csrfToken);
    };

    if (!isOpen) return null;


    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="image-preview-column">
                        <label htmlFor="image">Image:</label>
                        <input type="text" id="image" name="image" onChange={handleChange} value={newProduct.image} placeholder="URL de l'image" />
                    </div>
                    <fieldset>
                        <legend>Informations principales</legend>
                        <div className="form-column">
                            <label htmlFor="titre">Titre:</label>
                            <input type="text" id="titre" name="titre" value={newProduct.titre} onChange={handleChange} placeholder="Titre du produit" />
        
                            <label htmlFor="sous_titre">Sous-titre:</label>
                            <input type="text" id="sous_titre" name="sous_titre" value={newProduct.sous_titre} onChange={handleChange} placeholder="Sous-titre" />
        
                            <label htmlFor="auteur">Auteur:</label>
                            <input type="text" id="auteur" name="auteur" value={newProduct.auteur} onChange={handleChange} placeholder="Auteur" />
        
                            <label htmlFor="tags">Tags:</label>
                            <input type="text" id="tags" name="tags" value={newProduct.tags} onChange={handleChange} placeholder="Tags" />
        
                            <label htmlFor="nombre_de_pages">Nombre de pages:</label>
                            <input type="number" id="nombre_de_pages" name="nombre_de_pages" value={newProduct.nombre_de_pages} onChange={handleChange} placeholder="Nombre de pages" />
        
                            <label htmlFor="parution">Date de parution:</label>
                            <input type="date" id="parution" name="parution" value={newProduct.parution} onChange={handleChange} placeholder="Date de parution" />
                            
                            <label htmlFor="description">Description:</label>
                            <textarea id="description" name="description" value={newProduct.description} onChange={handleChange} placeholder="Description du produit" />
                        </div>
                        <div className="form-column">
                            <label htmlFor="info">Info:</label>
                            <input type="text" id="info" name="info" value={newProduct.info} onChange={handleChange} placeholder="Informations supplémentaires" />
        
                            <label htmlFor="product_reference">Référence produit:</label>
                            <input type="text" id="product_reference" name="product_reference" value={newProduct.product_reference} onChange={handleChange} placeholder="Référence produit" />
        
                            <label htmlFor="supplier_reference">Référence fournisseur:</label>
                            <input type="text" id="supplier_reference" name="supplier_reference" value={newProduct.supplier_reference} onChange={handleChange} placeholder="Référence fournisseur" />
        
                            <label htmlFor="stock">Stock:</label>
                            <input type="number" id="stock" name="stock" value={newProduct.stock} onChange={handleChange} placeholder="Quantité en stock" />
        
                            <label htmlFor="price">Prix:</label>
                            <input type="number" id="price" name="price" value={newProduct.price} onChange={handleChange} placeholder="Prix du produit" />
        
                            <label htmlFor="resume">Résumé:</label>
                            <textarea id="resume" name="resume" value={newProduct.resume} onChange={handleChange} placeholder="Résumé du produit" />
                        </div>
                    </fieldset>
                    <div className="image-preview-column">
                        <label htmlFor="image">Image:</label>
                        <input type="text" id="image" name="image" onChange={handleChange} value={newProduct.image} placeholder="URL de l'image" />
                        <button type="submit">Créer le produit</button>
                        <button type="button" onClick={onClose}>Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    );
    
    
};

export default ProductCreateModal;
