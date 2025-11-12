package com.example.demo.repository;

import com.example.demo.model.Poste;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PosteRepository extends JpaRepository<Poste, Integer> {
}
