package com.example.demo.service.impl;

import com.example.demo.model.DemandeConge;
import com.example.demo.model.TypeConge;
import com.example.demo.model.Employer;
import com.example.demo.model.Statut;
import com.example.demo.repository.DemandeCongeRepository;
import com.example.demo.repository.StatutRepository;
import com.example.demo.repository.TypeCongeRepository;
import com.example.demo.repository.EmployerRepository;

import com.example.demo.service.DemandeCongeService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;


@Service
public class DemandeCongeServiceImpl implements DemandeCongeService {

    private final DemandeCongeRepository demandeRepo;
    private final StatutRepository statutRepository;
    private final TypeCongeRepository typeCongeRepository;
    // private final EmployerRepository employerRepository;

    public DemandeCongeServiceImpl(DemandeCongeRepository demandeRepo,StatutRepository sp,TypeCongeRepository tp) {
        this.demandeRepo = demandeRepo;
        this.statutRepository = sp;
        this.typeCongeRepository = tp;
        // this.employerRepository = employerRepository;
    }

    @Override
    @Transactional
    public DemandeConge create(DemandeConge demande) {
        return demandeRepo.save(demande);
    }

    @Override
    @Transactional
    public DemandeConge createConge(String s, int typeConge, LocalDate debut, LocalDate fin, String motif,
            Employer emp) {
        DemandeConge demande = null;
        try {
            Statut st = statutRepository.findByNom(s);
            TypeConge tc = typeCongeRepository.findById(typeConge).orElse(null);
            demande = new DemandeConge().createConge(st, tc, debut, fin, motif,emp);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return demandeRepo.save(demande);
    }
    @Override
    @Transactional
    public DemandeConge update(DemandeConge demande) {
        return demandeRepo.save(demande);
    }

    @Override
    public DemandeConge findById(Integer id) {
        return demandeRepo.findById(id).orElse(null);
    }

    @Override
    public List<DemandeConge> findByStatut(String statut) {
        return demandeRepo.findByStatut(statut);
    }
    @Override 
    public DemandeConge validate(DemandeConge demande) {
        Statut st = statutRepository.findByNom("VALIDE");
        demande.setStatut(st.getNom());
        return demandeRepo.save(demande);
    }
}
