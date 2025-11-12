package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "bonne_reponse")
public class BonneReponse {

    @EmbeddedId
    private BonneReponseId id;

    public BonneReponse() {
    }

    public BonneReponseId getId() {
        return id;
    }

    public void setId(BonneReponseId id) {
        this.id = id;
    }

    // convenience getters/setters
    @Transient
    public Integer getIdQuestion() {
        return id != null ? id.getIdQuestion() : null;
    }

    @Transient
    public Integer getIdReponse() {
        return id != null ? id.getIdReponse() : null;
    }
}
