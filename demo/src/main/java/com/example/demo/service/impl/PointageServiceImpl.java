package com.example.demo.service.impl;

import com.example.demo.model.Employer;
import com.example.demo.model.Horaire;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.Pointage;
import com.example.demo.repository.HoraireRepository;
import com.example.demo.repository.PointageRepository;
import com.example.demo.service.PointageService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;

@Service
public class PointageServiceImpl implements PointageService {

    private final PointageRepository repo;
    private final HoraireRepository horaireRepository;
    
    // Constantes métier
    private static final int TOLERANCE_RETARD_MINUTES = 5;
    private static final BigDecimal HEURES_TRAVAIL_STANDARD = new BigDecimal("8"); // Heures standard par jour

    public PointageServiceImpl(PointageRepository repo,HoraireRepository h) {
        this.repo = repo;
        this.horaireRepository = h;
    }

    @Override
    @Transactional
    public Pointage save(Pointage p) {
        return repo.save(p);
    }

    @Override
    @Transactional
    public Pointage create(LocalTime debut, LocalTime fin, LocalTime pauseD, LocalTime pauseF, LocalDate jour,
            Employer emp) {
        Pointage existingPointage = null;
        try {
            Horaire h = horaireRepository.findByDepartementId(emp.getIdDepartement());
            existingPointage = new Pointage().create(debut, fin, pauseD, pauseF, jour, emp,h);
        } catch (Exception e) {
            throw e;
        }
        return repo.save(existingPointage);
    }
    public Pointage saveWithCalculations(Pointage p) {
        if (p.getIdEmploye() == null || p.getDatePointage() == null ||
                p.getHeureEntree() == null || p.getHeureSortie() == null) {
            throw new IllegalArgumentException("Les champs obligatoires sont manquants");
        }

        // Valider que l'heure de sortie est après l'heure d'entrée
        if (p.getHeureSortie().isBefore(p.getHeureEntree())) {
            throw new IllegalArgumentException("L'heure de sortie doit être après l'heure d'entrée");
        }

        // Calculer les heures travaillées
        calculateHeuresTravaillees(p);

        // Calculer les retards
        calculateRetard(p);

        // Calculer les heures supplémentaires
        calculateHeuresSupplementaires(p);

        // Définir le statut
        p.setStatut("VALIDE");

        return repo.save(p);
    }

    @Override
    @Transactional
    public Pointage updateWithCalculations(Pointage p) {
        if (p.getId() == null) {
            throw new IllegalArgumentException("L'ID du pointage est manquant");
        }

        // Récupérer le pointage existant
        Pointage existing = repo.findById(p.getId())
                .orElseThrow(() -> new IllegalArgumentException("Pointage non trouvé"));

        // Mettre à jour les champs
        existing.setIdEmploye(p.getIdEmploye());
        existing.setDatePointage(p.getDatePointage());
        existing.setHeureEntree(p.getHeureEntree());
        existing.setHeureSortie(p.getHeureSortie());
        existing.setPauseDebut(p.getPauseDebut());
        existing.setPauseFin(p.getPauseFin());

        // Recalculer
        calculateHeuresTravaillees(existing);
        calculateRetard(existing);
        calculateHeuresSupplementaires(existing);
        existing.setStatut("VALIDE");

        return repo.save(existing);
    }

