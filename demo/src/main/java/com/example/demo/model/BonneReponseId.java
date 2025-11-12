package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class BonneReponseId implements Serializable {

    @Column(name = "id_question")
    private Integer idQuestion;

    @Column(name = "id_reponse")
    private Integer idReponse;

    public BonneReponseId() {
    }

    public BonneReponseId(Integer idQuestion, Integer idReponse) {
        this.idQuestion = idQuestion;
        this.idReponse = idReponse;
    }

    public Integer getIdQuestion() {
        return idQuestion;
    }

    public void setIdQuestion(Integer idQuestion) {
        this.idQuestion = idQuestion;
    }

    public Integer getIdReponse() {
        return idReponse;
    }

    public void setIdReponse(Integer idReponse) {
        this.idReponse = idReponse;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        BonneReponseId that = (BonneReponseId) o;
        return Objects.equals(idQuestion, that.idQuestion) && Objects.equals(idReponse, that.idReponse);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idQuestion, idReponse);
    }
}
