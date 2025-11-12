package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "releve_presence")
public class RelevePresence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "id_employe")
    private Integer idEmploye;

    private Integer mois;
    private Integer annee;

    @Column(name = "jours_travailles")
    private Integer joursTravailles;

    @Column(name = "heures_supp_total")
    private java.math.BigDecimal heuresSuppTotal;

    @Column(name = "retards_total")
    private Integer retardsTotal;

    @Column(name = "absences_non_justifiees")
    private Integer absencesNonJustifiees;

    private Boolean valide;

    @Column(name = "date_validation")
    private java.time.LocalDateTime dateValidation;

    public RelevePresence() {
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

    public Integer getMois() {
        return mois;
    }

    public void setMois(Integer mois) {
        this.mois = mois;
    }

    public Integer getAnnee() {
        return annee;
    }

    public void setAnnee(Integer annee) {
        this.annee = annee;
    }

    public Integer getJoursTravailles() {
        return joursTravailles;
    }

    public void setJoursTravailles(Integer joursTravailles) {
        this.joursTravailles = joursTravailles;
    }

    public java.math.BigDecimal getHeuresSuppTotal() {
        return heuresSuppTotal;
    }

    public void setHeuresSuppTotal(java.math.BigDecimal heuresSuppTotal) {
        this.heuresSuppTotal = heuresSuppTotal;
    }

    public Integer getRetardsTotal() {
        return retardsTotal;
    }

    public void setRetardsTotal(Integer retardsTotal) {
        this.retardsTotal = retardsTotal;
    }

    public Integer getAbsencesNonJustifiees() {
        return absencesNonJustifiees;
    }

    public void setAbsencesNonJustifiees(Integer absencesNonJustifiees) {
        this.absencesNonJustifiees = absencesNonJustifiees;
    }

    public Boolean getValide() {
        return valide;
    }

    public void setValide(Boolean valide) {
        this.valide = valide;
    }

    public java.time.LocalDateTime getDateValidation() {
        return dateValidation;
    }

    public void setDateValidation(java.time.LocalDateTime dateValidation) {
        this.dateValidation = dateValidation;
    }
}
