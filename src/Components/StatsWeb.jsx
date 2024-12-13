import React, { useEffect, useState } from 'react';

const Stats = () => {
  const [groups, setGroups] = useState([]);
  const [topScorers, setTopScorers] = useState([]);
  const [topAssists, setTopAssists] = useState([]);
  const [topYellowCards, setTopYellowCards] = useState([]);
  const [topRedCards, setTopRedCards] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch(`https://v3.football.api-sports.io/standings?league=4&season=2024`, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "xxxxxxxxxxxxx" // Replace with your own API key
          }
        });
        const data = await response.json();
        // Limiting groups to maximum 6 (up to Group F)
        setGroups(data.response[0].league.standings.slice(0, 6));
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    const fetchTopPlayers = async () => {
      try {
        const responses = await Promise.all([
          fetch(`https://v3.football.api-sports.io/players/topscorers?season=2024&league=4`, {
            method: "GET",
            headers: {
              "x-rapidapi-host": "v3.football.api-sports.io",
              "x-rapidapi-key": "93b68e6598fcaa9e002218f1d8b07965" // Replace with your own API key
            }
          }),
          fetch(`https://v3.football.api-sports.io/players/topassists?season=2024&league=4`, {
            method: "GET",
            headers: {
              "x-rapidapi-host": "v3.football.api-sports.io",
              "x-rapidapi-key": "93b68e6598fcaa9e002218f1d8b07965" // Replace with your own API key
            }
          }),
          fetch(`https://v3.football.api-sports.io/players/topyellowcards?season=2024&league=4`, {
            method: "GET",
            headers: {
              "x-rapidapi-host": "v3.football.api-sports.io",
              "x-rapidapi-key": "93b68e6598fcaa9e002218f1d8b07965" // Replace with your own API key
            }
          }),
          fetch(`https://v3.football.api-sports.io/players/topredcards?season=2024&league=4`, {
            method: "GET",
            headers: {
              "x-rapidapi-host": "v3.football.api-sports.io",
              "x-rapidapi-key": "93b68e6598fcaa9e002218f1d8b07965" // Replace with your own API key
            }
          })
        ]);

        const [scorersData, assistsData, yellowCardsData, redCardsData] = await Promise.all(responses.map(res => res.json()));
        
        setTopScorers(scorersData.response.slice(0, 5));
        setTopAssists(assistsData.response.slice(0, 5));
        setTopYellowCards(yellowCardsData.response.slice(0, 5));
        setTopRedCards(redCardsData.response.slice(0, 5));

      } catch (error) {
        console.error("Error fetching top players:", error);
      }
    };

    fetchGroups();
    fetchTopPlayers();
  }, []);

  return (
    <div className='border-b-2 border-white flex justify-center align-middle maincontgroep'>
      <div className="containergroep w-[45%] flex flex-col">
        {groups.map((group, groupIndex) => (
          <div key={groupIndex} className="w-full bg-donkerblauw p-6 containermatches text-white group groottecard">
            <h1 className="mtext">GROUP {String.fromCharCode(65 + groupIndex)}</h1>

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

            {group.map((team, index) => (
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
        ))}
      </div>

      <div className="containergroep w-[30%] flex items-end flex-col">
       <div className="w-[85%] bg-donkerblauw p-6 containermatches text-white group groottecard">
          <h2 className="mtext">TOPSCORERS</h2>
          {topScorers.map((player, index) => (
            <div key={player.player.id} className="text-white flex flex-row h-11 border-b border-white">
              <div className="w-[10%] flex items-center justify-center">
                <p className={`topscorerscore ${index === 0 ? 'text-goud' : index === 1 ? 'text-zilver' : index === 2 ? 'text-brons' : ''}`}>{index + 1}.</p>
              </div>
              <div className="w-[70%] flex items-center">
                <p className='topscorernaam'>{player.player.name}</p>
              </div>
              <div className="w-[20%] flex items-center justify-center">
                <p className='topscorerscore'>{player.statistics[0].goals.total}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-[85%] bg-donkerblauw p-6 containermatches text-white group groottecard">
          <h2 className="mtext">TOP ASSISTER</h2>
          {topAssists.map((player, index) => (
            <div key={player.player.id} className="text-white flex flex-row h-11 border-b border-white">
              <div className="w-[10%] flex items-center justify-center">
                <p className={`topscorerscore ${index === 0 ? 'text-goud' : index === 1 ? 'text-zilver' : index === 2 ? 'text-brons' : ''}`}>{index + 1}.</p>
              </div>
              <div className="w-[70%] flex items-center">
                <p className='topscorernaam'>{player.player.name}</p>
              </div>
              <div className="w-[20%] flex items-center justify-center">
                <p className='topscorerscore'>{player.statistics[0].goals.assists}</p>
              </div>
            </div>
          ))}
        </div>
        
          <div className="w-[85%] bg-donkerblauw p-6 containermatches text-white group groottecard">
          <h2 className="mtext">YELLOW CARDS</h2>
          {topYellowCards.map((player, index) => (
            <div key={player.player.id} className="text-white flex flex-row h-11 border-b border-white">
              <div className="w-[10%] flex items-center justify-center">
                <p className={`topscorerscore ${index === 0 ? 'text-goud' : index === 1 ? 'text-zilver' : index === 2 ? 'text-brons' : ''}`}>{index + 1}.</p>
              </div>
              <div className="w-[70%] flex items-center">
                <p className='topscorernaam'>{player.player.name}</p>
              </div>
              <div className="w-[20%] flex items-center justify-center">
                <p className='topscorerscore'>{player.statistics[0].cards.yellow}</p>
              </div>
            </div>
          ))}
        </div>

                <div className="w-[85%] bg-donkerblauw p-6 containermatches text-white group groottecard">
          <h2 className="mtext">RED CARDS</h2>
          {topRedCards.map((player, index) => (
            <div key={player.player.id} className="text-white flex flex-row h-11 border-b border-white">
              <div className="w-[10%] flex items-center justify-center">
                <p className={`topscorerscore ${index === 0 ? 'text-goud' : index === 1 ? 'text-zilver' : index === 2 ? 'text-brons' : ''}`}>{index + 1}.</p>
              </div>
              <div className="w-[70%] flex items-center">
                <p className='topscorernaam'>{player.player.name}</p>
              </div>
              <div className="w-[20%] flex items-center justify-center">
                <p className='topscorerscore'>{player.statistics[0].cards.red}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Stats;
