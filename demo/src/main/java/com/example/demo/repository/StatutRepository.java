package com.example.demo.repository;

import com.example.demo.model.Statut;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatutRepository extends JpaRepository<Statut, Integer> {
    Statut findByNom(String Nom);
}
