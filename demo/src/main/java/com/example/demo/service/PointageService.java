package com.example.demo.service;

import com.example.demo.model.Employer;
import com.example.demo.model.Pointage;
import java.time.LocalDate;
import java.time.LocalTime;

public interface PointageService {
    Pointage save(Pointage p);

    Pointage findByEmployeAndDate(Integer idEmploye, LocalDate datePointage);
    Pointage create(LocalTime debut, LocalTime fin, LocalTime pauseD, LocalTime pauseF, LocalDate jour,
            Employer emp);

    Pointage findById(Integer id);
}
