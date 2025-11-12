package com.example.demo.repository;

import com.example.demo.model.HistoriqueAbsence;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface HistoriqueAbsenceRepository extends JpaRepository<HistoriqueAbsence, Integer> {
    List<HistoriqueAbsence> findByIdEmployeAndDateAbsenceBetween(Integer idEmploye, LocalDate start, LocalDate end);

    List<HistoriqueAbsence> findByIdEmploye(Integer idEmploye);
}
