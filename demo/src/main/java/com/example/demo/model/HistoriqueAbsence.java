package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "historique_absence")
public class HistoriqueAbsence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "id_employe")
    private Integer idEmploye;

    @Column(name = "date_absence")
    private LocalDate dateAbsence;

    @Column(name = "type_absence")
    private String typeAbsence;

    private Boolean justifiee;

    @Column(name = "certificat_medical")
    private Boolean certificatMedical;

    @Column(columnDefinition = "TEXT")
    private String commentaire;

    public HistoriqueAbsence() {
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

    public LocalDate getDateAbsence() {
        return dateAbsence;
    }

    public void setDateAbsence(LocalDate dateAbsence) {
        this.dateAbsence = dateAbsence;
    }

    public String getTypeAbsence() {
        return typeAbsence;
    }

    public void setTypeAbsence(String typeAbsence) {
        this.typeAbsence = typeAbsence;
    }

    public Boolean getJustifiee() {
        return justifiee;
    }

    public void setJustifiee(Boolean justifiee) {
        this.justifiee = justifiee;
    }

    public Boolean getCertificatMedical() {
        return certificatMedical;
    }

    public void setCertificatMedical(Boolean certificatMedical) {
        this.certificatMedical = certificatMedical;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }
}
