// src/components/footer/Footer.tsx
import React from "react";
import Link from "next/link";
import styles from "./Footer.module.scss";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <a href="/">
          <Image
            src="/assets/img/logo.png"
            alt="Algeriescapades"
            width={260}
            height={100}
          />
        </a>
      </div>
      <div className={styles.socialIcons}>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/assets/icons/facebook.png"
            alt="Facebook"
            width={22}
            height={22}
          />
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/assets/icons/linkedin.png"
            alt="LinkedIn"
            width={24}
            height={22}
          />
        </a>
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/assets/icons/youtube.png"
            alt="YouTube"
            width={24}
            height={22}
          />
        </a>
        <a
          href="https://www.tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/assets/icons/tiktok.png"
            alt="TikTok"
            width={24}
            height={22}
          />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/assets/icons/instagram.png"
            alt="Instagram"
            width={22}
            height={22}
          />
        </a>
      </div>
      <div className={styles.links}>
        <Link href="/" className={styles.link}>
          Accueil
        </Link>
        <span className={styles.separator}>|</span>
        <Link href="/info/legal" className={styles.link}>
          Mentions légales
        </Link>
        <span className={styles.separator}>|</span>
        <Link href="/info/privacy" className={styles.link}>
          Politique de confidentialité
        </Link>
        <span className={styles.separator}>|</span>
        <Link href="/info/cgv" className={styles.link}>
          CGV
        </Link>
        <span className={styles.separator}>|</span>
        <Link href="/info/contact" className={styles.link}>
          Contact
        </Link>
      </div>
      <div className={styles.sponsors}>
        <Image
          src="/assets/icons/ministere.png"
          alt="Logo Ministère du Tourisme Algérien"
          width={221}
          height={50}
        />
        <Image
          src="/assets/icons/assurance.png"
          alt="Logo Assurance Axa Algérie"
          width={200}
          height={50}
        />
      </div>
    </footer>
  );
};


export default Footer;
