import { useState } from 'react';
import Card, { CardHeader } from '../components/ui/Card';
import FormField, { Input, Select } from '../components/ui/FormField';
import Button from '../components/ui/Button';
import { quittanceService } from '../services/api';
import styles from './SimpleForm.module.css';

export default function Reedition() {
  const [form, setForm] = useState({ type: '', plate: '', chassis: '' });
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
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
    try {
      const data = await quittanceService.find(form);
      setResult(data);
    } catch {
      setErrors({ api: 'Aucune quittance trouvée pour ces informations.' });
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div className="container">
            <h1>Réédition de quittance</h1>
          </div>
        </div>
        <div className="container">
          <div className={styles.content}>
            <Card padding="lg" shadow="md">
              <div className={styles.found}>
                <div className={styles.foundIcon}>📄</div>
                <h2>Quittance trouvée</h2>
                <p>Référence : <strong>{result.id}</strong></p>
                <div className={styles.foundDetails}>
                  <div className={styles.foundRow}><span>Immatriculation</span><strong>{result.plate}</strong></div>
                  <div className={styles.foundRow}><span>Centre</span><strong>{result.centre}</strong></div>
                  <div className={styles.foundRow}><span>Date de visite</span><strong>{result.date}</strong></div>
                  <div className={styles.foundRow}><span>Montant payé</span><strong>{result.amount} DT</strong></div>
                  <div className={styles.foundRow}><span>Statut</span>
                    <span className={styles.paid}>✓ Payé</span>
                  </div>
                </div>
                <Button onClick={() => window.print()} icon={
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="6 9 6 2 18 2 18 9"/>
                    <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
                    <rect x="6" y="14" width="12" height="8"/>
                  </svg>
                }>Imprimer la quittance</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className="container">
          <h1>Réédition de quittance</h1>
          <p>Retrouvez et téléchargez votre justificatif de paiement</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.content}>
          <Card padding="lg" shadow="md">
            <CardHeader title="Identification du véhicule" subtitle="Renseignez les informations de votre véhicule." />

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
                <p className={styles.termsTitle}>Conditions d'utilisation</p>
                <div className={styles.termsText}>
                  En utilisant ce service, vous acceptez que l'Agence Technique des Transports Terrestres (ATTT) collecte et traite vos données personnelles conformément à la réglementation tunisienne en vigueur. La réédition de quittance est soumise à la vérification de l'authenticité de vos informations. Toute tentative de fraude sera poursuivie selon les lois applicables. Ce service est réservé aux titulaires de la quittance originale.
                </div>
                <label className={styles.checkRow}>
                  <input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)} />
                  <span>J'accepte les conditions générales d'utilisation</span>
                </label>
                {errors.terms && <p className={styles.termErr}>⚠ {errors.terms}</p>}
              </div>

              {errors.api && (
                <div className={styles.apiError}>{errors.api}</div>
              )}
            </div>

            <div className={styles.formActions}>
              <Button loading={loading} onClick={submit} disabled={!accepted}>
                Rechercher ma quittance
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
