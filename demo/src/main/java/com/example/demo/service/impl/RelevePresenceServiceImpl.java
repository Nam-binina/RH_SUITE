package com.example.demo.service.impl;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.HistoriqueAbsence;
import com.example.demo.model.Pointage;
import com.example.demo.model.RelevePresence;
import com.example.demo.repository.HistoriqueAbsenceRepository;
import com.example.demo.repository.PointageRepository;
import com.example.demo.repository.RelevePresenceRepository;
import com.example.demo.service.RelevePresenceService;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import java.io.ByteArrayOutputStream;

@Service
public class RelevePresenceServiceImpl implements RelevePresenceService {

    private final RelevePresenceRepository releveRepo;
    private final PointageRepository pointageRepo;
    private final HistoriqueAbsenceRepository absenceRepo;

    public RelevePresenceServiceImpl(RelevePresenceRepository releveRepo,
                                     PointageRepository pointageRepo,
                                     HistoriqueAbsenceRepository absenceRepo) {
        this.releveRepo = releveRepo;
        this.pointageRepo = pointageRepo;
        this.absenceRepo = absenceRepo;
    }

    @Override
    @Transactional
    public RelevePresence generateOrGetReleve(Integer idEmploye, int mois, int annee) {
        // Chercher si un relevé existe déjà
        Optional<RelevePresence> existing = releveRepo.findByIdEmployeAndMoisAndAnnee(idEmploye, mois, annee);
        
        if (existing.isPresent()) {
            return existing.get();
        }

        // Sinon, générer un nouveau relevé basé sur les pointages
        return recalculateReleve(idEmploye, mois, annee);
    }

    @Override
    @Transactional
    public RelevePresence recalculateReleve(Integer idEmploye, Integer mois, Integer annee) {
        // Récupérer tous les pointages du mois
        LocalDate debut = LocalDate.of(annee, mois, 1);
        LocalDate fin = debut.plusMonths(1).minusDays(1);
        
        List<Pointage> pointages = pointageRepo.findByIdEmployeAndDatePointageBetween(idEmploye, debut, fin);

        RelevePresence releve = new RelevePresence();
        releve.setIdEmploye(idEmploye);
        releve.setMois(mois);
        releve.setAnnee(annee);

        // Calculer les statistiques
        if (!pointages.isEmpty()) {
            // Nombre de jours travaillés
            releve.setJoursTravailles(pointages.size());

            // Total heures supplémentaires
            BigDecimal totalHeuresSupp = pointages.stream()
                    .map(Pointage::getHeuresSupplementaires)
                    .filter(Objects::nonNull)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            releve.setHeuresSuppTotal(totalHeuresSupp);

            // Total retards en minutes
            Integer totalRetards = pointages.stream()
                    .map(Pointage::getRetardMinutes)
                    .filter(Objects::nonNull)
                    .mapToInt(Integer::intValue)
                    .sum();
            releve.setRetardsTotal(totalRetards);
        } else {
            releve.setJoursTravailles(0);
            releve.setHeuresSuppTotal(BigDecimal.ZERO);
            releve.setRetardsTotal(0);
        }

        // Compter les absences non justifiées
        List<HistoriqueAbsence> absences = absenceRepo.findByIdEmployeAndDateAbsenceBetween(idEmploye, debut, fin);
        long absencesNonJustifiees = absences.stream()
                .filter(a -> !a.getJustifiee())
                .count();
        releve.setAbsencesNonJustifiees((int) absencesNonJustifiees);

        // Non validé par défaut
        releve.setValide(false);

        return releveRepo.save(releve);
    }

    @Override
    public List<RelevePresence> getRelevesPeriod(Integer idEmploye, Integer mois, Integer annee, Integer nbMois) {
        List<RelevePresence> releves = new ArrayList<>();
        
        for (int i = 0; i < nbMois; i++) {
            YearMonth ym = YearMonth.of(annee, mois).plusMonths(i);
            RelevePresence releve = generateOrGetReleve(idEmploye, ym.getMonthValue(), ym.getYear());
            if (releve != null) {
                releves.add(releve);
            }
        }
        
        return releves;
    }

