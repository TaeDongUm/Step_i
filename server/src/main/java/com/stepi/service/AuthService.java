package com.stepi.service;

import com.stepi.dto.RegisterRequest;
import com.stepi.dto.LoginRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    public ResponseEntity<?> register(RegisterRequest request) {
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> login(LoginRequest request) {
        return ResponseEntity.ok().build();
    }
}