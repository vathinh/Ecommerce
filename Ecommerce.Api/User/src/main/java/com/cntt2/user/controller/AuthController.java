package com.cntt2.user.controller;

import com.cntt2.user.dto.AuthRequest;
import com.cntt2.user.dto.AuthResponse;
import com.cntt2.user.security.TokenManager;
import com.cntt2.user.service.AuthService;
import com.cntt2.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("api/v1/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private TokenManager tokenManager;

    //sign in
    @PostMapping(path = "signin")
    public ResponseEntity<AuthResponse> signIn(@RequestBody AuthRequest.SignInRequest signInRequestRequest) {
        return authService.signIn(signInRequestRequest);
    }

    //sign up
    @PostMapping(path = "signup")
    public ResponseEntity<AuthResponse> signUp(@RequestBody AuthRequest.SignUpRequest signUpRequest) {
        return authService.signUp((signUpRequest));
    }

    @GetMapping(value = {"authenticate"})
    public ResponseEntity<UserDetails> authenticate(@RequestParam(name = "token", required = true) String tokenHeader) throws Exception {
        UserDetails userData = authService.checkAuth(tokenHeader);

        if(userData != null) {
            return new ResponseEntity<UserDetails>(userData, HttpStatus.OK);
        }

        return new ResponseEntity<UserDetails>(HttpStatus.BAD_REQUEST);
    }
}
