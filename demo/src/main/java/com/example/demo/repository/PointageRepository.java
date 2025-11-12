package com.example.demo.repository;

import com.example.demo.model.Pointage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.Optional;
import java.util.List;

public interface PointageRepository extends JpaRepository<Pointage, Integer> {
    Optional<Pointage> findByIdEmployeAndDatePointage(Integer idEmploye, LocalDate datePointage);

    List<Pointage> findByIdEmployeAndDatePointageBetween(Integer idEmploye, LocalDate start, LocalDate end);
}
