package com.example.demo.service;

import java.util.List;
import java.util.Map;

import com.example.demo.model.RelevePresence;

public interface RelevePresenceService {
    /**
     * Calcule ou récupère le relevé mensuel pour un employé
     */
    RelevePresence generateOrGetReleve(Integer idEmploye, int mois, int annee);

    /**
     * Récupère les relevés d'une période
     */
    List<RelevePresence> getRelevesPeriod(Integer idEmploye, Integer mois, Integer annee, Integer nbMois);

    /**
     * Valide un relevé (verrouille pour la paie)
     */
    RelevePresence validerReleve(Integer idReleve);

    /**
     * Génère un PDF du relevé
     */
    Map<String, String> generatePdf(Integer idEmploye, Integer mois, Integer annee) throws Exception;

    /**
     * Génère un PDF du relevé et renvoie les bytes
     */
    byte[] generatePdfBytes(Integer idEmploye, Integer mois, Integer annee) throws Exception;

    /**
     * Récupère les informations de paie depuis un relevé
     */
    Map<String, Object> getInfosPaieFromReleve(Integer idReleve);

    /**
     * Recalcule un relevé basé sur les pointages actuels
     */
    RelevePresence recalculateReleve(Integer idEmploye, Integer mois, Integer annee);

    /**
     * Obtient un résumé des absences
     */
    Map<String, Object> getAbsencesResume(Integer idEmploye, Integer mois, Integer annee);

    /**
     * Récupère le détail des heures
     */
    Map<String, Object> getDetailHeures(Integer idReleve);
}
