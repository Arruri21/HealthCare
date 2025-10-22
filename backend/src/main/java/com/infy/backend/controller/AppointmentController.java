package com.infy.backend.controller;

import com.infy.backend.model.Appointment;
import com.infy.backend.service.AppointmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bookings")
public class AppointmentController {
    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping
    public ResponseEntity<Appointment> book(@RequestBody Appointment appointment) {
        return ResponseEntity.ok(appointmentService.book(appointment));
    }

    @GetMapping
    public List<Appointment> all() {
        return appointmentService.findAll();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Appointment> update(@PathVariable Long id, @RequestBody Appointment update) {
        Appointment a = appointmentService.update(id, update);
        if (a == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(a);
    }

    @GetMapping("/coach/{coachId}")
    public List<Appointment> byCoach(@PathVariable Long coachId) {
        return appointmentService.findByCoachId(coachId);
    }

    @GetMapping("/user/{userId}")
    public List<Appointment> byUser(@PathVariable Long userId) {
        return appointmentService.findByUserId(userId);
    }
}
