package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.PointageService;
import com.example.demo.service.RelevePresenceService;
import com.example.demo.service.FichePaieService;
import com.example.demo.service.EmployerService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/performance")
public class PerformanceController {

    private final PointageService pointageService;
    private final RelevePresenceService relevePresenceService;
    private final FichePaieService fichePaieService;
    private final EmployerService employerService;

    public PerformanceController(PointageService pointageService,
                                 RelevePresenceService relevePresenceService,
                                 FichePaieService fichePaieService,
                                 EmployerService employerService) {
        this.pointageService = pointageService;
        this.relevePresenceService = relevePresenceService;
        this.fichePaieService = fichePaieService;
        this.employerService = employerService;
    }

    @GetMapping("/employe/{idEmploye}")
    public ResponseEntity<Map<String, Object>> getPerformance(
            @PathVariable Integer idEmploye,
            @RequestParam(required = false) Integer mois,
            @RequestParam(required = false) Integer annee) {

        Map<String, Object> result = new HashMap<>();

        // employer basic info
        var empOpt = employerService.getEmployerById(idEmploye);
        if (empOpt.isEmpty()) return ResponseEntity.notFound().build();
        result.put("employe", empOpt.get());

        try {
            // pointage statistics (may return empty map if service returns nothing)
            var stats = pointageService.getStatistiquesPointage(idEmploye, mois == null ? 0 : mois, annee == null ? 0 : annee);
            result.put("pointageStatistics", stats);
        } catch (Exception e) {
            result.put("pointageStatistics", Map.of());
        }

        try {
            // heures supplementaires
            var hs = pointageService.getTotalHeuresSupplementaires(idEmploye, mois == null ? 0 : mois, annee == null ? 0 : annee);
            result.put("heuresSupplementaires", hs);
        } catch (Exception e) {
            result.put("heuresSupplementaires", Map.of());
        }

        try {
            // absences resume
            if (mois != null && annee != null) {
                var abs = relevePresenceService.getAbsencesResume(idEmploye, mois, annee);
                result.put("absencesResume", abs);
            }
        } catch (Exception e) {
            result.put("absencesResume", Map.of());
        }

        try {
            // fiche de paie if exists
            if (mois != null && annee != null) {
                var ficheOpt = fichePaieService.findByIdEmployeAndMoisAndAnnee(idEmploye, mois, annee);
                ficheOpt.ifPresent(f -> result.put("fichePaie", f));
            }
        } catch (Exception e) {
            // ignore
        }

        return ResponseEntity.ok(result);
    }
}
