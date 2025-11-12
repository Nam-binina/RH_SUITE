package com.example.demo.service.impl;

import com.example.demo.model.DemandeConge;
import com.example.demo.repository.DemandeCongeRepository;
import com.example.demo.service.DemandeCongeService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DemandeCongeServiceImpl implements DemandeCongeService {

    private final DemandeCongeRepository demandeRepo;

    public DemandeCongeServiceImpl(DemandeCongeRepository demandeRepo) {
        this.demandeRepo = demandeRepo;
    }

    @Override
    @Transactional
    public DemandeConge create(DemandeConge demande) {
        return demandeRepo.save(demande);
    }

    @Override
    @Transactional
    public DemandeConge update(DemandeConge demande) {
        return demandeRepo.save(demande);
    }

    @Override
    public DemandeConge findById(Integer id) {
        return demandeRepo.findById(id).orElse(null);
    }

    @Override
    public List<DemandeConge> findByStatut(String statut) {
        return demandeRepo.findByStatut(statut);
    }
}
