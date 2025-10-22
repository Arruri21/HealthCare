package com.infy.backend;

import com.infy.backend.model.Appointment;
import com.infy.backend.model.Coach;
import com.infy.backend.model.User;
import com.infy.backend.repository.AppointmentRepository;
import com.infy.backend.repository.CoachRepository;
import com.infy.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {
    private final UserRepository userRepository;
    private final CoachRepository coachRepository;
    private final AppointmentRepository appointmentRepository;

    public DataLoader(UserRepository userRepository, CoachRepository coachRepository, AppointmentRepository appointmentRepository) {
        this.userRepository = userRepository;
        this.coachRepository = coachRepository;
        this.appointmentRepository = appointmentRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User u = new User();
            u.setUsername("alice");
            u.setPassword("password");
            u.setEmail("alice@example.com");
            u.setCity("Metropolis");
            userRepository.save(u);

            Coach c = new Coach();
            c.setUsername("drbob");
            c.setPassword("password");
            c.setSpecialty("Fitness Coach");
            coachRepository.save(c);

            Appointment a = new Appointment();
            a.setUserId(u.getId());
            a.setCoachId(c.getId());
            a.setAppointmentDate("2025-10-23");
            a.setSlot("09:00-09:30");
            a.setDescription("Initial consultation");
            a.setStatus("PENDING");
            appointmentRepository.save(a);
        }
    }
}
