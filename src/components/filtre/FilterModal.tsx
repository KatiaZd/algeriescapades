import React from "react";
import styles from "./FilterModal.module.scss";

type FilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onFilterChange: (filter: any) => void;
};

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onFilterChange,
}) => {
  if (!isOpen) return null;

  const handleFilterChange = (filterType: string, value: string) => {
    onFilterChange({ type: filterType, value });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h3>Filtres</h3>
        <div className={styles.filterSection}>
          <h4>Par région</h4>
          <button
            className={styles.filterButton}
            onClick={() => handleFilterChange("region", "Nord Algerien")}
          >
            Nord Algérien
          </button>
          <button
            className={styles.filterButton}
            onClick={() => handleFilterChange("region", "Kabylie")}
          >
            La Kabylie
          </button>
          <button
            className={styles.filterButton}
            onClick={() => handleFilterChange("region", "Ouest - Oranie")}
          >
            Ouest-Oranie
          </button>
          <button
            className={styles.filterButton}
            onClick={() => handleFilterChange("region", "Est - Constantinois")}
          >
            Est-Constantinois
          </button>
          <button
            className={styles.filterButton}
            onClick={() => handleFilterChange("region", "Hauts-Plateaux")}
          >
            Hauts-Plateaux
          </button>
          <button
            className={styles.filterButton}
            onClick={() => handleFilterChange("region", "Sahara")}
          >
            Sahara
          </button>
        </div>
        <div className={styles.filterSection}>
          <h4>Par thématique</h4>
          <button
            className={styles.filterButton}
            onClick={() => handleFilterChange("thematique", "Aventure")}
          >
            Aventure
          </button>
          <button
            className={styles.filterButton}
            onClick={() =>
              handleFilterChange("thematique", "Culture & Tradition")
            }
          >
            Culture & Tradition
          </button>
          <button
            className={styles.filterButton}
            onClick={() => handleFilterChange("thematique", "Historique")}
          >
            Historique
          </button>
          <button
            className={styles.filterButton}
            onClick={() =>
              handleFilterChange("thematique", "Nature & Ecologie")
            }
          >
            Nature & Ecologie
          </button>
          <button
            className={styles.filterButton}
            onClick={() => handleFilterChange("thematique", "Plage & Détente")}
          >
            Plage & Détente
          </button>
          <button
            className={styles.filterButton}
            onClick={() =>
              handleFilterChange("thematique", "Découverte Junior")
            }
          >
            Découverte Junior
          </button>
        </div>
        <div className={styles.filterSection}>
          <h4>Par durée</h4>
          <button
            className={styles.filterButton}
            onClick={() => handleFilterChange("duree", "1")}
          >
            1 journée
          </button>
          <button
            className={styles.filterButton}
            onClick={() => handleFilterChange("duree", "3")}
          >
            3 jours / 2 nuits
          </button>
          <button
            className={styles.filterButton}
            onClick={() => handleFilterChange("duree", "10")}
          >
            10 jours / 9 nuits
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
