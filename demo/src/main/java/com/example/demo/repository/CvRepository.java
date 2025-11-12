package com.example.demo.repository;

import com.example.demo.model.Cv;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CvRepository extends JpaRepository<Cv, Integer> {
}
