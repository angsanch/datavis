import SlidingMenu from "./SlidingMenu";
import Window from "./Window";
import { useState } from 'react';

let key = 0;
function App()
{
  const [windows, setWindows] = useState<React.ReactElement[]>([]);



  const addWindow = (children:React.ReactElement) => {
    setWindows([...windows, <Window key={key.toString()} id={key} removeWindow={removeWindow} frontWindow={frontWindow}>
      {children}
    </Window>]);
    key ++;
  };

  const removeWindow = (id:number) => {
    setWindows((prevWindows) => {
      return prevWindows.filter(window => window.props.id !== id);
    });
  };

  const frontWindow = (id:number) => {
    setWindows((prevWindows) => {
      const index = prevWindows.findIndex(element => element.props.id === id);
      if (index < 0)
        return (prevWindows);
      else {
        return (prevWindows.concat(prevWindows.splice(index, 1)));
      }
    });
  };

  return (
    <>
      <h1>*map*</h1>
      {windows}
      <SlidingMenu addWindow={addWindow} />
    </>
  );
}

export default App;
