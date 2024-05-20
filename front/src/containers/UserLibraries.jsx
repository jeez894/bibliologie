import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Banner from "../../public/asset/logo/cover.jpg";
import config from "../../config";
import { classAPI } from '../api/ClassAPI';
import { useCsrfToken } from '../helpers/UseCsrfToken';
import ConfirmActionToast from '../components/modal/ConfirmActionToast';



const UserLibraries = () => {
  const [libraries, setLibraries] = useState([]);
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const userID = user.infos.userID;
  const csrfToken = useCsrfToken();



  useEffect(() => {
    if (userID) {
      classAPI.getClassesByUserId(userID).then(data => {
        setLibraries(data);
      }).catch(error => {
        console.error('Erreur lors du chargement des classes de l\'utilisateur :', error);
      });
    }
  }, [userID]);

  const handleSelectLibrary = (classID) => {
    navigate(`/library/${userID}/${classID}`);
  };

  const handleRenameLibrary = (classID) => {
    const newName = prompt("Entrez le nouveau nom de la classe:"); // Consider replacing with a modal input
    if (newName) {
      classAPI.updateClass(classID, { name: newName }, csrfToken)
        .then(() => {
          setLibraries(libraries.map(lib => 
            lib.classID === classID ? { ...lib, name: newName } : lib
          ));
          toast.success("Classe renommée avec succès!");
        })
        .catch(error => {
          console.error('Erreur lors du renommage de la classe :', error);
          toast.error("Erreur lors du renommage de la classe.");
        });
    }
  };

  const handleDeleteLibrary = (classID) => {
    toast(<ConfirmActionToast 
      message="Êtes-vous sûr de vouloir supprimer cette classe ?"
      onConfirm={() => {
        classAPI.deleteClass(classID, csrfToken)
          .then(() => {
            setLibraries(libraries.filter(lib => lib.classID !== classID));
            toast.success("Classe supprimée avec succès!");
          })
          .catch(error => {
            console.error('Erreur lors de la suppression de la classe :', error);
            toast.error("Erreur lors de la suppression de la classe.");
          });
      }} 
    />);
  };

  useEffect(() => {
    if (libraries.length > 0) {
      console.log('Liste des bibliothèques actuellement chargées:', libraries);
    }
  }, [libraries]);

  return (
    <section className='homepage' style={{ '--banner-image': `url(${Banner})` }}>
      <figure className="homepage-banner">
        <img src={Banner} alt="Bannière" />
      </figure>
      <div className="container library-item-container">
        <h2>Vos Bibliothèques</h2>
        {libraries.map((library) => (
          <div key={library.classID} className="library-item">
            <button onClick={() => handleSelectLibrary(library.classID)}>
              <h3>{library.name}</h3>
            </button>
            <button onClick={() => handleRenameLibrary(library.classID)}>Renommer</button>
            <button onClick={() => handleDeleteLibrary(library.classID)}>Supprimer</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserLibraries;
