package com.example.demo.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "prime")
public class Prime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "id_employe")
    private Integer idEmploye;

    @Column(name = "id_fiche_paie")
    private Integer idFichePaie;

    @Column(name = "type_prime")
    private String typePrime;

    private BigDecimal montant;

    private String motif;

    private Integer mois;
    private Integer annee;

    public Prime() {
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

    public String getTypePrime() {
        return typePrime;
    }

    public void setTypePrime(String typePrime) {
        this.typePrime = typePrime;
    }

    public BigDecimal getMontant() {
        return montant;
    }

    public void setMontant(BigDecimal montant) {
        this.montant = montant;
    }

    public String getMotif() {
        return motif;
    }

    public void setMotif(String motif) {
        this.motif = motif;
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
}
