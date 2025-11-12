package com.example.demo.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "profil")
public class Profil {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "id_domaine")
    private Integer idDomaine;

    @Column(name = "id_diplome")
    private Integer idDiplome;

    private Integer ageMin;
    private Integer ageMax;
    private Integer experience;
    private Boolean remote;
    private BigDecimal salary;
    private LocalDate datelimite;

    public Profil() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getIdDomaine() {
        return idDomaine;
    }

    public void setIdDomaine(Integer idDomaine) {
        this.idDomaine = idDomaine;
    }

    public Integer getIdDiplome() {
        return idDiplome;
    }

    public void setIdDiplome(Integer idDiplome) {
        this.idDiplome = idDiplome;
    }

    public Integer getAgeMin() {
        return ageMin;
    }

    public void setAgeMin(Integer ageMin) {
        this.ageMin = ageMin;
    }

    public Integer getAgeMax() {
        return ageMax;
    }

    public void setAgeMax(Integer ageMax) {
        this.ageMax = ageMax;
    }

    public Integer getExperience() {
        return experience;
    }

    public void setExperience(Integer experience) {
        this.experience = experience;
    }

    public Boolean getRemote() {
        return remote;
    }

    public void setRemote(Boolean remote) {
        this.remote = remote;
    }

    public BigDecimal getSalary() {
        return salary;
    }

    public void setSalary(BigDecimal salary) {
        this.salary = salary;
    }

    public LocalDate getDatelimite() {
        return datelimite;
    }

    public void setDatelimite(LocalDate datelimite) {
        this.datelimite = datelimite;
    }
}
