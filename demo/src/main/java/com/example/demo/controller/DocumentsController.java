package com.example.demo.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.DocumentsEmploye;
import com.example.demo.repository.DocumentsEmployeRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/documents")
public class DocumentsController {

    private final DocumentsEmployeRepository documentsRepo;

    public DocumentsController(DocumentsEmployeRepository documentsRepo) {
        this.documentsRepo = documentsRepo;
    }

    @GetMapping("/employe/{id}")
    public List<DocumentsEmploye> listDocumentsByEmploye(@PathVariable Integer id) {
        return documentsRepo.findAll().stream()
                .filter(d -> d.getIdEmploye() != null && d.getIdEmploye().equals(id))
                .toList();
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<ByteArrayResource> downloadDocument(@PathVariable Integer id) {
        var optional = documentsRepo.findById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        DocumentsEmploye doc = optional.get();
        String chemin = doc.getCheminFichier();
        if (chemin == null || chemin.isBlank()) {
            return ResponseEntity.notFound().build();
        }

        Path file = Paths.get(chemin);
        if (!Files.exists(file)) {
            return ResponseEntity.notFound().build();
        }

        try {
            byte[] bytes = Files.readAllBytes(file);
            ByteArrayResource resource = new ByteArrayResource(bytes);

            String nom = doc.getNomFichier() != null ? doc.getNomFichier() : file.getFileName().toString();
            String contentType = Files.probeContentType(file);
            if (contentType == null) contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType(contentType));
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + nom + "\"");

            return ResponseEntity.ok().headers(headers).contentLength(bytes.length).body(resource);
        } catch (IOException e) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/employe/{id}/export-xlsx")
    public ResponseEntity<ByteArrayResource> exportDocumentsXlsx(@PathVariable Integer id) {
        List<DocumentsEmploye> docs = documentsRepo.findAll().stream()
                .filter(d -> d.getIdEmploye() != null && d.getIdEmploye().equals(id))
                .toList();

        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            XSSFSheet sheet = workbook.createSheet("Documents");
            int rowIdx = 0;
            Row header = sheet.createRow(rowIdx++);
            header.createCell(0).setCellValue("ID");
            header.createCell(1).setCellValue("Type");
            header.createCell(2).setCellValue("Nom fichier");
            header.createCell(3).setCellValue("Chemin");
            header.createCell(4).setCellValue("Date upload");

            DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

            for (DocumentsEmploye d : docs) {
                Row r = sheet.createRow(rowIdx++);
                Cell c0 = r.createCell(0); c0.setCellValue(d.getId());
                Cell c1 = r.createCell(1); c1.setCellValue(d.getTypeDocument() == null ? "" : d.getTypeDocument());
                Cell c2 = r.createCell(2); c2.setCellValue(d.getNomFichier() == null ? "" : d.getNomFichier());
                Cell c3 = r.createCell(3); c3.setCellValue(d.getCheminFichier() == null ? "" : d.getCheminFichier());
                Cell c4 = r.createCell(4); c4.setCellValue(d.getDateUpload() == null ? "" : d.getDateUpload().format(fmt));
            }

            // autosize columns
            for (int i = 0; i < 5; i++) sheet.autoSizeColumn(i);

            try (java.io.ByteArrayOutputStream out = new java.io.ByteArrayOutputStream()) {
                workbook.write(out);
                byte[] bytes = out.toByteArray();
                ByteArrayResource resource = new ByteArrayResource(bytes);
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
                headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=documents_employe_" + id + ".xlsx");
                return ResponseEntity.ok().headers(headers).contentLength(bytes.length).body(resource);
            }
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
