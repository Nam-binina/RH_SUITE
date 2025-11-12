package com.example.demo.repository;

import com.example.demo.model.Langue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LangueRepository extends JpaRepository<Langue, Integer> {
}
