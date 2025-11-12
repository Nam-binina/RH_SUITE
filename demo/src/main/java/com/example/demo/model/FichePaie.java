package com.example.demo.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "fiche_paie")
public class FichePaie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "id_employe")
    private Integer idEmploye;

    @Column(name = "mois")
    private Integer mois;

    @Column(name = "annee")
    private Integer annee;

    @Column(name = "date_edition")
    private LocalDateTime dateEdition;

    @Column(name = "salaire_brut")
    private BigDecimal salaireBrut;

    @Column(name = "heures_supplementaires")
    private BigDecimal heuresSupplementaires;

    private BigDecimal primes;
    @Column(name = "autres_gains")
    private BigDecimal autresGains;
    @Column(name = "total_brut")
    private BigDecimal totalBrut;

    private BigDecimal cnaps;
    private BigDecimal ostie;
    private BigDecimal irsa;
    @Column(name = "total_retenues")
    private BigDecimal totalRetenues;

    @Column(name = "net_a_payer")
    private BigDecimal netAPayer;

    private String statut;

    public FichePaie() {
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

    public LocalDateTime getDateEdition() {
        return dateEdition;
    }

    public void setDateEdition(LocalDateTime dateEdition) {
        this.dateEdition = dateEdition;
    }

    public BigDecimal getSalaireBrut() {
        return salaireBrut;
    }

    public void setSalaireBrut(BigDecimal salaireBrut) {
        this.salaireBrut = salaireBrut;
    }

    public BigDecimal getHeuresSupplementaires() {
        return heuresSupplementaires;
    }

    public void setHeuresSupplementaires(BigDecimal heuresSupplementaires) {
        this.heuresSupplementaires = heuresSupplementaires;
    }

    public BigDecimal getPrimes() {
        return primes;
    }

    public void setPrimes(BigDecimal primes) {
        this.primes = primes;
    }

    public BigDecimal getAutresGains() {
        return autresGains;
    }

    public void setAutresGains(BigDecimal autresGains) {
        this.autresGains = autresGains;
    }

    public BigDecimal getTotalBrut() {
        return totalBrut;
    }

    public void setTotalBrut(BigDecimal totalBrut) {
        this.totalBrut = totalBrut;
    }

    public BigDecimal getCnaps() {
        return cnaps;
    }

    public void setCnaps(BigDecimal cnaps) {
        this.cnaps = cnaps;
    }

    public BigDecimal getOstie() {
        return ostie;
    }

    public void setOstie(BigDecimal ostie) {
        this.ostie = ostie;
    }

    public BigDecimal getIrsa() {
        return irsa;
    }

    public void setIrsa(BigDecimal irsa) {
        this.irsa = irsa;
    }

    public BigDecimal getTotalRetenues() {
        return totalRetenues;
    }

    public void setTotalRetenues(BigDecimal totalRetenues) {
        this.totalRetenues = totalRetenues;
    }

    public BigDecimal getNetAPayer() {
        return netAPayer;
    }

    public void setNetAPayer(BigDecimal netAPayer) {
        this.netAPayer = netAPayer;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }
}
