package com.example.demo.controller;

import com.example.demo.model.Employer;
import com.example.demo.model.FichePaie;
import com.example.demo.service.EmployerService;
import com.example.demo.service.FichePaieService;
import com.example.demo.export.FichePaieExporter;
import org.springframework.http.ResponseEntity;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.time.LocalDate;
import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/fiche")
public class FichePayeController {

    private final FichePaieService fichePaieService;
    private final EmployerService employerService;

    @Autowired
    public FichePayeController(FichePaieService fichePaieService, EmployerService employerService) {
        this.fichePaieService = fichePaieService;
        this.employerService = employerService;
    }

    @PostMapping("/save")
    public FichePaie saveFiche(@RequestBody FichePaie fichePaie) {
        FichePaie saved = fichePaieService.save(fichePaie);
        return saved;
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<FichePaie> updateFiche(@PathVariable Integer id, @RequestBody FichePaie fichePaie) {
        FichePaie ficheToUpdate = fichePaieService.findById(id)
                .orElse(null);

        if (ficheToUpdate == null) {
            return ResponseEntity.notFound().build();
        }

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
    }

    @GetMapping("/employe/{idEmploye}/mois/{mois}/annee/{annee}")
    public FichePaie getFicheByEmployeAndMoisAnnee(@PathVariable LocalDate date,HttpSession session) {
        Employer e = (Employer) session.getAttribute("employer");
        FichePaie fiche = fichePaieService.findByIdEmployeAndMoisAndAnnee(e.getId(), date.getMonthValue(),
                date.getYear()).get();

        return fiche;
    }

    @GetMapping("/fichePaie/{id}")
    public ResponseEntity<byte[]> export(@PathVariable Integer id, HttpSession session) throws IOException {
        //Employer es = (Employer) session.getAttribute("employer");
        Employer es = employerService.getEmployerById(1).get();

        FichePaie fiche = fichePaieService.findById(id).get();
        try {
            if (fiche.getIdEmploye() != es.getId()) {
                return ResponseEntity.status(403).build();
            }
        } catch (Exception e) {
            throw e;
        }
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        FichePaieExporter.exportFichePaieToStream(es, fiche, out);

        byte[] excelContent = out.toByteArray();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=fichePaie.xlsx");
        return ResponseEntity.ok()
                .headers(headers)
                .body(excelContent);
    }
}
