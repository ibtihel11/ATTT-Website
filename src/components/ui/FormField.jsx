import styles from './FormField.module.css';

export default function FormField({
  label,
  id,
  error,
  hint,
  required,
  children,
  className = '',
}) {
  return (
    <div className={[styles.field, className].join(' ')}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.req} aria-hidden>*</span>}
        </label>
      )}
      <div className={styles.control}>{children}</div>
      {hint && !error && <p className={styles.hint}>{hint}</p>}
      {error && <p className={styles.error} role="alert">{error}</p>}
    </div>
  );
}

export function Input({ id, error, ...props }) {
  return (
    <input
      id={id}
      className={[styles.input, error ? styles.inputError : ''].join(' ')}
      {...props}
    />
  );
}

export function Select({ id, error, children, ...props }) {
  return (
    <select
      id={id}
      className={[styles.input, error ? styles.inputError : ''].join(' ')}
      {...props}
    >
      {children}
    </select>
  );
}
