import React, { useState, useEffect } from "react";
import styles from "./FilterModal.module.scss";

type FilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
};

type Filters = {
  region?: string;
  thematique?: string;
  duree?: string;
};

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
}) => {
  const [localFilters, setLocalFilters] = useState<Filters>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setLocalFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (newFilters[filterType] === value) {
        newFilters[filterType] = undefined; // Deselect if already selected
      } else {
        newFilters[filterType] = value; // Select the new filter
      }
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h3 className={styles.filterTitle}>Filtres</h3>
        <div className={styles.filterSection}>
          <h4 className={styles.SubtitleFilter}>Par région</h4>
          {[
            "Nord Algerien",
            "Kabylie",
            "Ouest - Oranie",
            "Est - Constantinois",
            "Hauts-Plateaux",
            "Sahara",
          ].map((region) => (
            <button
              key={region}
              className={`${styles.filterButton} ${
                localFilters.region === region ? styles.selected : ""
              }`}
              onClick={() => handleFilterChange("region", region)}
            >
              {region}
            </button>
          ))}
        </div>
        <div className={styles.filterSection}>
          <h4 className={styles.SubtitleFilter}>Par thématique</h4>
          {[
            "Aventure",
            "Culture & Tradition",
            "Historique",
            "Nature & Ecologie",
            "Plage & Détente",
            "Découverte Junior",
          ].map((thematique) => (
            <button
              key={thematique}
              className={`${styles.filterButton} ${
                localFilters.thematique === thematique ? styles.selected : ""
              }`}
              onClick={() => handleFilterChange("thematique", thematique)}
            >
              {thematique}
            </button>
          ))}
        </div>
        <div className={styles.filterSection}>
          <h4 className={styles.SubtitleFilter}>Par durée</h4>
          {["1", "3", "10"].map((duree) => (
            <button
              key={duree}
              className={`${styles.filterButton} ${
                localFilters.duree === duree ? styles.selected : ""
              }`}
              onClick={() => handleFilterChange("duree", duree)}
            >
              {duree === "1"
                ? "1 journée"
                : duree === "3"
                ? "3 jours / 2 nuits"
                : "10 jours / 9 nuits"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
