package com.example.demo.repository;

import com.example.demo.model.DocumentsEmploye;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentsEmployeRepository extends JpaRepository<DocumentsEmploye, Integer> {
}
