package com.cntt2.user.dto;

import java.math.BigDecimal;

public record UserRequest (
        String username,
        String password,
        String fullname,
        String avatar,
        String phone,
        String email
) {

}

