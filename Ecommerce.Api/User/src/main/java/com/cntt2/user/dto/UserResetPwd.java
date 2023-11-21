package com.cntt2.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserResetPwd {
    private String email;
    private String password;
}
