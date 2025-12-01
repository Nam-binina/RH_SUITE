package com.example.demo.controller;

import java.util.Map;
import java.util.Optional;

import jakarta.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Employer;
import com.example.demo.model.Entreprise;
import com.example.demo.repository.EmployerRepository;
import com.example.demo.repository.EntrepriseRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/auth")
public class AuthController {

    private final EmployerRepository employerRepository;
    private final EntrepriseRepository entrepriseRepository;

    public AuthController(EmployerRepository employerRepository, EntrepriseRepository entrepriseRepository) {
        this.employerRepository = employerRepository;
        this.entrepriseRepository = entrepriseRepository;
    }

    @PostMapping("/employer/login")
    public ResponseEntity<?> loginEmployer(@RequestBody Map<String, String> body, HttpSession session) {
        String email = body.get("email");
        String password = body.get("password");
        if (email == null || password == null) return ResponseEntity.badRequest().body("email and password are required");

        Optional<Employer> opt = employerRepository.findByEmail(email);
        if (opt.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");

        Employer e = opt.get();
        if (e.getMdp() == null || !e.getMdp().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        // store in session for controllers that expect it
        session.setAttribute("employer", e);

        // hide password before returning
        e.setMdp(null);
        return ResponseEntity.ok(e);
    }

    @PostMapping("/entreprise/login")
    public ResponseEntity<?> loginEntreprise(@RequestBody Map<String, String> body, HttpSession session) {
        String email = body.get("email");
        String password = body.get("password");
        if (email == null || password == null) return ResponseEntity.badRequest().body("email and password are required");

        Optional<Entreprise> opt = entrepriseRepository.findByEmail(email);
        if (opt.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");

        Entreprise ent = opt.get();
        if (ent.getMdp() == null || !ent.getMdp().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        session.setAttribute("entreprise", ent);
        ent.setMdp(null);
        return ResponseEntity.ok(ent);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.noContent().build();
    }
}
