import { useNavigate } from 'react-router-dom';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import ServiceCard from '../components/ui/ServiceCard';
import styles from './NosServices.module.css';

/* ─────────────────────────────────────────────
   Service definitions
   accentColor dr#1A56DBe per-card theme tint.
   Uses the same inline SVG pattern as the app.
───────────────────────────────────────────── */
const services = [
  {
    id: 'reservation',
    title: 'Réservation de rendez-vous',
    tagline: 'En ligne · Rapide · Disponible 24h/24',
    description:
      'Planifiez votre contrôle technique depuis chez vous, sans déplacement ni attente. Choisissez votre centre, votre créneau et confirmez en quelques clics.',
    badge: 'Service phare',
    badgeVariant: 'success',
    accentColor: '#1A56DB',
    action: '/reservation',
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="3" />
        <path d="M3 9h18M9 4v5M15 4v5M7 14h2M11 14h2M15 14h2M7 18h2M11 18h2M15 18h2" />
      </svg>
    ),
  },
  {
    id: 'places',
    title: 'Consultation des disponibilités',
    tagline: 'Temps réel · Sans compte requis',
    description:
      "Visualisez instantanément les créneaux disponibles dans n'importe quel centre agréé, pour n'importe quelle date, sans avoir à créer un compte.",
    badge: 'Temps réel',
    badgeVariant: 'info',
    accentColor: '#1A56DB',
    action: '/places',
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 3.5" />
      </svg>
    ),
  },
  {
    id: 'reedition',
    title: 'Réédition de quittance',
    tagline: 'Gratuit · Instantané',
    description:
      'Vous avez perdu ou égaré votre justificatif de paiement ? Retrouvez et téléchargez votre quittance officielle en quelques secondes, à tout moment.',
    badge: 'Gratuit',
    badgeVariant: 'warning',
    accentColor: '#1A56DB',
    action: '/reedition',
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    id: 'reporter',
    title: 'Report de rendez-vous',
    tagline: 'Flexible · Sans pénalité',
    description:
      'Un imprévu ? Modifiez la date de votre rendez-vous existant facilement, sans vous déplacer. Un seul report est autorisé par dossier.',
    badge: 'Flexible',
    badgeVariant: 'default',
    accentColor: '#1A56DB',
    action: '/reporter',
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
];

export default function NosServices() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>

      {/* ── SERVICE CARDS ── */}
      <section className={styles.servicesSection}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <p className={styles.sectionEyebrow}>Ce que nous proposons</p>
              <h2 className={styles.sectionTitle}>Nos services numériques</h2>
            </div>
            <p className={styles.sectionDesc}>
              Chaque service est conçu pour réduire les déplacements et simplifier votre rapport avec la visite technique.
            </p>
          </div>

          <div className={styles.cardsGrid}>
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
