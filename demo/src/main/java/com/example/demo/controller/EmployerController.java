package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Employer;
import com.example.demo.service.EmployerService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/employers")
public class EmployerController {

    private final EmployerService employerService;

    public EmployerController(EmployerService employerService) {
        this.employerService = employerService;
    }

    // Récupérer tous les employers
    @GetMapping
    public List<Employer> getAllEmployers() {
        return employerService.getEmployers();
    }

    // Récupérer un employer par ID
    @GetMapping("/{id}")
    public ResponseEntity<Employer> getEmployerById(@PathVariable Integer id) {
        return employerService.getEmployerById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
