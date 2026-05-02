import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import styles from './Home.module.css';
import img from "../assets/image 1.png";

const services = [
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="3"/>
        <path d="M3 9h18M9 4v5M15 4v5M7 14h2M11 14h2M15 14h2M7 18h2M11 18h2M15 18h2"/>
      </svg>
    ),
    title: 'Prendre un rendez-vous',
    desc: 'Réservez votre créneau de contrôle technique en quelques étapes simples.',
    action: '/reservation',
    badge: 'Rapide',
    badgeVariant: 'success',
    primary: true,
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 7v5l3 3"/>
      </svg>
    ),
    title: 'Consulter les disponibilités',
    desc: 'Vérifiez les créneaux disponibles dans votre centre de contrôle.',
    action: '/places',
    badge: 'Temps réel',
    badgeVariant: 'info',
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    title: 'Réédition de quittance',
    desc: 'Retrouvez et téléchargez votre quittance de paiement.',
    action: '/reedition',
    badge: 'Gratuit',
    badgeVariant: 'default',
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
    title: 'Reporter un rendez-vous',
    desc: 'Modifiez la date de votre rendez-vous existant.',
    action: '/reporter',
    badge: 'Flexible',
    badgeVariant: 'warning',
  },
];

const stats = [
  { value: '29', label: 'Centres agréés' },
  { value: '50k+', label: 'Réservations/an' },
  { value: '98%', label: 'Taux de satisfaction' },
  { value: '92', label: "Centres d'examens"},
  { value: '22', label: 'Gares routières'},
];

