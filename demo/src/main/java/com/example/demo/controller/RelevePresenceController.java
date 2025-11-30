package com.example.demo.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.RelevePresence;
import com.example.demo.service.RelevePresenceService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/releves-presence")
public class RelevePresenceController {

    private final RelevePresenceService relevePresenceService;

    public RelevePresenceController(RelevePresenceService relevePresenceService) {
        this.relevePresenceService = relevePresenceService;
    }

    @GetMapping("/employe/{idEmploye}")
    public ResponseEntity<RelevePresence> getOrGenerateReleve(
            @PathVariable Integer idEmploye,
            @RequestParam Integer mois,
            @RequestParam Integer annee) {

        RelevePresence releve = relevePresenceService.generateOrGetReleve(idEmploye, mois, annee);
        return (releve != null) ? ResponseEntity.ok(releve) : ResponseEntity.notFound().build();
    }

    @GetMapping("/employe/{idEmploye}/by-date")
    public ResponseEntity<RelevePresence> getReleveByDate(
            @PathVariable Integer idEmploye,
            @RequestParam String date) {

        try {
            LocalDate d = LocalDate.parse(date);
            RelevePresence releve = relevePresenceService.generateOrGetReleve(idEmploye, d.getMonthValue(), d.getYear());
            return (releve != null) ? ResponseEntity.ok(releve) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/employe/{idEmploye}/periodes")
    public ResponseEntity<List<RelevePresence>> getRelevesPeriod(
            @PathVariable Integer idEmploye,
            @RequestParam Integer mois,
            @RequestParam Integer annee,
            @RequestParam(defaultValue = "1") Integer nbMois) {

        List<RelevePresence> releves = relevePresenceService.getRelevesPeriod(idEmploye, mois, annee, nbMois);
        return ResponseEntity.ok(releves);
    }

    @PutMapping("/{id}/valider")
    public ResponseEntity<RelevePresence> validerReleve(@PathVariable Integer id) {
        try {
            RelevePresence releve = relevePresenceService.validerReleve(id);
            return ResponseEntity.ok(releve);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

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

    @GetMapping("/employe/{idEmploye}/pdf-download")
    public ResponseEntity<ByteArrayResource> downloadPdf(
            @PathVariable Integer idEmploye,
            @RequestParam Integer mois,
            @RequestParam Integer annee) {

        try {
            byte[] pdf = relevePresenceService.generatePdfBytes(idEmploye, mois, annee);
            if (pdf == null || pdf.length == 0) return ResponseEntity.noContent().build();

            ByteArrayResource resource = new ByteArrayResource(pdf);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentLength(pdf.length);
            headers.setContentDispositionFormData("attachment", String.format("releve_%d_%d.pdf", mois, annee));

            return ResponseEntity.ok().headers(headers).body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}/paie")
    public ResponseEntity<Map<String, Object>> getInfosPaie(@PathVariable Integer id) {
        Map<String, Object> infos = relevePresenceService.getInfosPaieFromReleve(id);
        return (infos != null) ? ResponseEntity.ok(infos) : ResponseEntity.notFound().build();
    }

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

    @GetMapping("/employe/{idEmploye}/absences-resume")
    public ResponseEntity<Map<String, Object>> getAbsencesResume(
            @PathVariable Integer idEmploye,
            @RequestParam Integer mois,
            @RequestParam Integer annee) {

        Map<String, Object> resume = relevePresenceService.getAbsencesResume(idEmploye, mois, annee);
        return ResponseEntity.ok(resume);
    }

    @GetMapping("/{id}/detail-heures")
    public ResponseEntity<Map<String, Object>> getDetailHeures(@PathVariable Integer id) {
        Map<String, Object> detail = relevePresenceService.getDetailHeures(id);
        return (detail != null) ? ResponseEntity.ok(detail) : ResponseEntity.notFound().build();
    }
}
