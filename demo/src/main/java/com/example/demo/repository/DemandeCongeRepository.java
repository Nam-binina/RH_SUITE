package com.example.demo.repository;

import com.example.demo.model.DemandeConge;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DemandeCongeRepository extends JpaRepository<DemandeConge, Integer> {
    List<DemandeConge> findByStatut(String statut);

    List<DemandeConge> findByIdEmploye(Integer idEmploye);
}
