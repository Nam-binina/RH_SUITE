package com.example.demo.repository;

import com.example.demo.model.Entretien;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntretienRepository extends JpaRepository<Entretien, Integer> {
}
