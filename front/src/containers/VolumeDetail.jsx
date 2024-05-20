import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVolumeDetails } from '../slices/VolumeSlice'; 
import AddToLibraryModal from '../components/modal/AddToLibraryModal';
import Banner from "../../public/asset/logo/cover.jpg";

const VolumeDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details: volumeDetails, status } = useSelector(state => state.volume);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIssueId, setSelectedIssueId] = useState(null);

  useEffect(() => {
    dispatch(fetchVolumeDetails(id));
  }, [dispatch, id]);

  const openModal = (issueId) => {
    setSelectedIssueId(issueId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (status === 'loading') {
    return <div>Chargement en cours...</div>;
  } else if (status === 'failed') {
    return <div>Erreur lors du chargement des détails du volume.</div>;
  }

  return (
    <section className='homepage' style={{ '--banner-image': `url(${Banner})` }}>
      <figure className="homepage-banner">
        <img src={Banner} alt="Bannière" />
      </figure>
      <div className="container">
        <h2>Détails de l'édition</h2>
        <section className="search-results-container">
          {volumeDetails?.map((issue, index) => (
            <article key={index} className="search-result-item">
              <h3>{issue.name} (volume {issue.issue_number})</h3>
              <img src={issue.image?.small_url} alt={`Couverture de ${issue.name}`} className="product-image" onClick={() => openModal(issue.id)} />
              <p>Ajouter à une bibliothèque</p>
            </article>
          ))}
        </section>
        <AddToLibraryModal 
            isOpen={isModalOpen} 
            onClose={closeModal} 
            volumeId={selectedIssueId}
            smallImageUrl={volumeDetails?.find(issue => issue.id === selectedIssueId)?.image?.small_url}
            title={volumeDetails?.find(issue => issue.id === selectedIssueId)?.volume?.name}
            description={volumeDetails?.find(issue => issue.id === selectedIssueId)?.description}
          />
      </div>
    </section>
  );
};

export default VolumeDetail;
