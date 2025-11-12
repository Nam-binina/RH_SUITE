package com.example.demo.repository;

import com.example.demo.model.RelevePresence;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RelevePresenceRepository extends JpaRepository<RelevePresence, Integer> {
    Optional<RelevePresence> findByIdEmployeAndMoisAndAnnee(Integer idEmploye, Integer mois, Integer annee);
}
