import React, { useEffect, useState } from "react";
import api from "../api/api";

const MesDocuments = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const id = user?.id || 1;
    api.get(`/documents/employe/${id}`)
      .then(res => setDocuments(res.data || []))
      .catch(err => {
        console.error('Erreur chargement documents', err);
        setDocuments([]);
      });
  }, []);

  const download = (doc) => {
    api.get(`/documents/${doc.id}/download`, { responseType: 'blob' })
      .then(res => {
        const blob = new Blob([res.data], { type: res.headers['content-type'] || 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const filename = doc.nomFichier || (`document_${doc.id}`);
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch(err => {
        console.error('Erreur téléchargement', err);
        alert('Impossible de télécharger le document');
      });
  };

  const exportXlsx = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const id = user?.id || 1;
    api.get(`/documents/employe/${id}/export-xlsx`, { responseType: 'blob' })
      .then(res => {
        const blob = new Blob([res.data], { type: res.headers['content-type'] || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `documents_employe_${id}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch(err => {
        console.error('Erreur export xlsx', err);
        alert('Impossible d\'exporter les documents');
      });
  };

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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>Mes documents ({documents.length})</h3>
        <div>
          <button className="btn-download" onClick={exportXlsx} style={{ marginRight: 8 }}>Exporter XLSX</button>
        </div>
      </div>

      <div className="doc-grid">
        {documents.map((doc) => (
          <div className="doc-card" key={doc.id}>
            <div className="doc-title">{doc.nomFichier || (`Document ${doc.id}`)}</div>
            <div className="doc-info">
              Type : {doc.typeDocument || '—'} <br />
              Date : {doc.dateUpload ? new Date(doc.dateUpload).toLocaleString() : '—'}
            </div>
            <button className="btn-download" onClick={() => download(doc)}>Télécharger</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MesDocuments;
