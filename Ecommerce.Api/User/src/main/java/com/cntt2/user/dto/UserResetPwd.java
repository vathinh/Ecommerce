package com.cntt2.user.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResetPwd {
    private String email;
    private String password;
}
