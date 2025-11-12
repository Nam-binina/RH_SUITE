package com.example.demo.repository;

import com.example.demo.model.Projet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjetRepository extends JpaRepository<Projet, Integer> {
}
