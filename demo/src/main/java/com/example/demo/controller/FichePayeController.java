package com.example.demo.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Employer;
import com.example.demo.model.FichePaie;
import com.example.demo.service.EmployerService;
import com.example.demo.service.FichePaieService;
import com.example.demo.export.FichePaieExporter;

import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/fiche-paie")
public class FichePayeController {

    private final FichePaieService fichePaieService;
    private final EmployerService employerService;

    public FichePayeController(FichePaieService fichePaieService, EmployerService employerService) {
        this.fichePaieService = fichePaieService;
        this.employerService = employerService;
    }

    // Créer une fiche de paie
    @PostMapping("/save")
    public ResponseEntity<FichePaie> saveFiche(@RequestBody FichePaie fichePaie) {
        FichePaie saved = fichePaieService.save(fichePaie);
        return ResponseEntity.ok(saved);
    }

    // Mettre à jour une fiche de paie
    @PutMapping("/update/{id}")
    public ResponseEntity<FichePaie> updateFiche(@PathVariable Integer id, @RequestBody FichePaie fichePaie) {
        return fichePaieService.findById(id)
                .map(ficheToUpdate -> {
                    ficheToUpdate.setSalaireBrut(fichePaie.getSalaireBrut());
                    ficheToUpdate.setHeuresSupplementaires(fichePaie.getHeuresSupplementaires());
                    ficheToUpdate.setPrimes(fichePaie.getPrimes());
                    ficheToUpdate.setAutresGains(fichePaie.getAutresGains());
                    ficheToUpdate.setTotalBrut(fichePaie.getTotalBrut());
                    ficheToUpdate.setCnaps(fichePaie.getCnaps());
                    ficheToUpdate.setOstie(fichePaie.getOstie());
                    ficheToUpdate.setIrsa(fichePaie.getIrsa());
                    ficheToUpdate.setTotalRetenues(fichePaie.getTotalRetenues());
                    ficheToUpdate.setNetAPayer(fichePaie.getNetAPayer());
                    ficheToUpdate.setStatut(fichePaie.getStatut());
                    FichePaie updated = fichePaieService.save(ficheToUpdate);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Récupérer la fiche d'un employé pour un mois et une année
    @GetMapping("/employe/{idEmploye}/mois/{mois}/annee/{annee}")
    public ResponseEntity<FichePaie> getFicheByEmployeAndMoisAnnee(
            @PathVariable Integer idEmploye,
            @PathVariable int mois,
            @PathVariable int annee,
            HttpSession session) {

        return fichePaieService.findByIdEmployeAndMoisAndAnnee(idEmploye, mois, annee)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Exporter la fiche en fichier Excel
    @GetMapping("/export/{id}")
    public ResponseEntity<byte[]> export(@PathVariable Integer id, HttpSession session) throws IOException {
        Employer es = employerService.getEmployerById(1).orElse(null); // temporaire, à remplacer par session si nécessaire
        if (es == null) return ResponseEntity.status(403).build();

        FichePaie fiche = fichePaieService.findById(id).orElse(null);
        if (fiche == null || fiche.getIdEmploye() != es.getId()) {
            return ResponseEntity.status(403).build();
        }

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        FichePaieExporter.exportFichePaieToStream(es, fiche, out);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=fichePaie.xlsx");

        return ResponseEntity.ok()
                .headers(headers)
                .body(out.toByteArray());
    }
}
