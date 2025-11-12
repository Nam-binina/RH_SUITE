package com.example.demo.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "avance_salaire")
public class AvanceSalaire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "id_employe")
    private Integer idEmploye;

    @Column(name = "id_fiche_paie")
    private Integer idFichePaie;

    private BigDecimal montant;

    @Column(name = "date_avance")
    private LocalDate dateAvance;

    private String motif;

    @Column(name = "statut_remboursement")
    private String statutRemboursement;

    public AvanceSalaire() {
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

    public Integer getIdFichePaie() {
        return idFichePaie;
    }

    public void setIdFichePaie(Integer idFichePaie) {
        this.idFichePaie = idFichePaie;
    }

    public BigDecimal getMontant() {
        return montant;
    }

    public void setMontant(BigDecimal montant) {
        this.montant = montant;
    }

    public LocalDate getDateAvance() {
        return dateAvance;
    }

    public void setDateAvance(LocalDate dateAvance) {
        this.dateAvance = dateAvance;
    }

    public String getMotif() {
        return motif;
    }

    public void setMotif(String motif) {
        this.motif = motif;
    }

    public String getStatutRemboursement() {
        return statutRemboursement;
    }

    public void setStatutRemboursement(String statutRemboursement) {
        this.statutRemboursement = statutRemboursement;
    }
}
