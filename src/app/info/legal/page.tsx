/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styles from "../../../styles/legalPrivacyCgv.module.scss";

const Legal: React.FC = () => {
  return (
    <div className={styles.legalPrivacyCgvContainer}>
      <h1 className={styles.legalPrivacyCgvTitle}>Mentions Légales</h1>
      <section className={styles.section}>
        <h2>Informations Générales</h2>
        <p>
          Nom de l'entreprise : Algeriescapades
          <br />
          Adresse : 14 rue de la Beaune - 93100 Montreuil
          <br />
          Téléphone : 06.01.02.03.04
          <br />
          Email : katia.zouad@gmail.com
          <br />
          Numéro SIRET : 123 456 789 00000
          <br />
          Directeur de la publication : Katia ZOUAD
          <br />
          Application web fictive faite dans le cadre du Titre Professionnel
          Développeur web et web mobile.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Hébergement</h2>
        <p>
          Hébergeur : Vercel
          <br />
          Adresse :
          <br />
          Téléphone :
        </p>
      </section>
      <section className={styles.section}>
        <h2>Propriété Intellectuelle</h2>
        <p>
          Le contenu du site Algeriescapades, incluant, sans s'y limiter, les
          textes, graphiques, images, et logos, est la propriété de
          Algeriescapades, sauf indication contraire. Toute reproduction,
          distribution, modification, retransmission ou publication de ce
          contenu est strictement interdite sans l'accord écrit de
          Algeriescapades.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Limitation de Responsabilité</h2>
        <p>
          Algeriescapades ne pourra être tenue responsable des dommages directs
          ou indirects résultant de l'utilisation du site. Le site
          Algeriescapades peut contenir des liens vers d'autres sites.
          Algeriescapades ne peut être tenue pour responsable du contenu de ces
          sites externes.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Protection des Données Personnelles</h2>
        <p>
          Conformément à la loi Informatique et Libertés du 6 janvier 1978, vous
          disposez d'un droit d'accès, de rectification et de suppression des
          données vous concernant. Vous pouvez exercer ce droit en envoyant un
          email à contact@algeriescapades.com.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Cookies</h2>
        <p>
          Le site Algeriescapades peut être amené à vous demander l'acceptation
          des cookies pour des besoins de statistiques et d'affichage. Un cookie
          est une information déposée sur votre disque dur par le serveur du
          site que vous visitez.
        </p>
      </section>
    </div>
  );
};


export default Legal;
