package com.example.demo.service;

import com.example.demo.model.Cv;
import java.util.List;
import java.util.Optional;

public interface CvService {
    List<Cv> findAll();

    Optional<Cv> findById(Integer id);

    Cv save(Cv cv);

    void deleteById(Integer id);
}
