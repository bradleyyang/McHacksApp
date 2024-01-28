import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scan from './Scan';
import Home from './Home';


function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/upload" element={<Scan />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
