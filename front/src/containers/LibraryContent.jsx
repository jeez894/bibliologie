import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import OeuvreDetailsModal from '../components/modal/OeuvreDetailsModal';
import Banner from "../../public/asset/logo/cover.jpg";
import config from "../../config"


const LibraryContent = () => {
  const { userId, classId } = useParams();
  const [oeuvres, setOeuvres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOeuvre, setSelectedOeuvre] = useState(null);

  const fetchOeuvres = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${config.backend}/bibliotheque/${userId}/${classId}`);
      setOeuvres(response.data);
      console.log("oeuvre data: " + JSON.stringify(oeuvres, null, 2));
    } catch (error) {
      setError('Erreur lors de la récupération des œuvres.');
      console.error('Erreur lors de la récupération des œuvres :', error);
    }
    setIsLoading(false);
  }, [userId, classId]);

  useEffect(() => {
    fetchOeuvres();
  }, [fetchOeuvres]);

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const openModal = (oeuvre) => {
    setSelectedOeuvre(oeuvre);
    setIsModalOpen(true);
  };

  return (
    <div className='homepage' style={{ '--banner-image': `url(${Banner})` }}>
      <figure className="homepage-banner">
        <img src={Banner} alt="Bannière" />
      </figure>
      <h2 className="container">Contenu de la Bibliothèque</h2>
      <section className="container search-results-container">
        {oeuvres.length > 0 ? (
          oeuvres.map((oeuvre) => (
            <article key={oeuvre.itemID} className="search-result-item" onClick={() => openModal(oeuvre)}>
              <h3>{oeuvre.title}</h3>
              <img src={oeuvre.apiURL} alt={`Couverture de ${oeuvre.title}`} className="product-image" />
              <p>{oeuvre.status}</p>
            </article>
          ))
        ) : (
          <p>Aucune œuvre trouvée dans cette bibliothèque.</p>
        )}
        <OeuvreDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          oeuvre={selectedOeuvre}
          userId={userId}
          classId={classId}
          onRefresh={fetchOeuvres}
        />
      </section>
    </div>
  );
};

export default LibraryContent;