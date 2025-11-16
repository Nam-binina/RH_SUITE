package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;

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

    public Pointage create(LocalTime debut,LocalTime fin,LocalTime pauseD,LocalTime pauseF,LocalDate jour,Employer emp,Horaire h) {
        if (emp == null) {
            throw new IllegalArgumentException("Employer cannot be null");
        }
        if (jour == null) {
            throw new IllegalArgumentException("Date pointage cannot be null");
        }
        if (debut == null || fin == null) {
            throw new IllegalArgumentException("Heure entree and sortie cannot be null");
        }
        Duration total = Duration.between(debut, fin);
        Duration pause = Duration.ZERO;
        if (pauseD != null && pauseF != null) {
            pause = Duration.between(pauseD, pauseF);
        }
        Duration worked = total.minus(pause);
        BigDecimal heuresTravaillees = BigDecimal.valueOf(worked.toMinutes()).divide(BigDecimal.valueOf(60), 2, BigDecimal.ROUND_HALF_UP);
        BigDecimal heuresSupp = BigDecimal.ZERO;
        Duration dureeNormale = Duration.between(h.getHeureEntree(), h.getHeureSortie());
        BigDecimal heuresNormales = BigDecimal.valueOf(dureeNormale.toMinutes())
                .divide(BigDecimal.valueOf(60), 2, RoundingMode.HALF_UP);
        int retardMinutes = 0;
        if (heuresTravaillees.compareTo(heuresNormales) > 0) {
            heuresSupp = heuresTravaillees.subtract(heuresNormales);
        }

        if (debut.isAfter(h.getHeureEntree())) {
            retardMinutes = (int) Duration.between(h.getHeureEntree(), debut).toMinutes();
            if (retardMinutes <= 5) {
                retardMinutes = 0;
            }
        }
        this.setIdEmploye(emp.getId());
        this.setDatePointage(jour);
        this.setHeureEntree(debut);
        this.setHeureSortie(fin);
        this.setPauseDebut(pauseD);
        this.setPauseFin(pauseF);
        this.setHeuresTravaillees(heuresTravaillees);
        this.setHeuresSupplementaires(heuresSupp);
        this.setRetardMinutes(retardMinutes);
        return this;
    }
}
