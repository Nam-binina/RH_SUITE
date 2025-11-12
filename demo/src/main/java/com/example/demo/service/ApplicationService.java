package com.example.demo.service;

import com.example.demo.model.Application;
import java.util.List;
import java.util.Optional;

public interface ApplicationService {
    List<Application> findAll();

    Optional<Application> findById(Integer id);

    Application save(Application application);

    void deleteById(Integer id);
}
