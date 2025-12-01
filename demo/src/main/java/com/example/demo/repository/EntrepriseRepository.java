package com.example.demo.repository;

import com.example.demo.model.Entreprise;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface EntrepriseRepository extends JpaRepository<Entreprise, Integer> {
	Optional<Entreprise> findByEmail(String email);
}
