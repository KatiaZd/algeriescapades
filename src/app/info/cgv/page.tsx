/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styles from "../../../styles/legalPrivacyCgv.module.scss";

const Cgv: React.FC = () => {
  return (
    <div className={styles.legalPrivacyCgvcontainer}>
      <h1 className={styles.legalPrivacyCgvTitle}>
        Conditions Générales de Vente
      </h1>
      <section className={styles.section}>
        <h2>Préambule</h2>
        <p>
          Les présentes conditions générales de vente (CGV) régissent l'ensemble
          des transactions effectuées sur le site Algeriescapades. Toute
          commande passée sur ce site implique l'acceptation sans réserve des
          présentes conditions.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Article 1 : Objet</h2>
        <p>
          Les présentes CGV définissent les droits et obligations des parties
          dans le cadre de la vente de services proposés par Algeriescapades.
          Elles s'appliquent à toutes les prestations de services conclues par
          le biais du site Internet.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Article 2 : Prix</h2>
        <p>
          Les prix des services sont indiqués en euros toutes taxes comprises
          (TVA et autres taxes applicables). Algeriescapades se réserve le droit
          de modifier ses prix à tout moment, mais les services seront facturés
          sur la base des tarifs en vigueur au moment de la validation de la
          commande.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Article 3 : Commande</h2>
        <p>
          Toute commande passée sur le site Algeriescapades constitue la
          formation d'un contrat conclu à distance entre le client et
          Algeriescapades. La validation de la commande implique l'acceptation
          de l'intégralité des présentes CGV.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Article 4 : Paiement</h2>
        <p>
          Le paiement est exigible immédiatement à la commande, y compris pour
          les services en précommande. Le client peut effectuer le règlement par
          carte de paiement. Algeriescapades utilise un système sécurisé de
          paiement en ligne qui garantit la confidentialité des informations
          bancaires transmises.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Article 5 : Annulation et Remboursement</h2>
        <p>
          Le client peut souscrire à une assurance annulation au moment de sa
          réservation. En cas d'annulation de sa part, il peut être remboursé
          selon les termes de cette assurance. Sans assurance annulation, aucun
          remboursement ne peut être demandé.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Article 6 : Prestation de Services</h2>
        <p>
          Aucun produit physique n'est expédié, les prestations de services sont
          fournies en ligne ou sur place, selon le type d'escapade réservée.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Article 7 : Responsabilité</h2>
        <p>
          Algeriescapades ne saurait être tenue pour responsable de
          l'inexécution du contrat en cas de force majeure, de perturbation ou
          de grève totale ou partielle notamment des moyens de transport et/ou
          communications, inondation, incendie, etc.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Article 8 : Réclamation</h2>
        <p>
          Toute réclamation doit être adressée à Algeriescapades par courrier
          recommandé avec accusé de réception à l'adresse suivante : 14 rue de
          la Beaune - 93100 Montreuil
        </p>
      </section>
      <section className={styles.section}>
        <h2>Article 9 : Propriété Intellectuelle</h2>
        <p>
          Tous les éléments du site Algeriescapades sont et restent la propriété
          intellectuelle et exclusive de Algeriescapades. Nul n'est autorisé à
          reproduire, exploiter, rediffuser, ou utiliser à quelque titre que ce
          soit, même partiellement, des éléments du site qu'ils soient
          logiciels, visuels ou sonores.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Article 10 : Droit applicable</h2>
        <p>
          Les présentes conditions générales de vente sont soumises à la loi
          française. En cas de litige ou de réclamation, le client s'adressera
          en priorité à Algeriescapades pour obtenir une solution amiable.
        </p>
      </section>
    </div>
  );
};


export default Cgv;
