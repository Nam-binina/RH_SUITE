package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Prime;
import com.example.demo.service.PrimeService;

import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/primes")
public class PrimeController {

    private final PrimeService primeService;

    public PrimeController(PrimeService primeService) {
        this.primeService = primeService;
    }

    @GetMapping("/employe/{idEmploye}")
    public ResponseEntity<List<Prime>> listByEmploye(
            @PathVariable Integer idEmploye,
            @RequestParam(required = false) Integer mois,
            @RequestParam(required = false) Integer annee) {
        List<Prime> primes = primeService.findByEmployeAndPeriod(idEmploye, mois, annee);
        return ResponseEntity.ok(primes);
    }

    @PostMapping("/create")
    public ResponseEntity<Prime> createPrime(@RequestBody Prime p, HttpSession session) {
        // Optionally enforce session-based employer id
        if (p.getIdEmploye() == null) {
            Object emp = session.getAttribute("employer");
            if (emp instanceof com.example.demo.model.Employer) {
                p.setIdEmploye(((com.example.demo.model.Employer) emp).getId());
            }
        }
        Prime saved = primeService.save(p);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrime(@PathVariable Integer id) {
        primeService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
