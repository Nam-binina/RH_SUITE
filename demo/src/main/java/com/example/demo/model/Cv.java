package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "cv")
public class Cv {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "id_candidat")
    private Integer idCandidat;

    private String photo;
    private String lienPro;
    @Column(columnDefinition = "TEXT")
    private String objectif;

    public Cv() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getIdCandidat() {
        return idCandidat;
    }

    public void setIdCandidat(Integer idCandidat) {
        this.idCandidat = idCandidat;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getLienPro() {
        return lienPro;
    }

    public void setLienPro(String lienPro) {
        this.lienPro = lienPro;
    }

    public String getObjectif() {
        return objectif;
    }

    public void setObjectif(String objectif) {
        this.objectif = objectif;
    }
}
