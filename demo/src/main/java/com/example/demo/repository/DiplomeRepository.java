package com.example.demo.repository;

import com.example.demo.model.Diplome;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiplomeRepository extends JpaRepository<Diplome, Integer> {
}
