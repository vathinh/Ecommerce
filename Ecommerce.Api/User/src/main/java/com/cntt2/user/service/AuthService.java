package com.cntt2.user.service;

import com.cntt2.user.dto.AuthRequest;
import com.cntt2.user.dto.AuthResponse;
import com.cntt2.user.model.Role;
import com.cntt2.user.model.User;
import com.cntt2.user.repository.RoleRepository;
import com.cntt2.user.repository.UserRepository;
import com.cntt2.user.security.TokenManager;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AuthService {
    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private  final RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenManager tokenManager;

    public ResponseEntity<AuthResponse> signIn(AuthRequest.SignInRequest request) {
        if(request.username().isEmpty() || request.password().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        //get user
        Optional<User> userData = userRepository.findByUsername(request.username());

        if(userData.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        if(!passwordEncoder.matches(request.password(), userData.get().getPassword())) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        //generate token
        final String jwtToken = tokenManager.generateJwtToken(userData.get().getId());

        //generate data response
        AuthResponse response = new AuthResponse(userData.get());
        response.setToken(jwtToken);

        return new ResponseEntity<AuthResponse>(response, HttpStatus.OK);
    }

    public ResponseEntity<AuthResponse> signUp(AuthRequest.SignUpRequest request) {
        List<Role> userRoles = setRoles(Arrays.asList("USER"));

        User user = User.builder()
                .username(request.username())
                .password(passwordEncoder.encode(request.password()))
                .fullname(request.fullname())
                .email(request.email())
                .phone(request.phone())
                .roles(userRoles)
                .build();

        //save data in db
        User saveUser = userRepository.save(user);
        System.out.println(saveUser);


        //generate token
        final String jwtToken = tokenManager.generateJwtToken(user.getId());

        //generate data response
        AuthResponse response = new AuthResponse(user);
        response.setToken(jwtToken);

        return new ResponseEntity<AuthResponse>(response, HttpStatus.OK);
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
}
