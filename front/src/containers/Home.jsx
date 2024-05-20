import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Banner from "../../public/asset/logo/cover.jpg";
import LibraryModal from '../components/modal/LibraryModal';
import NewsSection from '../components/NewsSection'
import SearchSection from '../components/SearchSection';


const Home = (props) => {
    const searchResults = useSelector((state) => state.search.results);
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [modals, setModals] = useState({
      createLibrary: false,
      anotherModal: false,
      });

    const openModal = (modalName) => {
        setModals({ ...modals, [modalName]: true });
    };

    const closeModal = (modalName) => {
        setModals({ ...modals, [modalName]: false });
    };

    const handleSearchComplete = () => {
        setShowSearchResults(true);
    };

    const handleViewLibraries = () => {
        navigate('/user-libraries');
    };

    const handleSearchTriggered = (isNewSearch) => {
      if (isNewSearch) {
          setPage(1);
      }
  };
  
    return (
        <div className='homepage' style={{ '--banner-image': `url(${Banner})` }}>
            <figure className="homepage-banner">
                <img src={Banner} alt="Bannière" />
            </figure>
            {user.isLogged && (
                <section className="container">
                    <h2>Votre Bibliothèque</h2>
                    <button onClick={() => openModal('createLibrary')}>Créer une Bibliothèque</button>
                    <LibraryModal isOpen={modals.createLibrary} onClose={() => closeModal('createLibrary')} />
                    <button onClick={handleViewLibraries}>Voir Vos Bibliothèques</button>
                </section>
            )}
            <SearchSection
                page={page}
                setPage={setPage}
                limit={limit}
                handleSearchComplete={handleSearchComplete}
                handleSearchTriggered={handleSearchTriggered}
            />
            <section className="container">
                <NewsSection publisherId="31" publisherName="Marvel" />
                <NewsSection publisherId="10" publisherName="DC" />
            </section>
        </div>
    );
};

export default Home;