    @Override
    public Pointage findByEmployeAndDate(Integer idEmploye, LocalDate datePointage) {
        return repo.findByIdEmployeAndDatePointage(idEmploye, datePointage).orElse(null);
    }
    @Override
    public Pointage findById(Integer id) {
        return repo.findById(id).orElse(null);

    @Override
    public List<Pointage> findByEmployeAndDateRange(Integer idEmploye, LocalDate dateDebut, LocalDate dateFin) {
        return repo.findByIdEmployeAndDatePointageBetween(idEmploye, dateDebut, dateFin);
    }

    @Override
    public List<Pointage> findByEmployeAndMonth(Integer idEmploye, Integer mois, Integer annee) {
        LocalDate debut = LocalDate.of(annee, mois, 1);
        LocalDate fin = debut.plusMonths(1).minusDays(1);
        return findByEmployeAndDateRange(idEmploye, debut, fin);
    }

    @Override
    @Transactional
    public void delete(Integer idPointage) {
        repo.deleteById(idPointage);
    }

    @Override
    public Map<String, Object> getStatistiquesPointage(Integer idEmploye, Integer mois, Integer annee) {
        List<Pointage> pointages = findByEmployeAndMonth(idEmploye, mois, annee);

        Map<String, Object> stats = new LinkedHashMap<>();
        
        if (pointages.isEmpty()) {
            stats.put("heures_travaillees_total", BigDecimal.ZERO);
            stats.put("heures_supplementaires_total", BigDecimal.ZERO);
            stats.put("retards_total_minutes", 0);
            stats.put("nombre_jours_travailles", 0);
            stats.put("nombre_jours_avec_retard", 0);
            return stats;
        }

        BigDecimal totalHeures = pointages.stream()
                .map(Pointage::getHeuresTravaillees)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalHeuresSupp = pointages.stream()
                .map(Pointage::getHeuresSupplementaires)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        int totalRetardMinutes = pointages.stream()
                .map(Pointage::getRetardMinutes)
                .filter(Objects::nonNull)
                .mapToInt(Integer::intValue)
                .sum();

        long joursAvecRetard = pointages.stream()
                .filter(p -> p.getRetardMinutes() != null && p.getRetardMinutes() > 0)
                .count();

        stats.put("heures_travaillees_total", totalHeures);
        stats.put("heures_supplementaires_total", totalHeuresSupp);
        stats.put("retards_total_minutes", totalRetardMinutes);
        stats.put("nombre_jours_travailles", pointages.size());
        stats.put("nombre_jours_avec_retard", joursAvecRetard);
        stats.put("moyenne_heures_par_jour", totalHeures.divide(new BigDecimal(pointages.size()), 2, RoundingMode.HALF_UP));

        return stats;
    }

    @Override
    public List<Map<String, Object>> getRetardsPeriode(Integer idEmploye, LocalDate dateDebut, LocalDate dateFin) {
        List<Pointage> pointages = findByEmployeAndDateRange(idEmploye, dateDebut, dateFin);

        return pointages.stream()
                .filter(p -> p.getRetardMinutes() != null && p.getRetardMinutes() > 0)
                .map(p -> {
                    Map<String, Object> retard = new LinkedHashMap<>();
                    retard.put("date", p.getDatePointage());
                    retard.put("heure_entree", p.getHeureEntree());
                    retard.put("retard_minutes", p.getRetardMinutes());
                    retard.put("heures_travaillees", p.getHeuresTravaillees());
                    return retard;
                })
                .collect(Collectors.toList());
    }

    @Override
    public Map<String, Object> getTotalHeuresSupplementaires(Integer idEmploye, Integer mois, Integer annee) {
        List<Pointage> pointages = findByEmployeAndMonth(idEmploye, mois, annee);

        BigDecimal totalHeuresSupp = pointages.stream()
                .map(Pointage::getHeuresSupplementaires)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("total_heures_supplementaires", totalHeuresSupp);
        result.put("nombre_jours_avec_heures_supp", pointages.stream()
                .filter(p -> p.getHeuresSupplementaires() != null && p.getHeuresSupplementaires().compareTo(BigDecimal.ZERO) > 0)
                .count());
        result.put("mois", mois);
        result.put("annee", annee);

        return result;
    }

    /**
     * Calcule les heures travaillées : entrée - sortie - (pause_fin - pause_début)
     */
    private void calculateHeuresTravaillees(Pointage p) {
        LocalTime entree = p.getHeureEntree();
        LocalTime sortie = p.getHeureSortie();
        LocalTime pauseDebut = p.getPauseDebut();
        LocalTime pauseFin = p.getPauseFin();

        // Calculer les minutes totales de travail
        long minutesTotales = java.time.temporal.ChronoUnit.MINUTES.between(entree, sortie);

        // Soustraire les minutes de pause si elles existent
        if (pauseDebut != null && pauseFin != null && pauseFin.isAfter(pauseDebut)) {
            long minutesPause = java.time.temporal.ChronoUnit.MINUTES.between(pauseDebut, pauseFin);
            minutesTotales -= minutesPause;
        }

        // Convertir en heures (avec 2 décimales)
        BigDecimal heures = new BigDecimal(minutesTotales).divide(new BigDecimal("60"), 2, RoundingMode.HALF_UP);
        p.setHeuresTravaillees(heures);
    }

    /**
     * Calcule les retards :
     * - Si le retard <= 5 minutes après l'entrée, l'employé n'est pas en retard
     * - Sinon, calculer les minutes de retard
     * 
     * Heure d'entrée standard : 08:00
     */
    private void calculateRetard(Pointage p) {
        LocalTime heureEntree = p.getHeureEntree();
        
        // Heure d'entrée standard (8h00)
        LocalTime heureStandard = LocalTime.of(8, 0);

        // Calculer la différence en minutes
        long retardMinutes = java.time.temporal.ChronoUnit.MINUTES.between(heureStandard, heureEntree);

        if (retardMinutes <= 0) {
            // Employé à l'heure ou plus tôt
            p.setRetardMinutes(0);
        } else if (retardMinutes <= TOLERANCE_RETARD_MINUTES) {
            // Retard dans la tolérance (5 min)
            p.setRetardMinutes(0); // Pas compté comme retard
        } else {
            // Retard au-delà de la tolérance
            p.setRetardMinutes((int) (retardMinutes - TOLERANCE_RETARD_MINUTES));
        }
    }

    /**
     * Calcule les heures supplémentaires :
     * - Si heures travaillées > 8h par jour, c'est des heures supplémentaires
     * - Ou si la semaine dépasse 40h
     */
    private void calculateHeuresSupplementaires(Pointage p) {
        BigDecimal heuresTravaillees = p.getHeuresTravaillees();

        if (heuresTravaillees == null) {
            p.setHeuresSupplementaires(BigDecimal.ZERO);
            return;
        }

        // Heures supplémentaires = heures travaillées - 8h
        if (heuresTravaillees.compareTo(HEURES_TRAVAIL_STANDARD) > 0) {
            BigDecimal heuresSupp = heuresTravaillees.subtract(HEURES_TRAVAIL_STANDARD);
            p.setHeuresSupplementaires(heuresSupp);
        } else {
            p.setHeuresSupplementaires(BigDecimal.ZERO);
        }
    }
}
