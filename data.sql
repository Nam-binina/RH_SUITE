-- ===============================
-- Départements
-- ===============================
INSERT INTO departement (nom, description) VALUES
('Informatique', 'Département en charge du développement et de la maintenance'),
('Ressources Humaines', 'Gestion du personnel et recrutement'),
('Finance', 'Gestion comptable et financière'),
('Marketing', 'Communication et marketing');

-- ===============================
-- Postes
-- ===============================
INSERT INTO poste (nom, description, id_departement, salaire_base) VALUES
('Développeur Junior', 'Développeur front-end ou back-end débutant', 1, 1000000),
('Développeur Senior', 'Développeur expérimenté', 1, 2500000),
('Responsable RH', 'Gère le personnel et les recrutements', 2, 2000000),
('Comptable', 'Gère les comptes et paie', 3, 1800000),
('Chef Marketing', 'Supervise les campagnes marketing', 4, 2200000);

-- ===============================
-- Candidats
-- ===============================
INSERT INTO candidat (nom, prenom, email, numero, adresse, date_naissance, mdp) VALUES
('Rakoto', 'Andry', 'andry.rakoto@example.com', '0341234567', 'Antananarivo', '1990-05-15', 'password1'),
('Rajaonarison', 'Mialy', 'mialy.rajaonarison@example.com', '0349876543', 'Antsirabe', '1992-08-22', 'password2'),
('Randriamamonjy', 'Hery', 'hery.randriamamonjy@example.com', '0334567890', 'Fianarantsoa', '1988-11-10', 'password3');

-- ===============================
-- Types de contrat
-- ===============================
INSERT INTO type_contrat (nom, duree_essai) VALUES
('CDI', 90),
('CDD', 30),
('Stage', 15);

-- ===============================
-- Employés
-- ===============================
INSERT INTO employer (id_candidat, id_poste, id_type_contrat, id_departement, id_manager, nom, prenom, email, numero, adresse, date_naissance, mdp, matricule, date_embauche, salaire_brut)
VALUES
(1, 1, 1, 1, NULL, 'Rakoto', 'Andry', 'andry.rakoto@example.com', '0341234567', 'Antananarivo', '1990-05-15', 'password1', 'EMP001', '2023-01-01', 1000000),
(2, 3, 1, 2, 1, 'Rajaonarison', 'Mialy', 'mialy.rajaonarison@example.com', '0349876543', 'Antsirabe', '1992-08-22', 'password2', 'EMP002', '2023-02-01', 2000000),
(3, 4, 1, 3, 1, 'Randriamamonjy', 'Hery', 'hery.randriamamonjy@example.com', '0334567890', 'Fianarantsoa', '1988-11-10', 'password3', 'EMP003', '2023-03-01', 1800000);

-- ===============================
-- Documents employés
-- ===============================
INSERT INTO documents_employe (id_employe, type_document, nom_fichier, chemin_fichier) VALUES
(1, 'CIN', 'cin_andry.pdf', '/docs/employes/1/cin.pdf'),
(2, 'Diplôme', 'diplome_mialy.pdf', '/docs/employes/2/diplome.pdf'),
(3, 'Contrat', 'contrat_hery.pdf', '/docs/employes/3/contrat.pdf');

-- ===============================
-- Solde congés
-- ===============================
INSERT INTO solde_conge (id_employe, id_type_conge, annee, solde_acquis, solde_prise)
SELECT e.id, t.id, 2025, 30, 5
FROM employer e
JOIN type_conge t ON t.nom = 'Congé annuel';

-- ===============================
-- Relevés de présence
-- ===============================
INSERT INTO releve_presence (id_employe, mois, annee, jours_travailles, heures_supp_total, retards_total, absences_non_justifiees, valide)
VALUES
(1, 11, 2025, 22, 5, 10, 1, true),
(2, 11, 2025, 20, 0, 0, 0, true),
(3, 11, 2025, 21, 2, 5, 0, true);

-- ===============================
-- Fiches de paie
-- ===============================
INSERT INTO fiche_paie (id_employe, id_releve_presence, mois, annee, salaire_brut, cnaps, ostie, irsa, total_retenues, net_a_payer)
VALUES
(1, 1, 11, 2025, 1000000, 10000, 10000, 100000, 120000, 880000),
(2, 2, 11, 2025, 2000000, 20000, 20000, 200000, 240000, 1760000),
(3, 3, 11, 2025, 1800000, 18000, 18000, 180000, 216000, 1584000);

-- ===============================
-- Primes
-- ===============================
INSERT INTO prime (id_employe, id_fiche_paie, type_prime, montant, motif, mois, annee)
VALUES
(1, 1, 'Performance', 50000, 'Projet X terminé', 11, 2025),
(2, 2, 'Ancienneté', 30000, '5 ans dans l\'entreprise', 11, 2025);

