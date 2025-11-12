package com.example.demo.service;

import com.example.demo.model.Pointage;
import java.time.LocalDate;

public interface PointageService {
    Pointage save(Pointage p);

    Pointage findByEmployeAndDate(Integer idEmploye, LocalDate datePointage);
}
