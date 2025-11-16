package com.example.demo.repository;

import com.example.demo.model.Horaire;
import com.example.demo.model.Departement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HoraireRepository extends JpaRepository<Horaire, Integer> {
    Horaire findByDepartementId(Integer idDepartement);
}
