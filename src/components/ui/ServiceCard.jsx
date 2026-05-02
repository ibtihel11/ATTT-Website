import { useNavigate } from 'react-router-dom';
import Badge from './Badge';
import styles from './ServiceCard.module.css';

/**
 * ServiceCard — reusable card for the "Nos Services" page.
 * Follows the same design patterns as the Home service cards
 * but richer: number accent, feature list, full CTA.
 */
export default function ServiceCard({ service, index }) {
  const navigate = useNavigate();
  const { icon, title, tagline, description, badge, badgeVariant, features, action, accentColor } = service;

  return (
    <article
      className={styles.card}
      style={{ '--accent-color': accentColor || 'var(--blue)' }}
      onClick={() => action && navigate(action)}
      role={action ? 'button' : undefined}
      tabIndex={action ? 0 : undefined}
      onKeyDown={e => e.key === 'Enter' && action && navigate(action)}
      aria-label={title}
    >
      {/* Top row: number + badge */}
      <div className={styles.topRow}>
        <span className={styles.number}>0{index + 1}</span>
        {badge && <Badge variant={badgeVariant || 'info'}>{badge}</Badge>}
      </div>

      {/* Icon */}
      <div className={styles.iconWrap}>
        <div className={styles.iconInner}>{icon}</div>
        <div className={styles.iconGlow} aria-hidden />
      </div>

      {/* Text */}
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        {tagline && <p className={styles.tagline}>{tagline}</p>}
        <p className={styles.description}>{description}</p>
      </div>

      {/* Footer CTA */}
      {action && (
        <div className={styles.footer}>
          <span className={styles.cta}>
            Accéder au service
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      )}

      {/* Decorative accent bar */}
      <div className={styles.accentBar} aria-hidden />
    </article>
  );
}
