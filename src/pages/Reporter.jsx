import { useState } from 'react';
import Card, { CardHeader } from '../components/ui/Card';
import FormField, { Input, Select } from '../components/ui/FormField';
import Button from '../components/ui/Button';
import styles from './SimpleForm.module.css';

export default function Reporter() {
  const [form, setForm] = useState({ type: '', plate: '', chassis: '' });
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (f) => (e) => setForm(p => ({ ...p, [f]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.type) errs.type = 'Requis';
    if (!form.plate.trim()) errs.plate = 'Requis';
    if (form.chassis.length !== 5) errs.chassis = 'Exactement 5 caractères';
    if (!accepted) errs.terms = 'Vous devez accepter les conditions';
    return errs;
  };

  const submit = async () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    alert('Votre rendez-vous a été trouvé. Vous allez être redirigé vers les créneaux disponibles.');
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className="container">
          <h1>Reporter un rendez-vous</h1>
          <p>Modifiez la date de votre rendez-vous existant</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.content}>
          <Card padding="lg" shadow="md">
            <CardHeader title="Identification du véhicule" subtitle="Saisissez les informations pour retrouver votre rendez-vous." />

            <div className={styles.formGrid}>
              <FormField label="Type d'immatriculation" id="type" error={errors.type} required>
                <Select id="type" value={form.type} onChange={set('type')} error={errors.type}>
                  <option value="">-- Sélectionner --</option>
                  <option value="TN">Tunisienne</option>
                  <option value="DIP">Diplomatique</option>
                  <option value="PROV">Provisoire</option>
                </Select>
              </FormField>

              <FormField label="Numéro d'immatriculation" id="plate" error={errors.plate} required>
                <Input id="plate" value={form.plate} onChange={set('plate')} error={errors.plate} placeholder="123 TU 4567" />
              </FormField>

              <FormField label="5 derniers caractères du N° de châssis" id="chassis" error={errors.chassis} required>
                <Input id="chassis" value={form.chassis} onChange={set('chassis')} error={errors.chassis}
                  placeholder="AB123" maxLength={5}
                  style={{ textTransform: 'uppercase', letterSpacing: '4px' }}
                  onInput={e => e.target.value = e.target.value.toUpperCase()} />
              </FormField>

              <div className={styles.termsBox}>
                <p className={styles.termsTitle}>Conditions de report</p>
                <div className={styles.termsText}>
                  Le report de rendez-vous est soumis à la disponibilité des créneaux dans votre centre de contrôle. Un seul report est autorisé par dossier et par période de validité. Toute modification doit être effectuée au moins 24 heures avant la date du rendez-vous initial. L'ATTT se réserve le droit de refuser toute demande de report abusive.
                </div>
                <label className={styles.checkRow}>
                  <input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)} />
                  <span>J'accepte les conditions de report de rendez-vous</span>
                </label>
                {errors.terms && <p className={styles.termErr}>⚠ {errors.terms}</p>}
              </div>
            </div>

            <div className={styles.formActions}>
              <Button loading={loading} onClick={submit} disabled={!accepted}>
                Rechercher mon rendez-vous
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
