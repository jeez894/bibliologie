import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { classAPI } from '../../api/ClassAPI'; // Assurez-vous que le chemin d'importation est correct
import { useCsrfToken } from '../../helpers/UseCsrfToken'; // Importez le hook pour obtenir le CSRF token

const LibraryModal = ({ isOpen, onClose }) => {
  const [className, setClassName] = useState('');
  const user = useSelector(state => state.user.infos);
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const csrfToken = useCsrfToken(); // Utilisez le hook pour obtenir le CSRF token

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userID = user.userID;

    try {
      const data = {
        userID,
        name: className,
        date_of_creation: new Date().toISOString().split('T')[0]
      };
      const response = await classAPI.createClass(data, csrfToken); // Utilisez l'API pour créer la bibliothèque

      setMessage(`Bibliothèque "${className}" créée avec succès!`);
      setFormSubmitted(true);
      setClassName('');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage(error.response.data.message);
      } else {
        console.error('Erreur lors de la création de la bibliothèque :', error);
        setMessage('Erreur lors de la création de la bibliothèque.');
      }
      setFormSubmitted(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Créer une nouvelle bibliothèque</h2>
        {!formSubmitted ? (
          <form onSubmit={handleSubmit} className="checkout-form">
            <label htmlFor="libraryName" className="visually-hidden">Nom de la bibliothèque</label>
            <input
              type="text"
              id="libraryName"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="Nom de la bibliothèque"
              required
            />
            <button type="submit">Créer</button>
            <button onClick={onClose}>Annuler</button>
          </form>
        ) : (
          <>
            <p>{message}</p>
            <button onClick={() => {
              onClose();
              setFormSubmitted(false);
              setMessage('');
            }}>OK</button>
          </>
        )}
      </div>
    </div>
  );
};

export default LibraryModal;
