import React from 'react';
import { useNavigate } from 'react-router-dom';
import Matchcard from './Matchcard';
import Mbappe from './images/Mbappe.png'; 
import Bellingham from './images/Bellingham.png';
import Newscard from './Newscard';

const Homepage = () => {
  const navigate = useNavigate();

  const handleMoreMatchesClick = () => {
    navigate('/matches');
  };

  const handleMoreNewsClick = () => {
    navigate('/news');
  };

  return (
    <>
      <div className="h-screen border-b-2 border-white flex">
        <div className="matchcontainerhome w-1/2 h-full flex align-middle items-center justify-center ">
          <div className="containermatches h-3/4 bg-donkerblauw w-1/2 respon1:w-2/6 respon2:w-1/2 respon3:w-5/6 rounded-lg mt-20 p-6 text-white">
            <h1 className="mtext">MATCHES</h1>
            <div className="">
            <Matchcard />
            </div>
            <div className="flex align-middle justify-center">
              <button 
                className="buttonmm pt-2 pb-2 w-1/2 bg-white text-black mt-4 text-lg"
                onClick={handleMoreMatchesClick}
              >
                MORE MATCHES!
              </button>
            </div>
          </div>
        </div>

        <div className="mbappe w-1/2 h-full" style={{ 
          backgroundImage: `url(${Mbappe})`, 
          backgroundSize: 'contain', 
          backgroundRepeat: 'no-repeat', 
          backgroundPosition: 'center bottom', 
        }}>
        </div>
      </div>

      <div className="h-screen bg-donkerderblauw border-b-2 border-white flex flex-row">
        <div className="bellingham w-1/2 h-full" style={{ 
          backgroundImage: `url(${Bellingham})`, 
          backgroundSize: 'contain', 
          backgroundRepeat: 'no-repeat', 
          backgroundPosition: 'center bottom', 
        }}>
        </div>

        <div className="matchcontainerhome w-1/2 h-full flex align-middle items-center justify-center ">
          <div className="containermatches h-3/4 bg-donkerblauw w-1/2 respon1:w-2/6 respon2:w-1/2 respon3:w-5/6 rounded-lg mt-20 p-6 text-white">
            <h1 className="mtext">LATEST NEWS</h1>
            <div className="flex items-center justify-center">
              <Newscard />
            </div>
            
            <div className="button2 flex align-middle justify-center button2">
              <button 
                className="buttonmm pt-2 pb-2 w-1/2 bg-white text-black mt-4"
                onClick={handleMoreNewsClick}
              >
                MORE NEWS!
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
