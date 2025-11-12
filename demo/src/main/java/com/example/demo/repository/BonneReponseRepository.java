package com.example.demo.repository;

import com.example.demo.model.BonneReponse;
import com.example.demo.model.BonneReponseId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BonneReponseRepository extends JpaRepository<BonneReponse, BonneReponseId> {
}
