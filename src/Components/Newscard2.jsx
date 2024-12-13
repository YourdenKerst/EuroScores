import React, { useEffect, useState } from 'react';

const Newscard = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsdata.io/api/1/news?apikey=pub_xxxxxxxxxxxxxxxxxxx&q=Euro%202024&country=gb&category=sports`
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
        news.map((article, index) => (
          <a
            key={index}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className='text-white max-w-md flex flex-row h-20 border-b-2 border-white mb-2 cursor-pointer'
          >
            <div className="w-2/6 flex items-center justify-center">
              <img className='h-3/4 respon7:h-2/4 rounded-lg' src={article.image_url || 'https://via.placeholder.com/150'} alt="news" />
            </div>
            <div className="w-4/6 flex items-center">
              <p className='mntext'>{shortenText(article.title, 60)}</p>
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
