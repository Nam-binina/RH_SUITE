package com.example.demo.service.impl;

import com.example.demo.model.FichePaie;
import com.example.demo.repository.FichePaieRepository;
import com.example.demo.service.FichePaieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class FichePaieServiceImpl implements FichePaieService {

    private final FichePaieRepository fichePaieRepository;

    @Autowired
    public FichePaieServiceImpl(FichePaieRepository fichePaieRepository) {
        this.fichePaieRepository = fichePaieRepository;
    }

    @Override
    public List<FichePaie> findAll() {
        return fichePaieRepository.findAll();
    }

    @Override
    public Optional<FichePaie> findById(Integer id) {
        return fichePaieRepository.findById(id);
    }

    @Override
    public Optional<FichePaie> findByIdEmployeAndMoisAndAnnee(Integer idEmploye, Integer mois, Integer annee) {
        return fichePaieRepository.findByIdEmployeAndMoisAndAnnee(idEmploye, mois, annee);
    }

    @Override
    public List<FichePaie> findByIdEmployer(Integer idEmployer) {
        return fichePaieRepository.findByIdEmploye(idEmployer);
    }

    @Override
    public FichePaie save(FichePaie fichePaie) {
        return fichePaieRepository.save(fichePaie);
    }

    @Override
    public void deleteById(Integer id) {
        fichePaieRepository.deleteById(id);
    }
}
