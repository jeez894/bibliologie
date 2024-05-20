import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchResults, setQuery } from '../slices/SearchSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import config from "../../config";

const BookSearch = ({ page, limit, onSearchTriggered, onSearchComplete }) => {
    const dispatch = useDispatch();
    const query = useSelector((state) => state.search.query);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    useEffect(() => {
        if (query) {
            handleSearch(false);
        }
    }, [ page, limit]);

    const handleSearch = async (isNewSearch = true) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${config.backend}/api/search`, {
                params: { q: query, page, limit }
            });
            dispatch(setSearchResults(response.data.results));
            setIsLoading(false);
            onSearchComplete();
            onSearchTriggered(isNewSearch);
        } catch (error) {
            console.error('Erreur lors de la recherche :', error);
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        dispatch(setQuery(e.target.value));
    };

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            await handleSearch();
        }
    };

    const handleIconClick = () => {
        if (window.innerWidth <= 768) { // Ajuster cette valeur selon les besoins
            setIsSearchVisible(!isSearchVisible);
        } else {
            handleSearch();
        }
    };

    return (
        <div className="search-container">
            <label htmlFor="searchInput" className="visually-hidden">Rechercher des livres</label>
            <div className="search-input-wrapper">
                <input
                    type="text"
                    id="searchInput"
                    value={query}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Rechercher des livres"
                    className={`search-input ${isSearchVisible ? 'show-on-mobile' : ''}`}
                    disabled={isLoading}
                />
                <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={handleIconClick} />
            </div>
            {isLoading && <span className="loading-text">Recherche en cours...</span>}
        </div>
    );
};

export default BookSearch;
