package com.example.demo.service.impl;

import com.example.demo.model.Employer;
import com.example.demo.repository.EmployerRepository;
import com.example.demo.service.EmployerService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployerServiceImpl implements EmployerService {

    private final EmployerRepository employerRepository;

    public EmployerServiceImpl(EmployerRepository employerRepository) {
        this.employerRepository = employerRepository;
    }

    @Override
    public List<Employer> getEmployers() {
        return employerRepository.findAll();
    }

    @Override
    public Optional<Employer> getEmployerById(Integer id) {
        return employerRepository.findById(id);
    }
}