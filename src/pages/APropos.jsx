import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import styles from './APropos.module.css';

export default function APropos() {
  const navigate = useNavigate();
    return (
    <section className={styles.aboutSection}>
        
            <div className="container">

                {/* Section header */}
              <div className={styles.aboutHeader}>
                <div className={styles.aboutEyebrow}>
                  <div className={styles.aboutEyebrowLine} />
                  <span>À propos</span>
                </div>
                <h2 className={styles.aboutTitle}>
                  Présentation de l'Agence Technique<br />
                  des Transports Terrestres
                </h2>
                <p className={styles.aboutSubtitle}>
                  Un établissement public au service de la sécurité routière et de la mobilité en Tunisie.
                </p>
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
     
                {/* RIGHT — network stats + contact card */}
                <div className={styles.aboutRight}>
                  {/* Contact card */}
                  <div className={styles.contactCard}>
                    <div className={styles.contactCardHead}>
                      <div className={styles.pdgAvatar}>
                        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" viewBox="0 0 24 24">
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                        </svg>
                      </div>
                      <div>
                        <p className={styles.pdgName}>HABIB TOUMI</p>
                        <p className={styles.pdgRole}>Président Directeur Général</p>
                      </div>
                    </div>
     
                    <div className={styles.contactRows}>
                      {[
                        {
                          icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                          label: 'Adresse',
                          value: 'Av. du Japon, Impasse 1, N°6 Montplaisir — 1073 Tunis',
                        },
                        {
                          icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.07 9.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .82h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>,
                          label: 'Téléphone',
                          value: '+216 / 71 11 22 00',
                        },
                        {
                          icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.07 9.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .82h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>,
                          label: 'Numéro vert',
                          value: '80 10 03 07',
                          highlight: true,
                        },
                        {
                          icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                          label: 'Email',
                          value: 'infoattt@attt.tn',
                          link: 'mailto:infoattt@attt.tn',
                        },
                        {
                          icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>,
                          label: 'Site web',
                          value: 'www.attt.com.tn',
                          link: 'http://www.attt.com.tn',
                        },
                      ].map(row => (
                        <div key={row.label} className={styles.contactRow}>
                          <span className={styles.contactRowIcon}>{row.icon}</span>
                          <div className={styles.contactRowBody}>
                            <span className={styles.contactRowLabel}>{row.label}</span>
                            {row.link ? (
                              <a href={row.link} className={[styles.contactRowValue, styles.contactRowLink].join(' ')} target="_blank" rel="noopener noreferrer">
                                {row.value}
                              </a>
                            ) : (
                              <span className={[styles.contactRowValue, row.highlight ? styles.contactRowHighlight : ''].join(' ')}>
                                {row.value}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
     
                    <div className={styles.subDirBadge}>
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      Sous-Direction de l'Information, de la Communication et de l'Écoute Clients — Tél : 71 11 22 00
                    </div>
                  </div>
     
                </div>
              </div>
            </div>
          </section>)
}