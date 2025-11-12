package com.example.demo.service.impl;

import com.example.demo.model.Cv;
import com.example.demo.repository.CvRepository;
import com.example.demo.service.CvService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CvServiceImpl implements CvService {

    private final CvRepository cvRepository;

    public CvServiceImpl(CvRepository cvRepository) {
        this.cvRepository = cvRepository;
    }

    @Override
    public List<Cv> findAll() {
        return cvRepository.findAll();
    }

    @Override
    public Optional<Cv> findById(Integer id) {
        return cvRepository.findById(id);
    }

    @Override
    public Cv save(Cv cv) {
        return cvRepository.save(cv);
    }

    @Override
    public void deleteById(Integer id) {
        cvRepository.deleteById(id);
    }
}
