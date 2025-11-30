package com.example.demo.controller;

import com.example.demo.model.Employer;
import com.example.demo.repository.EmployerRepository;
import com.example.demo.service.ConfigService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/config")
@CrossOrigin(origins = "http://localhost:3000") // à adapter selon ton front
public class ConfigController {

private final ConfigService configService;
private final EmployerRepository employerRepository;

public ConfigController(ConfigService configService, EmployerRepository employerRepository) {
    this.configService = configService;
    this.employerRepository = employerRepository;
}

@GetMapping("/taux")
public ResponseEntity<Map<String, BigDecimal>> getTaux() {
    // On récupère les taux depuis le premier employé pour l'exemple
    List<Employer> all = employerRepository.findAll();
    if (all.isEmpty()) {
        return ResponseEntity.ok(Map.of(
            "cnaps", BigDecimal.valueOf(0.01),
            "ostie", BigDecimal.valueOf(0.01),
            "irsa", BigDecimal.valueOf(0.10)
        ));
    }

    Employer e = all.get(0);
    Map<String, BigDecimal> taux = new HashMap<>();
    taux.put("cnaps", e.getTauxCnaps());
    taux.put("ostie", e.getTauxOstie());
    taux.put("irsa", e.getTauxIrsa());

    return ResponseEntity.ok(taux);
}

@PostMapping("/taux")
public ResponseEntity<String> updateTaux(@RequestParam String type, @RequestParam BigDecimal taux) {
    int updatedCount = configService.updateTaux(type, taux);
    return ResponseEntity.ok("Taux mis à jour pour " + updatedCount + " employé(s)");
}

}
