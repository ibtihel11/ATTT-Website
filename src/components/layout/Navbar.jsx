import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import Button from '../ui/Button';
import logo from "../../assets/logo.png";

const Logo = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="8" fill="#1A56DB"/>
    <path d="M8 18C8 12.477 12.477 8 18 8s10 4.477 10 10-4.477 10-10 10S8 23.523 8 18z" stroke="white" strokeWidth="1.5"/>
    <rect x="13" y="13" width="4" height="8" rx="1.5" fill="white"/>
    <rect x="19" y="13" width="4" height="8" rx="1.5" fill="white"/>
    <path d="M10 18h3M23 18h3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { to: '/', label: 'Accueil' },
    { to: '/actualites', label: 'Actualités' },
    { to: '/reservation', label: 'Visite' },
    { to: '/services', label: 'Services' },
    { to: '/apropos', label: 'À propos' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/" className={styles.brand} onClick={() => setOpen(false)}>
          <img src={logo} alt="ATTT Logo" className={styles.logo} />
          <div className={styles.brandText}>
            <span className={styles.brandName}>ATTT</span>
            <span className={styles.brandSub}>Visite Technique</span>
          </div>
        </NavLink>

        <ul className={[styles.links, open ? styles.open : ''].join(' ')}>
          {links.map(l => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) => [styles.link, isActive ? styles.active : ''].join(' ')}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
          <li className={styles.mobileBtn}>
            <Button size="sm" onClick={() => { navigate('/reservation'); setOpen(false); }}>
              Prendre RDV
            </Button>
          </li>
        </ul>

        <div className={styles.actions}>
          <Button size="sm" onClick={() => navigate('#')}>
            Espace Admin
          </Button>
          <button
            className={styles.burger}
            onClick={() => setOpen(o => !o)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className={[styles.bar, open ? styles.bar1Open : ''].join(' ')} />
            <span className={[styles.bar, open ? styles.bar2Open : ''].join(' ')} />
            <span className={[styles.bar, open ? styles.bar3Open : ''].join(' ')} />
          </button>
        </div>
      </nav>
    </header>
  );
}
