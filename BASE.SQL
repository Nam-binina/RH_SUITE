-- Création de la base
CREATE DATABASE gestionentreprise;
\c gestionentreprise;

-- ===============================
-- Tables de base existantes (conservées)
-- ===============================

-- Table entreprise
CREATE TABLE entreprise(
    id SERIAL PRIMARY KEY,
    nom VARCHAR(200),
    prenom VARCHAR(200),
    email VARCHAR(200),
    mdp VARCHAR(200),
    numero VARCHAR(200),
    adresse VARCHAR(200)
);

-- Table candidat (conservée pour le recrutement)
CREATE TABLE candidat(
    id SERIAL PRIMARY KEY,
    nom VARCHAR(200),
    prenom VARCHAR(200),
    email VARCHAR(200),
    numero VARCHAR(200),
    adresse VARCHAR(200),
    date_naissance DATE,
    mdp VARCHAR(200)
);

-- Table domaine
CREATE TABLE domaine(
    id SERIAL PRIMARY KEY,
    nom VARCHAR(200)
);

-- Tables pour recrutement (conservées)
CREATE TABLE atout(id SERIAL PRIMARY KEY, nom VARCHAR(200));
CREATE TABLE exp_professionel(id SERIAL PRIMARY KEY, intitule VARCHAR(100), entreprise VARCHAR(100), lieu VARCHAR(200), debut DATE, fin DATE, mission TEXT);
CREATE TABLE diplome(id SERIAL PRIMARY KEY, nom VARCHAR(200));
CREATE TABLE langue(id SERIAL PRIMARY KEY, nom VARCHAR(200));
CREATE TABLE interet(id SERIAL PRIMARY KEY, nom VARCHAR(200));
CREATE TABLE competence(id SERIAL PRIMARY KEY, nom VARCHAR(200));
CREATE TABLE projet(id SERIAL PRIMARY KEY, nom VARCHAR(200));
CREATE TABLE certificat(id SERIAL PRIMARY KEY, nom VARCHAR(200));
CREATE TABLE cv(id SERIAL PRIMARY KEY, id_candidat INT REFERENCES candidat(id) ON DELETE CASCADE, photo VARCHAR(200), lien_pro VARCHAR(200), objectif TEXT);

-- ===============================
-- EXTENSION RH - GESTION DU PERSONNEL
-- ===============================

-- Table département
CREATE TABLE departement(
    id SERIAL PRIMARY KEY,
    nom VARCHAR(200) NOT NULL,
    description TEXT,
    responsable INT -- Référence à employer (auto-référence)
);

-- Table poste
CREATE TABLE poste(
    id SERIAL PRIMARY KEY,
    nom VARCHAR(200) NOT NULL,
    description TEXT,
    id_departement INT REFERENCES departement(id),
    salaire_base DECIMAL(15,2)
);

-- Table type_contrat
CREATE TABLE type_contrat(
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL, -- CDI, CDD, Stage, etc.
    duree_essai INT -- Durée en jours
);

