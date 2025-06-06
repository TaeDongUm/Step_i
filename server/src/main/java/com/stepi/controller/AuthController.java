package com.stepi.controller;

import com.stepi.model.User;
import com.stepi.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            logger.debug("Received registration request for user: {}", user.getEmail());
            User registeredUser = userService.registerUser(user);
            logger.debug("User registered successfully: {}", registeredUser.getEmail());
            return ResponseEntity.status(201).body(registeredUser);
        } catch (Exception e) {
            logger.error("Registration failed for user: " + user.getEmail(), e);
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}