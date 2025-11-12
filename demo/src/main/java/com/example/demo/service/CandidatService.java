package com.example.demo.service;

import com.example.demo.model.Candidat;
import java.util.List;
import java.util.Optional;

public interface CandidatService {
    List<Candidat> findAll();

    Optional<Candidat> findById(Integer id);

    Candidat save(Candidat candidat);

    void deleteById(Integer id);
}
