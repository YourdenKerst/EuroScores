import React from 'react'
import Newscard from './Newscard2'
import Ronaldo from './images/Ronaldo.png';

const News = () => {
  return (
    <div className='h-screen border-b-2 border-white flex'>
        <div className="newscont w-1/2 h-full flex align-middle items-center justify-center">
            <div className="containermatches h-3/4 bg-donkerblauw w-1/2 rounded-lg mt-20 p-6 text-white respon6:w-[70vw] respon7:w-[80vw]">
                <h1 className="mtext">LATEST NEWS</h1>
                <div className="events-container flex justify-center" style={{ overflowY: 'scroll', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                    <Newscard/>
                </div>
            </div>
        </div>

                <div className="Ronaldo w-1/2 h-full" style={{ 
          backgroundImage: `url(${Ronaldo})`, 
          backgroundSize: 'contain', 
          backgroundRepeat: 'no-repeat', 
          backgroundPosition: 'center bottom', 
        }}>
        </div>
    </div>
  )
}

export default News