const news = [
  {
    date: '08 Avril 2026',
    tag: 'Communiqué',
    title: 'Suspension temporaire du contrôle technique des véhicules lourds — Centre Kairouan',
    summary: 'Suite à des travaux de maintenance, le centre de Kairouan suspend temporairement le contrôle des véhicules lourds jusqu\'au 20 avril 2026.',
  },
  {
    date: '15 Mars 2026',
    tag: 'Programme',
    title: 'Campagne nationale de contrôle technique — tracteurs et remorques agricoles 2026',
    summary: 'Lancement de la campagne nationale annuelle pour le contrôle technique des engins agricoles. Inscription en ligne disponible.',
  },
  {
    date: '02 Mars 2026',
    tag: 'Examen',
    title: 'Certificat de compétence professionnelle — Catégorie B — Décembre 2026',
    summary: 'L\'ATTT organise un examen pour l\'obtention du CCP catégorie B. Date des épreuves écrites : 27 décembre 2026.',
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      {/* NOTIFICATION BANNER */}
      <div className={styles.notifBanner}>
        <div className={styles.notifInner}>
          <span className={styles.notifDot} />
          <span>Réservez votre créneau de contrôle technique en quelques clics pour circuler en toute sérénité.</span>
          <button className={styles.notifBtn} onClick={() => navigate('/reservation')}>
            Réserver maintenant →
          </button>
        </div>
      </div>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <Badge variant="info">Portail officiel ATTT</Badge>
            <h1 className={styles.heroTitle}>
              Réservez votre<br />
              <em>visite technique</em><br />
              en ligne
            </h1>
            <p className={styles.heroDesc}>
              Planifiez votre contrôle technique en quelques minutes. Choisissez votre centre, votre créneau, et payez en ligne en toute sécurité.
            </p>
            <div className={styles.heroActions}>
              <Button size="lg" onClick={() => navigate('/reservation')} iconRight={
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              }>
                Prendre un rendez-vous
              </Button>
            </div>
            <div className={styles.heroStats}>
              {stats.map(s => (
                <div key={s.label} className={styles.stat}>
                  <span className={styles.statVal}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.heroImage}>
            <img src={img} alt="Illustration" />
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className={styles.newsSection}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2>Actualités</h2>
            <button className={styles.seeAll} onClick={() => navigate('/actualites')}>Voir tout →</button>
          </div>
          <div className={styles.newsGrid}>
            {news.map((n) => (
              <article key={n.title} className={styles.newsCard}>
                <div className={styles.newsHeader}>
                  <Badge variant="info">{n.tag}</Badge>
                  <span className={styles.newsDate}>{n.date}</span>
                </div>
                <h3 className={styles.newsTitle}>{n.title}</h3>
                <p className={styles.newsSummary}>{n.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      
      {/* SERVICES */}
      <section className={styles.services}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2>Nos services</h2>
            <p>Tout ce dont vous avez besoin pour votre visite technique</p>
          </div>
          <div className={styles.servicesGrid}>
            {services.map((s) => (
              <button key={s.title} className={[styles.serviceCard, s.primary ? styles.serviceCardPrimary : ''].join(' ')}
                onClick={() => navigate(s.action)}>
                <div className={styles.serviceIcon}>{s.icon}</div>
                <div className={styles.serviceBody}>
                  <div className={styles.serviceTop}>
                    <h3>{s.title}</h3>
                    <Badge variant={s.badgeVariant}>{s.badge}</Badge>
                  </div>
                  <p>{s.desc}</p>
                </div>
                <svg className={styles.serviceArrow} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            ))}
          </div>
        </div>
      </section>
      {/* À PROPOS */}
      <section className={styles.aboutSection}>
        <div className="container">
 
          {/* Section header */}
          <div className={styles.aboutHeader}>
            <h2 className={styles.aboutTitle}>
              À propos de l'ATTT
            </h2>
          </div>
 
          {/* Main grid */}
          <div className={styles.aboutGrid}>
 
            {/* LEFT — identity + mission */}
            <div className={styles.aboutLeft}>
 
              {/* Forme juridique */}
              <div className={styles.aboutBlock}>
                <div className={styles.aboutBlockIcon}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <div>
                  <h3 className={styles.aboutBlockTitle}>Forme juridique</h3>
                  <p className={styles.aboutBlockText}>
                    L'ATTT est un établissement public à caractère non administratif, considérée comme entreprise publique. Elle est régie par la <strong>loi n°98-108 du 28 décembre 1998</strong> et a pris la suite de l'Agence de Visite Technique des véhicules créée en 1995 (loi n°95-61 du 3 juillet 1995).
                  </p>
                </div>
              </div>
 
              {/* Mission */}
              <div className={styles.aboutBlock}>
                <div className={styles.aboutBlockIcon}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <h3 className={styles.aboutBlockTitle}>Missions</h3>
                  <ul className={styles.missionList}>
                    <li>
                      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                      Formalités et opérations techniques relatives aux véhicules, conformément à la législation en vigueur
                    </li>
                    <li>
                      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                      Formalités et opérations relatives aux permis de conduire
                    </li>
                    <li>
                      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                      Création, aménagement, entretien et exploitation des gares routières
                    </li>
                  </ul>
                </div>
              </div>
 
              {/* Effectifs */}
              <div className={styles.aboutBlock}>
                <div className={styles.aboutBlockIcon}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                </div>
                <div style={{flex:1}}>
                  <h3 className={styles.aboutBlockTitle}>Les effectifs <span className={styles.aboutBlockSub}>(décembre 2019)</span></h3>
                  <div className={styles.staffGrid}>
                    <div className={styles.staffItem}>
                      <span className={styles.staffVal}>578</span>
                      <span className={styles.staffLabel}>Cadres</span>
                      <div className={styles.staffBar}>
                        <div className={styles.staffFill} style={{width:'36%', background:'var(--blue)'}} />
                      </div>
                    </div>
                    <div className={styles.staffItem}>
                      <span className={styles.staffVal}>635</span>
                      <span className={styles.staffLabel}>Agents de maîtrise</span>
                      <div className={styles.staffBar}>
                        <div className={styles.staffFill} style={{width:'40%', background:'#0891B2'}} />
                      </div>
                    </div>
                    <div className={styles.staffItem}>
                      <span className={styles.staffVal}>393</span>
                      <span className={styles.staffLabel}>Agents d'exécution</span>
                      <div className={styles.staffBar}>
                        <div className={styles.staffFill} style={{width:'24%', background:'var(--success)'}} />
                      </div>
                    </div>
                    <div className={[styles.staffItem, styles.staffTotal].join(' ')}>
                      <span className={styles.staffVal}>1 606</span>
                      <span className={styles.staffLabel}>Total agents</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