    @Override
    @Transactional
    public RelevePresence validerReleve(Integer idReleve) {
        RelevePresence releve = releveRepo.findById(idReleve)
                .orElseThrow(() -> new IllegalArgumentException("Relevé non trouvé"));

        if (releve.getValide()) {
            throw new IllegalArgumentException("Ce relevé est déjà validé");
        }

        releve.setValide(true);
        releve.setDateValidation(LocalDateTime.now());

        return releveRepo.save(releve);
    }

    @Override
    public Map<String, String> generatePdf(Integer idEmploye, Integer mois, Integer annee) throws Exception {
        RelevePresence releve = generateOrGetReleve(idEmploye, mois, annee);
        
        if (releve == null) {
            throw new IllegalArgumentException("Impossible de générer le PDF");
        }

        // TODO: Implémenter la génération PDF avec une librairie comme iText ou Apache PDFBox
        // Pour compatibilité, générer les bytes et renvoyer un message avec taille
        byte[] pdf = generatePdfBytes(idEmploye, mois, annee);
        Map<String, String> result = new LinkedHashMap<>();
        result.put("status", "generated");
        result.put("releve_id", releve.getId().toString());
        result.put("size_bytes", String.valueOf(pdf.length));

        return result;
    }

    @Override
    public byte[] generatePdfBytes(Integer idEmploye, Integer mois, Integer annee) throws Exception {
        RelevePresence releve = generateOrGetReleve(idEmploye, mois, annee);
        if (releve == null) throw new IllegalArgumentException("Relevé introuvable");

        LocalDate debut = LocalDate.of(annee, mois, 1);
        LocalDate fin = debut.plusMonths(1).minusDays(1);
        List<Pointage> pointages = pointageRepo.findByIdEmployeAndDatePointageBetween(idEmploye, debut, fin);

        try (PDDocument doc = new PDDocument()) {
            PDPage page = new PDPage(PDRectangle.LETTER);
            doc.addPage(page);

            try (PDPageContentStream cs = new PDPageContentStream(doc, page)) {
                cs.beginText();
                cs.setFont(PDType1Font.HELVETICA_BOLD, 14);
                cs.newLineAtOffset(50, 750);
                cs.showText("Relevé de présence - Employe: " + idEmploye + " - " + mois + "/" + annee);
                cs.endText();

                float y = 720f;
                cs.setFont(PDType1Font.HELVETICA, 10);

                // Totaux
                cs.beginText();
                cs.newLineAtOffset(50, y);
                cs.showText("Jours travaillés: " + releve.getJoursTravailles());
                cs.endText();
                y -= 15;

                cs.beginText();
                cs.newLineAtOffset(50, y);
                cs.showText("Heures supp total: " + (releve.getHeuresSuppTotal() != null ? releve.getHeuresSuppTotal().toString() : "0"));
                cs.endText();
                y -= 15;

                cs.beginText();
                cs.newLineAtOffset(50, y);
                cs.showText("Retards total (min): " + releve.getRetardsTotal());
                cs.endText();
                y -= 25;

                // Header table
                cs.beginText();
                cs.newLineAtOffset(50, y);
                cs.setFont(PDType1Font.HELVETICA_BOLD, 10);
                cs.showText("Date       Entree   Sortie   PauseDebut   PauseFin   Heures   Retard(min)");
                cs.endText();
                y -= 12;

                cs.setFont(PDType1Font.HELVETICA, 9);
                for (Pointage p : pointages) {
                    if (y < 50) {
                        cs.close();
                        page = new PDPage(PDRectangle.LETTER);
                        doc.addPage(page);
                        y = 750f;
                    }

                    cs.beginText();
                    cs.newLineAtOffset(50, y);
                    String line = String.format("%s   %s   %s   %s   %s   %s   %s",
                            p.getDatePointage(),
                            p.getHeureEntree() != null ? p.getHeureEntree().toString() : "-",
                            p.getHeureSortie() != null ? p.getHeureSortie().toString() : "-",
                            p.getPauseDebut() != null ? p.getPauseDebut().toString() : "-",
                            p.getPauseFin() != null ? p.getPauseFin().toString() : "-",
                            p.getHeuresTravaillees() != null ? p.getHeuresTravaillees().toString() : "0",
                            p.getRetardMinutes() != null ? p.getRetardMinutes().toString() : "0");
                    cs.showText(line);
                    cs.endText();
                    y -= 12;
                }
            }

            try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
                doc.save(baos);
                return baos.toByteArray();
            }
        }
    }

    @Override
    public Map<String, Object> getInfosPaieFromReleve(Integer idReleve) {
        RelevePresence releve = releveRepo.findById(idReleve).orElse(null);
        
        if (releve == null) {
            return null;
        }

        Map<String, Object> infos = new LinkedHashMap<>();
        infos.put("id_employe", releve.getIdEmploye());
        infos.put("mois", releve.getMois());
        infos.put("annee", releve.getAnnee());
        infos.put("jours_travailles", releve.getJoursTravailles());
        infos.put("heures_supplementaires", releve.getHeuresSuppTotal());
        infos.put("retards_minutes", releve.getRetardsTotal());
        infos.put("absences_non_justifiees", releve.getAbsencesNonJustifiees());
        infos.put("valide", releve.getValide());
        infos.put("date_validation", releve.getDateValidation());

        return infos;
    }

    @Override
    public Map<String, Object> getAbsencesResume(Integer idEmploye, Integer mois, Integer annee) {
        LocalDate debut = LocalDate.of(annee, mois, 1);
        LocalDate fin = debut.plusMonths(1).minusDays(1);

        List<HistoriqueAbsence> absences = absenceRepo.findByIdEmployeAndDateAbsenceBetween(idEmploye, debut, fin);

        Map<String, Object> resume = new LinkedHashMap<>();
        
        long nonJustifiees = absences.stream().filter(a -> !a.getJustifiee()).count();
        long justifiees = absences.stream().filter(HistoriqueAbsence::getJustifiee).count();
        long avecCertificat = absences.stream().filter(a -> a.getCertificatMedical() != null && a.getCertificatMedical()).count();

        resume.put("total_absences", absences.size());
        resume.put("absences_justifiees", justifiees);
        resume.put("absences_non_justifiees", nonJustifiees);
        resume.put("absences_avec_certificat_medical", avecCertificat);
        
        // Détail par type
        Map<String, Long> parType = absences.stream()
                .collect(Collectors.groupingBy(HistoriqueAbsence::getTypeAbsence, Collectors.counting()));
        resume.put("par_type", parType);

        return resume;
    }

    @Override
    public Map<String, Object> getDetailHeures(Integer idReleve) {
        RelevePresence releve = releveRepo.findById(idReleve).orElse(null);
        
        if (releve == null) {
            return null;
        }

        // Récupérer les pointages du mois
        LocalDate debut = LocalDate.of(releve.getAnnee(), releve.getMois(), 1);
        LocalDate fin = debut.plusMonths(1).minusDays(1);
        List<Pointage> pointages = pointageRepo.findByIdEmployeAndDatePointageBetween(releve.getIdEmploye(), debut, fin);

        Map<String, Object> detail = new LinkedHashMap<>();

        // Calculer les heures
        BigDecimal totalHeures = pointages.stream()
                .map(Pointage::getHeuresTravaillees)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal heuresNormales = totalHeures.min(new BigDecimal(releve.getJoursTravailles() * 8));
        BigDecimal heuresSupplementaires = releve.getHeuresSuppTotal() != null ? releve.getHeuresSuppTotal() : BigDecimal.ZERO;

        detail.put("heures_normales", heuresNormales);
        detail.put("heures_supplementaires", heuresSupplementaires);
        detail.put("total_heures", totalHeures);
        detail.put("retards_minutes", releve.getRetardsTotal());
        detail.put("absences_non_justifiees", releve.getAbsencesNonJustifiees());
        detail.put("nombre_jours_travailles", releve.getJoursTravailles());

        return detail;
    }
}