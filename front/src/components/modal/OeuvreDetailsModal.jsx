import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { libraryAPI } from '../../api/LibraryAPI';
import { classAPI } from '../../api/ClassAPI';
import { itemAPI } from '../../api/ItemAPI';
import { useCsrfToken } from '../../helpers/UseCsrfToken';  // Assurez-vous d'avoir un hook pour récupérer le CSRF token

const OeuvreDetailsModal = ({ isOpen, onClose, oeuvre, userId, classId, onRefresh }) => {
  const [newClassID, setNewClassID] = useState('');
  const [availableLibraries, setAvailableLibraries] = useState([]);
  const csrfToken = useCsrfToken(); // Utilisation du hook pour récupérer le token CSRF

  useEffect(() => {
    if (!userId || !isOpen) return;

    classAPI.getClassesByUserId(userId)
      .then(data => {
        const filteredLibraries = data.filter(library => library.classID !== classId);
        setAvailableLibraries(filteredLibraries);
      })
      .catch(error => console.error('Erreur lors du chargement des bibliothèques :', error));
  }, [userId, classId, isOpen, csrfToken]);

  const updateOeuvreStatus = async (newStatus) => {
    const isConfirmed = window.confirm('Confirmez-vous le changement de statut de cette œuvre ?');
    if (isConfirmed) {
      try {
        const data = {
          userID: userId,
          classID: classId,
          itemID: oeuvre.itemID,
          newStatus
        };
        await libraryAPI.updateStatusLibrary(userId, classId, oeuvre.itemID, data, csrfToken);
        onRefresh?.();
        onClose();
      } catch (error) {
        console.error('Erreur lors de la mise à jour du statut de l\'œuvre :', error);
      }
    }
  };
  
  const handleChangeLibrary = async (newClassID) => {
    if (!newClassID) {
      alert('Veuillez sélectionner une nouvelle bibliothèque.');
      return;
    }
    const isConfirmed = window.confirm('Confirmez-vous le changement de bibliothèque pour cette œuvre ?');
    if (isConfirmed) {
      try {
        const data = {
          userID: userId,
          itemID: oeuvre.itemID,
          oldClassID: classId,
          newClassID
        };
        await libraryAPI.updateLibraryLibrary(userId, classId, oeuvre.itemID, data, csrfToken);
        onRefresh?.();
        onClose();
      } catch (error) {
        console.error('Erreur lors du changement de bibliothèque de l\'œuvre :', error);
      }
    }
  };
  
  const handleDelete = async () => {
    const isConfirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cette œuvre ?');
    if (isConfirmed) {
      try {
        await libraryAPI.deleteLibraryEntry(userId, classId, oeuvre.itemID, csrfToken);
        onRefresh?.();
        onClose();
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'œuvre :', error);
      }
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={e => e.stopPropagation()}>
      <div className="product-container modal-content">
        <img src={oeuvre.apiURL} alt={`Couverture de ${oeuvre.title}`} className="product-image"/>
        <div className="product-details">
          <h2>{oeuvre.title}</h2>
          <p><strong>Description:</strong> {oeuvre.description}</p>
          <button onClick={handleDelete}>Supprimer</button>
          <select value={oeuvre.status} className="select-custom" onChange={(e) => updateOeuvreStatus(e.target.value)}>
            <option value="">Choisir un statut</option>
            <option value="a lire et souhaité">a lire et souhaité</option>
            <option value="lu et souhaité">lu et souhaité</option>
            <option value="a lire et possédé">a lire et possédé</option>
            <option value="lu et possédé">lu et possédé</option>
          </select>
          <select value={newClassID} className="select-custom" onChange={(e) => handleChangeLibrary(e.target.value)}>
            <option value="">Sélectionner une nouvelle bibliothèque</option>
            {availableLibraries.map((library) => (
              <option key={library.classID} value={library.classID}>{library.name}</option>
            ))}
          </select>
          <button onClick={onClose}>Fermer</button>
        </div>
      </div>
    </div>
  );
};

export default OeuvreDetailsModal;
