package com.infy.backend.service;

import com.infy.backend.model.Appointment;
import com.infy.backend.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public Appointment book(Appointment appointment) {
        appointment.setStatus("PENDING");
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> findAll() {
        return appointmentRepository.findAll();
    }

    public Appointment update(Long id, Appointment update) {
        return appointmentRepository.findById(id).map(a -> {
            a.setStatus(update.getStatus());
            a.setCoachComments(update.getCoachComments());
            return appointmentRepository.save(a);
        }).orElse(null);
    }

    public List<Appointment> findByCoachId(Long coachId) {
        return appointmentRepository.findByCoachId(coachId);
    }

    public List<Appointment> findByUserId(Long userId) {
        return appointmentRepository.findByUserId(userId);
    }
}
