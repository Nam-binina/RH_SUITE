import React, { useState } from "react";

const ModifierProfil = () => {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [numero, setNumero] = useState("");
  const [adresse, setAdresse] = useState("");
  const [date_naissance, setDateNaissance] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [photo, setPhoto] = useState("");
  const [titre, setTitre] = useState("");
  const [niveau_etude, setNiveauEtude] = useState("");
  const [experience, setExperience] = useState("");
  const [competences, setCompetences] = useState("");
  const [langues, setLangues] = useState("");
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
      linkedin,
      github,
      photo,
      titre,
      niveau_etude,
      experience,
      competences,
      langues,
      description,
    };

    try {
      const response = await fetch("http://localhost:5000/api/utilisateur", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Profil mis à jour avec succès !");
      } else {
        alert("Erreur lors de la mise à jour du profil.");
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
      alert("Impossible de se connecter au serveur.");
    }
  };

  return (
    <div className="profil-container">
      <style>{`
        .profil-container {
          background-color: #f9fafb;
          max-width: 800px;
          margin: 40px auto;
          padding: 30px 40px;
          border-radius: 12px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
          font-family: "Poppins", sans-serif;
        }

        .profil-container h2 {
          text-align: center;
          color: #333;
          margin-bottom: 25px;
        }

        .profil-form {
          display: flex;
          flex-direction: column;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group.full-width {
          grid-column: 1 / span 2;
        }

        label {
          font-weight: 600;
          color: #444;
          margin-bottom: 6px;
        }

        input,
        textarea {
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 10px;
          font-size: 15px;
          transition: all 0.3s ease;
        }

        input:focus,
        textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 6px rgba(59, 130, 246, 0.3);
        }

        textarea {
          resize: vertical;
          min-height: 80px;
        }

        .btn-modifier {
          margin-top: 30px;
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          background-color: #3b82f6;
          color: white;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.25s ease;
          width: 50%;
          align-self: center;
        }

        .btn-modifier:hover {
          background-color: #2563eb;
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }

          .btn-modifier {
            width: 100%;
          }
        }
      `}</style>

      <h2>Modifier le profil</h2>
      <form onSubmit={handleSubmit} className="profil-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Prénom :</label>
            <input
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              placeholder="Entrez votre prénom"
            />
          </div>

          <div className="form-group">
            <label>Nom :</label>
            <input
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Entrez votre nom"
            />
          </div>

          <div className="form-group">
            <label>Email :</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemple@email.com"
            />
          </div>

          <div className="form-group">
            <label>Numéro :</label>
            <input
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              placeholder="+261 ..."
            />
          </div>

          <div className="form-group">
            <label>Adresse :</label>
            <input
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              placeholder="Adresse complète"
            />
          </div>

          <div className="form-group">
            <label>Date de naissance :</label>
            <input
              type="date"
              value={date_naissance}
              onChange={(e) => setDateNaissance(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>LinkedIn :</label>
            <input
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="Lien LinkedIn"
            />
          </div>

          <div className="form-group">
            <label>GitHub :</label>
            <input
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              placeholder="Lien GitHub"
            />
          </div>

          <div className="form-group">
            <label>Photo (URL) :</label>
            <input
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="Lien de la photo"
            />
          </div>

          <div className="form-group">
            <label>Titre :</label>
            <input
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              placeholder="Ex : Développeur web"
            />
          </div>

          <div className="form-group">
            <label>Niveau d’étude :</label>
            <input
              value={niveau_etude}
              onChange={(e) => setNiveauEtude(e.target.value)}
              placeholder="Ex : Licence, Master..."
            />
          </div>

          <div className="form-group">
            <label>Expérience :</label>
            <input
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Nombre d'années ou description"
            />
          </div>

          <div className="form-group full-width">
            <label>Compétences :</label>
            <textarea
              value={competences}
              onChange={(e) => setCompetences(e.target.value)}
              placeholder="Listez vos compétences"
            ></textarea>
          </div>

          <div className="form-group full-width">
            <label>Langues :</label>
            <input
              value={langues}
              onChange={(e) => setLangues(e.target.value)}
              placeholder="Ex : Français, Anglais, Malgache"
            />
          </div>

          <div className="form-group full-width">
            <label>Description :</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Parlez un peu de vous..."
            ></textarea>
          </div>
        </div>

        <button type="submit" className="btn-modifier">
          Modifier
        </button>
      </form>
    </div>
  );
};

export default ModifierProfil;
