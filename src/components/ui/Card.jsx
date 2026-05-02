import styles from './Card.module.css';

export default function Card({ children, className = '', padding = 'md', shadow = 'sm' }) {
  return (
    <div className={[styles.card, styles[`pad-${padding}`], styles[`shadow-${shadow}`], className].join(' ')}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action }) {
  return (
    <div className={styles.header}>
      <div>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
