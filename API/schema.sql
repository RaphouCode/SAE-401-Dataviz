-- =============================================
-- Observatoire du Logement et de la Précarité
-- Base de données normalisée (3NF)
-- =============================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- Suppression des tables existantes
DROP TABLE IF EXISTS stats_logement;
DROP TABLE IF EXISTS stats_demographiques;
DROP TABLE IF EXISTS departements;
DROP TABLE IF EXISTS regions;
DROP TABLE IF EXISTS _staging;

-- =============================================
-- ÉTAPE 1 : Table de staging (temporaire)
-- Contient les données brutes à normaliser
-- =============================================
CREATE TABLE _staging (
  annee_publication VARCHAR(10),
  code_departement VARCHAR(5),
  nom_departement VARCHAR(100),
  code_region VARCHAR(5),
  nom_region VARCHAR(100),
  population VARCHAR(20),
  densite VARCHAR(20),
  variation_pop_10ans VARCHAR(30),
  solde_naturel VARCHAR(30),
  solde_migratoire VARCHAR(30),
  pop_moins_20ans VARCHAR(30),
  pop_60ans_plus VARCHAR(30),
  taux_chomage VARCHAR(20),
  taux_pauvrete VARCHAR(20),
  nb_logements VARCHAR(20),
  nb_residences_principales VARCHAR(20),
  taux_logements_sociaux VARCHAR(30),
  taux_logements_vacants VARCHAR(30),
  taux_logements_individuels VARCHAR(30),
  construction_neuve_moy_10ans VARCHAR(20),
  construction VARCHAR(20),
  parc_social_nb VARCHAR(20),
  parc_social_mis_en_location VARCHAR(20),
  parc_social_demolis VARCHAR(20),
  parc_social_ventes VARCHAR(20),
  parc_social_taux_vacants VARCHAR(30),
  parc_social_taux_individuels VARCHAR(30),
  parc_social_loyer_moyen VARCHAR(20),
  parc_social_age_moyen VARCHAR(20),
  parc_social_taux_energivores VARCHAR(30)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- ÉTAPE 3 : Création des tables normalisées
-- =============================================

CREATE TABLE regions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(3) NOT NULL UNIQUE,
  nom VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE departements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(3) NOT NULL UNIQUE,
  nom VARCHAR(100) NOT NULL,
  region_id INT NOT NULL,
  CONSTRAINT fk_dept_region FOREIGN KEY (region_id) REFERENCES regions(id)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE stats_demographiques (
  id INT AUTO_INCREMENT PRIMARY KEY,
  departement_id INT NOT NULL,
  annee YEAR NOT NULL,
  population INT,
  densite DECIMAL(10,2),
  variation_pop_10ans DECIMAL(10,4),
  solde_naturel DECIMAL(10,4),
  solde_migratoire DECIMAL(10,4),
  pop_moins_20ans DECIMAL(6,3),
  pop_60ans_plus DECIMAL(6,3),
  taux_chomage DECIMAL(5,2),
  taux_pauvrete DECIMAL(5,2),
  UNIQUE KEY uk_demo_dept_annee (departement_id, annee),
  CONSTRAINT fk_demo_dept FOREIGN KEY (departement_id) REFERENCES departements(id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE stats_logement (
  id INT AUTO_INCREMENT PRIMARY KEY,
  departement_id INT NOT NULL,
  annee YEAR NOT NULL,
  nb_logements INT,
  nb_residences_principales INT,
  taux_logements_sociaux DECIMAL(6,3),
  taux_logements_vacants DECIMAL(6,3),
  taux_logements_individuels DECIMAL(6,3),
  construction_neuve_moy_10ans INT,
  construction DECIMAL(10,2),
  parc_social_nb INT,
  parc_social_mis_en_location DECIMAL(10,2),
  parc_social_demolis DECIMAL(10,2),
  parc_social_ventes DECIMAL(10,2),
  parc_social_taux_vacants DECIMAL(6,3),
  parc_social_taux_individuels DECIMAL(6,3),
  parc_social_loyer_moyen DECIMAL(5,2),
  parc_social_age_moyen DECIMAL(5,2),
  parc_social_taux_energivores DECIMAL(6,3),
  UNIQUE KEY uk_log_dept_annee (departement_id, annee),
  CONSTRAINT fk_log_dept FOREIGN KEY (departement_id) REFERENCES departements(id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Index pour performances (requêtes Chart.js)
CREATE INDEX idx_demo_annee ON stats_demographiques(annee);
CREATE INDEX idx_log_annee ON stats_logement(annee);
CREATE INDEX idx_dept_region ON departements(region_id);
