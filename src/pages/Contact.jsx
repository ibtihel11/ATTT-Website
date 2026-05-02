import { useState } from 'react';
import Card, { CardHeader } from '../components/ui/Card';
import FormField, { Input, Select } from '../components/ui/FormField';
import Button from '../components/ui/Button';
import styles from './Contact.module.css';

const subjects = [
  'Demande d\'information générale',
  'Problème de réservation',
  'Réclamation',
  'Demande de remboursement',
  'Autre',
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (f) => (e) => setForm(p => ({ ...p, [f]: e.target.value }));

  const submit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className={styles.page}>
        <div className={styles.header}><div className="container"><h1>Contact</h1></div></div>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.success}>
              <div className={styles.successIcon}>✓</div>
              <h2>Message envoyé !</h2>
              <p>Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais (délai moyen : 24–48h ouvrables).</p>
              <Button variant="secondary" onClick={() => setSent(false)}>Envoyer un autre message</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className="container">
          <h1>Contactez-nous</h1>
          <p>Notre équipe vous répondra dans les plus brefs délais</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          {/* Info cards */}
          <aside className={styles.info}>
            {[
              {
                icon: '📍',
                title: 'Sièges principaux',
                lines: ['Rue Montplaisir, 1073 Tunis', 'Rue Okba Ibn Nafaa, Sfax', 'Manzel Hayet, Monastir'],
              },
              {
                icon: '🕐',
                title: 'Horaires d\'ouverture',
                lines: ['Lundi – Vendredi', '08h00 – 16h30', 'Fermé les weekends et jours fériés'],
              },
              {
                icon: '📞',
                title: 'Téléphone',
                lines: ['Centre de Tunis : +216 XX XXX XXX', 'Centre de Sfax : +216 XX XXX XXX'],
              },
            ].map(c => (
              <Card key={c.title} padding="md" shadow="sm" className={styles.infoCard}>
                <div className={styles.infoIcon}>{c.icon}</div>
                <h3 className={styles.infoTitle}>{c.title}</h3>
                {c.lines.map(l => <p key={l} className={styles.infoLine}>{l}</p>)}
              </Card>
            ))}
          </aside>

          {/* Form */}
          <Card padding="lg" shadow="md" className={styles.formCard}>
            <CardHeader title="Envoyer un message" subtitle="Tous les champs marqués * sont obligatoires." />

            <div className={styles.formGrid}>
              <div className={styles.twoCol}>
                <FormField label="Nom complet" id="name" required>
                  <Input id="name" value={form.name} onChange={set('name')} placeholder="Votre nom" />
                </FormField>
                <FormField label="Téléphone" id="phone">
                  <Input id="phone" value={form.phone} onChange={set('phone')} placeholder="+216 XX XXX XXX" />
                </FormField>
              </div>

              <FormField label="Email" id="email" required>
                <Input id="email" type="email" value={form.email} onChange={set('email')} placeholder="votre@email.com" />
              </FormField>

              <FormField label="Sujet" id="subject" required>
                <Select id="subject" value={form.subject} onChange={set('subject')}>
                  <option value="">-- Sélectionner un sujet --</option>
                  {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                </Select>
              </FormField>

              <FormField label="Message" id="message" required>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={set('message')}
                  rows={5}
                  placeholder="Décrivez votre demande en détail..."
                  className={styles.textarea}
                />
              </FormField>
            </div>

            <div className={styles.formActions}>
              <Button loading={loading} onClick={submit} disabled={!form.name || !form.email || !form.message} iconRight={
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              }>
                Envoyer le message
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
