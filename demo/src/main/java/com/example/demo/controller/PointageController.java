package com.example.demo.controller;

import jakarta.servlet.http.HttpSession;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity; // <-- Ajouté
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping; // <-- Ajouté

import com.example.demo.model.Pointage;
import com.example.demo.model.Employer;
import com.example.demo.service.PointageService;




/**
 * Contrôleur pour la gestion du pointage des employés
 * Gère l'enregistrement des heures de travail, calcul des heures supplémentaires,
 * retards et pauses
 */
@RestController
@RequestMapping("/pointages")
public class PointageController {

    private final PointageService pointageService;

    public PointageController(PointageService pointageService) {
        this.pointageService = pointageService;
    }
    @PostMapping("/create")
    public Pointage createPointage(@RequestParam LocalTime debut, @RequestParam LocalTime sortie,LocalTime pauseD,
            LocalTime pauseF,LocalDate jour,HttpSession session) {
        Employer e = (Employer) session.getAttribute("employer");
        //Employer e = emp.getEmployerById(1).get();
        // returnPointageService.save(p);
        return pointageService.create(debut, sortie, pauseD, pauseF, jour, e);
    }
    /**
     * Enregistre un nouveau pointage avec calcul automatique des heures travaillées,
     * heures supplémentaires et retards
     *
     * @param pointage Données du pointage (idEmploye, datePointage, heureEntree, heureSortie, pauseDebut, pauseFin)
     * @return Le pointage enregistré avec les calculs
     */
    @PostMapping
    public ResponseEntity<Pointage> createPointage(@RequestBody Pointage pointage) {
        try {
            Pointage savedPointage = pointageService.saveWithCalculations(pointage);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPointage);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Récupère le pointage d'un employé pour une date donnée
     *
     * @param idEmploye Identifiant de l'employé
     * @param date      Date du pointage (format: YYYY-MM-DD)
     * @return Le pointage trouvé ou NOT_FOUND
     */
    @GetMapping("/employe/{idEmploye}/date/{date}")
    public ResponseEntity<Pointage> getPointageByEmployeAndDate(
            @PathVariable Integer idEmploye,
            @PathVariable String date) {
        LocalDate datePointage = LocalDate.parse(date);
        Pointage pointage = pointageService.findByEmployeAndDate(idEmploye, datePointage);
        
        if (pointage != null) {
            return ResponseEntity.ok(pointage);
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Récupère les pointages d'un employé pour une période donnée
     *
     * @param idEmploye Identifiant de l'employé
     * @param dateDebut Date de début de la période (format: YYYY-MM-DD)
     * @param dateFin   Date de fin de la période (format: YYYY-MM-DD)
     * @return Liste des pointages pour la période
     */
    @GetMapping("/employe/{idEmploye}/periode")
    public ResponseEntity<List<Pointage>> getPointagesByEmployeAndPeriod(
            @PathVariable Integer idEmploye,
            @RequestParam String dateDebut,
            @RequestParam String dateFin) {
        LocalDate start = LocalDate.parse(dateDebut);
        LocalDate end = LocalDate.parse(dateFin);
        
        List<Pointage> pointages = pointageService.findByEmployeAndDateRange(idEmploye, start, end);
        return ResponseEntity.ok(pointages);
    }

    /**
     * Récupère les pointages d'un employé pour un mois donné
     *
     * @param idEmploye Identifiant de l'employé
     * @param mois      Mois (1-12)
     * @param annee     Année
     * @return Liste des pointages pour le mois
     */
    @GetMapping("/employe/{idEmploye}/mois")
    public ResponseEntity<List<Pointage>> getPointagesByEmployeAndMonth(
            @PathVariable Integer idEmploye,
            @RequestParam Integer mois,
            @RequestParam Integer annee) {
        List<Pointage> pointages = pointageService.findByEmployeAndMonth(idEmploye, mois, annee);
        return ResponseEntity.ok(pointages);
    }

    /**
     * Met à jour un pointage existant avec recalcul des valeurs
     *
     * @param id       Identifiant du pointage
     * @param pointage Données mises à jour
     * @return Le pointage mis à jour
     */
    @PutMapping("/{id}")
    public ResponseEntity<Pointage> updatePointage(
            @PathVariable Integer id,
            @RequestBody Pointage pointage) {
        try {
            pointage.setId(id);
            Pointage updatedPointage = pointageService.updateWithCalculations(pointage);
            return ResponseEntity.ok(updatedPointage);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Supprime un pointage
     *
     * @param id Identifiant du pointage
     * @return Pas de contenu si succès
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePointage(@PathVariable Integer id) {
        pointageService.delete(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Obtient les statistiques mensuelles pour un employé
     *
     * @param idEmploye Identifiant de l'employé
     * @param mois      Mois (1-12)
     * @param annee     Année
     * @return Objet contenant les statistiques (heures travaillées, heures supp, retards)
     */
    @GetMapping("/employe/{idEmploye}/statistiques")
    public ResponseEntity<Map<String, Object>> getStatistiquesPointage(
            @PathVariable Integer idEmploye,
            @RequestParam Integer mois,
            @RequestParam Integer annee) {
        Map<String, Object> stats = pointageService.getStatistiquesPointage(idEmploye, mois, annee);
        return ResponseEntity.ok(stats);
    }

    /**
     * Vérifie les retards d'un employé pour une période
     *
     * @param idEmploye Identifiant de l'employé
     * @param dateDebut Date de début (format: YYYY-MM-DD)
     * @param dateFin   Date de fin (format: YYYY-MM-DD)
     * @return List de retards trouvés
     */
    @GetMapping("/employe/{idEmploye}/retards")
    public ResponseEntity<List<Map<String, Object>>> getRetards(
            @PathVariable Integer idEmploye,
            @RequestParam String dateDebut,
            @RequestParam String dateFin) {
        LocalDate start = LocalDate.parse(dateDebut);
        LocalDate end = LocalDate.parse(dateFin);
        
        List<Map<String, Object>> retards = pointageService.getRetardsPeriode(idEmploye, start, end);
        return ResponseEntity.ok(retards);
    }

    /**
     * Récupère les heures supplémentaires d'un employé
     *
     * @param idEmploye Identifiant de l'employé
     * @param mois      Mois (1-12)
     * @param annee     Année
     * @return Nombre total d'heures supplémentaires
     */
    @GetMapping("/employe/{idEmploye}/heures-supp")
    public ResponseEntity<Map<String, Object>> getHeuresSupplementaires(
            @PathVariable Integer idEmploye,
            @RequestParam Integer mois,
            @RequestParam Integer annee) {
        Map<String, Object> result = pointageService.getTotalHeuresSupplementaires(idEmploye, mois, annee);
        return ResponseEntity.ok(result);
    }

}
