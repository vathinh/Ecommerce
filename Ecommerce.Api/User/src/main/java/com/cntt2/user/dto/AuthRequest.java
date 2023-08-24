package com.cntt2.user.dto;

import java.math.BigDecimal;

public class AuthRequest {
    public record SignInRequest(
            String username,
            String password
    ) {

    }

    public record  SignUpRequest(
            String username,
            String password,
            String fullname,
            String email,
            Long phone
    ) {

    }
}


