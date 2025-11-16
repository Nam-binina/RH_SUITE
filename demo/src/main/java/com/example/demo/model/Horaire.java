package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalTime;

@Entity
@Table(name = "horaire")
public class Horaire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_departement", nullable = false)
    private Departement departement;

    @Column(name = "heure_entree", nullable = false)
    private LocalTime heureEntree;

    @Column(name = "heure_sortie", nullable = false)
    private LocalTime heureSortie;


    public Horaire() {
    }

    public Horaire(Departement departement, LocalTime entree, LocalTime sortie) {
        this.departement = departement;
        this.heureEntree = entree;
        this.heureSortie = sortie;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Departement getDepartement() {
        return departement;
    }

    public void setDepartement(Departement departement) {
        this.departement = departement;
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

    public long getDureeNormaleMinutes() {
        return java.time.Duration.between(heureEntree, heureSortie).toMinutes();
    }
    
    public double getDureeNormaleHeures() {
        return getDureeNormaleMinutes() / 60.0;
    }
}
