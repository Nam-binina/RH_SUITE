package com.example.demo.service.impl;

import com.example.demo.model.Employer;
import com.example.demo.repository.EmployerRepository;
import com.example.demo.service.ConfigService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ConfigServiceImpl implements ConfigService {

    private final EmployerRepository employerRepository;

    public ConfigServiceImpl(EmployerRepository employerRepository) {
        this.employerRepository = employerRepository;
    }

    @Override
    @Transactional
    public int updateTaux(String type, BigDecimal taux) {
        if (type == null || taux == null) {
            throw new IllegalArgumentException("type and taux must not be null");
        }

        String key = type.trim().toLowerCase();
        if (!key.equals("cnaps") && !key.equals("ostie") && !key.equals("irsa")) {
            throw new IllegalArgumentException("Type invalide: " + type);
        }

        if (taux.compareTo(BigDecimal.ZERO) < 0 || taux.compareTo(BigDecimal.ONE) > 0) {
            throw new IllegalArgumentException("Taux hors borne attendue [0,1]");
        }

        List<Employer> all = employerRepository.findAll();
        for (Employer e : all) {
            switch (key) {
                case "cnaps":
                    e.setTauxCnaps(taux);
                    break;
                case "ostie":
                    e.setTauxOstie(taux);
                    break;
                case "irsa":
                    e.setTauxIrsa(taux);
                    break;
                default:
                    // impossible
            }
        }
        List<Employer> saved = employerRepository.saveAll(all);
        return saved.size();
    }
}
