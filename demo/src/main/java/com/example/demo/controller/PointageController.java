package com.example.demo.controller;

import com.example.demo.service.EmployerService;
import com.example.demo.service.PointageService ;
import com.example.demo.model.Employer;
import com.example.demo.model.Pointage;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;


import jakarta.servlet.http.HttpSession;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/pointages")
public class PointageController {
    PointageService pointageService;
    EmployerService emp;

    public PointageController(PointageService pointageService, EmployerService emp) {
        this.pointageService = pointageService;
        this.emp = emp;
    }
    @PostMapping("/create")
    public Pointage createPointage(@RequestParam LocalTime debut, @RequestParam LocalTime sortie,LocalTime pauseD,
            LocalTime pauseF,LocalDate jour,HttpSession session) {
        Employer e = (Employer) session.getAttribute("employer");
        //Employer e = emp.getEmployerById(1).get();
        // returnPointageService.save(p);
        return pointageService.create(debut, sortie, pauseD, pauseF, jour, e);
    }
}
