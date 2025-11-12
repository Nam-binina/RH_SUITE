package com.example.demo.service.impl;

import com.example.demo.model.Pointage;
import com.example.demo.repository.PointageRepository;
import com.example.demo.service.PointageService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
public class PointageServiceImpl implements PointageService {

    private final PointageRepository repo;

    public PointageServiceImpl(PointageRepository repo) {
        this.repo = repo;
    }

    @Override
    @Transactional
    public Pointage save(Pointage p) {
        return repo.save(p);
    }

    @Override
    public Pointage findByEmployeAndDate(Integer idEmploye, LocalDate datePointage) {
        return repo.findByIdEmployeAndDatePointage(idEmploye, datePointage).orElse(null);
    }
}
