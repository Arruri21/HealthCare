package com.infy.backend.controller;

import com.infy.backend.model.User;
import com.infy.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        return ResponseEntity.ok(userService.register(user));
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User credentials) {
        User u = userService.login(credentials.getUsername(), credentials.getPassword());
        if (u == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(u);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> findById(@PathVariable Long id) {
        User u = userService.findById(id);
        if (u == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(u);
    }

    @GetMapping("/all")
    public List<User> all() {
        return userService.findAll();
    }
}
