import SlidingBar from "./SlidingBar";
import SlidingMenu from "./SlidingMenu";
import Window from "./Window";
import setDatesApi from "./setDatesApi";
import { useState, useEffect } from 'react';

let key = 0;
function App()
{
  const [windows, setWindows] = useState<React.ReactElement[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [date, setDate] = useState<string>("");


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

  useEffect(() => {
    console.log("api");
    setDatesApi(setDates);
  }, []);

  return (
    <>
      {windows}
      <div className="fixed bottom-0 left-0 w-full">
        <SlidingBar setDate={setDate} items={dates}/>
      </div>
      <a>{date}</a>
      <SlidingMenu addWindow={addWindow} />
    </>
  );
}

export default App;
