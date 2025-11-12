package com.example.demo.service.impl;

import com.example.demo.model.Formation;
import com.example.demo.repository.FormationRepository;
import com.example.demo.service.FormationService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class FormationServiceImpl implements FormationService {

    private final FormationRepository formationRepository;

    public FormationServiceImpl(FormationRepository formationRepository) {
        this.formationRepository = formationRepository;
    }

    @Override
    public List<Formation> findAll() {
        return formationRepository.findAll();
    }

    @Override
    public Optional<Formation> findById(Integer id) {
        return formationRepository.findById(id);
    }

    @Override
    public Formation save(Formation formation) {
        return formationRepository.save(formation);
    }

    @Override
    public void deleteById(Integer id) {
        formationRepository.deleteById(id);
    }
}
