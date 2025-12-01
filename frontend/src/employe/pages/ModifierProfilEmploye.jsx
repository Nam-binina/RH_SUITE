import React, { useState } from "react";

const ModifierProfilEmploye = () => {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [numero, setNumero] = useState("");
  const [adresse, setAdresse] = useState("");
  const [date_naissance, setDateNaissance] = useState("");
  const [photo, setPhoto] = useState("");

  const [matricule, setMatricule] = useState("");
  const [poste, setPoste] = useState("");
  const [departement, setDepartement] = useState("");
  const [type_contrat, setTypeContrat] = useState("");
  const [date_embauche, setDateEmbauche] = useState("");
  const [salaire, setSalaire] = useState("");
  const [manager, setManager] = useState("");

  const [competences, setCompetences] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      prenom,
      nom,
      email,
      numero,
      adresse,
      date_naissance,
      photo,
      matricule,
      poste,
      departement,
      type_contrat,
      date_embauche,
      salaire,
      manager,
      competences,
      description,
    };

    try {
      const response = await fetch("http://localhost:8181/api/employe", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Profil employé mis à jour !");
      } else {
        alert("Erreur lors de la mise à jour.");
      }
    } catch (error) {
      console.error("Erreur :", error);
      alert("Impossible de se connecter au serveur.");
    }
  };

  return (
    <div className="profil-container">
      <style>{`
        .profil-container {
          background-color: #f9fafb;
          max-width: 900px;
          margin: 40px auto;
          padding: 30px 40px;
          border-radius: 12px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
          font-family: "Poppins", sans-serif;
        }

        h2 {
          text-align: center;
          color: #333;
          margin-bottom: 25px;
        }

        .profil-form { display: flex; flex-direction: column; }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-group { display: flex; flex-direction: column; }
        .full-width { grid-column: 1 / span 2; }

        label {
          font-weight: 600;
          margin-bottom: 6px;
          color: #444;
        }

        input, textarea {
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 10px;
          font-size: 15px;
          transition: 0.3s;
        }

        input:focus, textarea:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 6px rgba(59, 130, 246, 0.3);
        }

        textarea { resize: vertical; min-height: 80px; }

        .btn-modifier {
          margin-top: 30px;
          padding: 12px 20px;
          background-color: #3b82f6;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          width: 50%;
          align-self: center;
          transition: 0.25s;
        }

        .btn-modifier:hover {
          background-color: #2563eb;
        }

        @media (max-width: 768px) {
          .form-grid { grid-template-columns: 1fr; }
          .btn-modifier { width: 100%; }
        }
      `}</style>

      <h2>Modifier le profil employé</h2>

      <form onSubmit={handleSubmit} className="profil-form">
        <div className="form-grid">
          {/* Identité */}
          <div className="form-group">
            <label>Prénom :</label>
            <input value={prenom} onChange={(e) => setPrenom(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Nom :</label>
            <input value={nom} onChange={(e) => setNom(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Email :</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Numéro :</label>
            <input value={numero} onChange={(e) => setNumero(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Adresse :</label>
            <input value={adresse} onChange={(e) => setAdresse(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Date de naissance :</label>
            <input type="date" value={date_naissance} onChange={(e) => setDateNaissance(e.target.value)} />
          </div>

          <div className="form-group full-width">
            <label>Photo (URL) :</label>
            <input value={photo} onChange={(e) => setPhoto(e.target.value)} />
          </div>

          {/* Infos RH */}
          <div className="form-group">
            <label>Matricule :</label>
            <input value={matricule} onChange={(e) => setMatricule(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Poste :</label>
            <input value={poste} onChange={(e) => setPoste(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Département :</label>
            <input value={departement} onChange={(e) => setDepartement(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Type de contrat :</label>
            <input value={type_contrat} onChange={(e) => setTypeContrat(e.target.value)} placeholder="CDI, CDD, Stage..." />
          </div>

          <div className="form-group">
            <label>Date d'embauche :</label>
            <input type="date" value={date_embauche} onChange={(e) => setDateEmbauche(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Salaire :</label>
            <input value={salaire} onChange={(e) => setSalaire(e.target.value)} placeholder="ex : 1 200 000 Ar" />
          </div>

          <div className="form-group">
            <label>Manager :</label>
            <input value={manager} onChange={(e) => setManager(e.target.value)} />
          </div>

          {/* Description + compétences */}
          <div className="form-group full-width">
            <label>Compétences :</label>
            <textarea value={competences} onChange={(e) => setCompetences(e.target.value)} />
          </div>

          <div className="form-group full-width">
            <label>Description :</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>

        <button type="submit" className="btn-modifier">Modifier</button>
      </form>
    </div>
  );
};

export default ModifierProfilEmploye;
