import Home from "./home/Home"
import App from "./app/App";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function changeTitle(title:string)
{
  useEffect(() => {
    document.title = title;
  }, [title]);
}

function PageHome()
{
  changeTitle("Welcome");
  return (<Home />);
}

function PageApp()
{
  changeTitle("Datavis");
  return (<App />);
}

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageHome />}/>
        <Route path="app" element={<PageApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
