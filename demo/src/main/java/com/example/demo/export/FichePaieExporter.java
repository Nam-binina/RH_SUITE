package com.example.demo.export;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.IOException;
import java.io.OutputStream;
import java.math.RoundingMode;
import java.text.DecimalFormat;

import com.example.demo.model.Employer;
import com.example.demo.model.FichePaie;

public class FichePaieExporter {

    public static void exportFichePaieToStream(Employer employer, FichePaie fichePaie, OutputStream out)
            throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Fiche de Paie");

        // Largeurs de colonnes
        sheet.setColumnWidth(0, 6000);
        sheet.setColumnWidth(1, 5000);
        sheet.setColumnWidth(2, 6000);
        sheet.setColumnWidth(3, 8000);

        // Styles
        CellStyle headerStyle = workbook.createCellStyle();
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerStyle.setFont(headerFont);

        CellStyle boldStyle = workbook.createCellStyle();
        Font boldFont = workbook.createFont();
        boldFont.setBold(true);
        boldStyle.setFont(boldFont);

        CellStyle currencyStyle = workbook.createCellStyle();
        DataFormat format = workbook.createDataFormat();
        currencyStyle.setDataFormat(format.getFormat("#,##0.00"));

        DecimalFormat df = new DecimalFormat("#,##0.00");
        df.setRoundingMode(RoundingMode.HALF_UP);

        int rowNum = 0;

        // Titre
        Row titleRow = sheet.createRow(rowNum++);
        Cell titleCell = titleRow.createCell(1);
        titleCell.setCellValue("FICHE DE PAIE");
        titleCell.setCellStyle(headerStyle);

        rowNum++;

        // Informations employé
        Row row = sheet.createRow(rowNum++);
        row.createCell(0).setCellValue("Nom et Prénoms :");
        row.createCell(1).setCellValue(employer.getNom() + " " + employer.getPrenom());

        row = sheet.createRow(rowNum++);
        row.createCell(0).setCellValue("Matricule :");
        row.createCell(1).setCellValue(employer.getMatricule());

        row = sheet.createRow(rowNum++);
        row.createCell(0).setCellValue("Fonction :");
        row.createCell(1).setCellValue("DRH"); // à adapter si nécessaire

        row = sheet.createRow(rowNum++);
        row.createCell(0).setCellValue("Date d'embauche :");
        row.createCell(1).setCellValue(employer.getDateEmbauche() != null ? employer.getDateEmbauche().toString() : "");

        rowNum++;

        // Salaire brut
        row = sheet.createRow(rowNum++);
        row.createCell(0).setCellValue("Salaire de base :");
        Cell salaireCell = row.createCell(1);
        salaireCell.setCellValue(fichePaie.getSalaireBrut().doubleValue());
        salaireCell.setCellStyle(currencyStyle);

        // Total salaire brut
        row = sheet.createRow(rowNum++);
        Cell totalLabelCell = row.createCell(2);
        totalLabelCell.setCellValue("Salaire brut");
        totalLabelCell.setCellStyle(boldStyle);

        Cell totalValueCell = row.createCell(3);
        totalValueCell.setCellValue(fichePaie.getSalaireBrut().doubleValue());
        totalValueCell.setCellStyle(currencyStyle);

        // Retenues
        row = sheet.createRow(rowNum++);
        row.createCell(2).setCellValue("Retenue CNaPS 1%");
        Cell cnapsCell = row.createCell(3);
        cnapsCell.setCellValue(fichePaie.getCnaps().doubleValue());
        cnapsCell.setCellStyle(currencyStyle);

        row = sheet.createRow(rowNum++);
        row.createCell(2).setCellValue("TOTAL IRSA");
        Cell irsaCell = row.createCell(3);
        irsaCell.setCellValue(fichePaie.getIrsa().doubleValue());
        irsaCell.setCellStyle(currencyStyle);

        // Total des retenues
        row = sheet.createRow(rowNum++);
        Cell totalRetenuesLabel = row.createCell(2);
        totalRetenuesLabel.setCellValue("Total des retenues");
        totalRetenuesLabel.setCellStyle(boldStyle);

        Cell totalRetenuesValue = row.createCell(3);
        totalRetenuesValue.setCellValue(fichePaie.getTotalRetenues().doubleValue());
        totalRetenuesValue.setCellStyle(currencyStyle);

        // Net à payer
        row = sheet.createRow(rowNum++);
        Cell netLabel = row.createCell(2);
        netLabel.setCellValue("Net à payer");
        netLabel.setCellStyle(boldStyle);

        Cell netValue = row.createCell(3);
        netValue.setCellValue(fichePaie.getNetAPayer().doubleValue());
        netValue.setCellStyle(currencyStyle);

        workbook.write(out);
        workbook.close();
    }
}
