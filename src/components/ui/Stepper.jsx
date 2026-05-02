import styles from './Stepper.module.css';

const steps = [
  { id: 1, label: 'Identification' },
  { id: 2, label: 'Créneau' },
  { id: 3, label: 'Récapitulatif' },
  { id: 4, label: 'Paiement' },
  { id: 5, label: 'Confirmation' },
];

export default function Stepper({ currentStep }) {
  return (
    <nav className={styles.stepper} aria-label="Étapes de réservation">
      {steps.map((step, i) => {
        const done = currentStep > step.id;
        const active = currentStep === step.id;
        return (
          <div key={step.id} className={styles.item}>
            <div className={[
              styles.node,
              done ? styles.done : '',
              active ? styles.active : '',
            ].join(' ')}>
              {done ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : step.id}
            </div>
            <span className={[
              styles.label,
              active ? styles.labelActive : '',
              done ? styles.labelDone : '',
            ].join(' ')}>{step.label}</span>
            {i < steps.length - 1 && (
              <div className={[styles.line, done ? styles.lineDone : ''].join(' ')} />
            )}
          </div>
        );
      })}
    </nav>
  );
}
