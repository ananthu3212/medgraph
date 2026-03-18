package org.example.medgraphbackend.controller;

import org.example.medgraphbackend.model.Symptom;
import org.example.medgraphbackend.repository.SymptomRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/symptoms")
public class SymptomController {

    private final SymptomRepository symptomRepository;

    public SymptomController(SymptomRepository symptomRepository) {
        this.symptomRepository = symptomRepository;
    }

    @GetMapping
    public List<Symptom> getAllSymptoms() {
        return symptomRepository.findAll();
    }

    // Optional: Get symptom by name
    @GetMapping("/{name}")
    public Symptom getSymptomByName(@PathVariable String name) {
        return symptomRepository.findById(name).orElse(null);
    }
}