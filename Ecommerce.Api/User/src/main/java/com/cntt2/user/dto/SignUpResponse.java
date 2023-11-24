package com.cntt2.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SignUpResponse {
    private String status;
    private String message;

    public SignUpResponse(String message) {
        this.message = message;
    }
}
