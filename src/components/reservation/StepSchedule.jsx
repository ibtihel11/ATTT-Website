import { useState, useEffect } from 'react';
import FormField, { Select } from '../ui/FormField';
import Button from '../ui/Button';
import Card, { CardHeader } from '../ui/Card';
import styles from './ReservationSteps.module.css';
import { centreService, villes } from '../../services/api';

export default function StepSchedule({ vehicle, onNext, onBack }) {
  const [form, setForm] = useState({ ville: '', centreId: '', centreName: '', date: '', slot: null });
  const [centres, setCentres] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loadingCentres, setLoadingCentres] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split('T')[0];

  const set = (field) => (val) => setForm(f => ({ ...f, [field]: val }));

  useEffect(() => {
    if (!form.ville) return;
    setLoadingCentres(true);
    setCentres([]);
    setForm(f => ({ ...f, centreId: '', centreName: '', date: '', slot: null }));
    setSlots([]);
    centreService.getCentres(form.ville)
      .then(data => { setCentres(data); setLoadingCentres(false); })
      .catch(() => setLoadingCentres(false));
  }, [form.ville]);

  useEffect(() => {
    if (!form.centreId || !form.date) return;
    setLoadingSlots(true);
    setSlots([]);
    setForm(f => ({ ...f, slot: null }));
    centreService.getSlots(form.centreId, form.date)
      .then(data => { setSlots(data); setLoadingSlots(false); })
      .catch(() => setLoadingSlots(false));
  }, [form.centreId, form.date]);

  const validate = () => {
    const errs = {};
    if (!form.ville) errs.ville = 'Requis';
    if (!form.centreId) errs.centre = 'Requis';
    if (!form.date) errs.date = 'Requis';
    if (!form.slot) errs.slot = 'Veuillez sélectionner un créneau horaire';
    return errs;
  };

  const submit = () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    onNext({ ville: form.ville, centreId: form.centreId, centreName: form.centreName, date: form.date, slot: form.slot });
  };

  return (
    <Card padding="lg" shadow="md">
      <CardHeader
        title="Choix du centre et du créneau"
        subtitle="Sélectionnez votre ville, centre, date et horaire disponible."
      />

      {/* Vehicle recap strip */}
      <div className={styles.vehicleRecap}>
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="1" y="3" width="15" height="13" rx="2"/>
          <path d="M16 8h4l3 3v5h-7V8zM5.5 17a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM18.5 17a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
        </svg>
        <span>Véhicule : <strong>{vehicle?.plate}</strong> — {vehicle?.brand} {vehicle?.model} ({vehicle?.year})</span>
      </div>

      <div className={styles.formGrid}>
        <FormField label="Ville" id="ville" error={errors.ville} required>
          <Select id="ville" value={form.ville} onChange={e => set('ville')(e.target.value)} error={errors.ville}>
            <option value="">-- Sélectionner une ville --</option>
            {villes.map(v => <option key={v.id} value={v.id}>{v.label}</option>)}
          </Select>
        </FormField>

        <FormField label="Centre de contrôle" id="centre" error={errors.centre} required>
          <Select id="centre" value={form.centreId}
            onChange={e => {
              const c = centres.find(x => x.id === e.target.value);
              setForm(f => ({ ...f, centreId: e.target.value, centreName: c?.name || '' }));
            }}
            error={errors.centre} disabled={!form.ville || loadingCentres}>
            <option value="">{loadingCentres ? 'Chargement...' : '-- Sélectionner un centre --'}</option>
            {centres.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </Select>
        </FormField>

        <FormField label="Date souhaitée" id="date" error={errors.date} required>
          <input
            id="date" type="date" min={today}
            value={form.date}
            onChange={e => set('date')(e.target.value)}
            disabled={!form.centreId}
            className={[styles.dateInput, errors.date ? styles.inputErr : ''].join(' ')}
          />
        </FormField>
      </div>

      {/* Slots */}
      {(loadingSlots || slots.length > 0 || (form.centreId && form.date)) && (
        <div className={styles.slotsSection}>
          <p className={styles.slotsLabel}>Créneaux disponibles{form.date ? ` — ${new Date(form.date + 'T00:00').toLocaleDateString('fr-TN', { weekday: 'long', day: 'numeric', month: 'long' })}` : ''}</p>
          {loadingSlots ? (
            <div className={styles.slotsLoading}>
              {[...Array(8)].map((_, i) => <div key={i} className={styles.slotSkeleton} />)}
            </div>
          ) : slots.length === 0 ? (
            <p className={styles.noSlots}>Aucun créneau disponible pour cette date.</p>
          ) : (
            <div className={styles.slots}>
              {slots.map(slot => (
                <button
                  key={slot.id}
                  disabled={!slot.available}
                  onClick={() => slot.available && setForm(f => ({ ...f, slot }))}
                  className={[
                    styles.slot,
                    !slot.available ? styles.slotFull : '',
                    form.slot?.id === slot.id ? styles.slotSelected : '',
                  ].join(' ')}
                >
                  <span className={styles.slotTime}>{slot.time}</span>
                  {slot.available ? (
                    <span className={styles.slotAvail}>{slot.spots} place{slot.spots > 1 ? 's' : ''}</span>
                  ) : (
                    <span className={styles.slotFull2}>Complet</span>
                  )}
                </button>
              ))}
            </div>
          )}
          {errors.slot && <p className={styles.slotError}>⚠ {errors.slot}</p>}
        </div>
      )}

      <div className={styles.formActions}>
        <Button variant="ghost" onClick={onBack}>← Retour</Button>
        <Button onClick={submit} iconRight={
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        }>Continuer</Button>
      </div>
    </Card>
  );
}
