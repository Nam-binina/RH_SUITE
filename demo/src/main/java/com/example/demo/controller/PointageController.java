package com.example.demo.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Pointage;
import com.example.demo.model.Employer;
import com.example.demo.service.PointageService;

import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/pointages")
public class PointageController {

    private final PointageService pointageService;

    public PointageController(PointageService pointageService) {
        this.pointageService = pointageService;
    }

    // Créer un pointage avec heures et pauses
    @PostMapping("/create")
    public ResponseEntity<Pointage> createPointage(
            @RequestParam LocalTime debut,
            @RequestParam LocalTime sortie,
            @RequestParam(required = false) LocalTime pauseD,
            @RequestParam(required = false) LocalTime pauseF,
            @RequestParam LocalDate jour,
            HttpSession session) {

        Employer e = (Employer) session.getAttribute("employer");
        if (e == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        Pointage p = pointageService.create(debut, sortie, pauseD, pauseF, jour, e);
        return ResponseEntity.status(HttpStatus.CREATED).body(p);
    }

    // Créer un pointage avec calcul automatique
    @PostMapping
    public ResponseEntity<Pointage> createPointage(@RequestBody Pointage pointage) {
        try {
            Pointage saved = pointageService.saveWithCalculations(pointage);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Récupérer pointage d'un employé pour une date
    @GetMapping("/employe/{idEmploye}/date/{date}")
    public ResponseEntity<Pointage> getPointageByEmployeAndDate(
            @PathVariable Integer idEmploye,
            @PathVariable String date) {

        LocalDate d = LocalDate.parse(date);
        Pointage p = pointageService.findByEmployeAndDate(idEmploye, d);
        return (p != null) ? ResponseEntity.ok(p) : ResponseEntity.notFound().build();
    }

    // Récupérer pointages d'un employé pour une période
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

    // Récupérer pointages d'un employé pour un mois
    @GetMapping("/employe/{idEmploye}/mois")
    public ResponseEntity<List<Pointage>> getPointagesByEmployeAndMonth(
            @PathVariable Integer idEmploye,
            @RequestParam Integer mois,
            @RequestParam Integer annee) {

        List<Pointage> pointages = pointageService.findByEmployeAndMonth(idEmploye, mois, annee);
        return ResponseEntity.ok(pointages);
    }

    // Mettre à jour un pointage
    @PutMapping("/{id}")
    public ResponseEntity<Pointage> updatePointage(
            @PathVariable Integer id,
            @RequestBody Pointage pointage) {

        try {
            pointage.setId(id);
            Pointage updated = pointageService.updateWithCalculations(pointage);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Supprimer un pointage
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePointage(@PathVariable Integer id) {
        pointageService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Statistiques mensuelles d'un employé
    @GetMapping("/employe/{idEmploye}/statistiques")
    public ResponseEntity<Map<String, Object>> getStatistiquesPointage(
            @PathVariable Integer idEmploye,
            @RequestParam Integer mois,
            @RequestParam Integer annee) {

        Map<String, Object> stats = pointageService.getStatistiquesPointage(idEmploye, mois, annee);
        return ResponseEntity.ok(stats);
    }

    // Retards d'un employé pour une période
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

    // Heures supplémentaires d'un employé pour un mois
    @GetMapping("/employe/{idEmploye}/heures-supp")
    public ResponseEntity<Map<String, Object>> getHeuresSupplementaires(
            @PathVariable Integer idEmploye,
            @RequestParam Integer mois,
            @RequestParam Integer annee) {

        Map<String, Object> result = pointageService.getTotalHeuresSupplementaires(idEmploye, mois, annee);
        return ResponseEntity.ok(result);
    }
}
