import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import styles from './AppLayout.module.css';

export default function AppLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>
        <div className="page-enter">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
