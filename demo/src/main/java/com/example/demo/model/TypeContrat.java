package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "type_contrat")
public class TypeContrat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nom;

    @Column(name = "duree_essai")
    private Integer dureeEssai;

    public TypeContrat() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Integer getDureeEssai() {
        return dureeEssai;
    }

    public void setDureeEssai(Integer dureeEssai) {
        this.dureeEssai = dureeEssai;
    }
}
