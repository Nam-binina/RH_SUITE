package com.example.demo.service;

import com.example.demo.model.Employer;

import java.util.List;
import java.util.Optional;

public interface EmployerService {
    List<Employer> getEmployers();
    Optional<Employer> getEmployerById(Integer id);
}