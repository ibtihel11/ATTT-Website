import { useState } from 'react';
import Card, { CardHeader } from '../components/ui/Card';
import FormField, { Select } from '../components/ui/FormField';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { centreService, villes } from '../services/api';
import styles from './Places.module.css';

export default function Places() {
  const [form, setForm] = useState({ ville: '', centreId: '', centreName: '', date: '' });
  const [centres, setCentres] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const handleVille = async (e) => {
    const val = e.target.value;
    setForm(f => ({ ...f, ville: val, centreId: '', centreName: '' }));
    if (!val) return;
    const data = await centreService.getCentres(val);
    setCentres(data);
  };

  const handleCentre = (e) => {
    const c = centres.find(x => x.id === e.target.value);
    setForm(f => ({ ...f, centreId: e.target.value, centreName: c?.name || '' }));
  };

  const search = async () => {
    if (!form.centreId || !form.date) return;
    setLoading(true);
    setSearched(false);
    const data = await centreService.getSlots(form.centreId, form.date);
    setSlots(data);
    setSearched(true);
    setLoading(false);
  };

  const available = slots.filter(s => s.available).length;
  const total = slots.length;

  const dateLabel = form.date
    ? new Date(form.date + 'T00:00').toLocaleDateString('fr-TN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className="container">
          <h1>Disponibilités en temps réel</h1>
          <p>Consultez les créneaux disponibles avant de prendre rendez-vous</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.content}>
          <Card padding="lg" shadow="md">
            <CardHeader title="Rechercher un créneau" subtitle="Sélectionnez une ville, un centre et une date" />

            <div className={styles.searchGrid}>
              <FormField label="Ville" id="pl-ville">
                <Select id="pl-ville" value={form.ville} onChange={handleVille}>
                  <option value="">-- Sélectionner une ville --</option>
                  {villes.map(v => <option key={v.id} value={v.id}>{v.label}</option>)}
                </Select>
              </FormField>

              <FormField label="Centre de contrôle" id="pl-centre">
                <Select id="pl-centre" value={form.centreId} onChange={handleCentre} disabled={!form.ville}>
                  <option value="">-- Sélectionner un centre --</option>
                  {centres.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </Select>
              </FormField>

              <FormField label="Date" id="pl-date">
                <input
                  id="pl-date" type="date" min={today}
                  value={form.date}
                  onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  disabled={!form.centreId}
                  className={styles.dateInput}
                />
              </FormField>

              <div className={styles.searchBtn}>
                <Button onClick={search} loading={loading} disabled={!form.centreId || !form.date} fullWidth>
                  Rechercher les créneaux
                </Button>
              </div>
            </div>
          </Card>

          {searched && (
            <Card padding="lg" shadow="md" className={styles.resultsCard}>
              <div className={styles.resultsHeader}>
                <div>
                  <h2 className={styles.resultsTitle}>{form.centreName}</h2>
                  <p className={styles.resultsDate}>{dateLabel}</p>
                </div>
                <div className={styles.resultsBadges}>
                  <Badge variant="success">✓ {available} disponibles</Badge>
                  <Badge variant="error">✗ {total - available} complets</Badge>
                </div>
              </div>

              {/* Availability bar */}
              <div className={styles.availBar}>
                <div className={styles.availFill} style={{ width: `${(available / total) * 100}%` }} />
              </div>
              <p className={styles.availText}>{Math.round((available / total) * 100)}% des créneaux encore disponibles</p>

              <div className={styles.slotsGrid}>
                {slots.map(slot => (
                  <div key={slot.id} className={[styles.slot, !slot.available ? styles.slotFull : ''].join(' ')}>
                    <span className={styles.slotTime}>{slot.time}</span>
                    {slot.available ? (
                      <>
                        <span className={styles.slotAvail}>{slot.spots} place{slot.spots > 1 ? 's' : ''}</span>
                        <div className={styles.slotDot} />
                      </>
                    ) : (
                      <span className={styles.slotFullLabel}>Complet</span>
                    )}
                  </div>
                ))}
              </div>

              <div className={styles.legend}>
                <span className={styles.legendItem}><span className={styles.dotGreen} />Disponible</span>
                <span className={styles.legendItem}><span className={styles.dotRed} />Complet</span>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
