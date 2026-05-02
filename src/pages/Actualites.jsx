import styles from './Actualites.module.css';
import Badge from '../components/ui/Badge';

const articles = [
  {
    id: 1,
    date: '08 Avril 2026',
    tag: 'Communiqué',
    tagVariant: 'error',
    title: 'Suspension temporaire du contrôle technique des véhicules lourds — Centre de Kairouan',
    body: `Suite à des travaux de maintenance programmés, le centre de contrôle technique de Kairouan suspend temporairement les opérations de contrôle des véhicules lourds à partir du 10 avril 2026 jusqu\'au 20 avril 2026 inclus. Les usagers concernés sont invités à se rapprocher des centres voisins (Sousse ou Monastir) ou à reporter leur rendez-vous via le portail en ligne.`,
    hasFile: true,
  },
  {
    id: 2,
    date: '15 Mars 2026',
    tag: 'Programme',
    tagVariant: 'info',
    title: 'Programme de la campagne nationale de contrôle technique des tracteurs et remorques agricoles — 2026',
    body: `Ce programme définit les modalités et le calendrier de la campagne nationale de contrôle technique des tracteurs et remorques agricoles pour l'année 2026. Il vise à assurer la conformité des véhicules agricoles aux normes de sécurité et de protection de l'environnement en vigueur. Les exploitants agricoles concernés peuvent prendre rendez-vous via le portail en ligne ou se présenter directement dans les centres agréés pendant les dates indiquées.`,
    hasFile: false,
  },
  {
    id: 3,
    date: '02 Mars 2026',
    tag: 'Examen',
    tagVariant: 'warning',
    title: 'Organisation d\'un examen pour l\'obtention du certificat de compétence professionnelle — Catégorie B',
    body: `L'ATTT informe qu'elle organisera un examen pour l'obtention du certificat de compétence professionnelle dans le domaine de la conduite des véhicules de catégorie "B". Les candidats intéressés sont invités à déposer leurs dossiers auprès des services compétents avant la date limite fixée.`,
    list: [
      'Date des épreuves écrites : dimanche 27 décembre 2026',
      'Annonce des résultats des épreuves écrites : au cours du mois de janvier 2027',
      'Dépôt de dossiers : avant le 01 décembre 2026',
    ],
    hasFile: true,
  },
];

export default function Actualites() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className="container">
          <h1>Actualités</h1>
          <p>Informations officielles de l'Agence Technique des Transports Terrestres</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.content}>
          {articles.map(a => (
            <article key={a.id} className={styles.article}>
              <div className={styles.articleMeta}>
                <Badge variant={a.tagVariant}>{a.tag}</Badge>
                <span className={styles.date}>{a.date}</span>
              </div>
              <h2 className={styles.articleTitle}>{a.title}</h2>
              <p className={styles.articleBody}>{a.body}</p>
              {a.list && (
                <ul className={styles.articleList}>
                  {a.list.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              )}
              {a.hasFile && (
                <button className={styles.downloadBtn} onClick={() => alert('Téléchargement du document...')}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Télécharger le document officiel
                </button>
              )}
            </article>
          ))}
          <div className={styles.SeeAllBtn}><button className={styles.seeAll} onClick={() => navigate('/actualites')}>1</button></div>
          {/* RESSOURCES */}
            <div className={styles.resourcesSection}>
            <div className={styles.resourcesGrid}>

                {/* Documents administratifs */}
                <div className={styles.resourceCard}>
                <div className={styles.resourceIconWrap}>
                    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                    </svg>
                </div>
                <h3 className={styles.resourceTitle}>Documents administratifs</h3>
                <p className={styles.resourceDesc}>Accédez aux textes officiels, décrets et réglementations encadrant l'activité de l'ATTT.</p>
                </div>

                {/* Liens et adresses utiles */}
                <div className={styles.resourceCard}>
                <div className={styles.resourceIconWrap}>
                    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
                    </svg>
                </div>
                <h3 className={styles.resourceTitle}>Liens et adresses utiles</h3>
                <p className={styles.resourceDesc}>Retrouvez les contacts et sites institutionnels partenaires de l'agence.</p>
                </div>

                {/* Concours */}
                <div className={styles.resourceCard}>
                <div className={styles.resourceIconWrap}>
                    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                </div>
                <h3 className={styles.resourceTitle}>Concours</h3>
                <p className={styles.resourceDesc}>Consultez les avis de concours et examens professionnels organisés par l'ATTT.</p>
                </div>

            </div>
            </div>      
        </div>
        </div>
    </div>
  );
}
