package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.math.BigDecimal;

@Entity
@Table(name = "pointage")
public class Pointage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "id_employe")
    private Integer idEmploye;

    @Column(name = "date_pointage")
    private LocalDate datePointage;

    @Column(name = "heure_entree")
    private LocalTime heureEntree;

    @Column(name = "heure_sortie")
    private LocalTime heureSortie;

    @Column(name = "pause_debut")
    private LocalTime pauseDebut;

    @Column(name = "pause_fin")
    private LocalTime pauseFin;

    @Column(name = "heures_travaillees")
    private BigDecimal heuresTravaillees;

    @Column(name = "heures_supplementaires")
    private BigDecimal heuresSupplementaires;

    @Column(name = "retard_minutes")
    private Integer retardMinutes;

    private String statut;

    public Pointage() {
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

    public LocalDate getDatePointage() {
        return datePointage;
    }

    public void setDatePointage(LocalDate datePointage) {
        this.datePointage = datePointage;
    }

    public LocalTime getHeureEntree() {
        return heureEntree;
    }

    public void setHeureEntree(LocalTime heureEntree) {
        this.heureEntree = heureEntree;
    }

    public LocalTime getHeureSortie() {
        return heureSortie;
    }

    public void setHeureSortie(LocalTime heureSortie) {
        this.heureSortie = heureSortie;
    }

    public LocalTime getPauseDebut() {
        return pauseDebut;
    }

    public void setPauseDebut(LocalTime pauseDebut) {
        this.pauseDebut = pauseDebut;
    }

    public LocalTime getPauseFin() {
        return pauseFin;
    }

    public void setPauseFin(LocalTime pauseFin) {
        this.pauseFin = pauseFin;
    }

    public BigDecimal getHeuresTravaillees() {
        return heuresTravaillees;
    }

    public void setHeuresTravaillees(BigDecimal heuresTravaillees) {
        this.heuresTravaillees = heuresTravaillees;
    }

    public BigDecimal getHeuresSupplementaires() {
        return heuresSupplementaires;
    }

    public void setHeuresSupplementaires(BigDecimal heuresSupplementaires) {
        this.heuresSupplementaires = heuresSupplementaires;
    }

    public Integer getRetardMinutes() {
        return retardMinutes;
    }

    public void setRetardMinutes(Integer retardMinutes) {
        this.retardMinutes = retardMinutes;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }
}
