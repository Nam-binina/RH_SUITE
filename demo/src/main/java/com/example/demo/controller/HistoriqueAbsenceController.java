package com.example.demo.controller;

import com.example.demo.model.HistoriqueAbsence;
import com.example.demo.service.HistoriqueAbsenceService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/absences")
public class HistoriqueAbsenceController {
    private final HistoriqueAbsenceService historiqueAbsenceService;

    public HistoriqueAbsenceController(HistoriqueAbsenceService historiqueAbsenceService) {
        this.historiqueAbsenceService = historiqueAbsenceService;
    }

    @GetMapping
    public List<HistoriqueAbsence> getAbsences(
            @RequestParam Integer idEmploye,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return historiqueAbsenceService.getAbsencesByEmployerAndMonth(idEmploye, date);
    }
}