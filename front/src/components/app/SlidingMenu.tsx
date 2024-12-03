import React, { useState } from 'react';
import Map from './Map';
import './SlidingMenu.css';

interface SlidingMenuProps {
  addWindow: (children: React.ReactElement) => void,
}

const SlidingMenu: React.FC<SlidingMenuProps> = ({addWindow}) => {
  const [isOpen, setIsOpen] = useState(false);


  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={`menu-container ${isOpen ? 'open' : ''}`}>
      <div className="menu">
        <a href='/'>
          <img src="/favicon.svg" className="object-contain h-[100px] w-[100px]" />
        </a>
        <div className="h-[50px]"></div>
        <div className="menu_buttons">
          <button
          className="p-[20px]"
          onClick={() => addWindow(<Map />)}
          >
            new map
          </button>
          <button
          className="p-[25px]"
          onClick={() => addWindow(<img src="/graph.jpg" />)}
          >
            new graph
          </button>
          <br></br>
          <a>hello</a>
        </div>
      </div>
      <button onClick={toggleMenu} className="arrow-button">
        {isOpen ? '<' : '>'}
      </button>
    </div>
  );
};

export default SlidingMenu;
