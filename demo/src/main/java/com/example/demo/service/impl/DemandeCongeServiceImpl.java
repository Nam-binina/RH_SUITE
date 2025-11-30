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
private final EmployerRepository employerRepository;

public DemandeCongeServiceImpl(DemandeCongeRepository demandeRepo, StatutRepository sp, TypeCongeRepository tp, EmployerRepository empRepo) {
    this.demandeRepo = demandeRepo;
    this.statutRepository = sp;
    this.typeCongeRepository = tp;
    this.employerRepository = empRepo;
}

@Override
@Transactional
public DemandeConge create(DemandeConge demande) {
    return demandeRepo.save(demande);
}

@Override
@Transactional
public DemandeConge createConge(String s, int typeCongeId, LocalDate debut, LocalDate fin, String motif, Employer emp) {
    Statut st = statutRepository.findByNom(s);
    if (st == null || emp == null) throw new RuntimeException("Données invalides");

    DemandeConge demande = new DemandeConge();
    demande.setStatut(st.getNom());
    demande.setIdTypeConge(typeCongeId);
    demande.setDateDebut(debut);
    demande.setDateFin(fin);
    demande.setNombreJours((int) (fin.toEpochDay() - debut.toEpochDay()) + 1);
    demande.setMotif(motif);
    demande.setIdEmploye(emp.getId());

    return demandeRepo.save(demande);
}

@Override
@Transactional
public DemandeConge update(DemandeConge demande) {
    return demandeRepo.save(demande);
}

@Override
public DemandeConge findById(Integer id) {
    DemandeConge demande = demandeRepo.findById(id).orElse(null);
    if (demande != null) {
        Employer emp = employerRepository.findById(demande.getIdEmploye()).orElse(null);
        TypeConge tc = typeCongeRepository.findById(demande.getIdTypeConge()).orElse(null);
        demande.setEmploye(emp);
        demande.setTypeConge(tc);
    }
    return demande;
}

@Override
public List<DemandeConge> findByStatut(String statut) {
    List<DemandeConge> demandes = demandeRepo.findByStatut(statut);
    for (DemandeConge d : demandes) {
        Employer emp = employerRepository.findById(d.getIdEmploye()).orElse(null);
        TypeConge tc = typeCongeRepository.findById(d.getIdTypeConge()).orElse(null);
        d.setEmploye(emp);
        d.setTypeConge(tc);
    }
    return demandes;
}



    @Override
    public DemandeConge validate(DemandeConge demande, String commentaire) {
        demande.setStatut("VALIDE");
        demande.setCommentaireValidation(commentaire);
        return demandeRepo.save(demande);
    }

    @Override
    public DemandeConge reject(DemandeConge demande, String commentaire) {
        demande.setStatut("REJETE");
        demande.setCommentaireValidation(commentaire);
        return demandeRepo.save(demande);
    }

    @Override
    public DemandeConge validate(DemandeConge demande) {
        demande.setStatut("VALIDE");
        return demandeRepo.save(demande);
    }

}
