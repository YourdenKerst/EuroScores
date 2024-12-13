import React, { useState, useEffect } from 'react';
import MobileView from './MatchDetailMobile'; // Component voor mobiele weergave
import DesktopView from './MatchDetailWeb'; // Component voor desktop weergave

const Stats = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {windowWidth <= 1100 ? ( // Bij een breedte van 768px of minder, render de mobiele weergave
        <MobileView />
      ) : ( // Bij een breedte groter dan 768px, render de desktop weergave
        <DesktopView />
      )}
    </div>
  );
};

export default Stats;
