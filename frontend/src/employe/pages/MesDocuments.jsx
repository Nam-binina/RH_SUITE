import React from "react";

const MesDocuments = () => {
  const documents = [
    {
      titre: "Fiche de paie – Janvier 2025",
      type: "PDF",
      date: "05/02/2025",
      lien: "#"
    },
    {
      titre: "Fiche de paie – Février 2025",
      type: "PDF",
      date: "05/03/2025",
      lien: "#"
    },
    {
      titre: "Relevé de présence – Janvier 2025",
      type: "PDF",
      date: "01/02/2025",
      lien: "#"
    },
    {
      titre: "Contrat de travail (CDD 12 mois)",
      type: "PDF",
      date: "12/08/2024",
      lien: "#"
    }
  ];

  return (
    <div className="documents-container">
      <style>{`
        .documents-container {
          max-width: 1100px;
          margin: 40px auto;
          padding: 30px;
          background: #ffffff;
          border-radius: 14px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.05);
          font-family: 'Poppins', sans-serif;
        }

        h2 {
          font-size: 26px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 20px;
        }

        .doc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 25px;
          margin-top: 20px;
        }

        .doc-card {
          background: #f9fafb;
          border-radius: 12px;
          padding: 20px;
          border: 1px solid #e5e7eb;
          transition: all 0.3s ease;
        }

        .doc-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.08);
          border-color: #d1d5db;
        }

        .doc-title {
          font-size: 17px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 10px;
        }

        .doc-info {
          font-size: 14px;
          color: #4b5563;
          margin-bottom: 15px;
        }

        .btn-download {
          background: #2563eb;
          color: white;
          padding: 8px 14px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .btn-download:hover {
          background: #1e40af;
        }
      `}</style>

      <h2>Mes Documents</h2>

      <div className="doc-grid">
        {documents.map((doc, index) => (
          <div className="doc-card" key={index}>
            <div className="doc-title">{doc.titre}</div>
            <div className="doc-info">
              Type : {doc.type} <br />
              Date : {doc.date}
            </div>
            <button className="btn-download">Télécharger</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MesDocuments;