-- ===============================
-- Horaires par département
-- ===============================
INSERT INTO horaire (id_departement, heure_entree, heure_sortie) VALUES
(1, '08:00', '16:00'),
(2, '08:30', '17:00'),
(3, '09:00', '17:30'),
(4, '08:00', '16:30');

-- ===============================
-- Domaines
-- ===============================
INSERT INTO domaine (nom) VALUES
('Informatique'),
('Marketing'),
('Finance'),
('Ressources Humaines');

-- ===============================
-- Compétences
-- ===============================
INSERT INTO competence (nom) VALUES
('Java'),
('Python'),
('SQL'),
('Gestion de projet'),
('Communication');

-- ===============================
-- Langues
-- ===============================
INSERT INTO langue (nom) VALUES
('Français'),
('Anglais'),
('Malagasy');

-- ===============================
-- Projets
-- ===============================
INSERT INTO projet (nom) VALUES
('Site Web RH'),
('Application mobile Finance'),
('Campagne marketing 2025');

-- ===============================
-- Atouts
-- ===============================
INSERT INTO atout (nom) VALUES
('Travail en équipe'),
('Ponctualité'),
('Créativité');

-- ===============================
-- Diplômes
-- ===============================
INSERT INTO diplome (nom) VALUES
('Licence Informatique'),
('Master Gestion'),
('BTS Comptabilité');

-- ===============================
-- Certificats
-- ===============================
INSERT INTO certificat (nom) VALUES
('Certification Java'),
('Certification Scrum');

-- ===============================
-- Intérêts
-- ===============================
INSERT INTO interet (nom) VALUES
('Sport'),
('Musique'),
('Lecture');

-- ===============================
-- Tables de liaison l_*
-- ===============================
INSERT INTO l_competence (id_candidat, id_competence) VALUES
(1,1), (1,3), (2,4), (3,2);

INSERT INTO l_langue (id_candidat, id_langue) VALUES
(1,1), (1,2), (2,1), (3,1), (3,2);

INSERT INTO l_projet (id_candidat, id_projet) VALUES
(1,1), (2,2), (3,3);

INSERT INTO l_atout (id_candidat, id_atout) VALUES
(1,1), (2,2), (3,3);

INSERT INTO l_certificat (id_candidat, id_certificat) VALUES
(1,1), (2,2);
-- ===============================
-- Pointages (présence quotidienne)
-- ===============================
INSERT INTO pointage (id_employe, date_pointage, heure_entree, heure_sortie, pause_debut, pause_fin, heures_travaillees, heures_supplementaires, retard_minutes, statut)
VALUES
(1, '2025-11-01', '08:00', '16:00', '12:00', '13:00', 7.0, 0, 0, 'PRESENT'),
(1, '2025-11-02', '08:15', '16:00', '12:00', '13:00', 6.75, 0, 15, 'RETARD'),
(2, '2025-11-01', '08:30', '17:00', '12:30', '13:30', 7.0, 1.0, 0, 'PRESENT'),
(3, '2025-11-01', '09:00', '17:30', '12:30', '13:30', 7.0, 0, 0, 'PRESENT');

-- ===============================
-- Historique des absences
-- ===============================
INSERT INTO historique_absence (id_employe, date_absence, type_absence, justifiee, certificat_medical, commentaire)
VALUES
(1, '2025-11-05', 'Congé annuel', true, false, 'Congé prévu'),
(2, '2025-11-07', 'Congé maladie', true, true, 'Grippe'),
(3, '2025-11-03', 'Absence non justifiée', false, false, 'Raison inconnue');

-- ===============================
-- Demandes de congé
-- ===============================
INSERT INTO demande_conge (id_employe, id_type_conge, date_debut, date_fin, nombre_jours, motif, id_validateur, statut)
SELECT e.id, t.id, '2025-12-01', '2025-12-05', 5, 'Vacances de fin d''année', 1, 'EN_ATTENTE'
FROM employer e
JOIN type_conge t ON t.nom = 'Congé annuel'
WHERE e.id IN (1,2);

INSERT INTO demande_conge (id_employe, id_type_conge, date_debut, date_fin, nombre_jours, motif, id_validateur, statut)
SELECT e.id, t.id, '2025-11-15', '2025-11-17', 3, 'Maladie', 1, 'VALIDE'
FROM employer e
JOIN type_conge t ON t.nom = 'Congé maladie'
WHERE e.id = 2;

INSERT INTO demande_conge (id_employe, id_type_conge, date_debut, date_fin, nombre_jours, motif, id_validateur, statut)
SELECT e.id, t.id, '2025-11-10', '2025-11-10', 1, 'Congé exceptionnel', 1, 'REJETE'
FROM employer e
JOIN type_conge t ON t.nom = 'Congé exceptionnel'
WHERE e.id = 3;

