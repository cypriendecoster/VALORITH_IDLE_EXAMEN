import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import Lore from './pages/Lore.jsx'
import PatchNotes from './pages/PatchNotes.jsx';
import Faq from './pages/Faq.jsx';
import GamePage from './pages/GamePage.jsx';
import Profile from './pages/Profile.jsx';
import Rankings from './pages/Rankings.jsx';
import Badges from './pages/Badges.jsx';
import Settings from './pages/Settings.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import Account from './pages/Account.jsx';
import NotFound from './pages/NotFound.jsx';
import Maintenance from './pages/Maintenance.jsx';
import Terms from './pages/Terms.jsx';
import Privacy from './pages/Privacy.jsx';
import Tutorial from './pages/Tutorial.jsx';
import Admin from './pages/Admin.jsx';
import Contact from './pages/Contact.jsx';
import AppLayout from './components/AppLayout.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lore" element={<Lore />} />
        <Route path="/patchnotes" element={<PatchNotes />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/badges" element={<Badges />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/account" element={<Account />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
