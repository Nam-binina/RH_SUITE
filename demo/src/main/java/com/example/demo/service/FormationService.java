package com.example.demo.service;

import com.example.demo.model.Formation;
import java.util.List;
import java.util.Optional;

public interface FormationService {
    List<Formation> findAll();

    Optional<Formation> findById(Integer id);

    Formation save(Formation formation);

    void deleteById(Integer id);
}
