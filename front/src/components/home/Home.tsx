import { useNavigate } from "react-router-dom";

const StartButon = () => {
  const navigate = useNavigate();
  const go2app = () => {
    let path = "/app";
    navigate(path);
  }
  return (
    <button onClick={go2app} className="px-[10px] py-[5px]">Start</button>
  )
}

function Home() {
  return (
    <>
      <h1 className="text-9xl">DATAVIS</h1>
      <p>Welcome ...</p>
      <StartButon/>
    </>
  )
}

export default Home;
