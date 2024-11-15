import React, { useState } from "react";
import { Rnd } from "react-rnd";

interface WindowProps {
  children: React.ReactNode,
  id:number,
  removeWindow: (id: number) => void,
  frontWindow: (id: number) => void,
}

const Window: React.FC<WindowProps> = ({children, id, removeWindow, frontWindow}) => {
  const [isDraggable, setDraggable] = useState(false);

  const dragMEnter = () => {
    setDraggable(true);
  };
  const dragMLeave = () => {
    setDraggable(false);
  };

  return (
    <Rnd
    minWidth={100}
    minHeight={100}
    bounds="window"
    className="text-white flex items-center justify-center border bg-black"
    disableDragging={!isDraggable}
    onDragStart={() => {frontWindow(id)}}
  >
      <div className="relative border-b-[1px] border-gray-400 bg-blue-500 bg-gray-dark h-[25px] mouse-move flex justify-end"
      onMouseEnter={dragMEnter}
      onMouseLeave={dragMLeave}>
        <button
        onClick={() => {removeWindow(id)}}
        onMouseEnter={dragMLeave}
        className="relative h-full text-center align-middle aspect-square border-l-[1px] bg-red cursor-pointer">
          <img src="https://www.svgrepo.com/download/12848/x-symbol.svg" />
        </button>
      </div>
      <div className="flex-1 w-full overflow-auto" style={{height: "calc(100% - 25px)"}}>
          {children}
      </div>
  </Rnd>
  );
}

export default Window
