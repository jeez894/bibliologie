import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { libraryAPI } from '../../api/LibraryAPI';
import { classAPI } from '../../api/ClassAPI';
import { itemAPI } from '../../api/ItemAPI';
import { useCsrfToken } from '../../helpers/UseCsrfToken';


const AddToLibraryModal = ({ isOpen, onClose, volumeId, smallImageUrl, title, description }) => {
  const [libraries, setLibraries] = useState([]);
  const [selectedLibrary, setSelectedLibrary] = useState('');
  const user = useSelector(state => state.user.infos);
  const userID = user.userID;
  const [selectedStatus, setSelectedStatus] = useState('');
  const csrfToken = useCsrfToken();

  useEffect(() => {
    classAPI.getClassesByUserId(userID)
      .then(data => setLibraries(data))
      .catch(error => console.error('Erreur lors du chargement des bibliothèques de l\'utilisateur :', error));
  }, [userID]);

  const handleAddToLibrary = async (e) => {
    e.preventDefault();
    if (!selectedLibrary) {
      alert('Veuillez sélectionner une bibliothèque.');
      return;
    }

    try {
      const itemId = await fetchAndCreateItem(volumeId, smallImageUrl, title, description);
      await libraryAPI.createLibraryEntry({
        userID,
        classID: selectedLibrary,
        itemID: itemId,
        status: selectedStatus
      }, csrfToken);

      onClose();
    } catch (error) {
      alert(`Erreur lors de l'ajout du volume à la bibliothèque : ${error.message || error}`);
    }
  };

  async function fetchAndCreateItem(volumeId, smallImageUrl, title, description) {
    try {
      const item = await itemAPI.getItemByVolumeId(volumeId);
      return item.itemID;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'item par volume ID (${volumeId}):`, error);
      if (error.response && error.response.status === 404) {
        console.log('Item non trouvé, création d\'un nouvel item...');
        console.log('CSRF Token:', csrfToken);
        const newItem = await itemAPI.createItem({
          volumeID: volumeId,
          url_api: smallImageUrl,
          title,
          description
        }, csrfToken);
        return newItem.itemID;
      } else {
        throw new Error('Erreur lors de la vérification de l\'item: ' + (error.message || 'Unknown Error'));
      }
    }
  }
  

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Ajouter à une bibliothèque</h2>
        <form onSubmit={handleAddToLibrary}>
          <select value={selectedLibrary} onChange={e => setSelectedLibrary(e.target.value)} required>
            <option value="" disabled>Choix de la bibliothèque</option>
            {libraries.map(library => (
              <option key={library.libraryID} value={library.classID}>{library.name}</option>  // Assurez-vous que `libraryID` est unique
            ))}
          </select>
          <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)} required>
            <option value="" disabled>Choisir un statut</option>
            <option value="a lire et souhaité">a lire et souhaité</option>
            <option value="lu et souhaité">lu et souhaité</option>
            <option value="a lire et possédé">a lire et possédé</option>
            <option value="lu et possédé">lu et possédé</option>
          </select>
          <button type="submit">Ajouter</button>
          <button onClick={onClose}>Annuler</button>
        </form>
      </div>
    </div>
  );
};

export default AddToLibraryModal;
