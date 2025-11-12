package com.example.demo.service;

import com.example.demo.model.Profil;
import java.util.List;
import java.util.Optional;

public interface ProfilService {
    List<Profil> findAll();

    Optional<Profil> findById(Integer id);

    Profil save(Profil profil);

    void deleteById(Integer id);
}
