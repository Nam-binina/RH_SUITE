package com.example.demo.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.core.io.ByteArrayResource;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.RelevePresence;
import com.example.demo.service.RelevePresenceService;

/**
 * Contrôleur pour la gestion des relevés de présence
 * Génère et récupère les relevés mensuels, interface avec la paie
 */
@RestController
@RequestMapping("/releves-presence")
public class RelevePresenceController {

    private final RelevePresenceService relevePresenceService;

    public RelevePresenceController(RelevePresenceService relevePresenceService) {
        this.relevePresenceService = relevePresenceService;
    }

    /**
     * Génère ou récupère le relevé de présence pour un employé et une période
     * Calcule automatiquement les statistiques basées sur les pointages
     *
     * @param idEmploye Identifiant de l'employé
     * @param mois      Mois (1-12)
     * @param annee     Année
     * @return Le relevé généré ou trouvé
     */
    @GetMapping("/employe/{idEmploye}")
    public ResponseEntity<RelevePresence> getOrGenerateReleve(
            @PathVariable Integer idEmploye,
            @RequestParam Integer mois,
            @RequestParam Integer annee) {
        RelevePresence releve = relevePresenceService.generateOrGetReleve(idEmploye, mois, annee);
        
        if (releve != null) {
            return ResponseEntity.ok(releve);
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Récupère le relevé à partir d'une date complète (format ISO yyyy-MM-dd)
     * Extrait le mois et l'année et appelle le service existant
     */
    @GetMapping("/employe/{idEmploye}/by-date")
    public ResponseEntity<RelevePresence> getReleveByDate(
            @PathVariable Integer idEmploye,
            @RequestParam String date) {
        try {
            LocalDate d = LocalDate.parse(date);
            int mois = d.getMonthValue();
            int annee = d.getYear();
            RelevePresence releve = relevePresenceService.generateOrGetReleve(idEmploye, mois, annee);
            if (releve != null) {
                return ResponseEntity.ok(releve);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Récupère les relevés d'un employé pour une période
     *
     * @param idEmploye Identifiant de l'employé
     * @param mois      Mois de début (1-12)
     * @param annee     Année
     * @param nbMois    Nombre de mois à récupérer (optionnel, défaut 1)
     * @return Liste des relevés
     */
    @GetMapping("/employe/{idEmploye}/periodes")
    public ResponseEntity<List<RelevePresence>> getRelevesPeriod(
            @PathVariable Integer idEmploye,
            @RequestParam Integer mois,
            @RequestParam Integer annee,
            @RequestParam(defaultValue = "1") Integer nbMois) {
        List<RelevePresence> releves = relevePresenceService.getRelevesPeriod(idEmploye, mois, annee, nbMois);
        return ResponseEntity.ok(releves);
    }

    /**
     * Valide un relevé de présence et l'enverrouille pour la paie
     *
     * @param id Identifiant du relevé
     * @return Le relevé validé
     */
    @PutMapping("/{id}/valider")
    public ResponseEntity<RelevePresence> validerReleve(@PathVariable Integer id) {
        try {
            RelevePresence releve = relevePresenceService.validerReleve(id);
            return ResponseEntity.ok(releve);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Exporte le relevé au format PDF
     * (Intégration avec la génération de rapport)
     *
     * @param idEmploye Identifiant de l'employé
     * @param mois      Mois (1-12)
     * @param annee     Année
     * @return URL ou base64 du PDF généré
     */
    @GetMapping("/employe/{idEmploye}/pdf")
    public ResponseEntity<Map<String, String>> exportPdf(
            @PathVariable Integer idEmploye,
            @RequestParam Integer mois,
            @RequestParam Integer annee) {
        try {
            Map<String, String> result = relevePresenceService.generatePdf(idEmploye, mois, annee);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Télécharge le PDF du relevé directement (Content-Type: application/pdf)
     */
    @GetMapping("/employe/{idEmploye}/pdf-download")
    public ResponseEntity<ByteArrayResource> downloadPdf(
            @PathVariable Integer idEmploye,
            @RequestParam Integer mois,
            @RequestParam Integer annee) {
        try {
            byte[] pdf = relevePresenceService.generatePdfBytes(idEmploye, mois, annee);
            if (pdf == null || pdf.length == 0) {
                return ResponseEntity.noContent().build();
            }

            ByteArrayResource resource = new ByteArrayResource(pdf);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentLength(pdf.length);
            headers.setContentDispositionFormData("attachment", String.format("releve_%d_%d.pdf", mois, annee));

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Récupère les informations de paie associées au relevé
     * (Interface avec la paie)
     *
     * @param id Identifiant du relevé
     * @return Informations de paie (heures travaillées, heures supp, retards, etc.)
     */
    @GetMapping("/{id}/paie")
    public ResponseEntity<Map<String, Object>> getInfosPaie(@PathVariable Integer id) {
        Map<String, Object> infos = relevePresenceService.getInfosPaieFromReleve(id);
        
        if (infos != null) {
            return ResponseEntity.ok(infos);
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Recalcule un relevé existant en se basant sur les pointages actuels
     *
     * @param idEmploye Identifiant de l'employé
     * @param mois      Mois (1-12)
     * @param annee     Année
     * @return Le relevé recalculé
     */
    @PostMapping("/employe/{idEmploye}/recalculer")
    public ResponseEntity<RelevePresence> recalculerReleve(
            @PathVariable Integer idEmploye,
            @RequestParam Integer mois,
            @RequestParam Integer annee) {
        try {
            RelevePresence releve = relevePresenceService.recalculateReleve(idEmploye, mois, annee);
            return ResponseEntity.ok(releve);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Obtient un résumé des absences pour une période
     *
     * @param idEmploye Identifiant de l'employé
     * @param mois      Mois (1-12)
     * @param annee     Année
     * @return Résumé des absences (justifiées, non justifiées, congés, etc.)
     */
    @GetMapping("/employe/{idEmploye}/absences-resume")
    public ResponseEntity<Map<String, Object>> getAbsencesResume(
            @PathVariable Integer idEmploye,
            @RequestParam Integer mois,
            @RequestParam Integer annee) {
        Map<String, Object> resume = relevePresenceService.getAbsencesResume(idEmploye, mois, annee);
        return ResponseEntity.ok(resume);
    }

    /**
     * Récupère le détail des heures pour un relevé
     *
     * @param id Identifiant du relevé
     * @return Détail des heures (normales, supplémentaires, retards, pauses)
     */
    @GetMapping("/{id}/detail-heures")
    public ResponseEntity<Map<String, Object>> getDetailHeures(@PathVariable Integer id) {
        Map<String, Object> detail = relevePresenceService.getDetailHeures(id);
        
        if (detail != null) {
            return ResponseEntity.ok(detail);
        }
        return ResponseEntity.notFound().build();
    }

}
