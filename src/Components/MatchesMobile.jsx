import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Links from './images/links.png';
import Rechts from './images/rechts.png';

const Matches = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fixtures, setFixtures] = useState([]);
  const [topScorer, setTopScorer] = useState(null);
  const [topAssister, setTopAssister] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [favoriteFixtures, setFavoriteFixtures] = useState([]);
  const navigate = useNavigate(); // Use navigate function from react-router-dom

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const response = await fetch('https://v3.football.api-sports.io/fixtures?league=4&season=2024', {
          method: "GET",
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "xxxxxx" // Replace with your own API key
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // Combine both upcoming and past fixtures
        const allFixtures = data.response;
        // Sort fixtures by date
        allFixtures.sort((a, b) => new Date(a.fixture.date) - new Date(b.fixture.date));
        setFixtures(allFixtures);
      } catch (error) {
        console.error('Error fetching fixtures:', error);
      }
    };

    fetchFixtures();
  }, []);

  useEffect(() => {
    const fetchTopScorer = async () => {
      try {
        const response = await fetch("https://v3.football.api-sports.io/players/topscorers?season=2024&league=4", {
          method: "GET",
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "93b68e6598fcaa9e002218f1d8b07965"
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        const topScorerData = data.response[0];
        setTopScorer(topScorerData);
      } catch (error) {
        console.error("Error fetching top scorer:", error);
      }
    };

    const fetchTopAssister = async () => {
      try {
        const response = await fetch("https://v3.football.api-sports.io/players/topassists?season=2024&league=4", {
          method: "GET",
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "93b68e6598fcaa9e002218f1d8b07965"
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        const topAssisterData = data.response[0];
        setTopAssister(topAssisterData);
      } catch (error) {
        console.error("Error fetching top assister:", error);
      }
    };

    fetchTopScorer();
    fetchTopAssister();
  }, []);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    // Update favorite fixtures based on the ids in favorites
    setFavoriteFixtures(fixtures.filter(fixture => favorites.includes(fixture.fixture.id)));
  }, [favorites, fixtures]);

  const toggleFavorite = (fixtureId) => {
    setFavorites(prevFavorites =>
      prevFavorites.includes(fixtureId)
        ? prevFavorites.filter(id => id !== fixtureId)
        : [...prevFavorites, fixtureId]
    );
  };

  const changeDate = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const filteredFixtures = fixtures.filter(fixture => {
    const fixtureDate = new Date(fixture.fixture.date).toDateString();
    return fixtureDate === selectedDate.toDateString();
  });

  const handleMatchClick = (fixtureId) => {
    navigate(`/matches/${fixtureId}`); // Use navigate function to change URL
  };

  return (
    <div className='h-auto border-b-2 border-white flex flex-col items-center'>
         <div className="h-full w-[35vw] flex items-center justify-center align-middle respon6:w-[45vw] respon7:w-[80vw]">
        <div className="h-3/4 w-[100%] mt-20 text-white">

          <div className="w-full h-[15vh] bg-donkerblauw containermatches flex flex-col align-middle items-center mt-16 justify-center">
            <div className="titeldatum h-[25%] flex items-center justify-center align-middle">
              <h2 className='titelmtch'>CHOOSE DATE</h2>
            </div>

            <div className="flex flex-row w-full h-[55%] items-center justify-center align-middle">
              <div className="w-[20%] flex items-center justify-center">
                <button onClick={() => changeDate(-1)} className="text-white w-4/6 cursor-pointer">
                  <img src={Links} alt="Left arrow" />
                </button>
              </div>
              <div className="w-[50%] flex items-center flex-col justify-center align-middle h-[80%]">
                <p className='datum'>{selectedDate.getDate()}</p>
                <p className='maand'>{selectedDate.toLocaleDateString('en-US', { month: 'long' }).toUpperCase()}</p>
              </div>
              <div className="w-[20%] flex items-center justify-center">
                <button onClick={() => changeDate(1)} className="text-white w-4/6 cursor-pointer">
                  <img src={Rechts} alt="Right arrow" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="h-[70vh] w-[35vw] flex items-center justify-center align-middle respon6:w-[45vw] respon7:w-[80vw]">
        <div className="containermatches h-full bg-donkerblauw w-full rounded-lg mt-20 p-6 text-white">
          <h1 className="mtext">MATCHES</h1>
          {filteredFixtures.map(fixture => (
            <div
              key={fixture.fixture.id}
              className="text-white max-w-md flex flex-row h-16 border-b-2 border-white mb-2 cursor-pointer"
              onClick={() => handleMatchClick(fixture.fixture.id)} // Navigate to match details on click
            >
              {/* Display fixture details */}
              <div className="flex flex-col text-center align-middle items-center w-1/6 h-full">
                <div className="flex items-center flex-col justify-center align-middle h-full">
                  {fixture.fixture.status.short === 'NS' ? (
                    <>
                      <p className='datum2'>{new Date(fixture.fixture.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      <p className='mntext'>{new Date(fixture.fixture.date).toLocaleDateString([], { day: 'numeric', month: 'numeric' })}</p>
                    </>
                  ) : (
                    <p className={fixture.fixture.status.short === 'FT' ? 'text-gray-500' : ''}>
                      {fixture.fixture.status.short === '1H' || fixture.fixture.status.short === '2H'
                        ? <span className="text-red-500">{fixture.fixture.status.elapsed ? `${fixture.fixture.status.elapsed}'` : ''}</span>
                        : fixture.fixture.status.short === 'FT' ? 'FT' : ''}
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
                <p className="mr-2">{fixture.goals.home !== null ? fixture.goals.home : '-'}</p>
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
      </div>

      <div className="h-full w-[35vw] flex items-center justify-center align-middle mb-16 respon6:w-[45vw] respon7:w-[80vw]">
        <div className="h-3/4 w-full mt-20 text-white">
          <div className="w-[100%] h-[30vh] bg-donkerblauw containermatches">
            <div className="h-[25%] flex items-center align-middle justify-center">
              <h2 className='titelmtch'>FAVOURITES</h2>
            </div>
            <div className="h-[65%] flex flex-col items-center justify-start overflow-auto" style={{ overflowY: 'scroll', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
              {favoriteFixtures.map(fixture => (
                <div 
                  key={fixture.fixture.id} 
                  className="text-white w-3/4 flex flex-row h-12 border-b-2 border-white mb-2 cursor-pointer"
                  onClick={() => handleMatchClick(fixture.fixture.id)} // Navigate to match details on click
                >
                  <div className="w-1/4 flex justify-center align-middle items-center">
                    <img src={fixture.teams.home.logo} className='w-2/4' alt={fixture.teams.home.name} />
                  </div>

                  <div className="w-2/4 flex items-center justify-center align-middle">
                    {fixture.goals.home !== null && fixture.goals.away !== null ? (
                      <p className='mntext'>{fixture.goals.home} - {fixture.goals.away}</p>
                    ) : (
                      <div className="flex flex-col items-center">
                        <p className='datum2'>{new Date(fixture.fixture.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        <p className='mntext'>{new Date(fixture.fixture.date).toLocaleDateString([], { day: 'numeric', month: 'numeric' })}</p>
                      </div>
                    )}
                  </div>

                  <div className="w-1/4 flex justify-center align-middle items-center">
                    <img src={fixture.teams.away.logo} className='w-2/4' alt={fixture.teams.away.name} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Matches;
