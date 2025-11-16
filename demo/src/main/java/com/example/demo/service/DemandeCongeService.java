package com.example.demo.service;

import com.example.demo.model.DemandeConge;
import com.example.demo.model.Employer;

import java.time.LocalDate;
import java.util.List;

public interface DemandeCongeService {
    DemandeConge create(DemandeConge demande);

    DemandeConge update(DemandeConge demande);

    DemandeConge findById(Integer id);

    List<DemandeConge> findByStatut(String statut);

    DemandeConge createConge(String s, int typeConge, LocalDate debut, LocalDate fin, String motif, Employer emp);

    DemandeConge validate(DemandeConge demande);
}
