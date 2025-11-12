package com.example.demo.service;

import com.example.demo.model.Entreprise;
import java.util.List;
import java.util.Optional;

public interface EntrepriseService {
    List<Entreprise> findAll();

    Optional<Entreprise> findById(Integer id);

    Entreprise save(Entreprise entreprise);

    void deleteById(Integer id);
}
