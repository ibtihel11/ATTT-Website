import styles from './Button.module.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  iconRight,
  onClick,
  type = 'button',
  className = '',
}) {
  return (
    <button
      type={type}
      className={[
        styles.btn,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : '',
        loading ? styles.loading : '',
        className,
      ].join(' ')}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {!loading && icon && <span className={styles.iconLeft}>{icon}</span>}
      <span>{children}</span>
      {!loading && iconRight && <span className={styles.iconRight}>{iconRight}</span>}
    </button>
  );
}
