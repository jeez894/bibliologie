import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BookSearch from '../components/BookSearch';
import SearchResults from '../components/SearchResults';
import Pagination from '../components/Pagination';

const SearchSection = ({ page, setPage, limit, handleSearchComplete, handleSearchTriggered }) => {
    const searchResults = useSelector((state) => state.search.results);
    const [showSearchResults, setShowSearchResults] = useState(false);

    const handleToggleSearchResults = () => {
        setShowSearchResults(!showSearchResults);
    };

    return (
        <section className="container">
            <h2>Recherche</h2>
            <BookSearch
                onSearchComplete={handleSearchComplete}
                page={page}
                limit={limit}
                onSearchTriggered={handleSearchTriggered}
            />
            <button onClick={handleToggleSearchResults}>
                {showSearchResults ? 'Masquer les résultats' : 'Afficher les résultats'}
            </button>
            {showSearchResults && (
                searchResults.length > 0 ? <SearchResults /> : <p>Aucun résultat trouvé.</p>
            )}
            <Pagination page={page} setPage={setPage} />
        </section>
    );
};

export default SearchSection;
