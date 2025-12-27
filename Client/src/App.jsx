import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import Navbar from './components/NavBar.jsx';
import Lore from './pages/Lore.jsx'
import PatchNotes from './pages/PatchNotes.jsx';
import Faq from './pages/Faq.jsx';
import GamePage from './pages/GamePage.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lore" element={<Lore />} />
        <Route path="/patchnotes" element={<PatchNotes />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </>
  );
}