-- Table employé (EXTENSION de la table existante)
CREATE TABLE employer(
    id SERIAL PRIMARY KEY,
    id_candidat INT REFERENCES candidat(id), -- Lien avec le candidat recruté
    id_poste INT REFERENCES poste(id),
    id_type_contrat INT REFERENCES type_contrat(id),
    id_departement INT REFERENCES departement(id),
    id_manager INT REFERENCES employer(id), -- Auto-référence pour la hiérarchie
    
    -- Informations personnelles
    nom VARCHAR(200) NOT NULL,
    prenom VARCHAR(200) NOT NULL,
    email VARCHAR(200) UNIQUE,
    numero VARCHAR(200),
    adresse VARCHAR(200),
    date_naissance DATE,
    mdp VARCHAR(200),
    photo VARCHAR(200),
    
    -- Informations professionnelles
    matricule VARCHAR(50) UNIQUE,
    date_embauche DATE NOT NULL,
    date_fin_contrat DATE,
    periode_essai_fin DATE,
    salaire_brut DECIMAL(15,2),
    
    -- Paramètres de paie
    taux_cnaps DECIMAL(5,4) DEFAULT 0.01,
    taux_ostie DECIMAL(5,4) DEFAULT 0.01,
    taux_irsa DECIMAL(5,4) DEFAULT 0.10,
    
    -- Statut
    actif BOOLEAN DEFAULT true,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Mise à jour de la référence responsable dans département
ALTER TABLE departement ADD CONSTRAINT fk_departement_responsable FOREIGN KEY (responsable) REFERENCES employer(id);

-- Table documents_employe
CREATE TABLE documents_employe(
    id SERIAL PRIMARY KEY,
    id_employe INT REFERENCES employer(id) ON DELETE CASCADE,
    type_document VARCHAR(100), -- CIN, Diplôme, Contrat, Attestation
    nom_fichier VARCHAR(255),
    chemin_fichier VARCHAR(500),
    date_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===============================
-- GESTION DES ABSENCES ET CONGÉS
-- ===============================

-- Table type_conge
CREATE TABLE type_conge(
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL, -- Annuel, Maladie, Maternité, Exceptionnel
    jours_annuels INT DEFAULT 0,
    paye BOOLEAN DEFAULT true
);

-- Table solde_conge
CREATE TABLE solde_conge(
    id SERIAL PRIMARY KEY,
    id_employe INT REFERENCES employer(id) ON DELETE CASCADE,
    id_type_conge INT REFERENCES type_conge(id),
    annee INT NOT NULL,
    solde_acquis INT DEFAULT 0,
    solde_prise INT DEFAULT 0,
    solde_restant INT GENERATED ALWAYS AS (solde_acquis - solde_prise) STORED,
    UNIQUE(id_employe, id_type_conge, annee)
);

-- Table demande_conge
CREATE TABLE demande_conge(
    id SERIAL PRIMARY KEY,
    id_employe INT REFERENCES employer(id) ON DELETE CASCADE,
    id_type_conge INT REFERENCES type_conge(id),
    date_debut DATE NOT NULL,
    date_fin DATE NOT NULL,
    nombre_jours INT,
    motif TEXT,
    
    -- Workflow de validation
    id_validateur INT REFERENCES employer(id), -- Manager ou RH
    statut VARCHAR(50) DEFAULT 'EN_ATTENTE', -- EN_ATTENTE, VALIDE, REJETE
    date_demande TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_validation TIMESTAMP,
    commentaire_validation TEXT
);

-- Table historique_absence
CREATE TABLE historique_absence(
    id SERIAL PRIMARY KEY,
    id_employe INT REFERENCES employer(id) ON DELETE CASCADE,
    date_absence DATE NOT NULL,
    type_absence VARCHAR(50), -- Maladie, Congé, Absence non justifiée
    justifiee BOOLEAN DEFAULT false,
    certificat_medical BOOLEAN DEFAULT false,
    commentaire TEXT
);

-- ===============================
-- GESTION DU TEMPS ET PRÉSENCES
-- ===============================

-- Table pointage
CREATE TABLE pointage(
    id SERIAL PRIMARY KEY,
    id_employe INT REFERENCES employer(id) ON DELETE CASCADE,
    date_pointage DATE NOT NULL,
    heure_entree TIME,
    heure_sortie TIME,
    pause_debut TIME,
    pause_fin TIME,
    
    -- Calculs automatiques
    heures_travaillees DECIMAL(4,2),
    heures_supplementaires DECIMAL(4,2),
    retard_minutes INT DEFAULT 0,
    
    -- Statut
    statut VARCHAR(50) DEFAULT 'PRESENT', -- PRESENT, ABSENT, RETARD
    UNIQUE(id_employe, date_pointage)
);

-- Table releve_presence
CREATE TABLE releve_presence(
    id SERIAL PRIMARY KEY,
    id_employe INT REFERENCES employer(id) ON DELETE CASCADE,
    mois INT NOT NULL,
    annee INT NOT NULL,
    
    -- Totaux
    jours_travailles INT DEFAULT 0,
    heures_supp_total DECIMAL(6,2) DEFAULT 0,
    retards_total INT DEFAULT 0,
    absences_non_justifiees INT DEFAULT 0,
    
    -- Validation
    valide BOOLEAN DEFAULT false,
    date_validation TIMESTAMP,
    UNIQUE(id_employe, mois, annee)
);

-- ===============================
-- GESTION DE LA PAIE
-- ===============================

-- Table fiche_paie
CREATE TABLE fiche_paie(
    id SERIAL PRIMARY KEY,
    id_employe INT REFERENCES employer(id) ON DELETE CASCADE,
    id_releve_presence INT REFERENCES releve_presence(id),
    
    -- Période
    mois INT NOT NULL,
    annee INT NOT NULL,
    date_edition TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Gains
    salaire_brut DECIMAL(15,2),
    heures_supplementaires DECIMAL(15,2) DEFAULT 0,
    primes DECIMAL(15,2) DEFAULT 0,
    autres_gains DECIMAL(15,2) DEFAULT 0,
    total_brut DECIMAL(15,2),
    
    -- Retenues
    cnaps DECIMAL(15,2) DEFAULT 0,
    ostie DECIMAL(15,2) DEFAULT 0,
    irsa DECIMAL(15,2) DEFAULT 0,
    absences_retenues DECIMAL(15,2) DEFAULT 0,
    autres_retenues DECIMAL(15,2) DEFAULT 0,
    total_retenues DECIMAL(15,2),
    
    -- Net
    net_a_payer DECIMAL(15,2),
    
    -- Statut
    statut VARCHAR(50) DEFAULT 'BROUILLON', -- BROUILLON, VALIDE, PAYE
    UNIQUE(id_employe, mois, annee)
);

-- Table prime
CREATE TABLE prime(
    id SERIAL PRIMARY KEY,
    id_employe INT REFERENCES employer(id) ON DELETE CASCADE,
    id_fiche_paie INT REFERENCES fiche_paie(id),
    type_prime VARCHAR(100), -- Performance, Ancienneté, Exceptionnelle
    montant DECIMAL(15,2),
    motif TEXT,
    mois INT,
    annee INT
);

-- Table avance_salaire
CREATE TABLE avance_salaire(
    id SERIAL PRIMARY KEY,
    id_employe INT REFERENCES employer(id) ON DELETE CASCADE,
    id_fiche_paie INT REFERENCES fiche_paie(id),
    montant DECIMAL(15,2),
    date_avance DATE,
    motif TEXT,
    statut_remboursement VARCHAR(50) DEFAULT 'EN_COURS' -- EN_COURS, REMBOURSE
);

-- ===============================
-- TABLES DE LIAISON EXISTANTES (conservées)
-- ===============================

CREATE TABLE formation(
    id SERIAL PRIMARY KEY,
    id_diplome INT REFERENCES diplome(id) ON DELETE CASCADE,
    id_domaine INT REFERENCES domaine(id) ON DELETE CASCADE,
    id_candidat INT REFERENCES candidat(id) ON DELETE CASCADE,
    id_cv INT REFERENCES cv(id),
    etablissement VARCHAR(200)
);

-- Tables de liaison ManyToMany existantes
CREATE TABLE l_domaine(id_candidat INT REFERENCES candidat(id), id_domaine INT REFERENCES domaine(id), PRIMARY KEY (id_candidat, id_domaine));
CREATE TABLE l_atout(id_candidat INT REFERENCES candidat(id), id_atout INT REFERENCES atout(id), PRIMARY KEY (id_candidat, id_atout));
CREATE TABLE l_exp(id_candidat INT REFERENCES candidat(id), id_exp INT REFERENCES exp_professionel(id), PRIMARY KEY (id_candidat, id_exp));
CREATE TABLE l_langue(id_candidat INT REFERENCES candidat(id), id_langue INT REFERENCES langue(id), PRIMARY KEY (id_candidat, id_langue));
CREATE TABLE l_interet(id_candidat INT REFERENCES candidat(id), id_interet INT REFERENCES interet(id), PRIMARY KEY (id_candidat, id_interet));
CREATE TABLE l_competence(id_candidat INT REFERENCES candidat(id), id_competence INT REFERENCES competence(id), PRIMARY KEY (id_candidat, id_competence));
CREATE TABLE l_projet(id_candidat INT REFERENCES candidat(id), id_projet INT REFERENCES projet(id), PRIMARY KEY (id_candidat, id_projet));
CREATE TABLE l_certificat(id_candidat INT REFERENCES candidat(id), id_certificat INT REFERENCES certificat(id), PRIMARY KEY (id_candidat, id_certificat));

-- ===============================
-- TABLES POUR RECRUTEMENT (conservées)
-- ===============================

CREATE TABLE profil (id SERIAL PRIMARY KEY, id_domaine INT REFERENCES domaine(id), id_diplome INT REFERENCES diplome(id), age_min INT, age_max INT, experience INT, remote Boolean, salary DECIMAL(15,2), datelimite DATE);
CREATE TABLE profil_competence (id_profil INT REFERENCES profil(id), id_competence INT REFERENCES competence(id), PRIMARY KEY (id_profil, id_competence));
CREATE TABLE profil_certificat (id_profil INT REFERENCES profil(id), id_certificat INT REFERENCES certificat(id), PRIMARY KEY (id_profil, id_certificat));
CREATE TABLE profil_langue (id_profil INT REFERENCES profil(id), id_langue INT REFERENCES langue(id), PRIMARY KEY (id_profil, id_langue));

CREATE TABLE statut (id SERIAL PRIMARY KEY, nom VARCHAR(50) NOT NULL UNIQUE, CONSTRAINT chk_nom CHECK (nom IN ('EN_ATTENTE', 'VALIDE', 'REJETE')));
INSERT INTO statut (nom) VALUES ('EN_ATTENTE'), ('VALIDE'), ('REJETE');

CREATE TABLE applications(id SERIAL PRIMARY KEY, id_profil INT REFERENCES profil(id), id_candidat INT REFERENCES candidat(id), id_statut INT REFERENCES statut(id));

CREATE TABLE question(id SERIAL PRIMARY KEY, libelle TEXT, score DECIMAL(3,2));
CREATE TABLE reponse(id SERIAL PRIMARY KEY, libelle TEXT, id_question INT REFERENCES question(id));
CREATE TABLE bonne_reponse (id_question INT REFERENCES question(id), id_reponse INT REFERENCES reponse(id), PRIMARY KEY (id_question, id_reponse));
CREATE TABLE entretien(id SERIAL PRIMARY KEY, id_candidat INT REFERENCES candidat(id), id_profil INT REFERENCES profil(id), score DECIMAL(3,2));

-- ===============================
-- VUES ET FONCTIONS UTILES
-- ===============================

-- Vue pour le calcul automatique de l'âge
CREATE OR REPLACE VIEW vue_employes AS
SELECT 
    e.*,
    EXTRACT(YEAR FROM age(CURRENT_DATE, e.date_naissance)) as age,
    p.nom as nom_poste,
    d.nom as nom_departement,
    tc.nom as type_contrat_nom
FROM employer e
LEFT JOIN poste p ON e.id_poste = p.id
LEFT JOIN departement d ON e.id_departement = d.id
LEFT JOIN type_contrat tc ON e.id_type_contrat = tc.id
WHERE e.actif = true;

-- Fonction pour calculer le nombre de jours ouvrés entre deux dates
CREATE OR REPLACE FUNCTION calcul_jours_ouvres(date_debut DATE, date_fin DATE)
RETURNS INT AS $$
DECLARE
    jours_total INT;
BEGIN
    SELECT COUNT(*) INTO jours_total
    FROM generate_series(date_debut, date_fin, '1 day'::interval) as jour
    WHERE EXTRACT(DOW FROM jour) NOT IN (0, 6); -- Exclure samedi et dimanche
    RETURN jours_total;
END;
$$ LANGUAGE plpgsql;

-- Insertion des données de base
INSERT INTO type_conge (nom, jours_annuels, paye) VALUES 
('Congé annuel', 30, true),
('Congé maladie', 15, true),
('Congé maternité', 98, true),
('Congé paternité', 15, true),
('Congé exceptionnel', 5, true);

INSERT INTO type_contrat (nom, duree_essai) VALUES 
('CDI', 90),
('CDD', 30),
('Stage', 15),
('Contrat à durée indéterminée période essai', 90);