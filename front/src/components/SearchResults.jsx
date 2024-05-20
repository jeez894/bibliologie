import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SearchResults = () => {
  const searchResults = useSelector((state) => state.search.results);



  return (
    <section className="search-results-container">
    {searchResults.map((result, index) => (
        <article key={index} className="search-result-item">
          <Link to={`/volume/${result.id}`}>
            <figure>
              <img src={result.image?.small_url || 'default_image_url.jpg'} alt={result.name} />
              <figcaption>{result.name || 'Titre non disponible'}</figcaption>
            </figure>
          </Link>
          <div className="search-result-item-info">
            <dl>
              <dt>Année de début :</dt>
              <dd>{result.start_year || 'Non spécifié'}</dd>
              <dt>Nombre de tomes :</dt>
              <dd>{result.count_of_issues || 'Non spécifié'}</dd>
              <dt>Éditeur :</dt>
              <dd>{result.publisher?.name || 'Non spécifié'}</dd>
            </dl>
          </div>
        </article>
      ))}
    </section>
  );
};

export default SearchResults;
