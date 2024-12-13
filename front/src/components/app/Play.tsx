import { useState, useEffect } from "react";

interface PlayPauseButtonProps {
  func: (() => void) | undefined,
}

const PlayPauseButton:React.FC<PlayPauseButtonProps> = ({func}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    let interval: number | undefined;

    if (isPlaying) {
      interval = window.setInterval(() => {
        if (func)
          func();
      }, 100);
    }

    return () => {
      if (interval !== undefined) {
        clearInterval(interval);
      }
    };
  }, [isPlaying]);

  const togglePlayPause = (): void => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <button onClick={togglePlayPause}>
      {isPlaying ? "⏸️" : "▶️"}
    </button>
  );
}

export default PlayPauseButton;
