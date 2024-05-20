// ProductEditModal.jsx
import React, { useState, useEffect } from 'react';

const ProductEditModal = ({ show, onClose, product, onSave, csrfToken }) => {
    const [formData, setFormData] = useState({
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

    useEffect(() => {
        if (product) {
            setFormData({
                titre: product.titre,
                price: product.price,
                stock: product.stock,
                info: product.info,
                resume: product.resume,
                sous_titre: product.sous_titre,
                description: product.description || '',
                product_reference: product.product_reference || '',
                supplier_reference: product.supplier_reference || '',
                image: product.image || '',
                auteur: product.auteur || '',
                tags: product.tags || '',
                nombre_de_pages: product.nombre_de_pages || '',
                parution: product.parution || '',
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(product.productID, formData, csrfToken);
    };

    if (!show) return null;
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit} className="modal-form">
                    <fieldset>
                        <legend>Informations principales</legend>
                        <div className="form-column">
                            <label htmlFor="titre">Titre:</label>
                            <input id="titre" type="text" name="titre" value={formData.titre} onChange={handleChange} />
    
                            <label htmlFor="sous_titre">Sous-titre:</label>
                            <input id="sous_titre" type="text" name="sous_titre" value={formData.sous_titre} onChange={handleChange} />
    
                            <label htmlFor="auteur">Auteur:</label>
                            <input id="auteur" type="text" name="auteur" value={formData.auteur} onChange={handleChange} />
    
                            <label htmlFor="tags">Tags:</label>
                            <input id="tags" type="text" name="tags" value={formData.tags} onChange={handleChange} />
    
                            <label htmlFor="nombre_de_pages">Nombre de pages:</label>
                            <input id="nombre_de_pages" type="number" name="nombre_de_pages" value={formData.nombre_de_pages} onChange={handleChange} />
    
                            <label htmlFor="parution">Date de parution:</label>
                            <input id="parution" type="date" name="parution" value={formData.parution} onChange={handleChange} />
                            <label htmlFor="description">Description:</label>
                            <textarea id="description" name="description" value={formData.description} onChange={handleChange} />
                        </div>
                        <div className="form-column">
                            <label htmlFor="info">Info:</label>
                            <input id="info" type="text" name="info" value={formData.info} onChange={handleChange} />
    
                            <label htmlFor="product_reference">Référence produit:</label>
                            <input id="product_reference" type="text" name="product_reference" value={formData.product_reference} onChange={handleChange} />
    
                            <label htmlFor="supplier_reference">Référence fournisseur:</label>
                            <input id="supplier_reference" type="text" name="supplier_reference" value={formData.supplier_reference} onChange={handleChange} />
    
                            <label htmlFor="stock">Stock:</label>
                            <input id="stock" type="number" name="stock" value={formData.stock} onChange={handleChange} />
    
                            <label htmlFor="price">Prix:</label>
                            <input id="price" type="number" name="price" value={formData.price} onChange={handleChange} />
    
                            <label htmlFor="resume">Résumé:</label>
                            <textarea id="resume" name="resume" value={formData.resume} onChange={handleChange} />
                        </div>
                    </fieldset>
                    <div className="image-preview-column">
                        <img src={"https://i.imgur.com/" + product.image.split('/').pop().split('.')[0] + ".jpg"} alt={product.titre} className="image-preview" />
                        <label htmlFor="image">URL de l'image:</label>
                        <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} />
                        <button type="submit">Enregistrer les modifications</button>
                    </div>
                </form>
            </div>
        </div>
    );    
};

export default ProductEditModal;