package com.example.demo.service.impl;

import com.example.demo.model.Prime;
import com.example.demo.repository.PrimeRepository;
import com.example.demo.service.PrimeService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PrimeServiceImpl implements PrimeService {

    private final PrimeRepository primeRepository;

    public PrimeServiceImpl(PrimeRepository primeRepository) {
        this.primeRepository = primeRepository;
    }

    @Override
    public Prime save(Prime prime) {
        return primeRepository.save(prime);
    }

    @Override
    public Optional<Prime> findById(Integer id) {
        return primeRepository.findById(id);
    }

    @Override
    public List<Prime> findByEmployeAndPeriod(Integer idEmploye, Integer mois, Integer annee) {
        if (mois == null || annee == null) {
            return primeRepository.findAll().stream().filter(p -> p.getIdEmploye().equals(idEmploye)).toList();
        }
        return primeRepository.findAll().stream()
                .filter(p -> p.getIdEmploye().equals(idEmploye) && (p.getMois() == null || p.getMois().equals(mois)) && (p.getAnnee() == null || p.getAnnee().equals(annee)))
                .toList();
    }

    @Override
    public void deleteById(Integer id) {
        primeRepository.deleteById(id);
    }
}
