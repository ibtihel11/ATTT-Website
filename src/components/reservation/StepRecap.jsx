import { useState } from 'react';
import Button from '../ui/Button';
import Card, { CardHeader } from '../ui/Card';
import styles from './ReservationSteps.module.css';
import { reservationService } from '../../services/api';

const paymentMethods = [
  {
    id: 'card',
    label: 'Carte bancaire',
    sub: 'Visa / Mastercard',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="5" width="20" height="14" rx="3"/>
        <path d="M2 10h20"/>
      </svg>
    ),
  },
  {
    id: 'virement',
    label: 'Virement bancaire',
    sub: 'Compte ATTT',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: 'postale',
    label: 'Mandat postal',
    sub: 'La Poste Tunisienne',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
  },
];

export default function StepRecap({ vehicle, schedule, onNext, onBack, onPaymentMethodChange }) {
  const [method, setMethod] = useState('card');
  const [loading, setLoading] = useState(false);

  const selectMethod = (id) => {
    setMethod(id);
    onPaymentMethodChange(id);
  };

  const submit = async () => {
    setLoading(true);
    try {
      const reservation = await reservationService.create({
        vehicle,
        schedule,
        paymentMethod: method,
      });
      onNext(reservation);
    } catch (e) {
      alert('Erreur lors de la réservation. Réessayez.');
    } finally {
      setLoading(false);
    }
  };

  const dateLabel = schedule.date
    ? new Date(schedule.date + 'T00:00').toLocaleDateString('fr-TN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : '—';

  const rows = [
    { label: 'Immatriculation', value: vehicle?.plate },
    { label: 'Véhicule', value: `${vehicle?.brand} ${vehicle?.model} — ${vehicle?.year}` },
    { label: 'Catégorie', value: vehicle?.category },
    { label: 'Centre', value: schedule?.centreName },
    { label: 'Date', value: dateLabel },
    { label: 'Créneau horaire', value: schedule?.slot?.time },
  ];

  return (
    <div className={styles.recapWrap}>
      <Card padding="lg" shadow="md">
        <CardHeader title="Récapitulatif de la réservation" subtitle="Vérifiez vos informations avant de procéder au paiement." />

        <div className={styles.recapTable}>
          {rows.map(r => (
            <div key={r.label} className={styles.recapRow}>
              <span className={styles.recapLabel}>{r.label}</span>
              <span className={styles.recapValue}>{r.value || '—'}</span>
            </div>
          ))}
          <div className={[styles.recapRow, styles.recapTotal].join(' ')}>
            <span className={styles.recapLabel}>Montant à payer</span>
            <span className={styles.recapPrice}>40 DT</span>
          </div>
        </div>
      </Card>

      <Card padding="lg" shadow="md" className={styles.paymentCard}>
        <CardHeader title="Méthode de paiement" subtitle="Choisissez votre mode de règlement." />
        <div className={styles.paymentMethods}>
          {paymentMethods.map(pm => (
            <button
              key={pm.id}
              className={[styles.payMethod, method === pm.id ? styles.payMethodActive : ''].join(' ')}
              onClick={() => selectMethod(pm.id)}
            >
              <div className={styles.payIcon}>{pm.icon}</div>
              <div>
                <p className={styles.payLabel}>{pm.label}</p>
                <p className={styles.paySub}>{pm.sub}</p>
              </div>
              <div className={[styles.payRadio, method === pm.id ? styles.payRadioActive : ''].join(' ')} />
            </button>
          ))}
        </div>
      </Card>

      <div className={styles.formActions}>
        <Button variant="ghost" onClick={onBack}>← Retour</Button>
        <Button loading={loading} onClick={submit} iconRight={
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        }>
          Confirmer et payer
        </Button>
      </div>
    </div>
  );
}
