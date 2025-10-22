package com.infy.backend.service;

import com.infy.backend.model.Coach;
import com.infy.backend.repository.CoachRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CoachService {
    private final CoachRepository coachRepository;

    public CoachService(CoachRepository coachRepository) {
        this.coachRepository = coachRepository;
    }

    public Coach register(Coach coach) {
        return coachRepository.save(coach);
    }

    public Coach login(String username, String password) {
        return coachRepository.findByUsername(username)
                .filter(c -> c.getPassword().equals(password))
                .orElse(null);
    }

    public Coach findById(Long id) {
        return coachRepository.findById(id).orElse(null);
    }

    public List<Coach> findAll() {
        return coachRepository.findAll();
    }
}
