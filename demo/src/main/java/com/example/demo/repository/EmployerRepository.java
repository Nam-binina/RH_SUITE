package com.example.demo.repository;

import com.example.demo.model.Employer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface EmployerRepository extends JpaRepository<Employer, Integer> {
	Optional<Employer> findByEmail(String email);
}
