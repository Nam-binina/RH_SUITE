package com.example.demo.service.impl;

import com.example.demo.model.HistoriqueAbsence;
import com.example.demo.repository.HistoriqueAbsenceRepository;
import com.example.demo.service.HistoriqueAbsenceService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@Service
public class HistoriqueAbsenceServiceImpl implements HistoriqueAbsenceService {

    private final HistoriqueAbsenceRepository historiqueAbsenceRepository;

    public HistoriqueAbsenceServiceImpl(HistoriqueAbsenceRepository historiqueAbsenceRepository) {
        this.historiqueAbsenceRepository = historiqueAbsenceRepository;
    }

    @Override
    public List<HistoriqueAbsence> getAbsencesByEmployerAndMonth(Integer idEmploye, LocalDate date) {
        YearMonth yearMonth = YearMonth.from(date);
        LocalDate startOfMonth = yearMonth.atDay(1);
        LocalDate endOfMonth = yearMonth.atEndOfMonth();
        return historiqueAbsenceRepository.findByIdEmployeAndDateAbsenceBetween(idEmploye, startOfMonth, endOfMonth);
    }
}