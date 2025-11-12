package com.example.demo.service.impl;

import com.example.demo.model.Entreprise;
import com.example.demo.repository.EntrepriseRepository;
import com.example.demo.service.EntrepriseService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EntrepriseServiceImpl implements EntrepriseService {

    private final EntrepriseRepository entrepriseRepository;

    public EntrepriseServiceImpl(EntrepriseRepository entrepriseRepository) {
        this.entrepriseRepository = entrepriseRepository;
    }

    @Override
    public List<Entreprise> findAll() {
        return entrepriseRepository.findAll();
    }

    @Override
    public Optional<Entreprise> findById(Integer id) {
        return entrepriseRepository.findById(id);
    }

    @Override
    public Entreprise save(Entreprise entreprise) {
        return entrepriseRepository.save(entreprise);
    }

    @Override
    public void deleteById(Integer id) {
        entrepriseRepository.deleteById(id);
    }
}
