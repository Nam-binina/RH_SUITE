package com.example.demo.controller;

import com.example.demo.model.DemandeConge;
import com.example.demo.service.DemandeCongeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
}