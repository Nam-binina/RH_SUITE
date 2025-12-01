package com.example.demo.service;

import com.example.demo.model.Prime;

import java.util.List;
import java.util.Optional;

public interface PrimeService {
    Prime save(Prime prime);
    Optional<Prime> findById(Integer id);
    List<Prime> findByEmployeAndPeriod(Integer idEmploye, Integer mois, Integer annee);
    void deleteById(Integer id);
}
