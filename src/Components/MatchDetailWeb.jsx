import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import bal from "./images/balwit.png";
import wissel from "./images/wisselwit.png";

const MatchDetail = () => {
  const { id } = useParams(); // Extracting 'id' from URL params
  const [matchDetails, setMatchDetails] = useState(null);
  const [events, setEvents] = useState([]);
  const [weather, setWeather] = useState(null); // State for weather data
  const [standings, setStandings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const response = await fetch(`https://v3.football.api-sports.io/fixtures?id=${id}`, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "xxxxxx" // Replace with your own API key
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        const match = data.response[0];
        setMatchDetails(match);

        // Combine all events
        const allEvents = [
          ...match.events.filter(event => event.type === "Goal"),
          ...match.events.filter(event => event.type === "Card" && event.detail === "Yellow Card"),
          ...match.events.filter(event => event.type === "Card" && event.detail === "Red Card"),
          ...match.events.filter(event => event.type === "Time" && event.detail === "Halftime"),
          ...match.events.filter(event => event.type === "subst")
        ];

        // Sort events by elapsed time
        allEvents.sort((a, b) => b.time.elapsed - a.time.elapsed);
        setEvents(allEvents);

        // Fetch weather data
        const matchDate = new Date(match.fixture.date);
        const matchLocation = match.fixture.venue.city;
        const apiKey = "a68570e3c4994df385582423241806"; // Replace with your WeatherAPI key
        const weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${matchLocation}&dt=${matchDate.toISOString().split('T')[0]}`);
        if (!weatherResponse.ok) {
          throw new Error(`Error: ${weatherResponse.status}`);
        }
        const weatherData = await weatherResponse.json();
        setWeather(weatherData.forecast.forecastday[0]);

        // Fetch standings
        const leagueId = match.league.id;
        const season = new Date(match.fixture.date).getFullYear();
        const standingsResponse = await fetch(`https://v3.football.api-sports.io/standings?league=${leagueId}&season=${season}`, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "93b68e6598fcaa9e002218f1d8b07965" // Replace with your own API key
          }
        });

        if (!standingsResponse.ok) {
          throw new Error(`Error: ${standingsResponse.status}`);
        }

        const standingsData = await standingsResponse.json();
        // Determine the group of the match
        const groupStandings = standingsData.response[0].league.standings.find(group => 
          group.some(team => team.team.id === match.teams.home.id || team.team.id === match.teams.away.id)
        );

        setStandings(groupStandings); // Set the standings to be displayed

      } catch (err) {
        setError(err.message);
      }
    };

    fetchMatchDetails();
  }, [id]);

  if (error) {
    return <p className="text-red-500">Er is een fout opgetreden: {error}</p>;
  }

  if (!matchDetails) {
    return <p>Loading...</p>; // You can replace this with a loading spinner or animation
  }

  const isLive = matchDetails.fixture.status.short === '1H' || matchDetails.fixture.status.short === '2H';
  const isFinished = matchDetails.fixture.status.short === 'FT';

  return (
    <div className="h-screen border-b-2 border-white flex flex-row">
      <div className="w-1/2 h-full flex align-middle items-center justify-center">
        <div className="containermatches h-3/4 bg-donkerblauw w-1/2 respon1:w-4/6 flex items-center flex-col rounded-lg mt-20 p-6 text-white">
          <div className="text-white w-full flex flex-row h-24 border-b-4 border-white mb-2">
            <div className="w-2/5 flex flex-row items-center justify-center">
              <img src={matchDetails.teams.home.logo} className="h-16 w-16 object-contain" alt={matchDetails.teams.home.name} />
              <p className="detailscore ml-5">{matchDetails.goals.home !== null ? matchDetails.goals.home : '-'}</p>
            </div>

            <div className="w-1/5 flex flex-col items-center justify-center">
              <p className={`detailtijd ${isLive ? 'text-red-500' : isFinished ? 'text-gray-500' : ''}`}>
                {isLive ? `${matchDetails.fixture.status.elapsed}' ` : isFinished ? 'FT' : new Date(matchDetails.fixture.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="detaildatum">
                {new Date(matchDetails.fixture.date).toLocaleDateString([], { day: 'numeric', month: 'numeric' })}
              </p>
            </div>

            <div className="w-2/5 flex flex-row items-center justify-center">
              <p className="detailscore mr-5">{matchDetails.goals.away !== null ? matchDetails.goals.away : '-'}</p>
              <img src={matchDetails.teams.away.logo} className="h-16 w-16 object-contain" alt={matchDetails.teams.away.name} />
            </div>
          </div>


          {/* Render all events */}
          <div className="events-container w-[100%]" style={{ overflowY: 'scroll', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            {events.map(event => (
              <div key={event.id} className="text-white w-full flex flex-row h-11 border-b border-white mb-2">
                <div className="w-1/6 flex items-center justify-center">
                  {event.type === "Goal" && (
                    <img src={bal} alt="goal" className="h-6 lg:h-6" />
                  )}
                  {(event.type === "Card" && event.detail === "Yellow Card") && (
                    <svg width="15" height="20" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100" height="200" fill="yellow" />
                    </svg>
                  )}
                  {(event.type === "Card" && event.detail === "Red Card") && (
                    <svg width="15" height="20" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100" height="200" fill="red" />
                    </svg>
                  )}
                  {event.type === "Time" && event.detail === "Halftime" && (
                    <div className="flex items-center justify-center h-full">
                      <p className='text-xl'>HT</p>
                    </div>
                  )}
                  {event.type === "subst" && (
                    <div className="flex items-center justify-center h-full">
                      <img src={wissel} alt="goal" className="h-6 lg:h-6" />
                    </div>
                  )}
                </div>
                <div className="w-4/6 flex items-center">
                  {event.type === "subst" ? (
                    <p className='gbnaam'><span className="text-gray-500">{event.player.name}</span> <span className="text-green-500">→</span><span className='ml-2'>{event.assist.name}</span> </p>
                  ) : (
                    <p className='gbnaam'>{event.player ? event.player.name : 'Halftime'}</p>
                  )}
                </div>
                <div className="w-1/6 flex items-center justify-center">
                  <p className='gbtijd'>{event.time.elapsed}`</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <div className="w-1/2 h-full flex align-middle items-center">
        <div className="containermatches h-3/4 w-3/4 respon1:w-5/6 rounded-lg mt-20 text-white">
          <div className="h-3/6 bg-donkerblauw p-6 containermatches text-white">
            <h1 className="mtext">STANDINGS</h1>

            <div className="h-5 border-b-2 border-lichtblauw mb-2 flex flex-row pb-2">
              <div className="w-[5%] flex items-center justify-center">
                <p>#</p>
              </div>

              <div className="w-[65%] flex items-center">
                <p>Team</p>
              </div>

              <div className="w-[5%] flex items-center justify-center">
                <p>P</p>
              </div>

              <div className="w-[5%] flex items-center justify-center">
                <p>W</p>
              </div>

              <div className="w-[5%] flex items-center justify-center">
                <p>D</p>
              </div>

              <div className="w-[5%] flex items-center justify-center">
                <p>L</p>
              </div>

              <div className="w-[5%] flex items-center justify-center">
                <p>GD</p>
              </div>

              <div className="w-[10%] flex items-center justify-center">
                <p>Points</p>
              </div>
            </div>

{standings.map((team, index) => (
  <div key={team.team.id} className="text-white flex flex-row h-11 border-b border-white mb-2">
    <div className="w-[5%] flex items-center justify-center">
      <p className={`standdiktext ${index + 1 === 3 ? 'text-orange-600' : index + 1 === 4 ? 'text-roodlive' : ''}`}>
        {index + 1}
      </p>
    </div>

    <div className="w-[65%] flex items-center">
      <p className='standtext'>{team.team.name}</p>
    </div>

    <div className="w-[5%] flex items-center justify-center">
      <p className='standtext'>{team.all.played}</p>
    </div>

    <div className="w-[5%] flex items-center justify-center">
      <p className='standtext'>{team.all.win}</p>
    </div>

    <div className="w-[5%] flex items-center justify-center">
      <p className='standtext'>{team.all.draw}</p>
    </div>

    <div className="w-[5%] flex items-center justify-center">
      <p className='standtext'>{team.all.lose}</p>
    </div>

    <div className="w-[5%] flex items-center justify-center">
      <p className='standtext'>{team.goalsDiff}</p>
    </div>

    <div className="w-[10%] flex items-center justify-center">
      <p className='standdiktext'>{team.points}</p>
    </div>
  </div>
))}


          </div>

          <div className="h-[10%]"></div>

          <div className="h-[40%] bg-donkerblauw p-6 rounded-lg containermatches text-white">
            <h1 className="mtext">MATCH DETAILS</h1>
            <div className="flex flex-row">
              <div className="w-1/2">
                <p className='mdetailtext'>Stadium:</p>
                <p className='mdetailtext'>Location:</p>
                <p className='mdetailtext'>Referee:</p>
                <p className='mdetailtext'>Weather forecast:</p>
                <p className='mdetailtext'>Condition:</p>
              </div>

              <div className="w-1/2 flex flex-col items-end">
                <p className='mdetailtext'>{matchDetails.fixture.venue.name || '-'}</p>
                <p className='mdetailtext'>{matchDetails.fixture.venue.city || '-'}</p>
                <p className='mdetailtext'>{matchDetails.fixture.referee || '-'}</p>
                {weather ? (
                  <>
                    <p className='mdetailtext'>{weather.day.avgtemp_c ? `${weather.day.avgtemp_c} °C` : '-'}</p>
                    <p className='mdetailtext'>{weather.day.condition.text || '-'}</p>
                  </>
                ) : (
                  <>
                    <p className='mdetailtext'>-</p>
                    <p className='mdetailtext'>-</p>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetail;
