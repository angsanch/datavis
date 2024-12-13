import React, { useState } from 'react';
import Map from './Map';
import Graph from './Graph';
import './SlidingMenu.css';

interface SlidingMenuProps {
  addWindow: (children: React.ReactElement, bg?: string) => void,
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
          onClick={() => addWindow(<Graph data={{
            dates: ["2020-01-01", "2020-01-02", "2020-01-03", "2020-01-04", "2020-01-05", "2020-01-06"],
            active: [4, 5, 6, 7, 8, 50],
            recovered: [-3, 4, 5, 6, 7, 8],
            dead: [1, 1, 1, 1, 1, 1],
          }}></Graph>, "#aaa")}
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
