/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styles from "../../../styles/legalPrivacyCgv.module.scss";

const Privacy: React.FC = () => {
  return (
    <div className={styles.legalPrivacyCgvContainer}>
      <h1 className={styles.legalPrivacyCgvTitle}>
        Politique de Confidentialité
      </h1>
      <section className={styles.section}>
        <h2>Introduction</h2>
        <p>
          La protection de vos données personnelles est une priorité pour
          Algeriescapades. Cette politique de confidentialité explique comment
          nous collectons, utilisons et protégeons vos informations
          personnelles.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Collecte des Données</h2>
        <p>
          Nous collectons des informations lorsque vous utilisez notre site,
          telles que votre nom, adresse e-mail, numéro de téléphone, et toute
          autre information que vous fournissez volontairement.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Utilisation des Données</h2>
        <p>
          Les informations collectées sont utilisées pour améliorer votre
          expérience sur notre site, personnaliser notre communication avec
          vous, et vous fournir les services que vous demandez.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Partage des Données</h2>
        <p>
          Vos informations personnelles ne seront jamais vendues, échangées ou
          transférées à des tiers sans votre consentement, sauf si cela est
          nécessaire pour fournir les services que vous avez demandés.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Protection des Données</h2>
        <p>
          Nous mettons en œuvre diverses mesures de sécurité pour protéger vos
          informations personnelles. Seuls les employés ayant besoin d'exécuter
          un travail spécifique (par exemple, la facturation ou le service
          client) ont accès aux informations personnellement identifiables.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Cookies</h2>
        <p>
          Nous utilisons des cookies pour améliorer l'accès à notre site et
          identifier les visiteurs réguliers. Les cookies améliorent
          l'expérience utilisateur en suivant et en ciblant ses intérêts. Cette
          utilisation des cookies n'est en aucune façon liée à des informations
          personnelles identifiables sur notre site.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Consentement</h2>
        <p>
          En utilisant notre site, vous consentez à notre politique de
          confidentialité.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Modifications de la Politique de Confidentialité</h2>
        <p>
          Algeriescapades se réserve le droit de modifier cette politique de
          confidentialité à tout moment. Les modifications prendront effet
          immédiatement après leur publication sur le site.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Contactez-nous</h2>
        <p>
          Si vous avez des questions concernant cette politique de
          confidentialité, vous pouvez nous contacter à l'adresse suivante :
          katia.zouad@gmail.com.
        </p>
      </section>
    </div>
  );
};


export default Privacy;