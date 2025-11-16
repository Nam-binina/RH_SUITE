package com.example.demo.model;

import jakarta.persistence.*;

import java.lang.reflect.Type;
import java.time.LocalDate;
import java.time.LocalDateTime;


@Entity
@Table(name = "demande_conge")
public class DemandeConge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "id_employe")
    private Integer idEmploye;

    @Column(name = "id_type_conge")
    private Integer idTypeConge;

    @Column(name = "date_debut")
    private LocalDate dateDebut;

    @Column(name = "date_fin")
    private LocalDate dateFin;

    @Column(name = "nombre_jours")
    private Integer nombreJours;

    @Column(columnDefinition = "TEXT")
    private String motif;

    @Column(name = "id_validateur")
    private Integer idValidateur;

    private String statut;

    @Column(name = "date_demande")
    private LocalDateTime dateDemande;

    @Column(name = "date_validation")
    private LocalDateTime dateValidation;

    @Column(name = "commentaire_validation", columnDefinition = "TEXT")
    private String commentaireValidation;

    public DemandeConge() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getIdEmploye() {
        return idEmploye;
    }

    public void setIdEmploye(Integer idEmploye) {
        this.idEmploye = idEmploye;
    }

    public Integer getIdTypeConge() {
        return idTypeConge;
    }

    public void setIdTypeConge(Integer idTypeConge) {
        this.idTypeConge = idTypeConge;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    public void setDateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
    }

    public Integer getNombreJours() {
        return nombreJours;
    }

    public void setNombreJours(Integer nombreJours) {
        this.nombreJours = nombreJours;
    }

    public String getMotif() {
        return motif;
    }

    public void setMotif(String motif) {
        this.motif = motif;
    }

    public Integer getIdValidateur() {
        return idValidateur;
    }

    public void setIdValidateur(Integer idValidateur) {
        this.idValidateur = idValidateur;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public LocalDateTime getDateDemande() {
        return dateDemande;
    }

    public void setDateDemande(LocalDateTime dateDemande) {
        this.dateDemande = dateDemande;
    }

    public LocalDateTime getDateValidation() {
        return dateValidation;
    }

    public void setDateValidation(LocalDateTime dateValidation) {
        this.dateValidation = dateValidation;
    }

    public String getCommentaireValidation() {
        return commentaireValidation;
    }

    public void setCommentaireValidation(String commentaireValidation) {
        this.commentaireValidation = commentaireValidation;
    }

    public DemandeConge createConge(Statut s, TypeConge typeConge,LocalDate debut,LocalDate fin,String motif,Employer e){ 
        if (s==null) {
            throw new IllegalArgumentException("Status cannot be null");
        }
        if (typeConge == null) {
            throw new IllegalArgumentException("TypeConge must be positive");
        }
        if (debut == null || fin == null || debut.isAfter(fin)) {
            throw new IllegalArgumentException("Invalid start or end date");
        }
        if (motif == null || motif.isEmpty()) {
            throw new IllegalArgumentException("Motif cannot be null or empty");
        }
        if (e == null) {
            throw new IllegalArgumentException("Employer cannot be null");
        }
        this.idEmploye = e.getId();
        this.idTypeConge = typeConge.getId();
        this.dateDebut = debut;
        this.dateFin = fin;
        this.nombreJours = (int) (fin.toEpochDay() - debut.toEpochDay()) + 1;
        this.motif = motif;
        this.statut = s.toString();
        this.dateDemande = LocalDateTime.now();
        return this;
    }
}
