package com.stepi.service;

import com.stepi.model.User;
import com.stepi.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        logger.debug("Starting user registration for email: {}", user.getEmail());

        // 이메일 중복 확인
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            logger.error("Email already exists: {}", user.getEmail());
            throw new RuntimeException("Email already exists");
        }

        try {
            // 비밀번호 암호화
            String encodedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encodedPassword);
            logger.debug("Password encoded successfully for user: {}", user.getEmail());

            // 사용자 저장
            User savedUser = userRepository.save(user);
            logger.debug("User saved successfully: {}", savedUser.getEmail());
            return savedUser;
        } catch (Exception e) {
            logger.error("Error during user registration: " + e.getMessage(), e);
            throw new RuntimeException("Failed to register user: " + e.getMessage());
        }
    }
}