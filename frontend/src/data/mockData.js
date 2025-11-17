export const employeesData = [
  { id: 1, nom: 'Rakoto', prenom: 'Jean', numero: 'EMP001', email: 'jean.rakoto@company.mg', phone: '+261 34 00 001 01', address: 'Antananarivo', photo: null, dateEmbauche: '2020-01-15', dateFinContrat: '2025-12-31', departement: 'IT', manager: 'Rabe Paul' },
  { id: 2, nom: 'Rasoa', prenom: 'Marie', numero: 'EMP002', email: 'marie.rasoa@company.mg', phone: '+261 34 00 002 02', address: 'Antananarivo', photo: null, dateEmbauche: '2021-03-20', dateFinContrat: '2026-03-19', departement: 'RH', manager: 'Rabe Paul' },
  { id: 3, nom: 'Andry', prenom: 'Hery', numero: 'EMP003', email: 'hery.andry@company.mg', phone: '+261 34 00 003 03', address: 'Fianarantsoa', photo: null, dateEmbauche: '2019-06-10', dateFinContrat: '2024-06-09', departement: 'Finance', manager: 'Randria Sophie' },
  { id: 4, nom: 'Nirina', prenom: 'Zo', numero: 'EMP004', email: 'zo.nirina@company.mg', phone: '+261 34 00 004 04', address: 'Toamasina', photo: null, dateEmbauche: '2022-09-01', dateFinContrat: '2027-08-31', departement: 'IT', manager: 'Rabe Paul' },
];

export const congeRequests = [
  { id: 1, employeId: 1, nom: 'Jean Rakoto', type: 'Congé annuel', dateDebut: '2025-11-25', dateFin: '2025-11-29', statut: 'en_attente', motif: 'Vacances familiales' },
  { id: 2, employeId: 2, nom: 'Marie Rasoa', type: 'Congé maladie', dateDebut: '2025-11-20', dateFin: '2025-11-22', statut: 'en_attente', motif: 'Consultation médicale' },
  { id: 3, employeId: 4, nom: 'Zo Nirina', type: 'Congé annuel', dateDebut: '2025-12-01', dateFin: '2025-12-10', statut: 'en_attente', motif: 'Voyage' },
];