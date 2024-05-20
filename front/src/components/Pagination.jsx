import React from 'react';

const Pagination = ({ page, setPage }) => {
    const handleNextPage = () => {
        setPage(prev => prev + 1);
    };

    const handlePreviousPage = () => {
        setPage(prev => (prev > 1 ? prev - 1 : 1));
    };

    return (
        <div>
            <button onClick={handlePreviousPage} disabled={page === 1}>Précédent</button>
            <span>Page {page}</span>
            <button onClick={handleNextPage}>Suivant</button>
        </div>
    );
};

export default Pagination;
