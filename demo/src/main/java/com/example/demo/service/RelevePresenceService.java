package com.example.demo.service;

import com.example.demo.model.RelevePresence;

public interface RelevePresenceService {
    // calcule ou récupère le relevé mensuel pour un employé
    RelevePresence generateOrGetReleve(Integer idEmploye, int mois, int annee);
}
