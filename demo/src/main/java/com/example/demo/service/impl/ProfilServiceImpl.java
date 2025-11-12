package com.example.demo.service.impl;

import com.example.demo.model.Profil;
import com.example.demo.repository.ProfilRepository;
import com.example.demo.service.ProfilService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProfilServiceImpl implements ProfilService {

    private final ProfilRepository profilRepository;

    public ProfilServiceImpl(ProfilRepository profilRepository) {
        this.profilRepository = profilRepository;
    }

    @Override
    public List<Profil> findAll() {
        return profilRepository.findAll();
    }

    @Override
    public Optional<Profil> findById(Integer id) {
        return profilRepository.findById(id);
    }

    @Override
    public Profil save(Profil profil) {
        return profilRepository.save(profil);
    }

    @Override
    public void deleteById(Integer id) {
        profilRepository.deleteById(id);
    }
}
