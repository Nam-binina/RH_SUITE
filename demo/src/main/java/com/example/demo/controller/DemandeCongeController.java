package com.example.demo.controller;

import com.example.demo.model.DemandeConge;
import com.example.demo.service.DemandeCongeService;
import com.example.demo.model.Employer;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;

import java.time.LocalDate;
import java.util.List;


@RestController
@RequestMapping("/demandes-conge")
public class DemandeCongeController {
    private final DemandeCongeService demandeCongeService;

    public DemandeCongeController(DemandeCongeService demandeCongeService) {
        this.demandeCongeService = demandeCongeService;
    }

    @GetMapping
    public List<DemandeConge> getDemandesConge(@RequestParam String statut) {
        return demandeCongeService.findByStatut(statut);
    }
    
    @GetMapping("/validate")
    public DemandeConge validate(@RequestParam int demande) {
        DemandeConge d = demandeCongeService.findById(demande);
        if (d != null) {
            return demandeCongeService.validate(d);
        }
        return null;
    }
    
    @PostMapping("/create")
    public DemandeConge createDemandesConge(@RequestParam String statut, @RequestParam int typeConge,
        @RequestParam LocalDate debut, @RequestParam LocalDate fin, @RequestParam String motif,HttpSession session) {
        Employer e = (Employer) session.getAttribute("employer");
        return demandeCongeService.createConge(statut, typeConge, debut, fin, motif, e);
    }
}