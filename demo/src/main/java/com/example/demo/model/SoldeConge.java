package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "solde_conge")
public class SoldeConge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "id_employe")
    private Integer idEmploye;

    @Column(name = "id_type_conge")
    private Integer idTypeConge;

    private Integer annee;

    @Column(name = "solde_acquis")
    private Integer soldeAcquis;

    @Column(name = "solde_prise")
    private Integer soldePrise;

    // solde_restant est calculé en DB; on peut exposer comme champ simple
    @Column(name = "solde_restant")
    private Integer soldeRestant;

    public SoldeConge() {
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

    public Integer getAnnee() {
        return annee;
    }

    public void setAnnee(Integer annee) {
        this.annee = annee;
    }

    public Integer getSoldeAcquis() {
        return soldeAcquis;
    }

    public void setSoldeAcquis(Integer soldeAcquis) {
        this.soldeAcquis = soldeAcquis;
    }

    public Integer getSoldePrise() {
        return soldePrise;
    }

    public void setSoldePrise(Integer soldePrise) {
        this.soldePrise = soldePrise;
    }

    public Integer getSoldeRestant() {
        return soldeRestant;
    }

    public void setSoldeRestant(Integer soldeRestant) {
        this.soldeRestant = soldeRestant;
    }
}
