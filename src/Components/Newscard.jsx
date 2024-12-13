import React, { useEffect, useState } from 'react';

const Newscard = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [itemsToShow, setItemsToShow] = useState(6); // Nieuwe state voor aantal te tonen items

  const updateItemsToShow = () => {
    const maxHeight = window.innerHeight;
    const newItemsToShow = maxHeight >= 930 ? 6 : maxHeight >= 800 ? 5 : 4;
    setItemsToShow(newItemsToShow);
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsdata.io/api/1/news?apikey=pub_xxxxxxxxxxxxxxxxxc&q=Euro%202024&country=gb&category=sports`
        );
        const data = await response.json();
        if (data && data.results) {
          setNews(data.results);
        } else {
          setError('No articles found.');
        }
      } catch (error) {
        setError("Error fetching the news.");
        console.error("Error fetching the news:", error);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);
    return () => window.removeEventListener('resize', updateItemsToShow);
  }, []);

  const shortenText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className='p-4'>
      {error && <p className='text-red-500'>{error}</p>}
      {news.length > 0 ? (
        news.slice(0, itemsToShow).map((article, index) => (
          <a
            key={index}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className='text-white max-w-md flex flex-row h-20 border-b-2 border-white mb-2 cursor-pointer'
          >
            <div className="newsimg w-2/6 flex items-center justify-center">
              <img className='h-3/4 respon2:h-4/6 rounded-lg' src={article.image_url || 'https://via.placeholder.com/150'} alt="news" />
            </div>
            <div className="newstext w-4/6 flex items-center">
              <p className='mntext2'>{shortenText(article.title, 60)}</p>
            </div>
          </a>
        ))
      ) : (
        !error && <p>Loading news...</p>
      )}
    </div>
  );
};

export default Newscard;
