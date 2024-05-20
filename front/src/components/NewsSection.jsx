import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import GenericCarousel from './GenericCarousel';

const NewsSection = ({ publisherId, publisherName }) => {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const url = `/api/news${publisherId ? `?publisherId=${publisherId}` : ''}`;
                const response = await axios.get(url);
                console.log('News data:', response.data);
                setNews(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch news:', error);
                setIsLoading(false);
            }
        };
        fetchNews();
    }, [publisherId]);

    const renderNewsItem = (newsItem) => (
        <Link to={`/volume/${newsItem.id}`} key={newsItem.id}>
            <figure>
                <img src={newsItem.image.medium_url} alt={newsItem.name} />
                <figcaption>{newsItem.name}</figcaption>
                <p>{new Date(newsItem.date_added).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
            </figure>
        </Link>
    );

    return (
        <div>
            {isLoading ? <p>Loading news...</p> : (
                <div>
                    <h2>Dernières sorties {publisherName}</h2>
                    <GenericCarousel 
                        items={news} 
                        onItemClick={(newsItem) => console.log(`News item clicked: ${newsItem.id}`)} 
                        renderItem={renderNewsItem} 
                    />
                </div>
            )}
        </div>
    );
};

export default NewsSection;
