package com.example.demo.controller;

import java.time.LocalDate;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.DemandeConge;
import com.example.demo.model.Employer;
import com.example.demo.service.DemandeCongeService;

import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/demandes-conge")
public class DemandeCongeController {

    private final DemandeCongeService demandeCongeService;

    public DemandeCongeController(DemandeCongeService demandeCongeService) {
        this.demandeCongeService = demandeCongeService;
    }

    @GetMapping
    public List<DemandeConge> getDemandesConge(@RequestParam String statut) {
        return demandeCongeService.findByStatut(statut);
    }

    // Correction : id dans l'URL + action/commentaire en params
    @GetMapping("/validate/{id}")
    public ResponseEntity<DemandeConge> validate(
            @PathVariable("id") int id,
            @RequestParam String action,
            @RequestParam(required = false) String commentaire) {

        DemandeConge demande = demandeCongeService.findById(id);
        if (demande == null) {
            return ResponseEntity.notFound().build();
        }

        if ("valider".equalsIgnoreCase(action)) {
            demande = demandeCongeService.validate(demande, commentaire);
        } else if ("rejeter".equalsIgnoreCase(action)) {
            demande = demandeCongeService.reject(demande, commentaire);
        }

        return ResponseEntity.ok(demande);
    }

    @PostMapping("/create")
    public ResponseEntity<DemandeConge> createDemandesConge(
            @RequestParam String statut,
            @RequestParam int typeConge,
            @RequestParam LocalDate debut,
            @RequestParam LocalDate fin,
            @RequestParam String motif,
            HttpSession session) {

        Employer employer = (Employer) session.getAttribute("employer");
        if (employer == null) {
            return ResponseEntity.status(401).build(); 
        }

        DemandeConge demande = demandeCongeService.createConge(
                statut, typeConge, debut, fin, motif, employer);

        return ResponseEntity.ok(demande);
    }
}
