package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "type_conge")
public class TypeConge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nom;

    @Column(name = "jours_annuels")
    private Integer joursAnnuels;

    private Boolean paye;

    public TypeConge() {
    }

    public Integer getId() {
        return id;
    }
@Transient
private TypeConge typeConge;

public TypeConge getTypeConge() {
    return typeConge;
}

public void setTypeConge(TypeConge typeConge) {
    this.typeConge = typeConge;
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

    public Integer getJoursAnnuels() {
        return joursAnnuels;
    }

    public void setJoursAnnuels(Integer joursAnnuels) {
        this.joursAnnuels = joursAnnuels;
    }

    public Boolean getPaye() {
        return paye;
    }

    public void setPaye(Boolean paye) {
        this.paye = paye;
    }
}
