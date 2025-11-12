package com.example.demo.service;

import com.example.demo.model.DemandeConge;
import java.util.List;

public interface DemandeCongeService {
    DemandeConge create(DemandeConge demande);

    DemandeConge update(DemandeConge demande);

    DemandeConge findById(Integer id);

    List<DemandeConge> findByStatut(String statut);
}
