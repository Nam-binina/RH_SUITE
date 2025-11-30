package com.example.demo.controller;

import com.example.demo.model.Candidat;
import com.example.demo.service.CandidatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/candidats")
@CrossOrigin(origins = "http://localhost:3000") // à adapter selon ton front
public class CandidatController {

    private final CandidatService candidatService;

    public CandidatController(CandidatService candidatService) {
        this.candidatService = candidatService;
    }

    // Récupérer tous les candidats
    @GetMapping
    public ResponseEntity<List<Candidat>> getAll() {
        List<Candidat> candidats = candidatService.findAll();
        return ResponseEntity.ok(candidats);
    }

    // Récupérer un candidat par ID
    @GetMapping("/{id}")
    public ResponseEntity<Candidat> getById(@PathVariable Integer id) {
        Optional<Candidat> candidat = candidatService.findById(id);
        return candidat.map(ResponseEntity::ok)
                       .orElse(ResponseEntity.notFound().build());
    }

    // Créer un nouveau candidat
    @PostMapping
    public ResponseEntity<Candidat> create(@RequestBody Candidat candidat) {
        Candidat saved = candidatService.save(candidat);
        return ResponseEntity.ok(saved);
    }

    // Mettre à jour un candidat existant
    @PutMapping("/{id}")
    public ResponseEntity<Candidat> update(@PathVariable Integer id, @RequestBody Candidat candidat) {
        Optional<Candidat> existing = candidatService.findById(id);
        if (existing.isPresent()) {
            candidat.setId(id);
            Candidat updated = candidatService.save(candidat);
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Supprimer un candidat
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        Optional<Candidat> existing = candidatService.findById(id);
        if (existing.isPresent()) {
            candidatService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
