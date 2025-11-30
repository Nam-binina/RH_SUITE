package com.example.demo.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.HistoriqueAbsence;
import com.example.demo.service.HistoriqueAbsenceService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/absences")
public class HistoriqueAbsenceController {

    private final HistoriqueAbsenceService historiqueAbsenceService;

    public HistoriqueAbsenceController(HistoriqueAbsenceService historiqueAbsenceService) {
        this.historiqueAbsenceService = historiqueAbsenceService;
    }

    // Récupérer les absences d'un employé pour un mois donné
    @GetMapping
    public ResponseEntity<List<HistoriqueAbsence>> getAbsences(
            @RequestParam Integer idEmploye,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        List<HistoriqueAbsence> absences = historiqueAbsenceService.getAbsencesByEmployerAndMonth(idEmploye, date);
        if (absences.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(absences);
    }
}
