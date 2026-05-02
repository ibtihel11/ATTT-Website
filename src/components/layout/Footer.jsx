import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <p className={styles.brandName}>ATTT</p>
          <p className={styles.desc}>
            Agence Technique des Transports Terrestres — Service officiel de contrôle technique en Tunisie.
          </p>
          <div className={styles.contact}>
            <span>Lun–Ven : 08h00 – 16h30</span>
          </div>
        </div>

        <div className={styles.col}>
          <h5>Services</h5>
          <Link to="/reservation">Prendre un rendez-vous</Link>
          <Link to="/places">Consulter les disponibilités</Link>
          <Link to="/reedition">Réédition de quittance</Link>
        </div>

        <div className={styles.col}>
          <h5>Informations</h5>
          <Link to="/actualites">Actualités</Link>
          <Link to="/contact">Contact</Link>
          <a href="#">Mentions légales</a>
        </div>

        <div className={styles.col}>
          <h5>Centres</h5>
          <span>Montplaisir, Tunis</span>
          <span>Rue Okba Ibn Nafaa, Sfax</span>
          <span>Manzel Hayet, Monastir</span>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Agence Technique des Transports Terrestres (ATTT)</span>
      </div>
    </footer>
  );
}
