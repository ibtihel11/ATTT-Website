import { useState } from 'react';
import FormField, { Input } from '../ui/FormField';
import Button from '../ui/Button';
import Card, { CardHeader } from '../ui/Card';
import styles from './ReservationSteps.module.css';
import { paymentService } from '../../services/api';

export default function StepPayment({ reservation, paymentMethod, onNext, onBack }) {
  const [form, setForm] = useState({ name: '', number: '', expiry: '', cvv: '', email: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const formatCardNumber = (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 16);
    v = v.replace(/(.{4})/g, '$1 ').trim();
    setForm(f => ({ ...f, number: v }));
  };

  const formatExpiry = (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
    setForm(f => ({ ...f, expiry: v }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Nom requis';
    if (form.number.replace(/\s/g, '').length < 16) errs.number = 'Numéro de carte invalide';
    if (!form.expiry || form.expiry.length < 5) errs.expiry = 'Date invalide';
    if (!form.cvv || form.cvv.length < 3) errs.cvv = 'CVV invalide';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Email invalide';
    return errs;
  };

  const submit = async () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    try {
      const payment = await paymentService.pay({ reservationId: reservation.id, method: paymentMethod, cardData: form });
      onNext(payment);
    } catch (e) {
      alert('Erreur de paiement. Vérifiez vos informations bancaires.');
    } finally {
      setLoading(false);
    }
  };

  if (paymentMethod !== 'card') {
    return (
      <Card padding="lg" shadow="md">
        <CardHeader title="Paiement par virement" subtitle="Suivez les instructions ci-dessous pour finaliser votre réservation." />
        <div className={styles.wiretransfer}>
          <div className={styles.bankInfo}>
            <p className={styles.bankRow}><span>Banque</span><strong>Banque Nationale Agricole</strong></p>
            <p className={styles.bankRow}><span>Bénéficiaire</span><strong>ATTT — Agence Technique des Transports Terrestres</strong></p>
            <p className={styles.bankRow}><span>RIB</span><strong>08 006 0123456789 12</strong></p>
            <p className={styles.bankRow}><span>Référence</span><strong>{reservation?.id}</strong></p>
            <p className={styles.bankRow}><span>Montant</span><strong className={styles.bankAmount}>40 DT</strong></p>
          </div>
          <div className={styles.wireNotice}>
            ⚠ Votre rendez-vous sera confirmé après réception du virement (délai : 24–48h ouvrables). Conservez votre référence.
          </div>
        </div>
        <div className={styles.formActions}>
          <Button variant="ghost" onClick={onBack}>← Retour</Button>
          <Button onClick={() => onNext({ transactionId: 'VIREMENT-PENDING', status: 'pending', amount: 85 })}>
            J'ai effectué le virement →
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card padding="lg" shadow="md">
      <CardHeader
        title="Paiement sécurisé"
        subtitle="Vos données bancaires sont chiffrées et sécurisées."
      />

      <div className={styles.secureBadge}>
        <svg width="14" height="14" fill="#16a34a" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
        </svg>
        Connexion SSL 256-bit — Paiement sécurisé
        <div className={styles.cardBrands}>
          <span className={styles.visaChip}>VISA</span>
          <span className={styles.mcChip}>
            <span style={{background:'#eb001b'}}/>
            <span style={{background:'#f79e1b'}}/>
          </span>
        </div>
      </div>

      <div className={styles.formGrid}>
        <FormField label="Nom du titulaire" id="cname" error={errors.name} required>
          <Input id="cname" value={form.name} onChange={set('name')} error={errors.name}
            placeholder="NOM Prénom" autoComplete="cc-name" />
        </FormField>

        <FormField label="Numéro de carte" id="cnum" error={errors.number} required>
          <Input id="cnum" value={form.number} onChange={formatCardNumber} error={errors.number}
            placeholder="XXXX XXXX XXXX XXXX" inputMode="numeric" autoComplete="cc-number" />
        </FormField>

        <div className={styles.twoCol}>
          <FormField label="Date d'expiration" id="cexp" error={errors.expiry} required>
            <Input id="cexp" value={form.expiry} onChange={formatExpiry} error={errors.expiry}
              placeholder="MM/AA" inputMode="numeric" autoComplete="cc-exp" />
          </FormField>
          <FormField label="CVV2" id="ccvv" error={errors.cvv} required hint="3 chiffres au dos">
            <Input id="ccvv" value={form.cvv} onChange={set('cvv')} error={errors.cvv}
              placeholder="XXX" maxLength={4} inputMode="numeric" autoComplete="cc-csc" />
          </FormField>
        </div>

        <FormField label="Email de confirmation" id="cemail" error={errors.email} required>
          <Input id="cemail" type="email" value={form.email} onChange={set('email')} error={errors.email}
            placeholder="votre@email.com" autoComplete="email" />
        </FormField>
      </div>

      <div className={styles.amountBox}>
        <span className={styles.amountLabel}>Montant total TTC</span>
        <span className={styles.amountValue}>85,000 DT</span>
      </div>

      <div className={styles.formActions}>
        <Button variant="ghost" onClick={onBack}>← Retour</Button>
        <Button loading={loading} onClick={submit} iconRight={
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <rect x="3" y="11" width="18" height="11" rx="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        }>
          Payer 40 DT
        </Button>
      </div>
    </Card>
  );
}
