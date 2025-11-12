package com.example.demo.repository;

import com.example.demo.model.FichePaie;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface FichePaieRepository extends JpaRepository<FichePaie, Integer> {
    Optional<FichePaie> findByIdEmployeAndMoisAndAnnee(Integer idEmploye, Integer mois, Integer annee);
}
