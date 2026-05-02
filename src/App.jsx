import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Home from './pages/Home';
import NosServices from './pages/NosServices';
import Reservation from './pages/Reservation';
import Places from './pages/Places';
import Reedition from './pages/Reedition';
import Reporter from './pages/Reporter';
import Actualites from './pages/Actualites';
import Contact from './pages/Contact';
import APropos from './pages/APropos';
import './styles/globals.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<NosServices />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/places" element={<Places />} />
          <Route path="/reedition" element={<Reedition />} />
          <Route path="/reporter" element={<Reporter />} />
          <Route path="/actualites" element={<Actualites />} />
          <Route path="/apropos" element={<APropos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={
            <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
              <h1 style={{ fontSize: '4rem', color: '#1A56DB' }}>404</h1>
              <p style={{ color: '#64748B', marginTop: '1rem' }}>Page introuvable</p>
              <a href="/" style={{ color: '#1A56DB', marginTop: '1rem', display: 'inline-block', fontWeight: 500 }}>← Retour à l'accueil</a>
            </div>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
