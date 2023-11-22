package com.cntt2.user.controller;

import com.cntt2.user.dto.AuthRequest;
import com.cntt2.user.dto.AuthResponse;
import com.cntt2.user.dto.EmailRequest;
import com.cntt2.user.dto.UserResetPwd;
import com.cntt2.user.security.TokenManager;
import com.cntt2.user.service.AuthService;
import com.cntt2.user.service.EmailService;
import com.cntt2.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

@Slf4j
@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private TokenManager tokenManager;

    @Autowired
    private EmailService emailService;

    @Value("${ecom.url}")
    private String ecomUrl;

    //sign in
    @PostMapping(path = "signin")
    public ResponseEntity<AuthResponse> signIn(@RequestBody AuthRequest.SignInRequest signInRequestRequest) {
        return authService.signIn(signInRequestRequest);
    }

    //sign up
    @PostMapping(path = "signup")
    public ResponseEntity<AuthResponse> signUp(@RequestBody AuthRequest.SignUpRequest signUpRequest) throws UnsupportedEncodingException, MessagingException {
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

    @PutMapping("resetPassword")
    public ResponseEntity<String> resetPassword(@RequestBody UserResetPwd userResetPwd) {
        return authService.resetPassword(userResetPwd);
    }

    @PostMapping("/mail")
    public void sendEMail(@RequestBody EmailRequest emailRequest) throws UnsupportedEncodingException, MessagingException {
        System.out.println("Going to Send email: " + emailRequest.toString());
        emailService.sendEmail(emailRequest);
    }

    @GetMapping("active-account/{email}")
    public String redirect(@PathVariable String email) {
        authService.activateAccount(email);
        String redirectLink = String.format("%s", ecomUrl);
        return String.format("<script type=\"text/javascript\">window.location = '%s';</script>", redirectLink);
    }

}
