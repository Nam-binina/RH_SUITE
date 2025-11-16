package com.example.demo.service;

import com.example.demo.model.FichePaie;

import java.util.List;
import java.util.Optional;

public interface FichePaieService {

    List<FichePaie> findAll();

    Optional<FichePaie> findById(Integer id);

    List<FichePaie> findByIdEmployer(Integer idEmployer);

    FichePaie save(FichePaie fichePaie);

    Optional<FichePaie> findByIdEmployeAndMoisAndAnnee(Integer idEmploye, Integer mois, Integer annee);

    void deleteById(Integer id);
}
