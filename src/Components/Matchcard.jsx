import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Matchcard = () => {
  const [fixtures, setFixtures] = useState([]);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State voor laadstatus
  const [itemsToShow, setItemsToShow] = useState(7); // Nieuwe state voor aantal te tonen items
  const navigate = useNavigate();

  const updateItemsToShow = () => {
    const maxHeight = window.innerHeight;
    const newItemsToShow = maxHeight >= 900 ? 7 : maxHeight >= 800 ? 6 : 5;
    setItemsToShow(newItemsToShow);
  };

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const response = await fetch('https://v3.football.api-sports.io/fixtures?league=4&season=2024', {
          method: "GET",
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "93b68e6598fcaa9e002218f1d8b07965" // Replace with your own API key
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        const upcomingFixtures = data.response.filter(fixture => fixture.fixture.status.short !== 'FT');
        upcomingFixtures.sort((a, b) => new Date(a.fixture.date) - new Date(b.fixture.date));
        const limitedFixtures = upcomingFixtures.slice(0, itemsToShow);
        setFixtures(limitedFixtures);
        setIsLoading(false); // Zet isLoading op false na succesvol laden
      } catch (err) {
        setError(err.message);
        setIsLoading(false); // Zet isLoading op false bij fout
      }
    };

    fetchFixtures();
  }, [itemsToShow]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);
    return () => window.removeEventListener('resize', updateItemsToShow);
  }, []);

  const toggleFavorite = (fixtureId) => {
    setFavorites(prevFavorites =>
      prevFavorites.includes(fixtureId)
        ? prevFavorites.filter(id => id !== fixtureId)
        : [...prevFavorites, fixtureId]
    );
  };

  const handleCardClick = (fixtureId) => {
    navigate(`/matches/${fixtureId}`);
  };

  return (
    <div className="container mx-auto p-4">
      {isLoading && <span className="loading loading-dots loading-md"></span>}
      {error && <p className="text-red-500">Er is een fout opgetreden: {error}</p>}
      {fixtures.map(fixture => (
        <div
          key={fixture.fixture.id}
          className="text-white max-w-md flex flex-row h-16 border-b-2 border-white mb-2 cursor-pointer"
          onClick={() => handleCardClick(fixture.fixture.id)}
        >
          <div className="flex flex-col text-center align-middle items-center w-1/6 h-full">
            <div className="flex items-center flex-col justify-center align-middle h-full">
              {fixture.fixture.status.short === 'NS' ? (
                <>
                  <p className='datum2'>{new Date(fixture.fixture.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  <p className='mntext'>{new Date(fixture.fixture.date).toLocaleDateString([], { day: 'numeric', month: 'numeric' })}</p>
                </>
              ) : (
                <p className={fixture.fixture.status.short === '1H' || fixture.fixture.status.short === '2H' ? 'text-red-500' : ''}>
                  {fixture.fixture.status.elapsed ? `${fixture.fixture.status.elapsed}'` : ''}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col w-3/6 h-full">
            <div className="flex flex-col justify-center h-full">
              <div className="flex flex-row h-halfheight items-center">
                <img className='max-w-6' src={fixture.teams.home.logo} alt={fixture.teams.home.name} />
                <p className='ml-1 mntext'>{fixture.teams.home.name}</p>
              </div>

              <div className="mt-1 flex flex-row align-middle h-halfheight items-center">
                <img className='max-w-6' src={fixture.teams.away.logo} alt={fixture.teams.away.name} />
                <p className='ml-1 mntext'>{fixture.teams.away.name}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col text-center w-1/6 h-full justify-center items-end">
            <p className="mr-2 ">{fixture.goals.home !== null ? fixture.goals.home : '-'}</p>
            <p className="mr-2">{fixture.goals.away !== null ? fixture.goals.away : '-'}</p>
          </div>

          <div className="flex w-1/6 h-full justify-center items-center">
            <svg
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(fixture.fixture.id);
              }}
              className={`w-7 h-7 cursor-pointer ${favorites.includes(fixture.fixture.id) ? 'text-red-500' : 'text-white'}`}
              fill={favorites.includes(fixture.fixture.id) ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364l-7.678 7.678a.5.5 0 01-.707 0l-7.678-7.678a4.5 4.5 0 010-6.364z"></path>
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Matchcard;
