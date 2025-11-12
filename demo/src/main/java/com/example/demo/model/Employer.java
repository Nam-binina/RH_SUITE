package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "employer")
public class Employer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "id_candidat")
    private Integer idCandidat;

    @Column(name = "id_poste")
    private Integer idPoste;

    @Column(name = "id_type_contrat")
    private Integer idTypeContrat;

    @Column(name = "id_departement")
    private Integer idDepartement;

    @Column(name = "id_manager")
    private Integer idManager;

    // Informations personnelles
    private String nom;
    private String prenom;
    private String email;
    private String numero;
    private String adresse;
    private LocalDate dateNaissance;
    private String mdp;
    private String photo;

    // Informations professionnelles
    private String matricule;

    @Column(name = "date_embauche")
    private LocalDate dateEmbauche;

    @Column(name = "date_fin_contrat")
    private LocalDate dateFinContrat;

    @Column(name = "periode_essai_fin")
    private LocalDate periodeEssaiFin;

    @Column(name = "salaire_brut")
    private BigDecimal salaireBrut;

    @Column(name = "taux_cnaps", precision = 10, scale = 4)
    private BigDecimal tauxCnaps;

    @Column(name = "taux_ostie", precision = 10, scale = 4)
    private BigDecimal tauxOstie;

    @Column(name = "taux_irsa", precision = 10, scale = 4)
    private BigDecimal tauxIrsa;

    private Boolean actif;

    @Column(name = "date_creation")
    private LocalDateTime dateCreation;

    public Employer() {
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

    public Integer getIdPoste() {
        return idPoste;
    }

    public void setIdPoste(Integer idPoste) {
        this.idPoste = idPoste;
    }

    public Integer getIdTypeContrat() {
        return idTypeContrat;
    }

    public void setIdTypeContrat(Integer idTypeContrat) {
        this.idTypeContrat = idTypeContrat;
    }

    public Integer getIdDepartement() {
        return idDepartement;
    }

    public void setIdDepartement(Integer idDepartement) {
        this.idDepartement = idDepartement;
    }

    public Integer getIdManager() {
        return idManager;
    }

    public void setIdManager(Integer idManager) {
        this.idManager = idManager;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public LocalDate getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String getMdp() {
        return mdp;
    }

    public void setMdp(String mdp) {
        this.mdp = mdp;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getMatricule() {
        return matricule;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public LocalDate getDateEmbauche() {
        return dateEmbauche;
    }

    public void setDateEmbauche(LocalDate dateEmbauche) {
        this.dateEmbauche = dateEmbauche;
    }

    public LocalDate getDateFinContrat() {
        return dateFinContrat;
    }

    public void setDateFinContrat(LocalDate dateFinContrat) {
        this.dateFinContrat = dateFinContrat;
    }

    public LocalDate getPeriodeEssaiFin() {
        return periodeEssaiFin;
    }

    public void setPeriodeEssaiFin(LocalDate periodeEssaiFin) {
        this.periodeEssaiFin = periodeEssaiFin;
    }

    public BigDecimal getSalaireBrut() {
        return salaireBrut;
    }

    public void setSalaireBrut(BigDecimal salaireBrut) {
        this.salaireBrut = salaireBrut;
    }

    public BigDecimal getTauxCnaps() {
        return tauxCnaps;
    }

    public void setTauxCnaps(BigDecimal tauxCnaps) {
        this.tauxCnaps = tauxCnaps;
    }

    public BigDecimal getTauxOstie() {
        return tauxOstie;
    }

    public void setTauxOstie(BigDecimal tauxOstie) {
        this.tauxOstie = tauxOstie;
    }

    public BigDecimal getTauxIrsa() {
        return tauxIrsa;
    }

    public void setTauxIrsa(BigDecimal tauxIrsa) {
        this.tauxIrsa = tauxIrsa;
    }

    public Boolean getActif() {
        return actif;
    }

    public void setActif(Boolean actif) {
        this.actif = actif;
    }

    public LocalDateTime getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(LocalDateTime dateCreation) {
        this.dateCreation = dateCreation;
    }
}
