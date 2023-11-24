package com.cntt2.user.service;

import com.cntt2.user.dto.*;
import com.cntt2.user.model.Role;
import com.cntt2.user.model.User;
import com.cntt2.user.repository.RoleRepository;
import com.cntt2.user.repository.UserRepository;
import com.cntt2.user.security.TokenManager;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class AuthService {
    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private  final RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenManager tokenManager;

    @Autowired
    private EmailService emailService;

    @Value("${be.url}")
    private String beUrl;

    public ResponseEntity<AuthResponse> signIn(AuthRequest.SignInRequest request) {
        if (request.username().isEmpty() || request.password().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        // Get user
        Optional<User> userData = userRepository.findByUsername(request.username());

        if (userData.isEmpty() || !passwordEncoder.matches(request.password(), userData.get().getPassword()) || !userData.get().isActive()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // Generate token
        final String jwtToken = tokenManager.generateJwtToken(userData.get().getId());

        // Generate data response
        AuthResponse response = new AuthResponse(userData.get());
        response.setToken(jwtToken);

        return ResponseEntity.ok(response);
    }


    public ResponseEntity<SignUpResponse> signUp(AuthRequest.SignUpRequest request) throws UnsupportedEncodingException, MessagingException {
        List<Role> userRoles = setRoles(List.of("USER"));

        if (userExistsByEmail(request.email())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new SignUpResponse("Email is already registered"));
        }

        if (userExistsByUsername(request.username())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new SignUpResponse("Username is already registered"));
        }

        User user = createUser(request, userRoles);

        String activeLink = String.format("<p>Hello %s,</p><p>Thank you for signing up with E Commerce! To activate your account, please click <a href=\"%s/%s\">here</a>.</p><p>Best regards,<br/>E Commerce Team</p>", user.getFullname(), beUrl, user.getEmail());

        // Save data in the database asynchronously
        CompletableFuture.runAsync(() -> {
            User savedUser = userRepository.save(user);
            System.out.println(savedUser);
        });

        // Send email asynchronously
        CompletableFuture.runAsync(() -> {
            EmailRequest emailRequest = EmailRequest.builder()
                    .recipient(user.getEmail())
                    .subject("Active your account in E Commerce website")
                    .msgBody(activeLink)
                    .build();
            try {
                emailService.sendEmail(emailRequest);
            } catch (UnsupportedEncodingException | MessagingException e) {
                throw new RuntimeException(e);
            }
        });

        return ResponseEntity.ok(new SignUpResponse("Sign Up success"));
    }


    private boolean userExistsByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    private boolean userExistsByUsername(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    private User createUser(AuthRequest.SignUpRequest request, List<Role> userRoles) {
        return User.builder()
                .username(request.username())
                .password(passwordEncoder.encode(request.password()))
                .fullname(request.fullname())
                .email(request.email())
                .phone(request.phone())
                .roles(userRoles)
                .build();
    }


    public UserDetails checkAuth(String tokenHeader) {
        String userId = null;
        String token = null;

        if (tokenHeader != null && tokenHeader.startsWith("Bearer ")) {
            token = tokenHeader.substring(7);
            try {
                userId = tokenManager.getUserIDFromToken(token);
            } catch (IllegalArgumentException e) {
                throw new IllegalStateException("Unable to get JWT Token");
            } catch (ExpiredJwtException e) {
                throw new IllegalStateException("JWT Token has expired");
            }
        } else {
            throw new IllegalStateException("Bearer String not found in token");
        }

        if (null != userId) {
            User userData = userRepository.findById(userId).orElseThrow(
                    () -> new IllegalStateException("UserID not found!")
            );
            if (tokenManager.validateJwtToken(token) && userData != null) {
                return userData;
            }
        }

        return null;
    }

    public List<Role> setRoles(List<String> roleNames) {
        List<Role> roles = new ArrayList<>();
        for (String roleName: roleNames) {
            Role roleData = roleRepository.findByName(roleName);
            if(roleData != null) {
                roles.add(roleData);
            } else {
                Role newRole = Role.builder()
                        .name(roleName)
                        .build();
                roleRepository.save(newRole);
                roles.add(newRole);
            }
        }
        return roles;
    }

    public ResponseEntity<String> resetPassword(UserResetPwd userResetPwd) {
        return userRepository.findByEmail(userResetPwd.getEmail())
                .map(user -> {
                    user.setPassword(passwordEncoder.encode(userResetPwd.getPassword()));
                    user.setActive(false);

                    CompletableFuture.runAsync(() -> {
                        userRepository.save(user);
                    });

                    String activeLink = String.format("<p>Hello %s,</p><p>Your request to reset password has been success! To reactivate your account, please click <a href=\"%s/%s\">here</a>.</p><p>Best regards,<br/>E Commerce Team</p>", user.getFullname(), beUrl, user.getEmail());
                    EmailRequest emailRequest = EmailRequest.builder()
                            .recipient(user.getEmail())
                            .subject("Reactive your account in E Commerce website")
                            .msgBody(activeLink)
                            .build();
                    try {
                        CompletableFuture.runAsync(() -> {
                            try {
                                emailService.sendEmail(emailRequest);
                            } catch (UnsupportedEncodingException | MessagingException e) {
                                throw new RuntimeException(e);
                            }
                        });
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }

                    return ResponseEntity.ok("Password reset successfully for user: " + user.getUsername());
                })
                .orElseGet(() ->
                        ResponseEntity.status(HttpStatus.NOT_FOUND)
                                .body("User with email " + userResetPwd.getEmail() + " not found.")
                );

    }

    public void activateAccount(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        userOptional.ifPresent(user -> {
            user.setActive(true);
            userRepository.save(user);
        });
    }

}
