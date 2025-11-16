package com.example.demo.service.impl;

import com.example.demo.model.Employer;
import com.example.demo.model.Horaire;
import com.example.demo.model.Pointage;
import com.example.demo.repository.HoraireRepository;
import com.example.demo.repository.PointageRepository;
import com.example.demo.service.PointageService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;

@Service
public class PointageServiceImpl implements PointageService {

    private final PointageRepository repo;
    private final HoraireRepository horaireRepository;

    public PointageServiceImpl(PointageRepository repo,HoraireRepository h) {
        this.repo = repo;
        this.horaireRepository = h;
    }

    @Override
    @Transactional
    public Pointage save(Pointage p) {
        return repo.save(p);
    }

    @Override
    @Transactional
    public Pointage create(LocalTime debut, LocalTime fin, LocalTime pauseD, LocalTime pauseF, LocalDate jour,
            Employer emp) {
        Pointage existingPointage = null;
        try {
            Horaire h = horaireRepository.findByDepartementId(emp.getIdDepartement());
            existingPointage = new Pointage().create(debut, fin, pauseD, pauseF, jour, emp,h);
        } catch (Exception e) {
            throw e;
        }
        return repo.save(existingPointage);
    }
    @Override
    public Pointage findByEmployeAndDate(Integer idEmploye, LocalDate datePointage) {
        return repo.findByIdEmployeAndDatePointage(idEmploye, datePointage).orElse(null);
    }
    @Override
    public Pointage findById(Integer id) {
        return repo.findById(id).orElse(null);
    }
}
