package com.infy.backend.controller;

import com.infy.backend.model.Coach;
import com.infy.backend.service.CoachService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/coaches")
public class CoachController {
    private final CoachService coachService;

    public CoachController(CoachService coachService) {
        this.coachService = coachService;
    }

    @PostMapping("/register")
    public ResponseEntity<Coach> register(@RequestBody Coach coach) {
        return ResponseEntity.ok(coachService.register(coach));
    }

    @PostMapping("/login")
    public ResponseEntity<Coach> login(@RequestBody Coach credentials) {
        Coach c = coachService.login(credentials.getUsername(), credentials.getPassword());
        if (c == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(c);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Coach> findById(@PathVariable Long id) {
        Coach c = coachService.findById(id);
        if (c == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(c);
    }

    @GetMapping("/all")
    public List<Coach> all() {
        return coachService.findAll();
    }
}
