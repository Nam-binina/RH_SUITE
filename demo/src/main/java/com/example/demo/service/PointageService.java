package com.example.demo.service;

import com.example.demo.model.Employer;
import com.example.demo.model.Pointage;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import com.example.demo.model.Pointage;

public interface PointageService {
    /**
     * Sauvegarde un pointage sans calcul
     */
    Pointage save(Pointage p);

    /**
     * Sauvegarde un pointage avec calcul des heures travaillées, heures sup, retards
     */
    Pointage saveWithCalculations(Pointage p);

    /**
     * Met à jour un pointage existant avec recalcul
     */
    Pointage updateWithCalculations(Pointage p);

    /**
     * Récupère un pointage pour un employé à une date donnée
     */
    Pointage findByEmployeAndDate(Integer idEmploye, LocalDate datePointage);
    Pointage create(LocalTime debut, LocalTime fin, LocalTime pauseD, LocalTime pauseF, LocalDate jour,
            Employer emp);

    Pointage findById(Integer id);

    /**
     * Récupère les pointages d'un employé pour une période
     */
    List<Pointage> findByEmployeAndDateRange(Integer idEmploye, LocalDate dateDebut, LocalDate dateFin);

    /**
     * Récupère les pointages d'un employé pour un mois donné
     */
    List<Pointage> findByEmployeAndMonth(Integer idEmploye, Integer mois, Integer annee);

    /**
     * Supprime un pointage
     */
    void delete(Integer idPointage);

    /**
     * Obtient les statistiques mensuelles pour un employé
     */
    Map<String, Object> getStatistiquesPointage(Integer idEmploye, Integer mois, Integer annee);

    /**
     * Récupère les retards d'une période pour un employé
     */
    List<Map<String, Object>> getRetardsPeriode(Integer idEmploye, LocalDate dateDebut, LocalDate dateFin);

    /**
     * Obtient les heures supplémentaires totales pour un mois
     */
    Map<String, Object> getTotalHeuresSupplementaires(Integer idEmploye, Integer mois, Integer annee);
}
