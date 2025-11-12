package com.example.demo.service.impl;

import com.example.demo.model.Candidat;
import com.example.demo.repository.CandidatRepository;
import com.example.demo.service.CandidatService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CandidatServiceImpl implements CandidatService {

    private final CandidatRepository candidatRepository;

    public CandidatServiceImpl(CandidatRepository candidatRepository) {
        this.candidatRepository = candidatRepository;
    }

    @Override
    public List<Candidat> findAll() {
        return candidatRepository.findAll();
    }

    @Override
    public Optional<Candidat> findById(Integer id) {
        return candidatRepository.findById(id);
    }

    @Override
    public Candidat save(Candidat candidat) {
        return candidatRepository.save(candidat);
    }

    @Override
    public void deleteById(Integer id) {
        candidatRepository.deleteById(id);
    }
}
