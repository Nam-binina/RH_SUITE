package com.example.demo.repository;

import com.example.demo.model.Certificat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CertificatRepository extends JpaRepository<Certificat, Integer> {
}
