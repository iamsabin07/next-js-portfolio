'use client';
import Image from 'next/image';
import styles from './HeroHuman.module.css';

const OVERLAYS = [
  {
    src: '/overlays/overlay1-large.png',
    cls: styles.base,
    alt: 'Sabin Thapa',
  },
  {
    src: '/overlays/overlay2-large.png',
    cls: `${styles.overlay} ${styles.overlay2}`,
    alt: '',
  },
  {
    src: '/overlays/overlay4-large.png',
    cls: `${styles.overlay} ${styles.overlay3}`,
    alt: '',
  },
  {
    src: '/overlays/overlay5-large.png',
    cls: `${styles.overlay} ${styles.overlay4}`,
    alt: '',
  },
];

export default function HeroHuman() {
  return (
    <div className={styles.col}>
      <div className={styles.wrap}>
        {OVERLAYS.map(({ src, cls, alt }, i) => (
          <Image
            key={src}
            src={src}
            alt={alt}
            width={500}
            height={800}
            priority={i === 0}
            aria-hidden={i > 0 || undefined}
            className={cls}
          />
        ))}

        {/* Info panel revealed on hover */}
        <div className={styles.info}>
          <div className={styles.infoInner}>
            <div className={styles.infoTag}>Full Stack Developer</div>
            <div className={styles.infoName}>
              Sabin<br />Thapa
            </div>
            <div className={styles.infoDivider} />
            <div className={styles.infoDetail}>Kearny, NJ</div>
            <div className={styles.infoDetail}>6+ Years Experience</div>
            <div className={styles.infoDetail}>MS Data Science · 4.0 GPA</div>
          </div>
        </div>
      </div>
    </div>
  );
}