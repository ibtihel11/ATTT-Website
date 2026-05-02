import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import styles from './ReservationSteps.module.css';

export default function StepSuccess({ reservation, payment, schedule, vehicle }) {
  const navigate = useNavigate();

  const dateLabel = schedule?.date
    ? new Date(schedule.date + 'T00:00').toLocaleDateString('fr-TN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : '—';

  return (
    <div className={styles.successWrap}>
      <div className={styles.successIcon}>
        <svg width="36" height="36" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>

      <h2 className={styles.successTitle}>Réservation confirmée !</h2>
      <p className={styles.successSub}>
        Votre rendez-vous a été enregistré avec succès. Un email de confirmation vous a été envoyé.
      </p>

      <div className={styles.successCard}>
        <div className={styles.successRef}>
          <span>Référence</span>
          <strong>{reservation?.id}</strong>
        </div>

        <div className={styles.successDetails}>
          <div className={styles.successRow}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="1" y="3" width="15" height="13" rx="2"/>
              <path d="M16 8h4l3 3v5h-7V8z"/>
            </svg>
            <span>{vehicle?.plate} — {vehicle?.brand} {vehicle?.model}</span>
          </div>
          <div className={styles.successRow}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <span>{schedule?.centreName}</span>
          </div>
          <div className={styles.successRow}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="3"/><path d="M3 9h18M9 4v5M15 4v5"/>
            </svg>
            <span>{dateLabel} à {schedule?.slot?.time}</span>
          </div>
          <div className={styles.successRow}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20"/>
            </svg>
            <span>Paiement de <strong>40 DT</strong> — {payment?.transactionId}</span>
          </div>
        </div>
      </div>

      <div className={styles.successActions}>
        <Button variant="secondary" onClick={() => window.print()} icon={
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
            <rect x="6" y="14" width="12" height="8"/>
          </svg>
        }>
          Imprimer la quittance
        </Button>
        <Button onClick={() => navigate('/')}>
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
}
