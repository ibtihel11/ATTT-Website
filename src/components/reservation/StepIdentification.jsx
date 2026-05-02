import { useState } from 'react';
import FormField, { Input, Select } from '../ui/FormField';
import Button from '../ui/Button';
import Card, { CardHeader } from '../ui/Card';
import styles from './ReservationSteps.module.css';
import { vehicleService } from '../../services/api';

export default function StepIdentification({ onNext }) {
  const [form, setForm] = useState({ type: '', plate: '', chassis: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.type) errs.type = 'Veuillez sélectionner un type';
    if (!form.plate.trim()) errs.plate = 'Numéro requis';
    else if (!/^[\w\s-]{3,20}$/.test(form.plate)) errs.plate = 'Format invalide (ex: 123 TU 4567)';
    if (!form.chassis.trim()) errs.chassis = 'Requis';
    else if (form.chassis.length !== 5) errs.chassis = 'Exactement 5 caractères';
    return errs;
  };

  const submit = async () => {
    const errs = validate();
    setErrors(errs);
    setApiError('');
    if (Object.keys(errs).length) return;
    setLoading(true);
    try {
      const vehicle = await vehicleService.verify(form);
      onNext(vehicle);
    } catch (e) {
      setApiError(e.message || 'Véhicule introuvable. Vérifiez vos informations.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card padding="lg" shadow="md">
      <CardHeader
        title="Identification du véhicule"
        subtitle="Renseignez les informations de votre véhicule pour continuer."
      />

      <div className={styles.formGrid}>
        <FormField label="Type d'immatriculation" id="type" error={errors.type} required>
          <Select id="type" value={form.type} onChange={set('type')} error={errors.type}>
            <option value="">-- Sélectionner --</option>
            <option value="TN">Tunisienne</option>
            <option value="DIP">Diplomatique</option>
            <option value="PROV">Provisoire</option>
            <option value="CORPS">Corps consulaire</option>
          </Select>
        </FormField>

        <FormField label="Numéro d'immatriculation" id="plate" error={errors.plate} required
          hint="Exemple : 123 TU 4567">
          <Input id="plate" value={form.plate} onChange={set('plate')} error={errors.plate}
            placeholder="123 TU 4567" />
        </FormField>

        <FormField label="5 derniers caractères du N° de châssis" id="chassis" error={errors.chassis} required
          hint="Visible sur votre carte grise">
          <Input id="chassis" value={form.chassis} onChange={set('chassis')} error={errors.chassis}
            placeholder="AB123" maxLength={5} style={{ textTransform: 'uppercase', letterSpacing: '4px', fontSize: '16px' }}
            onInput={e => e.target.value = e.target.value.toUpperCase()} />
        </FormField>
      </div>

      {apiError && (
        <div className={styles.apiError}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {apiError}
        </div>
      )}

      <div className={styles.formActions}>
        <Button loading={loading} onClick={submit} size="md" iconRight={
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        }>
          Vérifier le véhicule
        </Button>
      </div>
    </Card>
  );
}
