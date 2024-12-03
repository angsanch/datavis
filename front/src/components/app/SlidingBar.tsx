import { useState, useRef } from "react";

interface SlidingBarProps {
  items: string[];
  setDate: (date: string) => void;
}

const SlidingBar: React.FC<SlidingBarProps> = ({ items, setDate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [mouseBar, setMouseBar] = useState(false);
  const barRef = useRef<HTMLDivElement | null>(null);

  const handleDrag = (e: React.MouseEvent) => {
    if (!barRef.current) return;

    const barWidth = barRef.current.offsetWidth;
    const rect = barRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;

    const newProgress = Math.min(Math.max(offsetX / barWidth, 0), 1) * 100;
    const newIndex = Math.floor((newProgress / 100) * items.length);

    setProgress(newProgress);
    setCurrentIndex(newIndex);
    setDate(items[newIndex]);
  };

  return (
    <div className="w-full p-[20px] bg-[#000000]"
    onMouseDown={() => setMouseBar(true)}
    onMouseUp={() => setMouseBar(false)}
    onMouseMove={(e) => mouseBar && handleDrag(e)}>
      <div ref={barRef} className="w-full h-[25px] bg-[#e0e0e0] cursor-col-resize relative">
        <div
          className="h-full absolute bg-[#007bff] top-0 left-0"
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>
      <div className="text-center text-base mt-[10px]">
        {items[currentIndex]}
      </div>
    </div>
  );
};

export default SlidingBar;
