import { Outlet } from 'react-router-dom';
import { useMe } from '../hooks/useMe.js';
import Navbar from './NavBar.jsx';
import PlayerNavbar from './PlayerNavbar.jsx';
import AdminNavbar from './AdminNavbar.jsx';

function getActiveRealmName(data) {
  const activeRealmId = data?.player?.realms?.find((r) => r.is_active === 1)?.realm_id ??
    data?.player?.realms?.[0]?.realm_id ??
    null;
  const activeRealm = data?.realms?.find((r) => r.id === activeRealmId);
  return activeRealm ? activeRealm.name : null;
}

function getTotalResources(data) {
  if (!data?.player?.resources) return null;
  return data.player.resources.reduce((sum, r) => {
    return sum + Number(r.amount || 0) + Number(r.amount_carry || 0);
  }, 0);
}

export default function AppLayout() {
  const { data, loading, error } = useMe();
  const role = data?.role || null;

  function handleLogout() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  let navbar = <Navbar />;

  if (!loading && !error && role === 'ADMIN') {
    navbar = <AdminNavbar onLogout={handleLogout} />;
  } else if (!loading && !error && role === 'PLAYER') {
    navbar = (
      <PlayerNavbar
        activeRealmName={getActiveRealmName(data)}
        totalResources={getTotalResources(data)}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--radius-md)] focus:bg-[var(--color-gold)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
      >
        Aller au contenu
      </a>
      {navbar}
      <Outlet />
    </>
  );
}
