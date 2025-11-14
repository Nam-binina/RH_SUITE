package com.example.demo.service;

import com.example.demo.model.HistoriqueAbsence;

import java.time.LocalDate;
import java.util.List;

public interface HistoriqueAbsenceService {
    List<HistoriqueAbsence> getAbsencesByEmployerAndMonth(Integer idEmploye, LocalDate date);
}